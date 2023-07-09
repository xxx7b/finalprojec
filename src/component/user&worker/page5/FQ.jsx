import React from 'react'
import styel from './FQ.module.css'
import { useSession } from 'next-auth/react'
function Page5() {

  const{data:session}=useSession();
  const usertype=session?.user?.usertype

  return<>
  <section className={`${styel.sec}  ${usertype==='worker'?styel.margn:''}`}>
    <h2>F.A.Q</h2>
    <p>Most asked question</p>
    <div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
  </>
}

export default Page5
