"use client";
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import styel from './reper.module.css'
import useSWR from 'swr';
import { usePathname } from 'next/navigation'

function Page2() {
  const { data: session } = useSession();
  const [nextstps, setnextsteps] = useState(() => Number(localStorage.getItem('nextstpsI')) || 1);
  const [currentsteo, setcurrentsteo] = useState(() => Number(localStorage.getItem('currentsteoI')) || 0);
  const usertpe = session?.user?.usertype;
  console.log(usertpe)
  const name=session?.user?.name
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [repairType, setRepairType] = useState('');
  const [payment, setPayment] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [erro,seterror]=useState('');
  const [secses,setsecses]=useState('');
  const pname="Install";
  const [workers,setworkes]=useState([]);
  console.log("hi",workers)
  const [selectedWorkerName, setSelectedWorkerName] = useState('');
  console.log(selectedWorkerName)

  const handelsteps=async(e)=>{
    e.preventDefault();
    if (!name || !phoneNumber || !address || !repairType || !payment) {
      seterror("Please make sure to fill all the inputs");
      setTimeout(() => {
        seterror('');
      }, 3000);
      return;
    }
    try {
      const getRes = await fetch("http://localhost:3000/api/getworkers/", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pname }),
        cache: 'no-store',
      });
  
      if (!getRes.ok) {
        throw new Error("Failed to fetch data from GET API");
      }
      setsecses("order has been saves pleas choice a worker");
      setTimeout(() => {
        setsecses('');
      }, 3000);
      const getData = await getRes.json();
      setworkes(getData);
      const updatedNextStps = nextstps === 1 ? 2 : 1;
      const updatecureentstep = currentsteo === 0 ? 1 : 0;
      setnextsteps(updatedNextStps);
      setcurrentsteo(updatecureentstep);
      localStorage.setItem('nextstpsI', updatedNextStps.toString());
      localStorage.setItem('currentsteoI', updatecureentstep.toString());
    } catch (error) {
      console.log(erro)
    }
  }



  const handleSave = async (e, workerName) => {
    e.preventDefault();
    const formData = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      repairType: repairType,
      payment: payment,
      additionalInfo: additionalInfo,
      selectedWorkerName:workerName
    };
  
    console.log(formData);
    try {
      const workerRes = await fetch("http://localhost:3000/api/worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        cache: 'no-store',
      });
  
      if (!workerRes.ok) {
        throw new Error("Failed to fetch data from worker API");
      }
      setsecses("order has been made");
      setTimeout(() => {
        setsecses('')
      }, 4000);
      const updatedNextStps = nextstps === 2 ? 3 : 2;
      const updatecureentstep = currentsteo === 1 ? 2 : 1;
      setnextsteps(updatedNextStps);
      setcurrentsteo(updatecureentstep);
      localStorage.setItem('nextstpsI', updatedNextStps.toString());
      localStorage.setItem('currentsteoI', updatecureentstep.toString());
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleGoBack = () => {
    setnextsteps(1);
    setcurrentsteo(0);
    localStorage.setItem('nextstpsI', '1');
    localStorage.setItem('currentsteoI', '0');
  };


  return (
    <>
      {usertpe === 'worker' && currentsteo === 0 && nextstps === 1  ?<div>hi</div>:''}

    {usertpe === 'user' && currentsteo === 0 && nextstps === 1 ?
    <>
        <section>
          <div className={styel.continer}>
            <h2>Install</h2>
            <p>Fill the form to get started</p>
            <form>
              <div className={styel.content}>
                <div>
                  <label htmlFor="">Name</label>
                  <input type="text" name="" id="" required={true} placeholder="name" readOnly value={session?.user?.name}/>
                </div>
                <div>
                  <label htmlFor="">Phone no</label>
                  <input type="text"  required={true} name="" id="" placeholder="phone number" onChange={(e)=>{
                    setPhoneNumber(e.target.value)
                  }} />
                </div>
              </div>
              <div className={styel.singlinput}>
                <label htmlFor="">Address</label>
                <input type="text"   required={true} name="" id="" placeholder="address" onChange={(e)=>{
                  setAddress(e.target.value)
                }} />
              </div>
              <div className={styel.content}>
                <div>
                  <label htmlFor="">Repair Type</label>
                  <select  required={true} onChange={(e)=>{
                    setRepairType(e.target.value)
                  }} name="" id="">
                    <option value="garden">garden</option>
                    <option value="car">car</option>
                    <option value="hous">hous</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Payment</label>
                  <select onChange={(e)=>{
                    setPayment(e.target.value)
                  }}  required={true} name="" id="">
                    <option value="cash">cash</option>
                    <option value="shpee">shpee</option>
                    <option value="caird">caird</option>
                  </select>
                </div>
              </div>
              <div>
                <textarea onChange={(e)=>{
                  setAdditionalInfo(e.target.value)
                }}
                value={additionalInfo}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="please provide us with additional info"
                >
                  Information
                </textarea>
              </div>
              <button onClick={handelsteps}>save</button>
            </form>
            <p>{erro}</p>
            <p>{secses}</p>
          </div>
        </section>
      </>:''}
      {nextstps === 2&& currentsteo ===1&& (
  <section className={styel.secworker}>
    <h2>worker list</h2>
    <div className={styel.continer2}>
    {workers.map((item, index) => (
      <div className={styel.content2} key={index}>
        <div>
          <h5>no: <span>{item.id}</span></h5>
          <h3>Name: <span>{item.name}</span></h3>
          <p>experances: <span>{item.exp}</span></p>
        </div>
        <div>
        <button className={styel.button} onClick={(e) => handleSave(e, item.name)}>order</button>
        </div>
      </div>
    ))}
    </div>
    <p>{erro}</p>
    <p>{secses}</p>
    {workers.length==0?<p>sorry we coud not find any available worker now pleas try again </p>:''}
    <button onClick={handleGoBack}>Go Back</button>
  </section>
)}

 {nextstps === 3&& currentsteo ===2&& (
  <section className={styel.secworker}>
    <h2>info</h2>
    <div className={styel.continer2}>
      <p>thank you you your order has been saved</p>
    </div>
    <button onClick={handleGoBack}>Go Back</button>
  </section>
)}
    </>
  );
}

export default Page2;
