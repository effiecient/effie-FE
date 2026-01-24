import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script defer src="https://cloud.umami.is/script.js" data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}></script>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
