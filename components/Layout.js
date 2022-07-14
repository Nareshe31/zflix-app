import Footer from './Footer'
import Navbar from './Navbar'
import {useRouter} from 'next/router';

export default function Layout({ children }) {
  const router=useRouter()
  return (
    <>
      <Navbar />
      <main >{children}</main>
      {router.pathname != "/404" && router.pathname != "/offline" && router.pathname != "/en/login" && router.pathname != "/en/register" && router.pathname != "/en/u/verify"  && router.pathname!="/en/u/profile" && router.pathname!="/en/u/watchlist" && <Footer />}
    </>
  )
}
