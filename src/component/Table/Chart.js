import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Chart() {
  const [distributionChannelValue, setDistributionChannelValue] = useState('');
  const [customerNumberValue, setCustomerNumberValue] = useState('');
  const [chartData, setChartData] = useState(null);

  const distributionChannelData = [
    { title: 'EUR', amount: 100 },
    { title: 'USD', amount: 400 },
    { title: 'UAE', amount: 300 },
    { title: 'INDIA', amount: 1500 },
    { title: 'UK', amount: 800 },
    { title: 'JPY', amount: 600 },
    { title: 'AUD', amount: 200 },
    { title: 'CAD', amount: 250 },
    { title: 'CHF', amount: 350 },
    { title: 'MXN', amount: 180 },
    { title: 'SGD', amount: 550 },
    { title: 'CNY', amount: 700 },
    { title: 'HKD', amount: 320 },
    { title: 'BRL', amount: 400 },
    { title: 'SEK', amount: 270 },
    { title: 'NZD', amount: 180 },
    { title: 'KRW', amount: 480 },
    { title: 'NOK', amount: 310 },
    { title: 'RUB', amount: 420 },
    { title: 'TRY', amount: 390 },
    // Add more distribution channel data here
  ];
  
  const customerData = [
    { customerNumber: 'C001', amount: 500, distributionChannel: 'EUR' },
    { customerNumber: 'C001', amount: 50, distributionChannel: 'USD' },
    { customerNumber: 'C003', amount: 50, distributionChannel: 'EUR' },
    { customerNumber: 'C004', amount: 50, distributionChannel: 'EUR' },
    { customerNumber: 'C005', amount: 50, distributionChannel: 'EUR' },
    { customerNumber: 'C005', amount: 1500, distributionChannel: 'INDIA' },
    { customerNumber: 'C006', amount: 200, distributionChannel: 'UK' },
    { customerNumber: 'C007', amount: 350, distributionChannel: 'JPY' },
    { customerNumber: 'C008', amount: 100, distributionChannel: 'AUD' },
    { customerNumber: 'C009', amount: 180, distributionChannel: 'CAD' },
    { customerNumber: 'C010', amount: 280, distributionChannel: 'CHF' },
    { customerNumber: 'C011', amount: 210, distributionChannel: 'MXN' },
    { customerNumber: 'C012', amount: 420, distributionChannel: 'SGD' },
    { customerNumber: 'C013', amount: 320, distributionChannel: 'CNY' },
    { customerNumber: 'C014', amount: 150, distributionChannel: 'HKD' },
    { customerNumber: 'C015', amount: 480, distributionChannel: 'BRL' },
    { customerNumber: 'C016', amount: 270, distributionChannel: 'SEK' },
    { customerNumber: 'C017', amount: 210, distributionChannel: 'NZD' },
    { customerNumber: 'C018', amount: 390, distributionChannel: 'KRW' },
    { customerNumber: 'C019', amount: 310, distributionChannel: 'NOK' },
    { customerNumber: 'C020', amount: 420, distributionChannel: 'RUB' },
    { customerNumber: 'C021', amount: 550, distributionChannel: 'TRY' },
    // Add more customer data here
  ];

  const handleDistributionChannelChange = (event) => {
    setDistributionChannelValue(event.target.value);
  };

  const handleCustomerNumberChange = (event) => {
    setCustomerNumberValue(event.target.value);
  };

  const handleViewClick = () => {
    // Access the text field values
    console.log('Distribution Channel:', distributionChannelValue);
    console.log('Customer Number:', customerNumberValue);
    generateChartData();
  };

  const generateChartData = () => {
    const filteredCustomerData = customerData.filter(
      (data) =>
        data.distributionChannel === distributionChannelValue &&
        data.customerNumber === customerNumberValue
    );
  
    const chartLabels = filteredCustomerData.map(
      (data) => data.distributionChannel
    );
    const chartAmounts = filteredCustomerData.map(
      (data) => data.amount
    );
  
    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Amount',
          data: chartAmounts,
          backgroundColor: 'rgba(255,165,0,0.6)', // RGB code for orange
          borderColor: 'rgba(255,165,0,1)', // RGB code for orange
          borderWidth: 1,
        },
      ],
    };
    
  
    setChartData(chartData);
  };

  useEffect(() => {
    generateChartData();
  }, []);
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Disable x-axis gridlines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Disable y-axis gridlines
        },
      },
    },
  };

  return (
    <div className='main' style={{display: 'flex'}}>
    <div
      className='filter'
      style={{
        width: '20%',
        margin: '1%',
        border: '1px solid white',
        borderRadius: '5px',
        padding: '8px',
      }}
    >
        <TextField
  label='Distribution Channel'
  id='filled-size-normal'
  value={distributionChannelValue}
  onChange={handleDistributionChannelChange}
  variant='filled'
  InputProps={{ // add this prop
    style: {
      backgroundColor:'white',
    }
  }}
  style={{
    backgroundColor: 'white',
    backgroundColor:'white',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '5px',
  }}
/>

<TextField
  label='Customer Number'
  id='filled-size-normal'
  value={customerNumberValue}
  onChange={handleCustomerNumberChange}
  variant='filled'
  InputProps={{ // add this prop
    style: {
      backgroundColor:'white',
    }
  }}
  style={{
    backgroundColor: 'white',
    color: 'white',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '5px',
  }}
/>

        <Button
          variant='outlined'
          style={{
            width: '100%',
            borderRadius: '5px',
            border: '1px solid white',
            color: 'white',
          }}
          onClick={handleViewClick}
        >
          View
        </Button>
        </div>
    {chartData && (
      <div className='chart'>
        <Bar
          data={chartData}
          
          options={chartOptions}
        />
      </div>
    )}
  </div>
);
}