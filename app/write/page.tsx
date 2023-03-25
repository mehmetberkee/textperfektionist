import React from "react";
import ContentWriting from "@/components/ContentWriting";
function Writing() {
  return (
    <div className="flex flex-col justify-center items-center text-center px-6">
      <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-gray-300 sm:text-4xl mt-10">
        Text Generator
      </h1>
      <h2 className="mx-auto mt-2 mb-6 max-w-xl text-md sm:text-gray-400  text-gray-500 leading-7">
        Simply type a few sentences describing the topic and our AI will do the
        rest!
      </h2>
      <ContentWriting />
    </div>
  );
}

export default Writing;
