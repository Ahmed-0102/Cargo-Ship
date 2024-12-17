import React, { useState } from "react";
import { customerData } from "../../constants"; // Import customerData from your constants file
// import "./Transaction.css";

function Transaction() {
  const [visibleCustomer, setVisibleCustomer] = useState(null);

  // Function to group transactions by customer name
  const groupByCustomer = (data) => {
    return data.reduce((acc, transaction) => {
      const customer = transaction.name;
      const customerIndex = acc.findIndex((item) => item.customer === customer);

      if (customerIndex === -1) {
        // Customer does not exist, add new entry
        acc.push({
          customer: customer,
          transactions: [transaction],
          totalAmount: transaction.amount,
        });
      } else {
        // Customer exists, update the existing entry
        acc[customerIndex].transactions.push(transaction);
        acc[customerIndex].totalAmount += transaction.amount;
      }

      return acc;
    }, []);
  };

  // Function to handle the show/hide toggle
  const toggleVisibility = (customer) => {
    if (visibleCustomer === customer) {
      setVisibleCustomer(null);
    } else {
      setVisibleCustomer(customer);
    }
  };

  // Group the data by customer name
  const customerSummary = groupByCustomer(customerData);

  return (
    <div>
      <h2>Customer Summary</h2>
      <table className="customer-summary-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Number of Transactions</th>
            <th>Total Amount</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {customerSummary.map((customerData, index) => {
            const { customer, transactions, totalAmount } = customerData;
            const transactionCount = transactions.length;

            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{customer}</td>
                  <td>{transactionCount}</td>
                  <td>{totalAmount.toLocaleString()}</td>
                  <td>
                    <button onClick={() => toggleVisibility(customer)}>
                      {visibleCustomer === customer ? "Hide" : "Show"}
                    </button>
                  </td>
                </tr>
                {visibleCustomer === customer && (
                  <tr>
                    <td colSpan="4">
                      <table className="transaction-details-table">
                        <thead>
                          <tr>
                            <th>Branch</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Shipment Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction, i) => (
                            <tr key={i}>
                              <td>{transaction.branch}</td>
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
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
