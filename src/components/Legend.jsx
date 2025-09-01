import React from 'react';
import './Legend.css';

const Legend = () => {
  const magnitudeRanges = [
    { range: '< 1', color: '#00FF00', description: 'Micro - Not felt' },
    { range: '1-2', color: '#ADFF2F', description: 'Minor - Rarely felt' },
    { range: '2-3', color: '#FFFF00', description: 'Minor - Weak' },
    { range: '3-4', color: '#FFA500', description: 'Light - Noticeable' },
    { range: '4-5', color: '#FF4500', description: 'Moderate - Can cause damage' },
    { range: '≥ 5', color: '#FF0000', description: 'Strong+ - Significant damage' },
  ];

  return (
    <div className="legend">
      <h3>Magnitude Scale</h3>
      <div className="legend-description">
        <p>Color-coded by earthquake intensity</p>
      </div>
      <div className="legend-items">
        {magnitudeRanges.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: item.color }}
            />
            <div className="legend-text">
              <span className="legend-range">{item.range}</span>
              <span className="legend-description">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="legend-note">
          <p>Recent earthquakes (&lt; 1 hour) will pulse on the map</p>
        </div>
    </div>
  );
};

export default Legend;