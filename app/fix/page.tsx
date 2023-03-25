import React from "react";
import Content from "@/components/Content";
import Head from "next/head";
function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center px-6">
      <Head>
        <title>TextFixer</title>
      </Head>
      <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-gray-300 sm:text-4xl mt-10">
        Text Corrector
      </h1>
      <h2 className="mx-auto mt-2 mb-6 max-w-xl text-md sm:text-gray-400  text-gray-500 leading-7">
        Eliminate Typos, Grammatical Errors, and Awkward Phrasing with Our AI
      </h2>
      <Content />
    </div>
  );
}

export default Home;
