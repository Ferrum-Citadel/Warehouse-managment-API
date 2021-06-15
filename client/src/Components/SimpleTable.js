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

  function getResults() {
    fetch('/allstatus')
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

  const handleEdit = (values) => {
    console.log('The Values that you wish to edit ', values);
  };

  // return (
  //   <>
  //     <div className="grid">
  //       <div className="grid-row">
  //         <div className="grid-column-title">Voucher</div>
  //         <div className="grid-column-title">Postcode</div>
  //         <div className="grid-column-title">Cluster</div>
  //         <div className="grid-column-title">Driver</div>
  //         <div className="grid-column-title">Status</div>
  //       </div>
  //       {packages.length
  //         ? packages.map((item) => (
  //             <div key={nanoid(5)} className="grid-row">
  //               <div key={nanoid(5)} className="grid-column-4">
  //                 {item.voucher}
  //               </div>
  //               <div key={nanoid(5)} className="grid-column-4">
  //                 {item.postcode}
  //               </div>
  //               <div key={nanoid(5)} className="grid-column-4">
  //                 {item.cluster_name}
  //               </div>
  //               <div key={nanoid(5)} className="grid-column-4">
  //                 {item.driver}
  //               </div>
  //               <div key={nanoid(5)} className="grid-column-4">
  //                 {item.status}
  //               </div>
  //             </div>
  //           ))
  //         : null}
  //     </div>
  //     {/* <button className="refresh-button" type="button" onClick={getResults}>
  //       Refresh Status
  //     </button> */}
  //   </>
  // );

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Voucher</TableCell>
              <TableCell align="right">Postcode</TableCell>
              <TableCell align="right">Cluster</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="center">Status</TableCell>
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
                <TableCell align="right">{row.driver}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <Button aria-label="edit" onClick={() => handleEdit(1)}>
                    Edit
                  </Button>
                  <Button aria-label="edit" onClick={() => handleEdit(1)}>
                    Edit
                  </Button>
                  <Button aria-label="edit" onClick={() => handleEdit(1)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SimpleTable;
