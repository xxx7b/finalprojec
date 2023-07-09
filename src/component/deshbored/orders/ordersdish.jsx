import React, { useState, useEffect } from 'react';
import styles from './orders.module.css';

function Ordersdish() {
  const [error2, setError2] = useState(null);
  const [orders, setOrders] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const getallorders = async () => {
      try {
        const response = await fetch('/api/getallorders', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setOrders(jsonData);
      } catch (error) {
        setError2(error.message);
      }
    };

    if (!fetched) {
      getallorders();
      setFetched(true);
    }
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <section className={styles.sec}>
        <h2>Orders</h2>
        <p>this table showes all orders </p>
        {error2 ? (
          <p>Error: {error2}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>phoneNumber</th>
                <th>address</th>
                <th>repairType</th>
                <th>payment</th>
                <th>state</th>
                <th>workername</th>
                <th>orderstate</th>

              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.address}</td>
                  <td>{order.repairType}</td>
                  <td>{order.payment}</td>
                  <td>{order.state===0?'accepted':'rejected'}</td>
                  <td>{order.workername}</td>
                  <td>{order.orderstate}</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default Ordersdish;
