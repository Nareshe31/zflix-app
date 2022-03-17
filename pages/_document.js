import Document,{ Head,Html,Main,NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      // ...
      <Html>
        <Head>
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
        </Head>
        <Main />
        <NextScript  />
      </Html>
    );
  }
}