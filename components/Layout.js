import Footer from './Footer'
import Navbar from './Navbar'
import router from 'next/router';

export default function Layout({ children }) {
  console.log(router,"router123");
  return (
    <>
      <Navbar />
      <main >{children}</main>
      {router.pathname != "/404" && router.pathname != "/offline" && router.pathname != "/en/login"  && <Footer />}
    </>
  )
}
