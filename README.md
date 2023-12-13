# Project Name

Subtitle or brief description of the project.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [WebSocket](#websocket)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a Node.js application using Express, WebSocket, and Firebase to manage song requests, suggestions, schedules, and stories.

## Prerequisites

Before you begin, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [Firebase](https://firebase.google.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KGH1113/subs_backend.git
   ```

2. Install the project dependencies:

   ```bash
   cd subs_backend
   npm install
   ```

## Configuration

1. Create a Firebase project and obtain your Firebase configuration.

2. Replace the placeholder values in `firebaseConfig` within `README.md` with your actual Firebase configuration.

3. Configure other settings as needed, such as the WebSocket path and port.

## Usage

To start the server, run the following command:

```bash
npm start
```

Visit `http://localhost:3000` in your browser or use tools like Postman to interact with the API.

## Endpoints

- **POST /song-request:** Submit a song request.
```json
{
  "name": "John Doe",
  "studentNumber": "12345",
  "songTitle": "Example Song",
  "singer": "Example Singer"
}
```
- **POST /suggestion-request:** Submit a suggestion.
```json
{
  "name": "Jane Doe",
  "studentNumber": "67890",
  "suggestion": "Example Suggestion"
}
```

- **GET /view-suggestion:** View suggestions.

- **GET /view-schedule:** View schedules.

- **POST /add-schedule:** Add a new schedule.
```json
{
  "title": "Event Title",
  "date": "2023-12-25",
  "group": "Example Group",
  "period": "Morning",
  "link": "https://example.com"
}
```

- **POST /add-story:** Add a new story.
```json
{
  "name": "Alice",
  "studentNumber": "54321",
  "story": "Example Story",
  "songTitle": "Favorite Song",
  "singer": "Favorite Singer"
}
```

- **GET /view-story:** View submitted stories.

## WebSocket

A WebSocket server is running at `ws://localhost:3000/view-requests`. It broadcasts song request updates to connected clients.

Feel free to modify these samples according to your needs and use them for testing the respective API endpoints.

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
