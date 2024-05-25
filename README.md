
---

# Trade Parsing and Balance Calculator API

This API allows users to upload trade data via a CSV file and retrieve the balance of a specific base currency at a given timestamp. The trades data is stored in a MongoDB database, and the balance is calculated based on the operations performed (buy/sell) on different markets.

## Features

- **Upload Trades:** Upload a CSV file containing trade data.
- **Get Balance at Time:** Retrieve the balance of each base currency at a specific timestamp.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- CSV-Parser

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed and running.

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/trade-parsing-balance-calculator.git
    cd trade-parsing-balance-calculator
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Start the server
    ```bash
    npm start
    ```

The server should now be running on `https://trade-balance-cacl-api.onrender.com/`.

## API Documentation

The complete API documentation can be found [here](https://documenter.getpostman.com/view/26807996/2sA3QqgD5f).

## API Endpoints

### Health Check

**Endpoint:** `/`

**Method:** `GET`

**Description:** Simple endpoint to check if the API is working.

**Response:**
- Status: 200
- Body: "working"

### Upload Trades

**Endpoint:** `/trades`

**Method:** `POST`

**Description:** Upload a CSV file containing trade data.

**Request:**
- **Headers:** 
  - `Content-Type: multipart/form-data`
- **Body (form-data):**
  - `file`: The CSV file to be uploaded.

**CSV Format:**
```csv
User_ID,UTC_Time,Operation,Market,Buy/Sell Amount,Price
user123,2022-05-23T18:25:43.511Z,Buy,BTC/USD,0.1,30000
user123,2022-05-24T18:25:43.511Z,Sell,BTC/USD,0.05,31000
```

**Response:**
- Status: 201 (Created)
  - Body: `{"message": "CSV data uploaded successfully!"}`
- Status: 400 (Bad Request)
  - Body: `{"message": "Error uploading file", "errors": [error messages]}`
- Status: 500 (Internal Server Error)
  - Body: `{"message": "Internal server error"}`

### Get Balance at Time

**Endpoint:** `/balance`

**Method:** `POST`

**Description:** Get the balance of each base currency at a specific timestamp.

**Request:**
- **Headers:** 
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "timestamp": "2022-05-24T18:25:43.511Z"
  }
  ```

**Response:**
- Status: 200 (OK)
  - Body: `{"BTC": 0.05, "ETH": 0.2}`
- Status: 400 (Bad Request)
  - Body: `{"message": "Timestamp is required."}`
- Status: 500 (Internal Server Error)
  - Body: `{"message": "Internal server error"}`

## Usage with Postman

### 1. Health Check

**Request:**
- **Method:** GET
- **URL:** `http://localhost:3000/`

**Response:**
- Status: 200
- Body: "working"

### 2. Upload Trades

**Request:**
- **Method:** POST
- **URL:** `http://localhost:3000/trades`
- **Headers:**
  - `Content-Type: multipart/form-data`
- **Body:**
  - **Key:** `file`
  - **Type:** File
  - **Value:** [Select your CSV file]

**Response:**
- Status: 201 (Created)
  - Body: `{"message": "CSV data uploaded successfully!"}`
- Status: 400 (Bad Request)
  - Body: `{"message": "Error uploading file", "errors": [error messages]}`
- Status: 500 (Internal Server Error)
  - Body: `{"message": "Internal server error"}`

### 3. Get Balance at Time

**Request:**
- **Method:** POST
- **URL:** `http://localhost:3000/balance`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "timestamp": "2022-05-24T18:25:43.511Z"
  }
  ```

**Response:**
- Status: 200 (OK)
  - Body: `{"BTC": 0.05, "ETH": 0.2}`
- Status: 400 (Bad Request)
  - Body: `{"message": "Timestamp is required."}`
- Status: 500 (Internal Server Error)
  - Body: `{"message": "Internal server error"}`

## Contributing

Feel free to open issues or submit pull requests with improvements.

## License

This project is licensed under the MIT License.

---
