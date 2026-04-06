import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

export default class MediappDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    const env = {
      NEXT_PUBLIC_API_URL:
        process.env.MEDIAPP_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || "",
      NEXT_PUBLIC_PUBLIC_URL:
        process.env.MEDIAPP_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_PUBLIC_URL ||
        "",
    };

    return (
      <Html lang="es">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__MEDIAPP_ENV__=${JSON.stringify(env)};`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
