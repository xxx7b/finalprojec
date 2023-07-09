import React, { useState, useEffect } from 'react';
import styel from './nav.module.css';
import Link from 'next/link';
import { TfiAlignJustify } from 'react-icons/tfi';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';


export default function Nav() {
  const [menue, menuefu] = useState(false);
  const storedActiveness = typeof localStorage !== 'undefined' ? localStorage.getItem('activeness') : 'nonactive';
  const [activeness, setActiveness] = useState(storedActiveness || 'nonactive');
  const [notif, setNotif] = useState('');
  const { data: session } = useSession(); // Get the session data

  const path = usePathname();
  console.log(activeness);

  const handleMouseOver = (e) => {
    e.currentTarget.classList.add(styel.active);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove(styel.active);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleActiveness = async () => {
    const updatedActiveness = activeness === 'active' ? 'nonactive' : 'active';
    setActiveness(updatedActiveness);
    localStorage.setItem('activeness', updatedActiveness);

    if (updatedActiveness === 'nonactive') {
      setNotif('You are not active anymore');
    } else if (updatedActiveness === 'active') {
      setNotif('You are now active');
    }

    try {
      const response = await fetch('/api/activeness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: session?.user?.name, activeness: updatedActiveness }),
      });

      if (!response.ok) {
        throw new Error('Failed to update activeness');
      }

      // Handle the response as needed
      // For example, you can check response status or parse the JSON response
    } catch (error) {
      console.error('An error occurred during activeness update:', error);
    }

    setTimeout(() => {
      setNotif('');
    }, 3000);
  };

  return (
    <>
      <section className={styel.continer}>
        <div className={styel.content}>
          <div className={styel.leftside}>
          {path ==='/home'? <Image src='/a2765f99ae094bc5b84db364f52bddc4-removebg-preview.png' height={70} width={90}></Image>:'logo'}
            </div>
          <div className={styel.rightsid}>
            {path !== '/home' ? (
              <ul className={styel.show}>
                <li className={styel.active} onClick={handleLogout}>
                  <Link className={styel.link} href={''}>
                    {session ? 'log out' : 'login'}
                  </Link>
                </li>
                {session?.user?.usertype === 'user' ? (
                  ''
                ) : (
                  <li>
                    {session?.user?.name === 'Dheya' && session?.user?.email === 'dheya77@gmail.com' ? (
                      <div className={styel.desplyer}>
                        activeness
                        <div className={`${styel.togolcontiner} ${styel.transsion}`}>
                          <div className={activeness === 'active' ? styel.active : ''} onClick={handleActiveness}></div>
                          <div className={activeness === 'nonactive' ? styel.nonactive : ''} onClick={handleActiveness}></div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </li>
                )}
              </ul>
            ) : (
              <ul className={styel.show}>
                <li className={styel.active}>
                  <Link className={styel.link} href="/login">
                    login
                  </Link>
                </li>
                <li onMouseOver={handleMouseOver}>
                  <Link className={styel.link} href="/About">
                    About us
                  </Link>
                </li>
                <li onMouseOver={handleMouseOver}>
                  <Link className={styel.link} href="/Services">
                    Services
                  </Link>
                </li>
                <li onMouseOver={handleMouseOver}>
                  <Link className={styel.link} href="/Contacts">
                    CONTACT
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className={styel.menue}>
            <button
              onClick={() => {
                menuefu(!menue);
              }}
            >
              <TfiAlignJustify />
            </button>
            {menue ? (
              <>
                <div className={styel.hidmenue}>
                  {path !== '/home' ? (
                    <ul className={styel.show}>
                      <div className={styel.displyerr}>
                        <Link className={styel.link} href={!session ? '/login' : '/home'}>
                          {session ? 'log out' : 'log in'}
                        </Link>

                        {session?.user?.usertype === 'user' ? (
                          ''
                        ) : (
                          <div className={styel.desplyer}>
                            activeness
                            <div className={`${styel.togolcontiner} ${styel.transsion}`}>
                              <div className={activeness === 'active' ? styel.active : ''} onClick={handleActiveness}></div>
                              <div className={activeness === 'nonactive' ? styel.nonactive : ''} onClick={handleActiveness}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ul>
                  ) : (
                    <ul className={styel.show}>
                      <li className={styel.active}>
                        <Link className={styel.link} href="/login">
                          login
                        </Link>
                      </li>
                      <li onMouseOver={handleMouseOver}>
                        <Link className={styel.link} href="/About">
                          About us
                        </Link>
                      </li>
                      <li onMouseOver={handleMouseOver}>
                        <Link className={styel.link} href="/Services">
                          Services
                        </Link>
                      </li>
                      <li onMouseOver={handleMouseOver}>
                        <Link className={styel.link} href="/Contacts">
                          CONTACT
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <p>{notif}</p>
      </section>
    </>
  );
}
