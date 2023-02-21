
import React , {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Layout, Menu, Input} from 'antd';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles,alpha ,withStyles} from '@material-ui/core/styles';
import LoadingOverlay from 'react-loading-overlay';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import "../records/patients.css"; 

export default function Device() {
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
      float : 'right',
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
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
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
      // const classes = useStyles();
      const [data, setdata]=React.useState([]);
      const [searchTerm, setsearchTerm] = React.useState('');
      const [isLoading, setisLoading] = useState(true);
      const [page, setpage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const classes = useStyles();

      const fetchpatientdata = () => {
        console.log("check function")
  
        var requestOptions = {
          method: 'GET'
        };
  
        fetch("https://device-sh4iojyb3q-uc.a.run.app/", requestOptions)
        .then((resp) => resp.json())
        .then((response) => {
          setdata(response)
          console.log(data)
          setisLoading(false)
          // console.log( eval(JSON.stringify(data)));
        })
        .catch(error => console.log('error', error));
      }

      useEffect(() => {   
        fetchpatientdata();
      },[])

    const displayCheckedBox = (row) => {
      console.log("--------------row")
      console.log(row);
        if(row.RemoteCareStatus)//change the logic here
        // if(row) 
        {
          return (
            <>
            <FormControlLabel disabled control={<Checkbox checked name="checkedEvent" style={{color:'#1890ff'}}/>}/>
            </>
          )
        }
        else{
          return(
            <FormControlLabel disabled control={<Checkbox name="checkedEvent" />}/>
          )
        }
    }   

    return (
      <>
        {/* <Layout style={{backgroundColor:'black'}}> */}
        <h2 className="title"><strong>Device Information</strong></h2>
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
                <TableRow style={{ padding: '0px' }}>
                {/* <TableCell align="center" style={{ fontWeight: 'bold'}}>Id</TableCell> */}
                <TableCell style={{fontWeight: 'bold', textAlign:'center'}}>Device ID</TableCell>
                <TableCell style={{fontWeight: 'bold', textAlign:'center'}}>Device Name</TableCell>
                <TableCell style={{fontWeight: 'bold', textAlign:'center'}}>Patient Name</TableCell>
                <TableCell style={{fontWeight: 'bold', width:'15%', textAlign:'center'}}>Device Value</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign:'center'}}>Message</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign:'center'}}>DateTime</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {data.filter(val=>{
                  if(searchTerm === "")
                  {
                    return val;
                  }
                  else if((val.s.device_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.s.device_value.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.s.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.s.send_time.toLowerCase().includes(searchTerm.toLowerCase()))
                ) {
                  return val
                }
              }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.Patient_id}>
                  <StyledTableCell style={{textAlign:'center'}}>{row.s.device_id}</StyledTableCell>
                  <StyledTableCell style={{textAlign:'center'}}>Blood-Oxygen Monitor</StyledTableCell>
                  <StyledTableCell style={{textAlign:'center'}}>{row.Full_name}</StyledTableCell>
                  <StyledTableCell style={{textAlign:'center'}}>{row.s.device_value}</StyledTableCell>
                  <StyledTableCell style={{textAlign:'center'}}>{row.s.message}</StyledTableCell>
                  <StyledTableCell style={{textAlign:'center'}}>{row.s.send_time}</StyledTableCell>
                </TableRow>
                ))}
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
    </>
        // {/* </Layout> */}
    )
    
}
