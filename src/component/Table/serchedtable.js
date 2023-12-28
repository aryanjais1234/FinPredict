import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import 'react-toastify/dist/ReactToastify.css'; 


const columns = [
  { id: 'slNo', label: 'Sl No', minWidth: 100 },
  { id: 'customerOrderId', label: 'CUSTOMER ORDER ID', minWidth: 170 },
  { id: 'salesOrg', label: 'SALES ORG', minWidth: 100 },
  { id: 'distributionChannel', label: 'DISTRIBUTION CHANNEL', minWidth: 100 },
  { id: 'companyCode', label: 'COMPANY CODE', minWidth: 100 },
  { id: 'orderCreationDate', label: 'ORDER_CREATION DATE', minWidth: 100 },
  { id: 'orderCurrency', label: 'ORDER CURRENCY', minWidth: 100 },
  { id: 'customerNumber', label: 'CUSTOMER NUMBER', minWidth: 100 },
  { id: 'amountInUsd', label: 'AMOUNT IN USD', minWidth: 100, align: 'right' },
  { id: 'orderAmount', label: 'ORDER AMOUNT', minWidth: 100, align: 'right' },
];

const CustomPaginationActions = ({
  handleDeleteClick,
  handleEditClick,
  refreshData,
  page,
  rowsPerPage,
  totalRows,
  handleChangePage,
  handleChangeRowsPerPage,
  handlePredictClick,
  selected

}) => {
  const isDisabled = selected.length === 0;
  const isDisabledEdit=selected.length !==1;
  return (
    <Box
      style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Button
        variant="contained"
        onClick={refreshData}
        style={{ backgroundColor: '#fc7500', color: 'white', marginLeft:'8px' }}
      >
        Refresh Data
      </Button>
      <Button
        variant="contained"
         onClick={handleEditClick}
         disabled={isDisabled}
         style={{ backgroundColor: isDisabledEdit ? '#666' : '#fc7500', color: 'white', marginLeft:'1px' }}
 
      >
  Edit
      </Button>
      <Button
        variant="contained"
        onClick={handleDeleteClick}
        disabled={isDisabled}
        style={{ backgroundColor: isDisabled ? '#666' : '#fc7500', color: 'white', marginLeft:'1px' }}

      >
        Delete
      </Button>
      <Button
        variant="contained"
        onClick={handlePredictClick} // Add the predict click handler
        disabled={isDisabled}
        style={{ backgroundColor: isDisabled ? '#666' : '#fc7500', color: 'white', marginLeft:'1px' }}

      >
        Predict
      </Button>
      <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    style={{
      backgroundColor: '#8fd163',
      color: 'white',
      borderRadius: '25px',
      padding: '10px',
      marginLeft: '1rem'
    }}
  >
     {totalRows} record(s) found
  </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '1rem',
          color: 'white',
        }}
      />
    </Box>
  );
};

const useStyles = makeStyles({
  customTitle: {
    color: 'red',
    '& .MuiTypography-h6': {
      color: 'black', // Add your desired color here
    },
  },
  editButton:{
    width:'48%',
    border:'1px solid black'
  },
  cancelButton:{
    width:'48%',
    border:'1px solid black'
  },
});



export default function SearchId({ searchOrderId,list1,list2,list3}) {
 
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const classes = useStyles();
  


  let customerorderids = list1.join(',');
  let customernumber = list2.join(',');
  let salesorg = list3.join(',');

  const fetchData = () => {
    setRows([]); // Clear the rows state
    setSelected([]); // Clear the selected state
    let url = "http://localhost:8081/h2h_milestone_3";
    if (searchOrderId !== '') {
      url += `/search?customer_order_ids=${searchOrderId}`;
    }
else if (searchOrderId==''&& (list1!== ''|| list2 !== '' || list3!== '')) {
   url += `/AdvanceSearch?customerOrderIds=${customerorderids}&customerNumbers=${customernumber}&salesOrgs=${salesorg}`;
}
else{
  console.log("please provide input ");
}
    axios
      .get(url)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          slNo: item.slNo,
          customerOrderId: item.customerOrderId,
          salesOrg: item.salesOrg,
          distributionChannel: item.distributionChannel,
          companyCode: item.companyCode,
          orderCreationDate: item.orderCreationDate,
          orderCurrency: item.orderCurrency,
          customerNumber: item.customerNumber,
          amountInUsd: item.amountInUsd,
          orderAmount: item.orderAmount,
        }));
        setRows(formattedData);
      })
      .catch((err) => console.error(err));
};

  useEffect(() => {
    fetchData();
  }, [searchOrderId]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (selected.length >= 1) {
      setSelected([]);
    } else {
      const newSelecteds = rows.map((n) => n.slNo);
      setSelected(newSelecteds);
    }
  };

  const handleClick = (event, slNo) => {
    const selectedIndex = selected.indexOf(slNo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, slNo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const totalRows = rows.length;

   const deleteRows = () => {
    const slNosStr = selected.join(',');
    axios
      .get(`http://localhost:8081/h2h_milestone_3/DeleteServlet?Sl_nos=${slNosStr}`)
      .then((response) => {
        console.log(response.data);
        toast.success('Delete successfully! , Refreshing', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteClick = () => {
    if (selected.length > 0) {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    deleteRows();
    setDialogOpen(false);
  };
// Introduce new state variables for each TextField
const [orderCurrency, setOrderCurrency] = useState("");
const [companyCode, setCompanyCode] = useState("");
const [distributionChannel, setDistributionChannel] = useState("");
const handleEditClick = () => {
  if (selected.length === 1) {
    const selectedIndex = rows.findIndex((row) => row.slNo === selected[0]);
    const selectedRow = rows[selectedIndex];
    // update each state to match the corresponding field in the selected row
    setOrderCurrency(selectedRow.orderCurrency);
    setCompanyCode(selectedRow.companyCode);
    setDistributionChannel(selectedRow.distributionChannel);

    setEditRow(selectedRow);
    setEditDialogOpen(true);
  }
};

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogConfirm = () => {
    const updatedRow = {
      ...editRow,
      
      orderCurrency,
      companyCode,
      distributionChannel,
    };
  
  
    axios
      .post('http://localhost:8081/h2h_milestone_3/EditServlet', updatedRow)
      .then((response) => {
        console.log(response.data);
        toast.success('Update successfully! , Refreshing', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      
        fetchData();
      })
      .catch((err) => console.error(err));
  
    setEditDialogOpen(false);
  };
  const theme = createTheme({
    palette: {
      secondary: {
        main: '#FFA500',  // hex value for orange color
      },
    },
  });
  

  const handlePredictClick = () => {
    if (selected.length > 0) {
      // Prepare the selected row data to send to the Flask API
      const selectedRowData = selected.map((selectedRow) => {
        const rowData = rows.find((row) => row.slNo === selectedRow);
        return {
          Sl_no: rowData.slNo,
          CUSTOMER_ORDER_ID: rowData.customerOrderId,
          SALES_ORG: rowData.salesOrg,
          DISTRIBUTION_CHANNEL: rowData.distributionChannel,
          COMPANY_CODE: rowData.companyCode,
          ORDER_CREATION_DATE: rowData.orderCreationDate,
          ORDER_CURRENCY: rowData.orderCurrency,
          CUSTOMER_NUMBER: rowData.customerNumber,
          amount_in_usd: rowData.amountInUsd,
          ORDER_AMOUNT: rowData.orderAmount,
        };
      });
  
      // Send the selected row data to the Flask API
      
     
      axios
        .post('http://localhost:5050/predict', selectedRowData)
        .then((response) => {
          // Get predictions from the response
          const predictions = response.data.Predictions;
      
          // Convert the predictions to an array of strings in the format 'Sl_no=amount_in_usd'
          const predictionStrings = Object.entries(predictions).map(
            ([Sl_no, amount_in_usd]) => `${Sl_no}=${amount_in_usd}`
          );
      
          // Join the array of strings into one string separated by commas
          const predictionCSV = predictionStrings.join(',');
      
          return axios.post('http://localhost:8081/h2h_milestone_3/PredictionServlet', predictionCSV, {
            headers: {
              'Content-Type': 'text/plain'
            }
          })
          
        })
        .then((servletResponse) => {
          // Handle the servlet response if necessary
          console.log(servletResponse);
          toast.success('Prediction  successfully! , Refreshing', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchData();
        })
        .catch((error) => {
          // Handle any errors that occurred during the requests
          console.error(error);
          console.log(selectedRowData);
      
          // Show an error toast
          toast.error('Error sending data.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Paper style={{ width: '100%', overflow: 'hidden', backgroundColor: 'grey' }}>
      <TableContainer style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ backgroundColor: 'grey' }}>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < totalRows}
                checked={totalRows > 0 && selected.length === totalRows}
                onChange={handleSelectAllClick}
                color="secondary"
                style={{ color: selected.length > 0 ? '#FFA500' : 'white' }}
              />

              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: 'grey', fontWeight: 800, color: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const isItemSelected = selected.indexOf(row.slNo) !== -1;
              const labelId = `enhanced-table-checkbox-${row.slNo}`;

              return (
                <TableRow
                  onClick={(event) => handleClick(event, row.slNo)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.slNo}
                  selected={isItemSelected}
                  style={{ backgroundColor: isItemSelected ? '#cccc' : 'inherit' }}
                >
                  <TableCell padding="checkbox">
                <Checkbox
                    color="secondary"
                    checked={isItemSelected}
                    inputProps={{
                     'aria-labelledby': labelId,
                   }}
                    style={{ color: isItemSelected ? '#FFA500' : 'white' }}
                />

                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{ color: 'white' }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPaginationActions
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        refreshData={fetchData}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handlePredictClick={handlePredictClick}
        selected={selected}

      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle> Delete Records?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete these record[s]?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="contained"
          className={classes.editButton}
        
        style={{ backgroundColor: 'white', color: 'black' }}
      >
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm}variant="contained"
          className={classes.editButton}
        style={{ backgroundColor: 'white', color: 'black' }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
      <DialogTitle className={classes.customTitle}>Edit</DialogTitle> 
      <DialogContent 
        style={{ paddingRight: '8px' }} 
      > 
        <TextField
        id="outlined-uncontrolled"
        variant="outlined" 
          label="ORDER CURRENCY" 
          value={orderCurrency} 
          onChange={(e) => setOrderCurrency(e.target.value)} 
          style={{width:'48%',}} 
        /> 
        <TextField
        id="outlined-uncontrolled"
        variant="outlined"
          label="COMAPNY CODE" 
          value={companyCode} 
          onChange={(e) => setCompanyCode(e.target.value)}
          style={{width:'48%', margin:'0px 0px 0px 5px'}} 
        />
        <br /> 
        <br /> 
        <TextField
        id="outlined-uncontrolled"
        variant="outlined"
          label="DISTRIBUTION CHANNEL" 
          value={distributionChannel} 
          onChange={(e) => setDistributionChannel(e.target.value)} 
          style={{width:'97%', }} 
        /> 
      </DialogContent>
      <DialogActions>
      <Button variant="outlined" onClick={handleEditDialogConfirm}  autoFocus className={classes.editButton}>
          EDIT
        </Button>
        <Button variant="outlined" onClick={handleEditDialogClose} className={classes.cancelButton} >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
</Paper>
</ThemeProvider>
);
}