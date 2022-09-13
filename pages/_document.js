import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      // ...
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="google-site-verification"
            content="Y18D4bzANlD1TP1aLl21MutvmIAcf8QIIwnmjhVfZ1o"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8FMMTY6M6W"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-8FMMTY6M6W', { page_path: window.location.pathname });
              `,
            }}
          />

          {/* Owl carousel theme */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" integrity="sha512-sMXtMNL1zRzolHYKEujM2AqCLUR9F2C4/05cdbxjjLSRvMQIciEPCQZo++nk7go3BtSuK9kfa/s+a4f4i5pLkw==" crossorigin="anonymous" referrerpolicy="no-referrer" />


          {/* <!-- Google Tag Manager --> */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){
              w[l] = w[l] || [];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N4N8H7V');`,
            }}
          /> */}
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
