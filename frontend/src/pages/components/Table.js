import React, { useEffect, Component } from 'react';
import MaterialTable from 'material-table';

class Table extends Component {

  constructor() {
    super()
    this.state = {
      col: [
        { title: 'ReserveID', field: 'RESERVED_ID' },
        { title: 'CustomerID', field: 'CUSTOMER_ID' },
        { title: 'Check In Date', field: 'CHECKIN_DATE' },
        { title: 'Check Out Date', field: 'CHECKOUT_DATE' },
        { title: 'Stay Night', field: 'STAY_NIGHT' },
        {
          title: 'Status',
          field: 'RESERVE_STATUS',
        },
      ],
      data: [

      ],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };
    this.getDataFromDb = this.getDataFromDb.bind(this)

  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb() {
    fetch("http://localhost:4000/payedroom")
      .then(res => res.json())
      .then(res => {
        const data = res.data
        this.setState({
          data
        })
      })
  };

  // our put method that uses our backend api
  // to create new query into our data base
  postDataToDB = (data) => {
    console.log(data)
    try {
      fetch('http://localhost:4000/payedroom', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.log(error)
    }

  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (oldData) => {
    try {

    } catch (error) {
      console.log(error)
    }

  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = async (data) => {
    try {
      await fetch('http://localhost:4000/payedroom', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const aa = await fetch('http://localhost:4000/roomhistoryid')
        .then(response => response.json())
      
      var data2 = data;
      data2.ROOM_ID = (parseInt(aa.data[0].ROOM_ID)+1).toString();
      console.log("aaa",aa)
      console.log("data2",data2)

      await fetch('http://localhost:4000/roomhistory', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data2)
      })
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={this.state.col}
          data={this.state.data}
          title="Assign Room"
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.push(newData);
                  this.setState({ ...this.state, data });
                  this.postDataToDB(newData)
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ ...this.state, data });
                  console.log(newData)
                  this.updateDB(newData)
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({ ...this.state, data });
                  console.log("old data", oldData)
                  this.deleteFromDB(oldData)
                }, 600);
              }),
          }}
        />
      </div>
    );
  }
}

export default Table