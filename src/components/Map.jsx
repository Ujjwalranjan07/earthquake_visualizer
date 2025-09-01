import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, ZoomControl, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = ({ earthquakes }) => {
  // Function to determine circle color based on earthquake magnitude
  const getMarkerColor = (magnitude) => {
    if (magnitude < 1) return '#00FF00'; // Green
    if (magnitude < 2) return '#ADFF2F'; // GreenYellow
    if (magnitude < 3) return '#FFFF00'; // Yellow
    if (magnitude < 4) return '#FFA500'; // Orange
    if (magnitude < 5) return '#FF4500'; // OrangeRed
    return '#FF0000'; // Red for magnitude >= 5
  };

  // Function to determine circle radius based on earthquake magnitude
  const getMarkerRadius = (magnitude) => {
    return Math.max(magnitude * 3, 5); // Minimum radius of 5
  };

  if (!earthquakes || earthquakes.length === 0) {
    return <div className="no-data">No earthquake data available for the selected filters.</div>;
  }

  // Custom map component with fullscreen control
  useEffect(() => {
    // Add fullscreen control to the map
    try {
      if (!document.getElementById('leaflet-fullscreen-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-fullscreen-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.fullscreen/2.0.0/Control.FullScreen.css';
        document.head.appendChild(link);
      }

      // Safely check if L is defined and has control property
      if (L && typeof L.control === 'object' && !L.control.fullscreen) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.fullscreen/2.0.0/Control.FullScreen.min.js';
        script.async = true;
        document.body.appendChild(script);
      }
    } catch (error) {
      console.error('Error loading fullscreen control:', error);
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '80vh', width: '100%' }}
        zoomControl={false} // We'll add custom zoom control
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        easeLinearity={0.35}
      >
        <ZoomControl position="topleft" />
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com">Esri</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {earthquakes.map((earthquake) => {
          const { coordinates } = earthquake.geometry;
          const { mag, place, time, url } = earthquake.properties;
          const formattedTime = new Date(time).toLocaleString();
          
          // Calculate time difference for animation effect
          const timeDiff = new Date().getTime() - time;
          const isRecent = timeDiff < 3600000; // 1 hour
          
          return (
            <CircleMarker
              key={earthquake.id}
              center={[coordinates[1], coordinates[0]]}
              radius={getMarkerRadius(mag)}
              fillColor={getMarkerColor(mag)}
              color="#000"
              weight={1}
              opacity={1}
              fillOpacity={isRecent ? 0.9 : 0.7}
              className={isRecent ? 'pulse-marker' : ''}
            >
              <Tooltip direction="top" className="earthquake-tooltip">
                <strong>Magnitude: {mag.toFixed(1)}</strong><br/>
                {place}
              </Tooltip>
              <Popup className="earthquake-popup">
                <div className="earthquake-popup-content">
                  <h3 style={{ color: getMarkerColor(mag), marginTop: 0 }}>Magnitude: {mag.toFixed(1)}</h3>
                  <p><strong>Location:</strong> {place}</p>
                  <p><strong>Time:</strong> {formattedTime}</p>
                  <p><strong>Depth:</strong> {coordinates[2].toFixed(1)} km</p>
                  <p><strong>Coordinates:</strong> {coordinates[1].toFixed(4)}, {coordinates[0].toFixed(4)}</p>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="details-button"
                  >
                    View USGS Details
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;