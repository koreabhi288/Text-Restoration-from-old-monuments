# Text Restoration App Backend

This is the Flask backend for the Text Restoration web application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up API keys:
```bash
cp config.json.example config.json
```

3. Edit `config.json` and add your Google Gemini API key.

## Running the server

```bash
python app.py
```

The server will run on http://localhost:5000.

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/upload` - Upload and process an image

## Requirements

- Python 3.8 or higher
- Access to Google Gemini API 