import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './StockChart.css';
import { useMediaQuery } from 'react-responsive';

const StockChart = (props) => {
  const [XValues, setXValues] = useState([]);
  const [YValues, setYValues] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 1500 });
  const isPhone = useMediaQuery({ maxWidth: 700 }); // add this line
  const isSmallPhone = useMediaQuery({ maxWidth: 430 }); // add this line

  useEffect(() => {
    setXValues(props.xValues);
    setYValues(props.yValues);
  }, [props.xValues, props.yValues]);

  return (
    <div>
     {isSmallPhone ? (
        <Plot
          data={[
            {
              x: XValues,
              y: YValues,
              type: 'scatter',
              mode: 'lines+markers',
              line: {
                color: 'green',
                width: 2.5,
              },
              marker: {
                color: 'green',
                size: 1,
              },
              text: XValues.map((date, index) => `Date: ${date}, Price: $${YValues[index]}`),
              hoverinfo: 'text',
              hoverlabel: {
                bgcolor: 'white',
                bordercolor: 'green',
                font: {
                  family: 'Arial',
                  size: 14,
                },
              },
            }
          ]}
          layout={{
            width: 300, // sets the width to 100% of the parent element
            height: 300, // adjust the height to fit on a small phone screen
            title: '$' + props.symbol,
            xaxis: {
              title: 'Date',
              type: 'date'
            },
            yaxis: { title: 'Price $' }
          }}
        />
      ) : isPhone ? (
        <Plot
          data={[
            {
              x: XValues,
              y: YValues,
              type: 'scatter',
              mode: 'lines+markers',
              line: {
                color: 'green',
                width: 2.5,
              },
              marker: {
                color: 'green',
                size: 1,
              },
              text: XValues.map((date, index) => `Date: ${date}, Price: $${YValues[index]}`),
              hoverinfo: 'text',
              hoverlabel: {
                bgcolor: 'white',
                bordercolor: 'green',
                font: {
                  family: 'Arial',
                  size: 14,
                },
              },
            }
          ]}
          layout={{
            width: 380, // sets the width to 100% of the parent element
            height: 380, // adjust the height to fit on a phone screen
            title: '$' + props.symbol,
            xaxis: {
              title: 'Date',
              type: 'date'
            },
            yaxis: { title: 'Price $' }
          }}
        />
      ) :isPhone ? (
        <Plot
          data={[
            {
              x: XValues,
              y: YValues,
              type: 'scatter',
              mode: 'lines+markers',
              line: {
                color: 'green',
                width: 2.5,
              },
              marker: {
                color: 'green',
                size: 1,
              },
              text: XValues.map((date, index) => `Date: ${date}, Price: $${YValues[index]}`),
              hoverinfo: 'text',
              hoverlabel: {
                bgcolor: 'white',
                bordercolor: 'green',
                font: {
                  family: 'Arial',
                  size: 14,
                },
              },
            }
          ]}
          layout={{
            width: 380, // sets the width to 100% of the parent element
            height: 380, // adjust the height to fit on a phone screen
            title: '$' + props.symbol,
            xaxis: {
              title: 'Date',
              type: 'date'
            },
            yaxis: { title: 'Price $' }
          }}
        />
      ) : isMobile ? (
        <Plot
          data={[
            {
              x: XValues,
              y: YValues,
              type: 'scatter',
              mode: 'lines+markers',
              line: {
                color: 'green',
                width: 2.5,
              },
              marker: {
                color: 'green',
                size: 1,
              },
              text: XValues.map((date, index) => `Date: ${date}, Price: $${YValues[index]}`),
              hoverinfo: 'text',
              hoverlabel: {
                bgcolor: 'white',
                bordercolor: 'green',
                font: {
                  family: 'Arial',
                  size: 14,
                },
              },
            }
          ]}
          layout={{
            width: 660, // sets the width to 80% of the parent element
            height: 660, 
            title: '$' + props.symbol,
            xaxis: {
              title: 'Date',
              type: 'date'
            },
            yaxis: { title: 'Price $' }
          }}
        />
      ) : (
        <Plot
          data={[
            {
              x: XValues,
              y: YValues,
              type: 'scatter',
              mode: 'lines+markers',
              line: {
                color: 'green',
                width: 2.5,
              },
              marker: {
                color: 'green',
                size: 1,
              },
              text: XValues.map((date, index) => `Date: ${date}, Price: $${YValues[index]}`),
              hoverinfo: 'text',
              hoverlabel: {
                bgcolor: 'white',
                bordercolor: 'green',
                font: {
                  family: 'Arial',
                  size: 14,
                },
              },
            }
          ]}
          layout={{
            width: 680, // sets the width to 80% of the parent element
            height: 680, 
            title: '$' + props.symbol,
            xaxis: {
              title: 'Date',
              type: 'date'
            },
            yaxis: { title: 'Price $' }
          }}
        />
      )}
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default StockChart;