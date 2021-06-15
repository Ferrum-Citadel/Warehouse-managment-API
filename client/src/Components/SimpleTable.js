import { useEffect, useState } from 'react';
// import { nanoid } from 'nanoid';
import './SimpleTable.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function SimpleTable() {
  const [packages, setPackages] = useState([]);
  const [message, setMessage] = useState([]);

  // Returns all database data
  function getResults() {
    fetch('/all')
      .then((response) => response.json())
      .then((response) => {
        setPackages(response.statusArr); //Set api response into state
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //We fetch package state every second
  useEffect(() => {
    getResults();
    const refresh = setInterval(getResults, 1000);
    return () => clearInterval(refresh);
  }, []);

  // Sets Package enRoute
  const handleEnRoute = (voucher) => {
    fetch(`/enroute/${voucher}`, { method: 'PUT' })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          setMessage(voucher + ' -' + response.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Sets Package delivered
  const handleDelivered = (voucher) => {
    fetch(`/delivered/${voucher}`, { method: 'PUT' })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          setMessage(voucher + ' -' + response.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleReset = () => {
    fetch(`/reset`, { method: 'DELETE' }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Voucher</TableCell>
              <TableCell align="right">Postcode</TableCell>
              <TableCell align="right">Cluster</TableCell>
              <TableCell align="center"> Package Status</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="center"> Driver Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((row) => (
              <TableRow key={row.voucher} hover="true">
                <TableCell component="th" scope="row">
                  {row.voucher}
                </TableCell>
                <TableCell align="right">{row.postcode}</TableCell>
                <TableCell align="right">{row.cluster_name}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="right">{row.driver}</TableCell>
                <TableCell align="center">{row.driver_status}</TableCell>

                <TableCell align="center">
                  <Button
                    aria-label="edit"
                    onClick={() => handleEnRoute(row.voucher)}
                  >
                    Set Enroute
                  </Button>
                  <Button
                    aria-label="edit"
                    onClick={() => handleDelivered(row.voucher)}
                  >
                    Set Delivered
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p>{message}</p>
      </TableContainer>
      <Button
        variant="outlined"
        type="button"
        color="primary"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  );
}

export default SimpleTable;
