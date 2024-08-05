import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './CompanyOverview.css';
import Typewriter from "./Typewriter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';

const CompanyOverview = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [companyData, setCompanyDetails] = useState({
    Details: "",
    Logo: "",
    URL: "",
    Category: "",
    EmployeeeNumber: 0,
    OutstandingShares: 0,
    Name: "",
    Listed: "",
    Stock: false,
    Ticker: "",
    Set: "",
  });
  const text = useMemo(() => companyData.Details, [companyData]);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    if(props.symbol !== 'Default') {
      const fetchCompanyOverview = async () => {
      
        const apiEndpoint = `https://api.polygon.io/v3/reference/tickers/${props.symbol}?apiKey=${apiKey}`;
  
        try {
          const response = await axios.get(apiEndpoint);
          const data = response.data;
  
          // setCompanyDetails({
          //   Name: data.results.name,
          //   Ticker: data.results.ticker,
          //   Stock: false,
          //   Set: 'Intro'
          // });
  
          if(data.results.primary_exchange == 'XNAS') {
            setCompanyDetails({
              Details: data.results.description,
              Category: data.results.sic_description,
              Logo: data.results.branding.logo_url,
              Icon: data.results.branding.icon_url,
              URL: data.results.homepage_url,
              Name: data.results.name,
              Listed: data.results.list_date,
              EmployeeeNumber: data.results.total_employees,
              OutstandingShares: data.results.share_class_shares_outstanding,
              Ticker: data.results.ticker,
              Exchange: 'NASDAQ',
              Stock: true,
              MarketCap: data.results.market_cap,
              Location: data.results.locale,
              Set: 'Valid'
            });
          } else if (data.results.primary_exchange == 'XNYS') {
            setCompanyDetails({
              Details: data.results.description,
              Category: data.results.sic_description,
              Logo: data.results.branding.logo_url,
              Icon: data.results.branding.icon_url,
              URL: data.results.homepage_url,
              Name: data.results.name,
              Listed: data.results.list_date,
              EmployeeeNumber: data.results.total_employees,
              OutstandingShares: data.results.share_class_shares_outstanding,
              Ticker: data.results.ticker,
              Exchange: 'NYSE',
              Stock: true,
              MarketCap: data.results.market_cap,
              Location: data.results.locale,
              Set: 'Valid'
  
            });
          }
        } catch (error) {
       
          setCompanyDetails({
            Details: "Error 429: Too many requests. Please try again later. The API has a limit on the number of requests that can be made within a certain time period. We apologize for the inconvenience.",
            Category: "Please wait a Minute before the next search.",
            Listed: "Start",
            Ticker: "ERR",
            Exchange: "WARNING",
            Name: "Error 429: Too many Requests",
          
            Stock: false,
            Set: 'Error'
          });
        }
      };
  
      fetchCompanyOverview();
    }else {
      setCompanyDetails({
        Details: "Welcome to Stock Sphere, your gateway to the world of stock market exploration! Our platform provides access to a wealth of information about publicly traded companies listed on the NASDAQ and NYSE exchanges.",
        Category: "Search a Ticker",
        Listed: "Start",
        Ticker: "INTRO",
        Name: "Home Page",
     
        Stock: false,
        Exchange: 'HOME',
        Set: 'Intro'
      });
    }
    
    
  }, [props.symbol]);

  const handleIconClick = () => {
    setShowLogo(!showLogo);
  };
 

  if(companyData.Ticker === 'INTRO') {
    return (
      <div>
      <div className="company-overview">
        <div className="company-header">
          <span style={{ fontWeight: 'bold' }}>C:\{companyData.Exchange}\${companyData.Ticker}<span className="blinking-ticker">_</span></span>
          <div className="header-icons">
            <FontAwesomeIcon icon={faTimes} color="#ffffff" style={{ backgroundColor: '#FF3737', borderRadius: '5px', fontSize: '15px', padding: '5px' }} />
          </div>
        </div>
        <div className="company-info">
          <div className="company-info-center">
            <h2 className="company-name">{companyData.Name}</h2>
          </div>
        </div>
        <div className="company-details">
          <h3 className="company-description">
          <Typewriter
            key={companyData.Ticker}
            text={text}
            delay={65}
          />
          </h3>
          <div className="company-stats">
            <h4>
              Step 1: {companyData.Category} 
            </h4>
          </div>
        </div>
      </div>
    </div>
    )
  } else if (companyData.Ticker === 'ERR') {
    return (
      <div>
                <div className="company-overview">
                  <div className="company-header">
                    <span style={{ fontWeight: 'bold' }}>C:\{companyData.Exchange}\${companyData.Ticker}<span className="blinking-ticker">_</span></span>
                    <div className="header-icons">
                      <FontAwesomeIcon icon={faTimes} color="#ffffff" style={{ backgroundColor: '#FF3737', borderRadius: '5px', fontSize: '15px', padding: '5px' }} />
                    </div>
                  </div>
                  <div className="company-info">
                    <div className="company-info-center">
                      <h2 className="company-name">{companyData.Name}</h2>
                    </div>
                  </div>
                  <div className="company-details">
                    <h3 className="company-description">
                    <Typewriter
            key={companyData.Ticker}
            text={text}
            delay={65}
          />
                    </h3>
                    <div className="company-stats">
                      <h4>
                        Instructions: {companyData.Category} 
                      </h4>
                    </div>
                  </div>
                </div>
                <br/>
              </div>
    )
  }
      return (
        <div>
       
            <div>
              <div className="company-overview">
              <div className="company-header">
            <span style={{ fontWeight: 'bold' }}>C:\{companyData.Exchange}\${companyData.Ticker}<span className="blinking-ticker">_</span></span>
            <div className="header-icons">
            {/* <FontAwesomeIcon icon={faMinus} color="#ffffff" style={{ backgroundColor: '#FF9900', borderRadius: '5px', fontSize: '10px', padding: '5px' }} />
          <FontAwesomeIcon icon={faSquareRegular} color="#ffffff" style={{ backgroundColor: '#008000', borderRadius: '5px', fontSize: '10px', padding: '5px' }} /> */}
          <FontAwesomeIcon icon={faTimes} color="#ffffff" style={{ backgroundColor: '#FF3737', borderRadius: '5px', fontSize: '15px', padding: '5px' }} />
          </div>
          </div>
                <div className="company-info">
            <div className="company-info-center">
              <div className="company-logo-container">
                {showLogo? (
                  <img src={companyData.Logo + `?apiKey=${apiKey}`} alt="Company Logo" className="company-logo" onClick={handleIconClick} />
                ) : (
                  <img src={companyData.Icon + `?apiKey=${apiKey}`} alt="Company Icon" className="company-logo" onClick={handleIconClick} />
                )}
              </div>
              <h2 className="company-name">{companyData.Name}</h2>
            </div>
          </div>
                <div className="company-details">
                  <h3 className="company-description">
                  <Typewriter
            key={companyData.Ticker}
            text={text}
            delay={65}
          />
                    </h3>
                  <div className="company-stats">
                  <h4>
                      Category: {companyData.Category} 
                  </h4>
                      <h4>     
                      Date Listed: {companyData.Listed} 
                      </h4>
                      <h4>
                      Market Cap: ${companyData.MarketCap >= 1e12? `${(companyData.MarketCap / 1e12).toFixed(2)} trillion` : companyData.MarketCap >= 1e9? `${(companyData.MarketCap / 1e9).toFixed(2)} billion` : `${(companyData.MarketCap / 1e6).toFixed(2)} million`}
                      </h4>
                      <h4>
            Total Shares: {companyData.OutstandingShares >= 1e9? `${(companyData.OutstandingShares / 1e9).toFixed(2)} billion` : `${(companyData.OutstandingShares / 1e6).toFixed(2)} million`} | Employees: {companyData.EmployeeeNumber} 
          </h4>
                    
                    
                      
                    
                  </div>
                  <div className="company-link">
                  <button
                      className="neon-btn"
                      onClick={() => window.open(companyData.URL, '_blank')}
                    >Visit Company Website</button>
                  </div>
                </div>
              
              </div>
              <br/>
              </div>
         
        </div>
      );
    };


export default CompanyOverview;