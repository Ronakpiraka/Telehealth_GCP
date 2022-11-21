import React, {useEffect } from 'react'
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
import { alpha} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Prow from './prow';
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
          width: '100px',
          [theme.breakpoints.up('sm')]: {
            width: '100ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
      const [data, setdata]=React.useState([]);
      const [collapsed, setcollapsed]=React.useState(false);
      const [searchTerm, setsearchTerm]=React.useState('');
      const [page, setpage]=React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [ordPlaced, setordPlaced]=React.useState(10);
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
    function toggle(){
      setcollapsed(!collapsed)
    };
    const fetchproviderdata = () => {
      var requestOptions = {
        method: 'GET'
      };
      fetch("https://providerdata-sh4iojyb3q-uc.a.run.app", requestOptions)
      .then((resp) => resp.json())
      .then((response) => {
        setdata(response)
        console.log(data)
      })
      .catch(error => console.log('error', error));
    }
    useEffect(() => { 
      fetchproviderdata();
    },[])
    
    return (
      <>
            <p style={{fontSize:'22px', textAlign:'center'}}><strong>Provider Details</strong></p>
          <Paper>
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
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{ padding: '0px' }}>
                <TableCell/>
                <TableCell style={{ fontWeight: 'bold', width:"25%"}}>Provider Code</TableCell>
                <TableCell style={{ fontWeight: 'bold', width:"27%"}}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', width:"32%"}}>Address</TableCell>
                <TableCell style={{ fontWeight: 'bold', width:"15%"}}>Contact Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.filter(val=>{
                  if(searchTerm === "")
                  {
                    return val;
                  }
                  else if((val.Provider_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Provider_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Provider_Address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Practitioner_name.toLowerCase().includes(searchTerm.toLowerCase()))||
                  (val.Provider_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (val.Practitioner_Email.toLowerCase().includes(searchTerm.toLowerCase()))
                  ){
                     return val  
                  }
                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((prow, index) => {
                    return(
                      <Prow key={prow.Provider_code} prow={prow} />
                    );
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
         {/* </Content> */}
         </>
        // </Layout>
    )
}