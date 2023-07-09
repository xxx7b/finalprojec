import React, { use, useState } from 'react';
import styel from './order.module.css';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
const Order = () => {
  const { data: session } = useSession();
  const [erro, seterror] = useState('');
  const [seccse, setsecses] = useState('');
  const [orders, setorders] = useState([]);
  const [ordersforworker,setordersforworker ] = useState([]);
  const [nextstps, setnextsteps] = useState(() => Number(localStorage.getItem('nextstporr')) || 1);
  const [currentsteo, setcurrentsteo] = useState(() => Number(localStorage.getItem('currentsteorr')) || 0);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  console.log("9", session);
  const user = session?.user?.name;
  const usertype = session?.user?.usertype;

  const [loding, setloding] = useState('');
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(`/api/getworkerorders/${user}`, fetcher);
  console.log(data)
  let content;
  

  const handelreject = async (id,name) => {
    // setorderid(id);
    // localStorage.setItem('orderID', id);
    // clikd='cliked'
    try {
      const res = await fetch("http://localhost:3000/api/updatestate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {id,name,state:1}
          ),
        cache: 'no-store',
      });

      if (!res.ok) {
        seterror("error has occurred");
        setTimeout(() => {
          seterror('')
        }, 4000);
        throw new Error("Failed to fetch data from worker API");
      }
      setsecses("state has been updated");
      setTimeout(() => {
        setsecses('')
      }, 4000);
    } catch (error) {
      console.log(erro)
    }
  };

  const handelaccept = async (id,name) => {
    // localStorage.setItem('orderID', id);
    // clikd='cliked'
    rowtable=''

    try {
      const res = await fetch("http://localhost:3000/api/updatestate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {id,name,state:0}
          ),
        cache: 'no-store',
      });

      if (!res.ok) {
        seterror("error has occurred");
        setTimeout(() => {
          seterror('')
        }, 4000);
        throw new Error("Failed to fetch data from worker API");
      }
      setsecses("state has been updated");
      setTimeout(() => {
        setsecses('')
      }, 4000);
    } catch (error) {
      console.log(erro)
    }

  };

  if (error) {
    content = <p>Error fetching data</p>;
  } else if (!data) {
    content = <p>Loading...</p>;
  } else if (!Array.isArray(data) || data.length === 0) {
    content = <p>No orders found</p>;
  } else {
    content = (
      <section className={styel.secform}>
        <div className={styel.continer2}>
          <table className={styel.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>State</th>
                <th>Address</th>
                <th>Payment</th>
                <th>workername</th>
                <th>action -orderstate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                if (item.state === 0 || item.state === false) {
                  return (
                    <tr className={styel.row} key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.state}</td>
                      <td>{item.address}</td>
                      <td>{item.payment}</td>
                      <td>{item.workername}</td>
                      {item.orderstate==='inprogress'?<td>{item.orderstate}</td>:<td>
                        <button onClick={()=>handelaccept(item.id,item.name)}
                          className={styel.button}
                        >
                          accept
                        </button>
                        <button onClick={()=>handelreject(item.id,item.name)}
                          className={styel.button}
                        > reject
                        </button>
                      </td>}
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  const getorders = async () => {
    const updatedNextStps = nextstps === 1 ? 2 : 1;
    const updatecureentstep = currentsteo === 0 ? 1 : 0;
    setnextsteps(updatedNextStps);
    setcurrentsteo(updatecureentstep);
    localStorage.setItem('nextstporr', updatedNextStps.toString());
    localStorage.setItem('currentsteorr', updatecureentstep.toString());
    setloding("pleas wahit whill geeting the orders for you")
    
    try {
      const getRes = await fetch("http://localhost:3000/api/getorders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user }),
        cache: 'no-store',
      });

      if (!getRes.ok) {
        throw new Error("Failed to fetch data from GET APi");
      }
      const received = await getRes.json();
      console.log(received);
      setorders(received);
      const updatedNextStps = nextstps === 1 ? 2 : 1;
      const updatecureentstep = currentsteo === 0 ? 1 : 0;
      setnextsteps(updatedNextStps);
      setcurrentsteo(updatecureentstep);
      localStorage.setItem('nextstporr', updatedNextStps.toString());
      localStorage.setItem('currentsteorr', updatecureentstep.toString());
      setloding('')
    } catch (error) {
      console.log(error);
    }
  }
  const handleSave = async (e, workerName) => {

  };


  const handleGoBack = () => {
    setnextsteps(1);
    setcurrentsteo(0);
    localStorage.setItem('nextstporr', '1');
    localStorage.setItem('currentsteorr', '0');
  };

  const vieworder = (id) => {
    const updatedNextStps = nextstps === 2 ? 3 : 2;
    const updatecureentstep = currentsteo === 1 ? 2 : 1;
    setnextsteps(updatedNextStps);
    setcurrentsteo(updatecureentstep);
    localStorage.setItem('nextstporr', updatedNextStps.toString());
    localStorage.setItem('currentsteorr', updatecureentstep.toString());
    setorderid(id);
    localStorage.setItem('orderid', id.toString());
  };


  const updteorders = async (e) => {
    e.preventDefault();
    if (phoneNumber && address) {
      const formData = {
        name: user,
        orderid: oerderid,
        phoneNumber: phoneNumber,
        address: address,
      };
      console.log(formData);
      try {
        const workerRes = await fetch("http://localhost:3000/api/updataorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
          cache: 'no-store',
        });
  
        if (!workerRes.ok) {
          seterror("error has occurred");
          setTimeout(() => {
            seterror('')
          }, 4000);
          throw new Error("Failed to fetch data from worker API");
        }
        setsecses("Order has been updated");
        setTimeout(() => {
          setsecses('')
        }, 4000);
        const updatedNextStps = nextstps === 2 ? 3 : 2;
        const updatecureentstep = currentsteo === 1 ? 2 : 1;
        setnextsteps(updatedNextStps);
        setcurrentsteo(updatecureentstep);
        localStorage.setItem('nextstporr', updatedNextStps.toString());
        localStorage.setItem('currentsteorr', updatecureentstep.toString());
  
        // Call getorders to fetch the updated orders
        getorders();
      } catch (error) {
        console.log(error);
      }
    } else {
      seterror("Please make sure to fill all the fields");
      setTimeout(() => {
        seterror('')
      }, 4000);
    }
  };
  

  const deleteOrder = async (id) => {
    try {
      const deleteRes = await fetch(`http://localhost:3000/api/deleteorder/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        cache:'no-store',
      });
  
      if (!deleteRes.ok) {
        seterror("somthing want wrong");
        setTimeout(() => {
          seterror('');
        }, 4000);
        throw new Error("Failed to delete order");
      }
  
      setsecses("Order has been deleted");
      setTimeout(() => {
        setsecses('');
      }, 4000);
  
      getorders();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      {usertype === 'worker'? <section className={`${styel.sec} ${styel.margn}`}>
          <h1>orderlist</h1>
          <p>Here are all the orders</p>
          <div>{content}</div>
        </section>: ''}




      {usertype === 'user' && currentsteo === 0 && nextstps === 1 ?
        <>
          <section className={styel.sec}>
            <h1> recant orders</h1>
            <p>here you can see your orders that are still not approved</p>
            <button onClick={getorders}>view</button>

          </section>
        </> : ''}

      {usertype === 'user' && nextstps === 2 && currentsteo === 1 && (
        <section className={styel.secworker}>
          <h2>orders List</h2>
          <div className={styel.continer2}>
            <table className={styel.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>State</th>
                  <th>Address</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {orders.map((item, index) => {
             if (item.state === 0 || item.state === false) {
                    return (
              <tr className={styel.row} key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.state}</td>
                <td>{item.address}</td>
                <td>{item.payment}</td>
                      <td>
                <button className={styel.button} onClick={(e) => vieworder(item.id)}>edit</button>
                <button className={styel.button} onClick={(e) => deleteOrder(item.id)}>Delete</button>
              </td>
            </tr>
                );
              } else {
                return null; 
              }
            })} 
            </tbody>
            </table>
          </div>
          <p>{erro}</p>
          <p>{loding}</p>
          <p>{seccse}</p>
          <button className={styel.goback} onClick={handleGoBack}>Go Back</button>
        </section>
      )}


      {usertype === 'user' && nextstps === 3 && currentsteo === 2 && (
        <section className={styel.secform}>
          <h2> pleas eadt you info</h2>
          <form className={styel.form}>
            {orders.map((item, index) => {
              if (item.id === oerderid) {
                return (
                  <div className={styel.content2} key={index}>
                    <div>
                      <label>Order no{item.id}</label>
                      <input type="text" defaultValue={item.id} />
                    </div>
                    <div>
                      <label>Name</label>
                      <input type="text" defaultValue={item.name} readOnly />
                    </div>
                    <div>
                      <label>State:</label>
                      <input type="text"defaultValue={item.state} readOnly />
                    </div>
                    <div>
                      <label>addsres:</label>
                      <input onChange={(e)=>{
                        setAddress(e.target.value)
                      }} type="text"  />
                    </div>
                    <div>
                      <label>phone:</label>
                      <input onChange={(e)=>{
                        setPhoneNumber(e.target.value)
                      }} type="text"  />
                    </div>
                  </div> 
                );
              } else {
                return null;
              }
            })}
          </form>
          <div className={styel.buttons}>
          <button onClick={updteorders}>save</button>
          <button onClick={handleGoBack}>Go Back</button>
          </div>
        </section>
      )}


    </>
  );
};

export default Order;