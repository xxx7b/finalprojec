import Image from 'next/image'
import styel from './footer.module.css'
import { FaFacebookF ,FaInstagram,FaTiktok,FaTwitter} from "react-icons/fa";
import Link from 'next/link';
function Footer() {
  return (
      <footer className={styel.footer}>
        <div className={styel.content}>
          <div className={styel.right}>
            <h2>Buildio</h2>
            <div>
              <div className={styel.imgcontiner}>
              <Image className={styel.img} src='/a2765f99ae094bc5b84db364f52bddc4-removebg-preview.png' width={100} height={100}/>
              </div>
            </div>
            <div>
              <h4>Find us</h4>
              <div className={styel.icons}>
                <div><FaFacebookF/></div>
                <div><FaInstagram/></div>
                <div><FaTiktok/></div>
                <div><FaTwitter/></div>

              </div>
              <p>Don't let building damage bring you down – we've got you covered.</p>
            </div>
          </div>
          <div className={styel.left}>
            <div>
              <h3>Quick Links</h3>
              <div className={styel.links}>
              <Link href=''><h4>About Us</h4></Link>
              <Link href=''><h4>Our Services</h4></Link>
              <Link href=''><h4>Contacts</h4></Link>
              </div>
            </div> 
            <p>Biningging © Buildio  All rights reserved Copyrights 2020</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
