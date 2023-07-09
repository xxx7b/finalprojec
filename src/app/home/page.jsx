"use client"
import React from 'react';
import style from './home.module.css';
import Image from 'next/image';
import  { useContext, useState } from 'react';
import { UserContext } from '../../context/usercontext';
import Link from 'next/link';

function Home() {
  const { userType, setusertype } = useContext(UserContext);
  console.log(userType);
  return<>
  <section className={style.sec1}>
    <div className={style.content}>
      <div className={style.imgcontiner}>
        <Image src='/New-Siding-1024x638.jpg'fill={true} className={style.img}></Image>
      </div>
      <div className={style.text}>
        <h1>Buildio</h1>
        <p>Don't let building damage bring you down we've got you covered.</p>
      </div>
    </div>
  </section>

<section className={style.sec}>
  <div className={style.contnet}>
    <div className={style.text1}>
      <h1>4</h1>
      <p>Type of Workes</p>
    </div>
    <div className={style.text1}>
      <h1>+5</h1>
      <p>Years of worker expirience</p>
    </div>
    <div className={style.introtxt}>
      <p>provides asssistance in the repair of damaged buildings by making contact with a construction worker as soon as possible</p>
      <div className={style.subintro}>
        <div className={style.imgcontiner}>
        <Image className={style.img} src="/22734556__2_-removebg-preview.png" width={1000}height={1000}></Image>
        </div>
        <div className={style.subtext}>
          <h3>IDK</h3>
          <p>If you are having problems with your house just place an order. choose what u need</p>
        </div>
      </div>
      <div className={style.subintro}>
      <div className={style.imgcontiner}>
        <Image className={style.img} src="/22734556__2_-removebg-preview.png" width={1000}height={1000}></Image>
        </div>
        <div className={style.subtext}>
          <h3>Search nearby worker</h3>
          <p>quickly  find construction workers in their local area who are available to repair</p>
        </div>
      </div>
      <div className={style.subintro}>
      <div className={style.imgcontiner}>
        <Image className={style.img} src="/22734556__2_-removebg-preview.png" width={1000}height={1000}></Image>
        </div>
        <div className={style.subtext}>
          <h3>IDK</h3>
          <p>If you are having problems with your house just place an order. choose what u need</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className={style.sec3}>
  <div className={style.content}>
    <div className={style.text3}>
      <h2>About Us</h2>
      <p>We are committed to making building repairs as simple and convenient as possible for everyone. Our objective is to connect customers who need repairs with experienced construction workers who can offer reliable and efficient repairs.</p>
       </div>
    <div className={style.imgs}>
      <div className={style.img1}>
        <Image src='/part-male-construction-worker.jpg' width={200} height={250}/>
      </div>
      <div className={style.img2}>
      <Image src='/electrician-construction-worker-with-beard-overalls-during-installation-sockets-home-renovation-concept (4).jpg' width={200} height={250}/>
      </div>
    </div>
  </div>
</section>

<section className={style.sec4}>
  <div className={style.content}>
    <div className={style.div1}>
      <Image src='/House-Repairs.jpg' fill={true}/><div className={style.s4text}>
      <h2>Our Services</h2>
      </div>
    </div>
    <div  className={style.div}>
      <div className={style.overlay}></div>
      <Image src='/House-Repairs.jpg' fill={true}/>
      <div className={style.s4text}>
      <h2>Efficiency & Quality</h2>
     <p>The application strives to provide efficient and high-quality building repair services by streamlining communication between users and construction workers, providing real-time updates on progress, and enabling seamless and secure payments, while prioritizing quality control to ensure that repairs meet user specifications. </p>
      </div>
    </div>
    <div  className={style.div}>
      <div className={style.overlay2}></div>
      <Image src='/House-Repairs.jpg' fill={true}/>
      <div className={style.s4text}>
      <h2>Flexibility</h2>
      <p>Our app enables users to manage and track repairs for multiple buildings, providing alerts for routine maintenance tasks and historical data on repairs and maintenance.</p>
      </div>
    </div>
    <div  className={style.div}>
      <div className={style.overlay}></div>
      <Image src='/House-Repairs.jpg'fill={true}/>
      <div className={style.s4text}>
      <h2>Convenience</h2>
      <p>Our app is available 24/7, providing users with the flexibility to request assistance at any time of day or night.</p>
      </div>
    </div>
  </div>
</section>

<section className={style.sec5}>
  <div className={style.contnet}>
    <div className={style.text5}>
    <h1>Login</h1>
    <p>pleas log in to have a complate acces to all the </p>
    <Link href={'/login'}>
    <button>lets startsss</button>
    </Link>
    </div>
  </div>
</section>

<section className={style.sec6}> 
  <div className={style.content}>
  <iframe className={style.video} width="560" height="315" src="https://www.youtube.com/embed/LBRT8011kRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe>
  </div>
</section>
  </>
}

export default Home;
