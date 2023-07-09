"use client"
import style from './login.module.css';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/usercontext';
import { signIn } from 'next-auth/react';
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie';


export default function SignupLogin() {
  const [logmehtd, setlogmethod] = useState('signin');
  const [error, setError] = useState("");
  const [usertype,setusertype]=useState("");
  const [seccse,setsecsses]=useState("");
  const router = useRouter();
  const { data:session } = useSession(); 

    console.log(session)
    const [nextstps, setnextsteps] = useState(() => {
      if (typeof localStorage !== 'undefined') {
        return Number(localStorage.getItem('nextstps')) || 1;
      }
      return 1;
    });
    
    const [currentsteo, setcurrentsteo] = useState(() => {
      if (typeof localStorage !== 'undefined') {
        return Number(localStorage.getItem('currentsteo')) || 0;
      }
      return 0;
    });
// const usertypee=session?.user?.usertype;

const[exp,setexp]=useState("");
const[phone,setphone]=useState("");
const[address,setaddres]=useState("");
const [email,seteamil]=useState('');
const [name,setname]=useState('');
const [password,setpassword]=useState('');

const toggleForm = (value) => {
    setlogmethod(value)
    const updatedNextStps = nextstps === 1 ? 2 : 1;
    const updatecureentstep = currentsteo === 0 ? 1: 0;
    localStorage.setItem('nextstps', updatedNextStps.toString());
    localStorage.setItem('currentsteo', updatecureentstep.toString());
  };



  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        name,
        email,
        password,
        usertype,
        redirect: false,
      });
  
      if (response.status === 200) {
        setsecsses("Successfully signed in");
        setTimeout(() => {
          setsecsses("");
        }, 3000);
        console.log("this is the atate", response.status);
        router.push("/order");
      } else if (response.status === 404) {
        console.log(response.error);
        setError("Email or password is wrong. Please try again");
        setTimeout(() => {
          setError("");
        }, 3000);
        toast("Credentials do not match!", { type: "error" });
      } else {
        console.log(response.error);
        // Handle other error cases here
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleRegistration = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      usertype,
      phone,
      address,
      exp,
    };
    if (!usertype ) {
      setError("Please select a user type");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    console.log("coming fom reqstraion function",userData);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData
        }),
      });
  
      if (response.ok) {
        console.log('Registration successful');
        setsecsses("seccesfuully registered")
        setTimeout(() => {
          setsecsses("");
        }, 3000);
        const updatedNextSteps = nextstps === 2? 3 : 1;
        const updatedCurrentStep = currentsteo === 1 ? 2 : 0;
        setnextsteps(updatedNextSteps);
        setcurrentsteo(updatedCurrentStep);
        localStorage.setItem("nextstps", updatedNextSteps.toString());
        localStorage.setItem("currentsteo", updatedCurrentStep.toString());
      } else {
        setError("erro accur during reqestration");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setError('Registration failed');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      setError("Please fill in all the required fields.");
  
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 1400);
  
      return;
    }
  
    const updatedNextSteps = nextstps === 1 ? 2 : 1;
    const updatedCurrentStep = currentsteo === 0 ? 1 : 0;
    setnextsteps(updatedNextSteps);
    setcurrentsteo(updatedCurrentStep);
    localStorage.setItem("nextstps", updatedNextSteps.toString());
    localStorage.setItem("currentsteo", updatedCurrentStep.toString());
  };
  
  const handleGoBack = () => {
    setnextsteps(1);
    setcurrentsteo(0);
    localStorage.setItem('nextstps', '1');
    localStorage.setItem('currentsteo', '0');
  };

  return <>
      <section className={style.sec}>
        <div className={style.content}>
          <div className={style.right}>
            <div className={style.imgcontiner}>
              <Image className={style.img} src="/New-Siding-1024x638.jpg" width={500} height={500} />
              <div className={style.text}>
                <h2>Buildio</h2>
                <p>Don't let building damage bring you down we've got you covered.</p>
              </div>
            </div>
          </div>
          <div className={style.left}>
            <div className={style.form}>
              <div className={style.method}>
                <div className={`${style.sin} ${logmehtd==='signin' || currentsteo ===2 && nextstps===3 ?  style.active : ''}  ${style.transsation}`} onClick={()=>{
                  toggleForm('signin')
                }}>
                  sign-in
                </div>
                <div className={`${style.siup} ${logmehtd ==='sign-up'? style.active :''} ${style.transsation}`}  onClick={()=>{
                  toggleForm('sign-up')
                }}>
                  sign-up
                </div>
              </div>
            </div>

            {logmehtd==='sign-up' && nextstps===1 && currentsteo===0 ?
            <div className={style.as}>
              <div>
                <h2>Please choose a sign-up option:</h2>
                <select onChange={(e)=>{
                  setusertype(e.target.value);
                  console.log(usertype)
                }}>
                  <option value="worker">worker</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div> :''}

            {logmehtd ==='signin' && currentsteo=== 0 && nextstps=== 1  ||currentsteo=== 2 && nextstps=== 3? 
              <div className={style.slo}>
                <form action="" onSubmit={handleSignIn}>
                <label htmlFor="n">Name</label>
                  <input required={true} type="text" onChange={(e)=>{
                    setname(e.target.value)
                  }} name="" id="n" />
                  <label htmlFor="e">Email</label>
                  <input required={true} type="email" onChange={(e)=>{
                    seteamil(e.target.value)
                  }} name="" id="e" />
                  <label htmlFor="p">Password</label>
                  <input required={true} onChange={(e)=>{
                    setpassword(e.target.value)
                  }}  type="text" name="" id="p" />
                  <button>continue</button>
                  <p>{error}</p>
                  <p>{seccse}</p>
                </form>
              </div>
              :''}
              {logmehtd==="sign-up" && currentsteo===0 && nextstps===1?
              <div className={style.slo}>
               <form action="">
                <label htmlFor="n">Name</label>
                  <input type="text" required={true} onChange={(e)=>{
                    setname(e.target.value)
                  }} name="" id="n" />
                  <label htmlFor="e">Email</label>
                  <input  type="email" required={true} onChange={(e)=>{
                    seteamil(e.target.value)
                  }} name="" id="e" />
                  <label htmlFor="p">Password</label>
                  <input required={true} onChange={(e)=>{
                    setpassword(e.target.value)
                  }}  type="text" name="" id="p" />
                  <button onClick={handleSave}>continue</button>
                </form>
                <p>{error}</p>
                <p>{seccse}</p>
              </div>
            :''}
            {nextstps === 2 && currentsteo === 1 && (
              <section className={style.sec}>
              <div>
                  {usertype==="user"?
                  <form action="" onSubmit={handleRegistration}>
                    <div className={style.content2}>
                    <div>
                      <label htmlFor="">phone</label>
                      <input type="text" name="" id="p" required={true} onChange={(e)=>{
                        setphone(e.target.value)
                      }} />
                      </div>
                      <div>
                <h2>Please choose a city:</h2>
                <select onChange={(e)=>{
                  setaddres(e.target.value);
                  console.log(usertype)
                }}>
                  <option value="jogja">jogja</option>
                  <option value="solo">solo</option>
                  <option value="jakerta">jakerta</option>
                </select>
              </div>
                      </div>
                      <div className={style.buttons}>
                          <button >continue</button>
                          <button onClick={handleGoBack}>Go Back</button>
                          </div>
                      <p>{error}</p>
                      <p>{seccse}</p>
                  </form>:<form action="" onSubmit={handleRegistration}>
                  <div className={style.content2}>
                      <div>
                      <label htmlFor="">phone</label>
                      <input type="text" name="" id="p" required={true} onChange={(e)=>{
                        setphone(e.target.value)
                      }}/>
                      </div>
                      <div>
                      <select onChange={(e)=>{
                  setaddres(e.target.value);
                  console.log(usertype)
                }}>
                  <option value="jogja">jogja</option>
                  <option value="solo">solo</option>
                  <option value="jakerta">jakerta</option>
                </select>
                </div>
                      <div>
                      <h2>Please choose your type of work</h2>
                          <select onChange={(e)=>{
                            setexp(e.target.value)
                          }}>
                            <option readOnly value="">select an option</option>
                            <option value="Renovate">Renovate</option>
                            <option value="Repair">Repair</option>
                            <option value="Install">Install</option>
                          </select>
                          </div>
                          </div>
                          <div className={style.buttons}>
                          <button >continue</button>
                          <button onClick={handleGoBack}>Go Back</button>
                          </div>
                          <p>{error}</p>
                          <p>{seccse}</p>
                  </form>
                  }
              </div>
          </section>
      )
      }
          </div>
        </div>
      </section>
    </>
}
