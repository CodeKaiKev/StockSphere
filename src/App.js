import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StockMarket from './StockMarket';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGlobe } from '@fortawesome/free-solid-svg-icons';
import stocks from './stocks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {
  const [chosenStock, setChosenStock] = useState('Initial');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = stocks.filter(stock => {
        return stock.name.toLowerCase().startsWith(searchQuery.toLowerCase()) || stock.ticker.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectStock = (stock) => {
    setChosenStock(stock.ticker);
    console.log(chosenStock.ticker);
    setSearchQuery('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">&nbsp; &nbsp;Stock Sphere &nbsp;
          <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
        </h1>
        <div className="search-wrapper">
          <div className="search-container">
            <input
              type="text"
              className="header-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            {filteredStocks.length > 0 && (
              <ul className="search-results">
                {filteredStocks.map(stock => (
                  <li key={stock.ticker} onClick={() => handleSelectStock(stock)}>
                    {stock.name} ({stock.ticker})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <StockMarket stock={chosenStock} />
      <Footer />
    </div>
  );
}

export default App;