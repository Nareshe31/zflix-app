import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    let overview ="ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";
    const base_url="https://zflix-app.netlify.app/en"
    return (
      // ...
      <Html>
        <Head>
          <title>ZFlix - Watch Movies & TV Shows</title>
          <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
          <meta name="description" content={overview} />
          <meta
            name="keywords"
            content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={base_url} />
          <meta property="og:site_name" content="ZFlix" />
          <meta
            property="og:title"
            content={"ZFlix - Watch Movies & TV Shows"}
          />
          <meta property="og:description" content={overview} />
          <meta property="og:image" content="/icons/apple-touch-icon.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={base_url} />
          <meta
            property="twitter:title"
            content={"ZFlix - Watch Movies & TV Shows"}
          />
          <meta property="twitter:description" content={overview} />
          <meta
            property="twitter:image"
            content="/icons/apple-touch-icon.png"
          ></meta>

          <link rel="manifest" href="/manifest.json" />
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
        <NextScript />
      </Html>
    );
  }
}
