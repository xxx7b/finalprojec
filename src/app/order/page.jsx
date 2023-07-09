"use client";
import React, { useContext, useState } from 'react';
import Button from '@/component/button/Button';
import styel from './order.module.css';
import { RxDashboard,RxPerson,RxQuestionMarkCircled,RxPencil2,RxHome,RxTimer } from "react-icons/rx";
import { SlNote,SlUser } from "react-icons/sl";
import { UserContext } from '@/context/usercontext';
import { useSession } from "next-auth/react";
import Page1 from '@/component/user&worker/page1/home';
import Page2 from '@/component/user&worker/page2/install';
import Page3 from '@/component/user&worker/page3/History';
import Page4 from '@/component/user&worker/page4/Account';
import Page5 from '@/component/user&worker/page5/FQ';
import Page6 from '@/component/user&worker/page6/Contactus';
import Page7 from '@/component/user&worker/page7/Renovate';
import Page8 from '@/component/user&worker/page8/Repair';
import Order from '@/component/user&worker/page9/orders';
import Maindish from '@/component/deshbored/mian/maindish';
import Ordersdish from '@/component/deshbored/orders/ordersdish';
import Weorkersdish from '@/component/deshbored/workers/weorkersdish';
import Usersdish from '@/component/deshbored/users/usersdish';


function Page() {
  // const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { userType, setusertype } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState('home');
  const [activedish, setactivedish] = useState('dishbored');
  const { data: session, status } = useSession();
  const [subsections,setsubsections]=useState('');
  const usertype = session?.user?.usertype;
  console.log(usertype)
  console.log(session)
  // console.log("seion from home",session?.user)
  console.log(activeMenu)
  console.log(subsections)

  const handeactivedish = (menu) => {
    return () => {
      setactivedish(menu)
    };
  };

  const handleMenuClick = (menu) => {
    return () => {
      if (subsections) {
        setsubsections('')
        setActiveMenu(menu)
      }
      setActiveMenu(menu)
    };
  };

  const handlesubsectionos= (menu) => {
    return () => {
      setsubsections(menu);
    };
  };



  const handleOrderClick = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <> {usertype === 'worker' ? (
      <section className={styel.sec}>
        <div className={styel.content}>
          <div className={styel.leftside}>
            {session?.user?.name !== 'dheya' && session?.user?.email !== 'dheya77@gmail.com' ? (
              <>
                <div className={`${styel.menue} ${activeMenu === 'home' ? styel.active : ''}`} onClick={handleMenuClick('home')}>
                  <RxHome className={styel.icon} />
                  <h3>Home</h3>
                </div>
                <div onClick={handleOrderClick}>
                  <div className={`${styel.menue} ${activeMenu === 'Order' ? styel.active : ''}`} onClick={handleMenuClick('Order')}>
                    <RxDashboard className={styel.icon} />
                    <h3>Order</h3>
                  </div>
                </div>
                <div className={`${styel.menue} ${activeMenu === 'History' ? styel.active : ''}`} onClick={handleMenuClick('History')}>
                  <RxTimer className={styel.icon} />
                  <h3>History</h3>
                </div>
                <div>
                  others
                </div>
                <div className={`${styel.menue} ${activeMenu === 'Account' ? styel.active : ''}`} onClick={handleMenuClick('Account')}>
                  <SlUser className={styel.icon} />
                  <h3>Account</h3>
                </div>
                <div className={`${styel.menue} ${activeMenu === 'FQ' ? styel.active : ''}`} onClick={handleMenuClick('FQ')}>
                  <RxQuestionMarkCircled className={styel.icon} />
                  <h3>F.A.Q</h3>
                </div>
                <div className={`${styel.menue} ${activeMenu === 'Contact us' ? styel.active : ''}`} onClick={handleMenuClick('Contact us')}>
                  <SlNote className={styel.icon} />
                  <h3>Contact us</h3>
                </div>
              </>
            ) : (
              <div className={styel.dish}>
                <h2> welcome {session?.user?.name}</h2>
                <div className={styel.content}>
                  <div className={`${styel.menue} ${activedish === 'dishbored' ? styel.active : ''}`} onClick={handeactivedish('dishbored')}>dishbored</div>
                  <div className={`${styel.menue} ${activedish === 'workers' ? styel.active : ''}`} onClick={handeactivedish('workers')}>workers</div>
                  <div className={`${styel.menue} ${activedish === 'users' ? styel.active : ''}`} onClick={handeactivedish('users')}>users</div>
                  <div className={`${styel.menue} ${activedish === 'orders' ? styel.active : ''}`} onClick={handeactivedish('orders')}>orders</div>
                </div>
              </div>
            )}
          </div>
          <div className={styel.righside}>
            {session?.user?.name !== 'dheya' && session?.user?.email !== 'dheya77@gmail.com' ? (
              <>
                {activeMenu === 'home' ? <Page1 /> : null}
                {/* {activeMenu === 'Order'?<Page2/>:null} */}
                {activeMenu === 'History' ? <Page3 /> : null}
                {activeMenu === 'Account' ? <Page4 /> : null}
                {activeMenu === 'FQ' ? <Page5 /> : null}
                {activeMenu === 'Contact us' ? <Page6 /> : null}
                {subsections === 'Renovate' ? <Page7 /> : null}
                {subsections === 'Repair' ? <Page8 /> : null}
                {subsections === 'install' ? <Page2 /> : null}
                {subsections === '' && activeMenu === 'Order' ? <Order /> : null}
              </>
            ) : (
              <>
                {activedish === 'dishbored' ? <Maindish /> : null}
                {activedish === 'workers' ? <Weorkersdish /> : null}
                {activedish === 'users' ? <Usersdish /> : null}
                {activedish === 'orders' ? <Ordersdish /> : null}
              </>
            )}
          </div>
        </div>
      </section>
    ) : null}
    

  {usertype==='user'? <section className={styel.sec}>
    <div className={styel.content}>
      <div className={styel.leftside}>
        <div className={`${styel.menue} ${activeMenu === 'home' ? styel.active : ''}`} onClick={ handleMenuClick('home')}  >
          <RxHome className={styel.icon}/>
          <h3>Home</h3></div>
        <div>
          <div  className={`${styel.menue} ${activeMenu === 'Order' ? styel.active : ''}`} onClick={handleMenuClick('Order')}><RxDashboard className={styel.icon}/>
            <h3>Order</h3></div>

        {activeMenu ==='Order' && usertype==='user'?
            <div className={styel.ordersubsec} onClick={
              handlesubsectionos('Renovate')
            }>Renovate</div>
       :'' }
           {activeMenu ==='Order' && usertype==='user'?
          
            <div className={styel.ordersubsec} onClick={
              handlesubsectionos('Repair')
            }>Repair</div>
          
        :''}
           {activeMenu ==='Order' && usertype==='user'?
        
            <div className={styel.ordersubsec} onClick={
              handlesubsectionos('install')
            }>Install</div>
        :''}
        </div>
        <div className={`${styel.menue} ${activeMenu === 'History' ? styel.active : ''}`}  onClick={handleMenuClick('History')} ><RxTimer className={styel.icon}/>
        <h3 onClick={handleMenuClick('3')} >History</h3>
        </div>
        <div className={styel.others}>
        others
        </div>
        <div className={`${styel.menue} ${activeMenu === 'Account' ? styel.active : ''}`} onClick={handleMenuClick('Account')} ><SlUser className={styel.icon}/><h3>Account</h3></div>
        <div className={`${styel.menue} ${activeMenu === 'FQ' ? styel.active : ''}`}  onClick={handleMenuClick('FQ')} ><RxQuestionMarkCircled className={styel.icon}/><h3>F.A.Q</h3></div>
        <div className={`${styel.menue} ${activeMenu === 'Contact us' ? styel.active : ''}`}  onClick={handleMenuClick('Contact us')}><SlNote className={styel.icon}/><h3>Contact us</h3></div>
      </div>
      <div className={styel.righside}>

    {activeMenu === 'home'?<Page1/>:''}
    {/* {activeMenu === 'Order'?<Page2/>:''} */}
    {activeMenu === 'History'?<Page3/>:''}
    {activeMenu === 'Account'?<Page4/>:''}
    {activeMenu === 'FQ'?<Page5/>:''}
    {activeMenu === 'deshbord'?<Deshbored/>:''}
    {activeMenu === 'Contact us'?<Page6/>:''}
    {subsections === 'Renovate'?<Page7/>:''}
    {subsections === 'Repair'?<Page8/>:''}
    {subsections ==='install'?<Page2/>:''}
    {subsections ==='' && activeMenu==='Order'? <Order/>:''}
      </div>
    </div>
  </section>:''}
     
    </>
  );
}

export default Page;
