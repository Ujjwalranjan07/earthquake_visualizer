import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [magnitude, setMagnitude] = useState(0);
  const [timePeriod, setTimePeriod] = useState(86400000);

  const handleMagnitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    setMagnitude(value);
    onFilterChange('magnitude', value);
  };

  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value);
    setTimePeriod(value);
    onFilterChange('time', value);
  };

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setMagnitude(value);
    onFilterChange('magnitude', value);
  };

  // Convert time period to readable format
  const getTimePeriodLabel = (ms) => {
    if (ms === 3600000) return 'Last Hour';
    if (ms === 86400000) return 'Last 24 Hours';
    if (ms === 604800000) return 'Last 7 Days';
    return 'Custom';
  };

  return (
    <div className="filters">
      <h3>Filter Earthquakes</h3>
      
      <div className="filter-group">
        <label htmlFor="magnitude-filter">
          Minimum Magnitude: <span className="filter-value">{magnitude.toFixed(1)}</span>
        </label>
        <div className="slider-container">
          <input 
            type="range" 
            id="magnitude-slider" 
            min="0" 
            max="8" 
            step="0.1" 
            value={magnitude}
            onChange={handleSliderChange}
            className="magnitude-slider"
          />
          <div className="slider-labels">
            <span>0</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>8</span>
          </div>
        </div>
        <select 
          id="magnitude-filter" 
          onChange={handleMagnitudeChange}
          value={magnitude}
          className="filter-select"
        >
          <option value="0">All</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="time-filter">
          Time Period: <span className="filter-value">{getTimePeriodLabel(timePeriod)}</span>
        </label>
        <select 
          id="time-filter" 
          onChange={handleTimeChange}
          value={timePeriod}
          className="filter-select"
        >
          <option value="3600000">Last Hour</option>
          <option value="86400000">Last 24 Hours</option>
          <option value="604800000">Last 7 Days</option>
        </select>
      </div>

      <div className="filter-info">
        <p>Showing earthquakes with magnitude {magnitude}+ from the {getTimePeriodLabel(timePeriod).toLowerCase()}</p>
      </div>
    </div>
  );
};

export default Filters;