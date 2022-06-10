import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout1 from '../components/Layout'
import { useEffect, useState } from "react";
import axios from "axios";
import NextNProgress from "nextjs-progressbar";
import { loadProgressBar } from 'axios-progress-bar'

//Store imports
import {store,wrapper} from '../store/index';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { dataLoaded, loginUser } from "../store/actions";
import LoadingScreen from "../components/screens/LoadingScreen";
import { getCookie } from "cookies-next";

loadProgressBar()

function MyApp({ Component, pageProps, router }) {
  // eval(
  //   (function (p, a, c, k, e, d) {
  //     e = function (c) {
  //       return c.toString(36);
  //     };
  //     if (!"".replace(/^/, String)) {
  //       while (c--) {
  //         d[c.toString(a)] = k[c] || c.toString(a);
  //       }
  //       k = [
  //         function (e) {
  //           return d[e];
  //         },
  //       ];
  //       e = function () {
  //         return "\\w+";
  //       };
  //       c = 1;
  //     }
  //     while (c--) {
  //       if (k[c]) {
  //         p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
  //       }
  //     }
  //     return p;
  //   })(
  //     "(3(){(3 a(){8{(3 b(2){7((''+(2/2)).6!==1||2%5===0){(3(){}).9('4')()}c{4}b(++2)})(0)}d(e){g(a,f)}})()})();",
  //     17,
  //     17,
  //     "||i|function|debugger|20|length|if|try|constructor|||else|catch||5000|setTimeout".split(
  //       "|"
  //     ),
  //     0,
  //     {}
  //   )
  // );
 
  const [mounted, setMounted] = useState(false)
  const {user}=useSelector(state=>state)

  const dispatch=useDispatch()

  if(!mounted){
    if (typeof(window)!== "undefined") {
      const token=getCookie('token')
      // const token=window.localStorage.getItem('token') ? localStorage.getItem('token'): null
      if(token!==undefined){
        axios.get("https://zflix-backend.herokuapp.com/api/v2/user-details/"+token).then((res)=>{
          dispatch(loginUser(res.data.user))
          dispatch(dataLoaded())
        }) 
      }
      else{
        dispatch(dataLoaded())
      }
    }
  }

  const handleRouteChange = (url) => {
    window.gtag("config", "G-8FMMTY6M6W", {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    try {
      // axios.post(
      //   "https://zflix-backend.herokuapp.com/api/v2/add-page-request",
      //   { url: router.asPath, requested_at: new Date() }
      // );

    } catch (error) { 
      console.log(error);
    }
    return () => { };
  }, [router.asPath,router.events]);

  useEffect(() => {
    setMounted(true)
  }, [])

  // const Layout = Component.Layout || EmptyLayout;
 
    return (
      <>{!user.userDataLoaded?
        <LoadingScreen  />
        :
        <Provider store={store}>
          <NextNProgress color="#c50510" height={2} />
          <Layout1>
            <Component {...pageProps} key={router.asPath} />
          </Layout1>
        </Provider>
  }
      </>
    );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default wrapper.withRedux(MyApp);


//   (function () {
//     (function a() {
//         try {
//             (function b(i) {
//                 if (("" + i / i).length !== 1 || i % 20 === 0) {
//                     (function () {}.constructor("debugger")());
//                 } else {
//                     debugger;
//                 }
//                 b(++i);
//             })(0);
//         } catch (e) {
//             setTimeout(a, 5000);
//         }
//     })();
// })();
