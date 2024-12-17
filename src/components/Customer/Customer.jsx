import React, { useState } from "react";
import { customerData } from "../../constants";
import "./Customer.css";
import Button from "react-bootstrap/Button";

function Customer() {
  const [filters, setFilters] = useState({
    category: "All",
    branch: "All",
    fromDate: "",
    toDate: "",
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
    const { category, branch, fromDate, toDate } = filters;

    const filtered = customerData.filter((data) => {
      const isCategoryMatch =
        category !== "All" ? data.category === category : true;
      const isBranchMatch = branch !== "All" ? data.branch === branch : true;
      const isFromDateMatch = fromDate
        ? new Date(data.date) >= new Date(fromDate)
        : true;
      const isToDateMatch = toDate
        ? new Date(data.date) <= new Date(toDate)
        : true;

      return (
        isCategoryMatch && isBranchMatch && isFromDateMatch && isToDateMatch
      );
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilters({
      category: "All",
      branch: "All",
      fromDate: "",
      toDate: "",
    });
    setFilteredData(customerData);
  };

  return (
    <div className="customer-container">
      <div className="myForm">
        <label className="form-label">
          Product Category:
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="All">All</option>
            <option value="Steel">Steel</option>
            <option value="Electronics">Electronics</option>
            <option value="Consumer Products">Consumer Products</option>
          </select>
        </label>
        <label className="form-label">
          Branch:
          <select name="branch" value={filters.branch} onChange={handleChange}>
            <option value="All">All</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Vizag">Vizag</option>
            <option value="New York">New York</option>
            <option value="Liver Pool">Liver Pool</option>
            <option value="Tokyo">Tokyo</option>
          </select>
        </label>
        <label className="form-label">
          From Date:
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          To Date:
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
          />
        </label>
        <div>
          <Button variant="primary" onClick={handleFilter}>
            Search
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <h2>No data to display for this particular selection</h2>
      ) : (
        <table className="table table-bordered table-striped rounded">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customer;
