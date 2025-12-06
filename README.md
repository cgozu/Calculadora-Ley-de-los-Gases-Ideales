# Calculadora de Gases Ideales

## Overview
A web application for calculating moles using the ideal gas law (PV = nRT). Users can input pressure, volume, and temperature values to calculate the number of moles, with all calculations saved to a persistent history.

## Project Architecture

### Tech Stack
- **Backend**: Flask (Python 3.11)
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Storage**: JSON file (history.json)

### Directory Structure
```
/
├── main.py              # Flask application with API endpoints
├── templates/
│   └── index.html       # Main HTML template
├── static/
│   ├── style.css        # Styles
│   └── script.js        # Frontend JavaScript
├── history.json         # Calculation history storage (auto-generated)
└── replit.md            # Project documentation
```

### API Endpoints
- `GET /` - Serves the main HTML page
- `POST /calculate` - Calculate moles from pressure, volume, temperature
  - Request body: `{ "pressure": number, "volume": number, "temperature": number }`
  - Returns calculated moles and stores in history
- `GET /history` - Retrieve all calculation history
- `DELETE /history/clear` - Clear all history

### Key Constants
- Gas constant R = 8.314462618 Pa·m³/mol·K
- Temperature conversion: K = °C + 273.15
- Formula: n = PV / RT

## Recent Changes
- Initial project setup (December 2025)
- Created Flask backend with calculation endpoints
- Built responsive frontend with Spanish UI
- Implemented history tracking with JSON storage

## User Preferences
- Spanish language interface
- Scientific/educational theme
- Clean, modern UI with gradient backgrounds

## Running the Project
The Flask server runs on port 5000 with the command:
```bash
python main.py
```
