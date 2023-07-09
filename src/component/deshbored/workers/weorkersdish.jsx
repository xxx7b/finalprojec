import React, { useEffect, useState } from 'react'
import style from './worker.module.css'

function Weorkersdish() {
    const [error1, setError1] = useState(null);
    const [worksers, setworksers] = useState([]);
    const [fetched, setFetched] = useState(false);
  
    useEffect(() => {
      const getallusers = async () => {
        try {
          const response = await fetch('/api/getallusers', {
            method: 'POST',
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const jsonData = await response.json();
          setworksers(jsonData);
        } catch (error) {
          setError1(error.message);
        }
      };
  
      if (!fetched) {
        getallusers();
        setFetched(true);
      }
    }, []);
  
    return (
      <>
        <section className={style.sec}>
          <h2>Users</h2>
          <p> this table shows all users</p>
          {error1 ? (
            <p>Error: {error1}</p>
          ) : (
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>user Name</th>
                  <th>email</th>
                  <th>userype</th>
                  <th>phone</th>
                  <th>address</th>
                  <th>exp</th>
                  <th>active</th>
                </tr>
              </thead>
              <tbody>
                {worksers
                  .filter((user) => user.userype === 'worker')
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.userype}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.exp}</td>
                      <td>{user.active}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </section>
      </>
    );
}

export default Weorkersdish
