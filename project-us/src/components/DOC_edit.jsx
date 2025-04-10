import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Textsize from "../js/Textsize"
import Toolbar from "./Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

const DOC_edit = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Textsize, TextStyle, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),],
    content: "<p>문서를 시작하세요...</p>",
  });

  const changesize = (e) => {
    const size = e.target.value;
    if (!size) return;
    editor.chain().setTextSize(`${size}px`).run();
  };

  return (
    <main className="doc-editor">
      <Toolbar editor={editor}/>
      <div>
        <label>폰트크기: <input type="number" step="1" defaultValue={10} onBlur={changesize} className=""></input></label>
      </div>
      <EditorContent editor={editor}/>
    </main> 
  );
};

export default DOC_edit;
