import { getSession,useSession } from 'next-auth/react'
import React, { useState } from 'react'
import styel from "./acount.module.css"

function Page4() {
  const { data: session,update } = useSession();
  console.log(session)
  const[name,setname]=useState('');
  const[pass,setpass]=useState('');
  const[email,setemail]=useState('');
  const[expp,setexp]=useState('');
  const[isdisapled,setdisabled]=useState(false);
  const[notif,setnotif]=useState('');
  const username=session?.user?.name
  const usertype=session?.user?.usertype
  const useremail=session?.user?.email

  // const getUser = async (username,useremail) => {
  //   try {
  //     const getdata = await fetch("http://localhost:3000/api/getuser/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         username,
  //         useremail
  //       }),
  //       cache: 'no-store',
  //     });

  //     if (!getdata.ok) {
  //       setnotif('Info has not been saved');
  //       setTimeout(() => {
  //         setnotif('');
  //       }, 3000);
  //       throw new Error("Failed to fetch data from GET API");
  //     }
  //     setnotif("Info has been saved");
  //     setTimeout(() => {
  //       setnotif('');
  //     }, 3000);
  //     const getRes = await getdata.json();
  //     console.log("this is th ueser info",getRes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateUserInfo = async () => {
    setdisabled(!isdisapled);
  
    if (!isdisapled) {
      return;
    }
  
    if (usertype === 'user') {
      if (!email || !pass) {
        setnotif('Please make sure to enter all fields');
        setTimeout(() => {
          setnotif('');
        }, 3000);
        return;
      }
    } else if (usertype === 'worker') {
      if ( !email || !pass || !expp) {
        setnotif('Please make sure to enter all fields');
        setTimeout(() => {
          setnotif('');
        }, 3000);
        return;
      }
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/updatauser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: session?.user?.name,
          useremail: session?.user?.email,
          email,
          pass,
          expp,
        }),
        cache: 'no-store',
      });

      if (!response.ok) {
        setnotif('User info has not been updated');
        setTimeout(() => {
          setnotif('');
        }, 3000);
      } else {
        // Update the session with the new user information
        const updatedUser = {
          ...session.user,
          name: name || session.user.name,
          email: email || session.user.email,
          expp: expp || session.user.expp,
        };
        const updatedSession = {
          ...session,
          user: updatedUser,
        };
        // await getSession(); // Refresh the session data
        await update(updatedSession);

        setnotif('User info has been updated');
        setTimeout(() => {
          setnotif('');
        }, 3000);
      }

      const updatedData = await response.json();
      console.log(updatedData);
    } catch (error) {
      console.log(error);
    }
  };


  return <>
  <section className={`${styel.sec} ${usertype==='worker'?styel.margn:''}`}>
    <h2> account info</h2>
    <p>here you can edit you info</p>
    <div className={styel.cotiner}>
      <form action="">
        <div className={styel.content}>
        <div>
          <div className={styel.inputcontiner}>
            <label htmlFor="">name:<span>{session?.user?.name}</span></label>
            <input type="text" name="" id="" required={true} disabled={true} value={session?.user?.name}/>
          </div>
          <div className={styel.inputcontiner}>
          <label htmlFor="">eamil:<span>{session?.user?.email}</span></label>
            <input type="text" name="" id="" onChange={(e)=>setemail(e.target.value)} disabled={!isdisapled} required={true} />
          </div>
        </div>
        <div>
          <div className={styel.inputcontiner}>
          <label htmlFor="">pass</label>
            <input type="text" name="" id="" required={true} disabled={!isdisapled} onChange={(e)=>{
              setpass(e.target.value)
            }} />
          </div>
         {session?.user?.usertype==='user'?'': <div className={styel.inputcontiner}>
            <h5>Please choose your type of work</h5>
            <label htmlFor="">:<span>{session?.user?.expp}</span></label>
            <select  required={true} disabled={!isdisapled} onChange={(e)=>{
              setexp(e.target.value)
              }}>
              <option readOnly value="">select an option</option>
              <option value="Renovate">Renovate</option>
              <option value="Repair">Repair</option>
              <option value="Install">Install</option>
            </select>
        </div>}
        </div>
        </div>
      </form>
      <div>
        <button onClick={updateUserInfo}>{isdisapled?'save':'edit'}</button>
      </div>
    </div>
    <p>{notif}</p>
  </section>
  </>
}
export default Page4
