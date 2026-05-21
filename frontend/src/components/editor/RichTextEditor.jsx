"use client";

import dynamic
from "next/dynamic";

import
"react-quill-new/dist/quill.snow.css";

const ReactQuill =
  dynamic(

    () =>
      import(
        "react-quill-new"
      ),

    {
      ssr: false,
    }

  );

export default function
RichTextEditor({

  value,

  setValue,

}) {

  const modules = {

    toolbar: [

      [{ header: [1, 2, 3, false] }],

      ["bold", "italic", "underline"],

      [{ list: "ordered" }],

      [{ list: "bullet" }],

      ["link"],

      ["clean"],

    ],

  };

  return (

    <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      border
    "
    >

      <ReactQuill

        theme="snow"

        value={value}

        onChange={setValue}

        modules={modules}

        placeholder="
        Write your blog content...
        "

      />

    </div>

  );

}