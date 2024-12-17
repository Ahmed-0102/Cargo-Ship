import React, { useState } from "react";
import { customerData } from "../../constants"; // Import customerData from your constants file
import "./Revenue.css";

function Revenue() {
  const [visibleBranch, setVisibleBranch] = useState(null);

  // Function to group transactions by branch
  const groupByBranch = (data) => {
    return data.reduce((acc, transaction) => {
      const branch = transaction.branch;
      const branchIndex = acc.findIndex((item) => item.branch === branch);

      if (branchIndex === -1) {
        // Branch does not exist, add new entry
        acc.push({
          branch: branch,
          transactions: [transaction],
          totalRevenue: transaction.amount,
        });
      } else {
        // Branch exists, update the existing entry
        acc[branchIndex].transactions.push(transaction);
        acc[branchIndex].totalRevenue += transaction.amount;
      }

      return acc;
    }, []);
  };

  // Function to handle the show/hide toggle
  const toggleVisibility = (branch) => {
    if (visibleBranch === branch) {
      setVisibleBranch(null);
    } else {
      setVisibleBranch(branch);
    }
  };

  // Group the data by branch
  const branchSummary = groupByBranch(customerData);

  return (
    <div>
      <h2>Branch Summary</h2>
      <table className="branch-summary-table">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Number of Transactions</th>
            <th>Total Revenue</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {branchSummary.map((branchData, index) => {
            const { branch, transactions, totalRevenue } = branchData;
            const transactionCount = transactions.length;

            return (
              <tr key={index}>
                <td>{branch}</td>
                <td>{transactionCount}</td>
                <td>{totalRevenue.toLocaleString()}</td>
                <td>
                  <button onClick={() => toggleVisibility(branch)}>
                    {visibleBranch === branch ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Transaction Details Table */}
      {visibleBranch && (
        <div className="transaction-details-section">
          <h3>Transaction Details for {visibleBranch}</h3>
          <table className="transaction-details-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Shipment Type</th>
              </tr>
            </thead>
            <tbody>
              {branchSummary
                .find((branchData) => branchData.branch === visibleBranch)
                .transactions.map((transaction, i) => (
                  <tr key={i}>
                    <td>{transaction.name}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.amount.toLocaleString()}</td>
                    <td>
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td>{transaction.shipmentType}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Revenue;
