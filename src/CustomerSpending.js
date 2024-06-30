import React, { useState, useEffect } from 'react';

const transactions = [
    { id: 't_01', customer: 'Rose Roberts', amount: 84 },
    { id: 't_02', customer: 'Chris Cook', amount: 30 },
    { id: 't_03', customer: 'Mary Martin', amount: 42 },
    { id: 't_04', customer: 'Susan Smith', amount: 26 },
    { id: 't_05', customer: 'Rose Roberts', amount: -84 },
    { id: 't_06', customer: 'Rose Roberts', amount: 48 },
    { id: 't_07', customer: 'Susan Smith', amount: 104 },
    { id: 't_08', customer: 'Larry Lewis', amount: 140 },
    { id: 't_09', customer: 'Mary Martin', amount: 10 },
    { id: 't_10', customer: 'Chris Cook', amount: 60 },
    { id: 't_11', customer: 'Susan Smith', amount: -26 },
    { id: 't_12', customer: 'Larry Lewis', amount: -140 },
    { id: 't_13', customer: 'Rose Roberts', amount: 26 },
    { id: 't_14', customer: 'Ryan Roberts', amount: 44 }
];

const calculateTotalSpending = (transactions) => {
    const spending = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.customer]) {
            acc[transaction.customer] = 0;
        }
        acc[transaction.customer] += transaction.amount;
        return acc;
    }, {});
    return spending;
};

const getTopCustomer = (spending) => {
    return Object.keys(spending).reduce((topCustomer, customer) => {
        return spending[customer] > spending[topCustomer] ? customer : topCustomer;
    }, Object.keys(spending)[0]);
};

const CustomerSpending = () => {
    const [filter, setFilter] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    useEffect(() => {
        const filtered = transactions.filter(transaction =>
            transaction.customer.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredTransactions(filtered);
    }, [filter]);

    const totalSpending = calculateTotalSpending(filteredTransactions);
    const topCustomer = getTopCustomer(totalSpending);

    return (
        <div>
            <h1>Customer Spending</h1>
            <input
                type="text"
                placeholder="Filter by customer name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <h2>Total Spending Per Customer</h2>
            <ul>
                {Object.keys(totalSpending).map(customer => (
                    <li key={customer}>
                        {customer}: ${totalSpending[customer]}
                    </li>
                ))}
            </ul>
            <h2>Top Customer</h2>
            {topCustomer && (
                <p>
                    Top Customer: {topCustomer} with ${totalSpending[topCustomer]} in spending
                </p>
            )}
        </div>
    );
};

export default CustomerSpending;
