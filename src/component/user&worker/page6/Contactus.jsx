import { useSession } from 'next-auth/react';
import React, { useState, useRef } from 'react';
import style from './contect.module.css';

function Page6() {
  const { data: session } = useSession();
  const [notif, setNotif] = useState('');
  const usertype = session?.user?.usertype;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotif('Thank you, your message has been submitted');

    // Reset input field values
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';

    setTimeout(() => {
      setNotif('');
    }, 3000);
  };

  return (
    <>
      <section className={`${style.sec} ${usertype === 'worker' ? style.margin : ''}`}>
        <h2>Contact us</h2>
        <p>Please contact us if you have any issues</p>
        <div>
          <form>
            <div className={style.content}>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef} />
              </div>
            </div>
            <div className={style.textarea}>
              <h5>Please write your message here</h5>
              <textarea id="message" placeholder="Your message" rows="10" ref={messageRef}></textarea>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        <p>{notif}</p>
      </section>
    </>
  );
}

export default Page6;
