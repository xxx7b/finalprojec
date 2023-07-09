import { useSession } from 'next-auth/react';
import React from 'react';
import useSWR from 'swr';
import styel from './histry.module.css';

function Page3() {
  const { data: session } = useSession();
  const usertype = session?.user?.usertype;
  const name = session?.user?.name;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(`/api/history/${name}`, fetcher);

  console.log(usertype);
  console.log(session);
  console.log(data);
  console.log(error);

  //histry for user
  let content;

  if (error) {
    content = <p>Error fetching data</p>;
  } else if (!data) {
    content = <p>Loading...</p>;
  } else if (!Array.isArray(data) || data.length === 0) {
    content = <p>No history found</p>;
  } else {
    content = (
      <table className={styel.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Repair Type</th>
            <th>State</th>
            <th>Worker Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.address}</td>
              <td>{item.repairType}</td>
              <td>{item.state===1?"rejected":'accepted'}</td>
              <td>{item.workername}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // histry for worker

  console.log(usertype);
  console.log(session);
  console.log(data);
  console.log(error);

  let conttent;

  if (error) {
    conttent = <p>Error fetching data</p>;
  } else if (!data) {
    conttent = <p>Loading...</p>;
  } else if (!Array.isArray(data) || data.length === 0) {
    conttent = <p>No history found</p>;
  } else {
    conttent = (
      <table className={styel.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Repair Type</th>
            <th>State</th>
            <th>Worker Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.address}</td>
              <td>{item.repairType}</td>
              <td>{item.state===1?"rejected":'accepted'}</td>
              <td>{item.workername}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <>
      {usertype === 'worker' ? 
      <section className={`${styel.sec} ${styel.margn}`}>
          <h2>History</h2>
          <p>Here are all the completed orders</p>
          <div>{conttent}</div>
        </section> : ''}

      {usertype === 'user' ? (
        <section className={styel.sec}>
          <h2>History</h2>
          <p>Here are all the completed orders</p>
          <div>{content}</div>
        </section>
      ) : (
        ''
      )}
    </>
  );
}

export default Page3;
