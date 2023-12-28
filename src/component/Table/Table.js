import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Chart from './Chart.js';
import AddData from './AddData';
import SearchId from './serchedtable';
import Fetch from './Fetch.js';
import TextField from '@material-ui/core/TextField';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Alert as MuiAlert } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';







const Search = styled('div')(({ theme }) => ({

}));

const SmallerDialog = styled(Dialog)`
  max-width: 400px;
  & .MuiDialog-paper {
    margin: 0;
    max-width: unset;
    width: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ButtonGroup = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
`;

const useStyles = makeStyles({
  customTitle: {
    color: 'red',
    '& .MuiTypography-h6': {
      color: 'black', 
    },
  },
});


export default function Table() {
  const [isFetching, setIsFetching] = useState(true);
  const [adddata, setAdd] = useState(false);
  const [search, setSearch] = useState(false);
  const [chart, setchart] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [disabledSearch, setDisabledSearch] = useState(true);  
  const [advdisabledSearch, setadvDisabledSearch] = useState(true);  
  const [open, setOpen] = useState(false);
  const [customerOrderId, setCustomerOrderId] = useState('');
  const [customerOrderIdList, setCustomerOrderIdList] = useState([]);
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerNumberList, setCustomerNumberList] = useState([]);
  const [salesOrg, setSalesOrg] = useState('');
  const [salesOrgList, setSalesOrgList] = useState([]);
  const [isAdvSearch, setFlagAdv] = useState(false);
  const [advSearchPerformed, setAdvSearchPerformed] = useState(false);
  const classes = useStyles();




  const handleFetch = () => {
    setIsFetching(true);
    setSearch(false);
    setAdd(false);
    setchart(false);
    setActiveButton('home');
    setFlagAdv(false)
    setDisabledSearch(true);  
  };

  const handleAddData = () => {
    setAdd(true);
    setSearch(false);
    setIsFetching(false);
    setchart(false);
    setActiveButton('add');
    setFlagAdv(false)
    setDisabledSearch(true);  
  };

  const handleSearch=()=>{
    setSearch(true);
    setAdd(false);
    setIsFetching(false);
    setchart(false);
    setActiveButton('search');
    setDisabledSearch(false);  
    setFlagAdv(false)
  }
const handleSearchEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
};
  const handleAnalyticsView = () => {
    setAdd(false);
    setSearch(false);
    setIsFetching(false);
    setchart(true);
    setActiveButton('analytics');
    setFlagAdv(false)
    setDisabledSearch(true);  
  };



  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearch(false);    
    setDisabledSearch(true);  
    setAdvSearchPerformed(false);  
    handleFetch();  
    
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomerOrderId('');
    setCustomerNumber('');
    setSalesOrg('');
    setCustomerOrderIdList([]);
    setCustomerNumberList([]);
    setSalesOrgList([]);
  };

  const handle_Search = () => {
    setOpen(false);
    if (customerOrderId.trim()) {
      setCustomerOrderIdList((prevList) => [...prevList, customerOrderId.trim()]);
      setCustomerOrderId('');
    }
    if (customerNumber.trim()) {
      setCustomerNumberList((prevList) => [...prevList, customerNumber.trim()]);
      setCustomerNumber('');
    }
    if (salesOrg.trim()) {
      setSalesOrgList((prevList) => [...prevList, salesOrg.trim()]);
      setSalesOrg('');
    }
    setIsFetching(false);
    setSearch(true);
    setAdd(false);
    setchart(false);
    setFlagAdv(true);
    setAdvSearchPerformed(true);
    handleSearch();
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (customerOrderId.trim()) {
        setCustomerOrderIdList((prevList) => [...prevList, customerOrderId.trim()]);
        setCustomerOrderId('');
      }
      if (customerNumber.trim()) {
        setCustomerNumberList((prevList) => [...prevList, customerNumber.trim()]);
        setCustomerNumber('');
      }
      if (salesOrg.trim()) {
        setSalesOrgList((prevList) => [...prevList, salesOrg.trim()]);
        setSalesOrg('');
      }
      setIsFetching(false);
      setSearch(true);
      setAdd(false);
      setchart(false);
      setFlagAdv(true);
    }
  };

  const handleDeleteFilter = (index, type) => {
    if (type === 'orderId') {
      setCustomerOrderIdList((prevList) => prevList.filter((_, i) => i !== index));
    } else if (type === 'number') {
      setCustomerNumberList((prevList) => prevList.filter((_, i) => i !== index));
    } else if (type === 'salesOrg') {
      setSalesOrgList((prevList) => prevList.filter((_, i) => i !== index));
    }
  };
  return (
    <>
    
    <Box>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="left-buttons">
        <style>
    {`
      .btn.active::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: white;
      }
    `}
  </style>
          <Button
            className={`btn ${activeButton === 'home' ? 'active' : ''}`}
            onClick={handleFetch}
            style={{ color: 'white' }}
          >
            Home Page
          </Button>
          <Button
            className={`btn ${activeButton === 'add' ? 'active' : ''}`}
            onClick={handleAddData}
            style={{ color: 'white' }}
          >
            Add Data
          </Button>
          {!disabledSearch && (
          <Button
            className={`btn ${activeButton === 'search' ? 'active' : ''}`}
            style={{ color: 'white' }}
            onClick={handleSearch}
            disabled={disabledSearch}  // Apply disabled status to SEARCH RESULT button
          >
            SEARCH RESULT
          </Button>
          )}
          <Button
            className={`btn ${activeButton === 'analytics' ? 'active' : ''}`}
            onClick={handleAnalyticsView}
            style={{ color: 'white' }}
          >
            Analytics View
          </Button>
        </div>
        <div className="right-buttons" style={{ display: 'flex', alignItems: 'center' }}>
          
          <Search style={{ marginRight: '5px', border:'white', }}>
            <input
              type="text"
              placeholder="Search Customer Order Id"
              style={{ height: '30px',
              width:'200px',
              height:'40px',
              border:'white',
              borderRadius:'4px',
             }}
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={handleSearchEnter}
            />
          </Search>
          <div className="advanced-search">
  
        {searchText || advSearchPerformed ? (
          <Button
            style={{ backgroundColor: '#db4437', width: '99px', height: '42px' }}
             variant="contained"
            onClick={handleClearSearch}
          >
           Clear
          </Button>
             ) : (
        <div>
          <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{ backgroundColor: '#8fd163', width: '99px', height: '42px' }}
          >
        Advanced Search
            </Button>
        </div>
         )}
        </div>

        </div>
      </Toolbar>
      {isFetching && <Fetch />}
      {adddata && <AddData />}
      {search && <SearchId searchOrderId={searchText} list1={customerOrderIdList} list2={customerNumberList} list3={salesOrgList}/>}
      {/* {isAdvSearch && <SearchId list1={customerOrderIdList} list2={customerNumberList} list3={salesOrgList} />} */}
      
      {chart && <Chart/>}

      
      {/* <StickyHeadTable searchOrderId={searchText} /> */}
    </Box>
    <SmallerDialog
        open={open}
        onClose={handleClose}
        style={{
          position: 'absolute',
          top: 'calc(50% - 550px)',
          left: 'calc(100% - 500px)',
        }}
      >
        <DialogTitle className={classes.customTitle}>Advance Search</DialogTitle>

        <DialogContent style={{ paddingRight: '8px' }}>
          <TextField
          id="outlined-textarea"
          variant="outlined"
            label="Customer order ID"
            value={customerOrderId}
            onChange={(e) => setCustomerOrderId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <br />
          <br />
          <TextField
          id="outlined-textarea"
          variant="outlined"
            label="Customer Number"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <br />
          <br />
          <TextField
          id="outlined-textarea"
          variant="outlined"
            label="Sales Org"
            value={salesOrg}
            onChange={(e) => setSalesOrg(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {customerOrderIdList.map((filter, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#f0f0f0',
                padding: '5px',
                margin: '5px 0',
                backgroundColor: 'lightgreen',
                width:'',
                borderRadius:'30px'
              }}
            >
              <Typography variant="body1" color="textSecondary" >
                Customer Order Id {filter}
              </Typography>
              <IconButton
                onClick={() => handleDeleteFilter(index, 'orderId')}
                style={{ marginLeft: 'auto' }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          {customerNumberList.map((filter, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#f0f0f0',
                padding: '5px',
                margin: '5px 0',
                backgroundColor: '#FF7A7A',
                width:'',
                borderRadius:'30px'
              }}
            >
              <Typography variant="body1" color="textSecondary">
                Customer Number {filter}
              </Typography>
              <IconButton
                onClick={() => handleDeleteFilter(index, 'number')}
                style={{ marginLeft: 'auto' }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          {salesOrgList.map((filter, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#f0f0f0',
                padding: '5px',
                margin: '5px 0',
                backgroundColor: '#7A90FF',
                width:'',
                borderRadius:'30px'
              }}
            >
              <Typography variant="body1" color="textSecondary">
                Sales Org {filter}
              </Typography>
              <IconButton
                onClick={() => handleDeleteFilter(index, 'salesOrg')}
                style={{ marginLeft: 'auto' }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </DialogContent>
        <DialogContentText >
          <MuiAlert severity="info" icon={<InfoOutlinedIcon />}>
            Add up to 12 filters. Press Enter after every input.
          </MuiAlert>
        </DialogContentText>
        <DialogActions >
          <ButtonGroup style={{width:'100%',}}>
            <Button variant="outlined" onClick={handle_Search} style={{width:'48%', padding:'10px'}}>
              Search
            </Button>
            <Button variant="outlined" onClick={handleClose} style={{width:'45%', padding:'10px'}}>
              Cancel
            </Button>
          </ButtonGroup>
        </DialogActions>
      </SmallerDialog>
</>
);
}
