import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; // <-- Import Button from Material UI
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '12px',
      backgroundColor: 'white',
      borderRadius:'5px',
    },
  },
  submitButton: { 
    margin: theme.spacing(1),
    width:'50%',
    fontSize: '16px', 
    
    backgroundColor: '#fc7500', 
    color: 'white', 
    '&:hover': {
      backgroundColor: '#303f9f'
    },
  },
  clearButton: {
    margin: theme.spacing(1),
    width:'47%',
    fontSize: '16px',
    backgroundColor: '#FF0909', 
    color: 'white', 
    '&:hover': {
      backgroundColor: '#fc7500'
    },
  },
}));

export default function AddData() {
  const classes = useStyles();

  // Initialize state
  const [data, setData] = useState({
    slNo: 0,
    customerOrderId: "",
    salesOrg: 0,
    distributionChannel: "",
    companyCode: "",
    orderCreationDate: "",
    orderCurrency: "",
    customerNumber: "",
    amountInUsd: 0,
    orderAmount: 0
  });

  // Handle input change
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/h2h_milestone_3/AddServlet', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      toast.success("Data added successfully!");
    } catch (error) {
      console.error("Error posting data", error);
      toast.error("Failed to add data.");
    }
  };

  // Handle clear form
  const handleClear = () => {
    setData({
      slNo: 0,
      customerOrderId: "",
      salesOrg: 0,
      distributionChannel: "",
      companyCode: "",
      orderCreationDate: "",
      orderCurrency: "",
      customerNumber: "",
      amountInUsd: 0,
      orderAmount: 0
    });
  };
  
  return (
    <div style={{width:'100%'}}>
    <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField name="customerOrderId" label="Customer Order Id" value={data.customerOrderId} onChange={handleChange} style={{width: '24%',}}/>
      <TextField name="salesOrg" label="Sales Org"  value={data.salesOrg} onChange={handleChange} style={{width: '24%',}}/>
      <TextField name="distributionChannel" label="Distribution Channel"  value={data.distributionChannel} onChange={handleChange} style={{width: '46%',}}/>
      <TextField name="customerNumber" label="Customer Number"  value={data.customerNumber} onChange={handleChange}style={{width: '24%',}} />
      <TextField name="companyCode" label="Company Code"  value={data.companyCode} onChange={handleChange} style={{width: '24%',}}/>
      <TextField name="orderCurrency" label="Order Currency"  value={data.orderCurrency} onChange={handleChange} style={{width: '14%',}}/>
      <TextField name="amountInUsd" label="Amount in USD"  value={data.amountInUsd} onChange={handleChange} style={{width: '14%',}} />
      <TextField
        name="orderCreationDate"
        label="Order Creation Date"
        type="date"
        value={data.orderCreationDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{width: '14%',}}
      />
     <Button variant="contained" className={classes.submitButton} type="submit">Submit</Button>
      <Button variant="contained" className={classes.clearButton} onClick={handleClear}>Clear</Button>
    </form>
    </div>

  );
}