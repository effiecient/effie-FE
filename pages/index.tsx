import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Effie</title>
        <meta name="description" content="All your links, in one place." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Paragraph</p>
        <a href="#">Link</a>
        <button>Button</button>
        <input type="text" placeholder="Input" />
      </main>
    </>
  );
}
