import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './Table.css';

function Table() {
  const [packages, setPackages] = useState([]);

  function getResults() {
    fetch('/allstatus')
      .then((response) => response.json())
      .then((response) => {
        setPackages(response.statusArr);
      });
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div className="grid">
        <div className="grid-row">
          <div className="grid-column-4">Name</div>
          <div className="grid-column-4">Postcode</div>
          <div className="grid-column-4">Cluster</div>
          <div className="grid-column-4">Status</div>
        </div>
        {packages.length
          ? packages.map((item) => (
              <div key={nanoid(5)} className="grid-row">
                <div key={nanoid(5)} className="grid-column-4">
                  {item.voucher}
                </div>
                <div key={nanoid(5)} className="grid-column-4">
                  {item.postcode}
                </div>
                <div key={nanoid(5)} className="grid-column-4">
                  {item.cluster_name}
                </div>
                <div key={nanoid(5)} className="grid-column-4">
                  {item.status}
                </div>
              </div>
            ))
          : null}
      </div>
      <button className="refresh-button" type="button" onClick={getResults}>
        Refresh Status
      </button>
    </>
  );
}

export default Table;
