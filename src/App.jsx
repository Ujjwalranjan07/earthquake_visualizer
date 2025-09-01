import { useState, useEffect } from 'react'
import Map from './components/Map'
import Legend from './components/Legend'
import Filters from './components/Filters'
import './App.css'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  const [filters, setFilters] = useState({
    magnitude: 0,
    time: 86400000 // 24 hours in milliseconds
  });

  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setEarthquakes(data.features);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEarthquakeData();

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchEarthquakeData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (earthquakes.length > 0) {
      const now = new Date().getTime();
      const filtered = earthquakes.filter(earthquake => {
        const { mag, time } = earthquake.properties;
        return mag >= filters.magnitude && (now - time) <= filters.time;
      });
      setFilteredEarthquakes(filtered);
    }
  }, [earthquakes, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  // Calculate statistics for the filtered earthquakes
  const calculateStatistics = () => {
    if (!filteredEarthquakes.length) return { count: 0, avgMag: 0, maxMag: 0 };
    
    let totalMag = 0;
    let maxMag = 0;
    let maxMagQuake = null;
    
    filteredEarthquakes.forEach(quake => {
      const mag = quake.properties.mag;
      totalMag += mag;
      
      if (mag > maxMag) {
        maxMag = mag;
        maxMagQuake = quake;
      }
    });
    
    return {
      count: filteredEarthquakes.length,
      avgMag: totalMag / filteredEarthquakes.length,
      maxMag,
      maxMagQuake
    };
  };
  
  const stats = calculateStatistics();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Earthquake Visualizer</h1>
            <p>Real-time visualization of global seismic activity</p>
          </div>
          <DarkModeToggle />
        </div>
      </header>
      
      <main className="app-main">
        <div className="dashboard">
          <div className="sidebar">
            <Filters onFilterChange={handleFilterChange} />
            <Legend />
            
            <div className="stats-panel">
              <h3>Earthquake Statistics</h3>
              {loading ? (
                <p>Loading statistics...</p>
              ) : error ? (
                <p>Unable to load statistics</p>
              ) : (
                <div className="stats-content">
                  <div className="stat-item">
                    <span className="stat-label">Total Earthquakes:</span>
                    <span className="stat-value">{stats.count}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Average Magnitude:</span>
                    <span className="stat-value">{stats.avgMag.toFixed(2)}</span>
                  </div>
                  
                  {stats.maxMagQuake && (
                    <div className="stat-item">
                      <span className="stat-label">Strongest Earthquake:</span>
                      <span className="stat-value">{stats.maxMag.toFixed(1)}</span>
                      <div className="max-quake-info">
                        <p>{stats.maxMagQuake.properties.place}</p>
                        <p>{new Date(stats.maxMagQuake.properties.time).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="map-panel">
            {loading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading earthquake data...</p>
              </div>
            ) : error ? (
              <div className="error">Error: {error}</div>
            ) : (
              <Map earthquakes={filteredEarthquakes} />
            )}
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Data source: <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer">USGS Earthquake Hazards Program</a></p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  )
}

export default App
