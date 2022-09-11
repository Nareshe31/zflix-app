import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      {/* <!-- Google Tag Manager (noscript) --> */}
      {/* <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N4N8H7V"
          height="0"
          width="0"
          style={{"display":"none","visibility":"hidden"}}
        ></iframe>
      </noscript> */}
      {/* <!-- End Google Tag Manager (noscript) --> */}
      <Navbar />
      <main>{children}</main>
      {router.pathname != "/404" &&
        router.pathname != "/offline" &&
        router.pathname != "/en/login" &&
        router.pathname != "/en/register" &&
        router.pathname != "/en/u/verify" &&
        router.pathname != "/en/u/profile" &&
        router.pathname != "/en/u/watchlist" && <Footer />}
    </>
  );
}
