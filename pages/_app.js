import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Layout1 from '../components/Layout'

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

  const Layout = Component.Layout || EmptyLayout;
  return (
    <>
      <Navbar />
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
      <Footer />
    </>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;

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
