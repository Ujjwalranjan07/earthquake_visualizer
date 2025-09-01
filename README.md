# Earthquake Visualizer

A web application that visualizes recent earthquake activity around the world using data from the USGS Earthquake API.

## Features

- Interactive world map showing recent earthquakes
- Color-coded markers based on earthquake magnitude
- Detailed information about each earthquake in popups
- Filter earthquakes by magnitude and time period
- Responsive design for both desktop and mobile devices
- Real-time data updates every 5 minutes

## Technologies Used

- React - Frontend framework
- Vite - Build tool
- Leaflet - Interactive maps library
- React-Leaflet - React components for Leaflet maps
- USGS Earthquake API - Data source

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/earthquake-visualizer.git
   cd earthquake-visualizer
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Filters.jsx    # Earthquake filtering controls
│   │   ├── Legend.jsx     # Map legend for magnitude colors
│   │   └── Map.jsx        # Leaflet map component
│   ├── App.css            # Application styles
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Usage

- The map displays earthquakes from the past 24 hours by default
- Click on any earthquake marker to view detailed information
- Use the filters to adjust the minimum magnitude and time period
- The legend shows the color coding for different magnitude ranges

## API Reference

This application uses the USGS Earthquake API to fetch earthquake data:

```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

The API provides GeoJSON data with information about recent earthquakes, including:

- Location (latitude, longitude)
- Magnitude
- Depth
- Time
- Place description

## Deployment

To build the application for production:

```
npm run build
```

The build files will be generated in the `dist` directory, which can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Future Enhancements

- Add search functionality to find earthquakes by location
- Implement clustering for better visualization of dense earthquake areas
- Add historical earthquake data visualization
- Include additional data layers (tectonic plates, fault lines)
- Add user preferences storage

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/)
- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)
