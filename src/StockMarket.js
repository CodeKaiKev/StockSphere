import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import CompanyOverview from './CompanyOverview.js';
import StockChart from './StockChart.js';
import StockTicker from './StockTicker.js';
import moment from 'moment';
import './StockMarket.css';

const StockMarket = (props) => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [companyPrices, setCompanyPrices] = useState({
    Open: 0,
    Close: 0,
    Low: 0,
    High: 0,
    TradingVolume: 0,
    Date: '',
    Ticker: '',
  });
  const StockSymbol = useMemo(() => props.stock, [props.stock]);

  useEffect(() => {
    if (StockSymbol !== 'Initial') {
      fetchStock();
    }
  }, [StockSymbol]);

  const fetchStock = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const currentDate = new Date();
    const twoYearsAgo = new Date(currentDate.getFullYear() - 2, currentDate.getMonth(), currentDate.getDate());

    const API_NEWCALL = `https://api.polygon.io/v2/aggs/ticker/${StockSymbol}/range/1/day/${twoYearsAgo.toISOString().split('T')[0]}/${currentDate.toISOString().split('T')[0]}?adjusted=true&sort=asc&apiKey=${apiKey}`;

    try {
      const response = await axios.get(API_NEWCALL);
      const data = response.data;

      const stockChartXValuesFunction = [];
      const stockChartYValuesFunction = [];

      data.results.forEach((result, index) => {
        const date = moment(result.t);
        stockChartXValuesFunction.push(date.format('YYYY-MM-DD'));
        stockChartYValuesFunction.push(result.o);
      });

      setStockChartXValues(stockChartXValuesFunction);
      setStockChartYValues(stockChartYValuesFunction);

      const lastResult = data.results[data.results.length - 1];
      setCompanyPrices({
        Open: lastResult.o,
        Close: lastResult.c,
        Low: lastResult.l,
        High: lastResult.h,
        TradingVolume: lastResult.v,
        Date: moment(lastResult.t).format('YYYY-MM-DD'),
        Ticker: StockSymbol,
      });
    } catch (error) {
      // console.error('Error fetching stock data:', error);
    }
  };
  if (StockSymbol === 'Initial') {
    return (
      <div className="company-overview-container2">
         
                <CompanyOverview symbol={'Default'} />
            
          </div>
    );
  } else if (StockSymbol !== 'Initial'){
    return (
      <div>
     
          <div>
            <StockTicker data={companyPrices} />
            <div className="stock-market-container">
            <div className="stock-chart-container">
            <StockChart xValues={stockChartXValues} yValues={stockChartYValues} symbol={companyPrices.Ticker} />
          </div>
          <div className="company-overview-container">
         
                <CompanyOverview symbol={companyPrices.Ticker} />
            
          </div>
          
        </div>
          </div>
       
      </div>
    );
  }
};

export default StockMarket;