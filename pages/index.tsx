import Head from "next/head";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";
import Modal from "@/components/modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <Button>Button</Button>
        <Input type="text" id="hello" name="hello" placeholder="Input" />
        <Button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        ></Button>
        {/* modal */}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            console.log("close");
          }}
          onOutsideClick={() => {
            setIsModalOpen(false);
            console.log("outside");
          }}
        >
          testing
        </Modal>
      </main>
    </>
  );
}
