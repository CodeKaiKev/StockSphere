import React, { useState, useEffect } from 'react';
import './StockTicker.css';

const StockTicker = (props) => {
  const [stockPrices, setStockPrices] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    if (props.data) {
      setStockPrices(props.data);
      setLoading(false);
    }
  }, [props.data]);

  if (loading && props.data) {
    setStockPrices(props.data);
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="stock-ticker">
      <marquee behavior="scroll" direction="left" scrollamount="15
      ">
        <span className="ticker-symbol">
          ${stockPrices.Ticker} - 
          Open Price: ${stockPrices.Open || 'N/A'} - 
          Close Price: ${stockPrices.Close || 'N/A'} - 
          High: ${stockPrices.High || 'N/A'} - 
          Low: ${stockPrices.Low || 'N/A'} - 
          Volume: {stockPrices.TradingVolume || 'N/A'} - 
          Date: {stockPrices.Date || 'N/A'}
        </span>
      </marquee>
    </div>
  );
};

export default StockTicker;