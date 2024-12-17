import React, { useState } from "react";
import { customerData, shipmentTypes, branches } from "../../constants";
import "./Global.css";

function Global() {
  const [filters, setFilters] = useState({
    shipmentType: "All",
    branch: "All",
  });

  const [filteredData, setFilteredData] = useState(customerData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilter = () => {
    const { shipmentType, branch } = filters;

    const filtered = customerData.filter((data) => {
      const isShipmentTypeMatch =
        shipmentType !== "All" ? data.shipmentType === shipmentType : true;
      const isBranchMatch = branch !== "All" ? data.branch === branch : true;

      return isShipmentTypeMatch && isBranchMatch;
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilters({
      shipmentType: "All",
      branch: "All",
    });
    setFilteredData(customerData);
  };

  return (
    <div>
      <div>
        <label>
          Shipment Type:
          <select
            name="shipmentType"
            value={filters.shipmentType}
            onChange={handleChange}
          >
            {shipmentTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Branch:
          <select name="branch" value={filters.branch} onChange={handleChange}>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {filteredData.length === 0 ? (
        <h2>No data to display for this particular selection</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Shipment Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.branch}</td>
                <td>{data.category}</td>
                <td>{data.amount.toLocaleString()}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td>{data.shipmentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Global;
