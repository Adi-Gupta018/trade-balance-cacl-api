const asynchandler = require("express-async-handler");
const csv = require("csv-parser");
const fs = require("fs");
const multer = require("multer");
const Trade = require("../db/trade");

const upload = multer({ dest: "uploads/" });

const uploadCSV = asynchandler(async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error1 uploading file:" + err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Please upload a csv file" });
      }

      const filePath = req.file.path;
      const promises = [];
      const trades = [];
      const tradeErrors = [];

      const csvStream = fs.createReadStream(filePath).pipe(csv());

      csvStream.on("data", (row) => {
        promises.push(
          (async () => {
            try {
              const { User_ID, UTC_Time, Operation, Market, Price } = row;
              const amount = row["Buy/Sell Amount"];

              if (!UTC_Time || !Operation || !Market || !amount || !Price) {
                throw new Error("Missing required fields in trade data");
              }
              const marketParts = Market.split("/");
              const base = marketParts[0];
              const quote = marketParts[1];
              const newTrade = new Trade({
                user_id: User_ID,
                utc_time: UTC_Time,
                operation: Operation,
                market: { base, quote },
                amount,
                price: Price,
              });
              trades.push(newTrade);
            } catch (error) {
              tradeErrors.push(error.message);
            }
          })()
        );
      });

      csvStream.on("end", async () => {
        try {
          await Promise.all(promises);
          if (tradeErrors.length > 0) {
            return res.status(400).json({
              message: "Error uploading file",
              errors: tradeErrors,
            });
          } else {
            await Trade.create(trades);
            res.status(201).json({
              message: "CSV data uploaded successfully!",
            });
          }
        } catch (error) {
          console.error("Error processing CSV data:", error);
          res
            .status(500)
            .json({ message: "Error processing CSV data: " + error.message });
        }
      });

      csvStream.on("error", (err) => {
        console.error("Error parsing CSV:", err);
        res.status(500).json({ message: "Error processing CSV file" });
      });
    });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getBalanceAtTime = asynchandler(async (req, res) => {
  try {
    const timestamp = req?.body?.timestamp;
    console.log(timestamp);
    if (!timestamp) {
      return res.status(400).json({ message: "Timestamp is required." });
    }

    const filterDate = new Date(timestamp);

    const trades = await Trade
      .find({ utc_time: { $lte: filterDate } });

    const balances = {};
    for (const trade of trades) {
      const amount = trade.operation === "Buy" ? trade.amount : -trade.amount;
      balances[trade.market.base] = (balances[trade.market.base] || 0) + amount;
    }


    res.status(200).json( balances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = { uploadCSV, getBalanceAtTime };
