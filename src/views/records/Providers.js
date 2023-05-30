import React, { useEffect, useState} from 'react'
import './PatientInfo.css';
import 'antd/dist/antd.css';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LoadingOverlay from 'react-loading-overlay';
import { CSpinner } from '@coreui/react'
import "./patients.css"; 

import Prow from './Prow';
export default function ProviderInform() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.35),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      },
      margin: '10px',
      float: 'right',
      boxShadow: '-4px 8px 20px 0px grey',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '98%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100px',
      [theme.breakpoints.up('sm')]: {
        width: '100ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const [data, setdata] = React.useState([]);
  const [collapsed, setcollapsed] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState('');
  const [page, setpage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordPlaced, setordPlaced] = React.useState(10);
  const [isLoading, setisLoading] = useState(true);

  const uniqueProviderCode = [] 

  const classes = useStyles();

  const StyledTableCell = withStyles((theme) => ({
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  };
  function toggle() {
    setcollapsed(!collapsed)
  };

  const fetchproviderdata = () => {
    var requestOptions = {
      method: 'GET'
    };
    
    fetch("https://providerdataupdated-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .then((response) => 
      {
        const uniqueData = removeDuplicates(response);
        const sortedData = sortData(uniqueData);
        setdata(sortedData);
        setisLoading(false)
      })
      .catch(error => console.log('error', error));
    }
    useEffect(() => { 
      fetchproviderdata();
    },[data != null])

    const removeDuplicates = (response) => {
      const uniqueData = [];
      const map = new Map();
      for (const item of response) {
        if (!map.has(item.Provider_id + item.Practitioner_id)) {
          map.set(item.Provider_id + item.Practitioner_id, true);
          uniqueData.push(item);
        }
      }
    return uniqueData;}

    const sortData = (response) => {
      const sortedData = response.sort((a, b) => {
        if (a.Provider_name < b.Provider_name) {
          return -1;
        }
        if (a.Provider_name > b.Provider_name) {
          return 1;
        }
        if (a.Practitioner_name < b.Practitioner_name) {
          return -1;
        }
        if (a.Practitioner_name > b.Practitioner_name) {
          return 1;
        }
        return 0;
      });
      return sortedData;
    };
    
    return (
      <>
        <h2 className="title"><strong>Provider Details</strong></h2>
          <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by Code..."
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
                onChange={(e)=>{setsearchTerm(e.target.value)}}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          <TableContainer style={{ maxHeight: 300 }}>
          
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                <StyledTableCell/>
                <StyledTableCell style={{ fontWeight: 'bold', width: '28%', textAlign: 'center'}}>Name</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '28%', textAlign: 'center'}}>Code</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '28%', textAlign: 'center'}}>Address</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold', width: '16%'}}>Contact Number</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.filter(val => {
                  if(searchTerm === "")
                  {
                    return val;
                  }
                  else if((val.Condition_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.practitioner_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Condition_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Practitioner_Speciality_1.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Practitioner_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Practitioner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Provider_address.toLowerCase().includes(searchTerm.toLowerCase()))||
                  (val.Provider_id.toLowerCase().includes(searchTerm.toLowerCase()))||
                  (val.Provider_name.toLowerCase().includes(searchTerm.toLowerCase()))
                ) {
                  return val        
                }
              }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((prow, index) => {
                  if (!uniqueProviderCode.includes(prow.Provider_id)){
                    uniqueProviderCode.push(prow.Provider_id)
                    return (
                      <React.Fragment>
                        <Prow key={prow.Provider_id} prow={prow} data={data}/>
                      </React.Fragment>
                    );
                  }
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       {/* {isLoading && 
      <div style={{textAlign:'center'}}>
        <CSpinner color="primary" variant="grow"/>
        <CSpinner color="secondary" variant="grow"/>
        <CSpinner color="success" variant="grow"/>
        <CSpinner color="danger" variant="grow"/>
        <CSpinner color="warning" variant="grow"/>
        <CSpinner color="info" variant="grow"/>
        <CSpinner color="primary" variant="grow"/>
        <CSpinner color="dark" variant="grow"/>
      </div>
      } */}
      <LoadingOverlay
						active={isLoading}
						spinner
						text='Loading the content...'
						styles={{
							height: "100%",
							spinner: (base) => ({
								...base,
								width: '50px',
								'& svg circle': {
									stroke: 'rgba(255, 0, 0, 0.5)'
								}
							})
						}}
					>
					</LoadingOverlay>
      {/* </Content> */}
    </>
    // </Layout>
  )
}