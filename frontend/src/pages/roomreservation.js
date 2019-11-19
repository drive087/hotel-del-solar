import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
class Roomreservation extends Component {

    constructor(props) {
        super(props);
        // this.state = {count: props.initialCount};
        this.getReservationdelete = this.getReservationdelete.bind(this);
        this.getReservation = this.getReservation.bind(this);
        this.createData = this.createData.bind(this);
    }


    state = {
        reservation: []
    }
    /////////////////////////////////MATERAIL UI///////////////////////////////////////////////

    useStyles = makeStyles({
        root: {
          width: '100%',
          overflowX: 'auto',
        },
        table: {
          minWidth: 650,
        },
        
      });
      
      useStyles2 = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        input: {
          display: 'none',
        },
      }));


    createData(RESERVED_ID,CHECKIN_DATE,CHECKOUT_DATE,CUSTOMER_ID,STAY_NIGHT) {
        return {RESERVED_ID,CHECKIN_DATE,CHECKOUT_DATE,CUSTOMER_ID,STAY_NIGHT };
      }
      
    rows = [
  
        
      ];



    ////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        this.getReservation();
    }

    getReservation = _ => {
        fetch('http://localhost:4000/roomreservation')
            .then(response => response.json())
            .then(response => this.setState({ reservation: response.data }))
            // .then(response => this.rows.push(createData(response.data))
            .catch(err => console.error(err))
    }



    getReservationdelete = (cusid) => {
         fetch(`http://localhost:4000/roomreservationdelete?cusid=${cusid}`)
            .then(window.location.reload())
            
         
    }
    getReservationpayed = (cusid) => {

        fetch(`http://localhost:4000/roomreservationpayed?cusid=${cusid}`)
        .then(window.location.reload())
    }
    //onclick={this.getReservationdelete(CUSTOMER_ID).bind(this)}
  

    render() {
        const { reservation } = this.state;
        const classes = this.useStyles;
        const classes2 = this.useStyles2;
        this.rows =  reservation ;
        console.log(reservation)
        console.log(this.rows)

        return (
            //{reservation.map(this.renderReservation)}
            //<TableCell align="right">{row.calories}</TableCell>
            
            <div>
            
                
                
                <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ReservedID</TableCell>
            <TableCell>Check-in</TableCell>
            <TableCell>Check-out</TableCell>
            <TableCell>CustomerID</TableCell>
            <TableCell>Night</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.rows.map(row => (
            <TableRow >
              
              <TableCell align="left">{row.RESERVED_ID}</TableCell>
              <TableCell align="left">{row.CHECKIN_DATE}</TableCell>
              <TableCell align="left">{row.CHECKOUT_DATE}</TableCell>
              <TableCell align="left">{row.CUSTOMER_ID}</TableCell>
              <TableCell align="left">{row.STAY_NIGHT}</TableCell>
              <Button align="center" variant="contained" color="primary" onClick={() => this.getReservationpayed(row.CUSTOMER_ID)}>Billing</Button>
              <Button align="center" variant="contained" color="secondary" onClick={() => this.getReservationdelete(row.CUSTOMER_ID)} > Cancel</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    
            </div >
            
        )
    }
}
export default Roomreservation;


