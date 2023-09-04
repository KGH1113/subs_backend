# Song Request and Suggestion System API

This repository contains the source code for a simple Song Request and Suggestion System API built using Node.js and Firebase. The API allows users to request songs and make suggestions for a broadcasting department.

## Prerequisites

Before running the API, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies by running the following command in the project directory:

```bash
npm install
```

## Configuration

Make sure to replace the Firebase configuration with your own Firebase project credentials in the `index.js` file:

```javascript
// Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will be running on port 3000.

## Endpoints

### 1. Song Request

- URL: `POST /song-request`
- Description: Allows users to request songs for broadcasting.
- Request Body:

```json
{
  "name": "Your Name",
  "studentNumber": "Your Student Number",
  "songTitle": "Song Title",
  "singer": "Singer Name"
}
```

- Response:

  - Status 200: Success

  ```json
  {
    "status": "success",
    "message": "Song request has been successfully submitted!"
  }
  ```

  - Status 400: Error (e.g., invalid request, blacklisted user, etc.)

  ```json
  {
    "status": "error",
    "message": "Error message here"
  }
  ```

### 2. View Song Requests for the Current Date

- URL: `GET /view-request`
- Description: Retrieves all the song requests for the current date.
- Response:

  - Status 200: Success

  ```json
  [
    {
      "name": "User 1",
      "studentNumber": "123456",
      "songTitle": "Song Title 1",
      "singer": "Singer 1",
      "time": "10:30:15"
    },
    {
      "name": "User 2",
      "studentNumber": "654321",
      "songTitle": "Song Title 2",
      "singer": "Singer 2",
      "time": "11:45:22"
    }
  ]
  ```

  - Status 400: Error (e.g., data not found)

  ```json
  {
    "status": "error",
    "message": "No song requests found for the current date."
  }
  ```

### 3. View All Song Requests

- URL: `GET /view-all-requests`
- Description: Retrieves all the song requests for all dates.
- Response:

  - Status 200: Success

  ```json
  {
    "2023-08-01": {
      "data": [
        {
          "name": "User 1",
          "studentNumber": "123456",
          "songTitle": "Song Title 1",
          "singer": "Singer 1",
          "time": "10:30:15"
        }
      ]
    },
    "2023-08-02": {
      "data": [
        {
          "name": "User 2",
          "studentNumber": "654321",
          "songTitle": "Song Title 2",
          "singer": "Singer 2",
          "time": "11:45:22"
        }
      ]
    }
  }
  ```

  - Status 400: Error (e.g., data not found)

  ```json
  {
    "status": "error",
    "message": "No song requests found."
  }
  ```

### 4. Suggest Request

- URL: `POST /suggestion-request`
- Description: Allows users to make suggestions for the broadcasting department.
- Request Body:

```json
{
  "name": "Your Name",
  "studentNumber": "Your Student Number",
  "suggestion": "Your suggestion here"
}
```

- Response:

  - Status 200: Success

  ```json
  {
    "status": "success",
    "message": "Suggestion has been successfully submitted!"
  }
  ```

  - Status 400: Error (e.g., blacklisted user, etc.)

  ```json
  {
    "status": "error",
    "message": "Error message here"
  }
  ```

### 4. Suggest Request

- URL: `POST /add-story`
- Description: Allows users to make story for the broadcasting department.
- Request Body:

```json
{
  "name": "Your Name",
  "studentNumber": "Your Student Number",
  "story": "Your Story Here",
  "songTitle": "Song for a story",
  "singer": "Singer Name"
}
```

- Response:

  - Status 200: Success

  ```json
  {
    "status": "success",
    "message": "Story has been successfully submitted!"
  }
  ```

  - Status 400: Error (e.g., blacklisted user, etc.)

  ```json
  {
    "status": "error",
    "message": "Error message here"
  }
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
