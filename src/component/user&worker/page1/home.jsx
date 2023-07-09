import { useSession } from 'next-auth/react'
import React from 'react'
import style from'./p1.module.css';
function Page1() {
    const {data:session}=useSession();
    // console.log(session)
    const usertpe=session?.user?.usertype;
    
  return <>
  {usertpe==='worker'?<section className={style.sec}>
    <div className={style.content}>
      <h2>hello <span> {session?.user.name}</span></h2>
      <p>how can we help you today </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quas iusto. Adipisci alias assumenda repellendus voluptatibus accusantium. Debitis nisi consequuntur facilis, officiis voluptas alias beatae fuga dolorem ea quas repellendus!</p>
    </div>
  </section>:''}

  {usertpe==='user'?<section className={style.sec}>
  <div className={style.content}>
      <h2>hello <span> {session?.user.name}</span></h2>
      <p>how can we help you today </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quas iusto. Adipisci alias assumenda repellendus voluptatibus accusantium. Debitis nisi consequuntur facilis, officiis voluptas alias beatae fuga dolorem ea quas repellendus!</p>
    </div>
    </section>:''}
  </>
}

export default Page1
