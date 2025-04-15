import React from "react";
import { useEffect } from "react";
import { useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Textsize from "../js/Textsize"
import Toolbar from "./Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";


const DOC_edit = ({docId}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Textsize, TextStyle, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),],
    content: "<p>문서를 시작하세요...</p>",
  });

  const saveDOC = async () => {
    const msg = editor.getHTML();
    try {
        const res = await fetch(`http://localhost:5000/api/DOC/saveDOC`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ DOC_id: docId, msg }),
        });
        const data = await res.json();
        if(data.success) {
            alert("저장 완료");
        } else {
            alert("저장 오류");
        }
    } catch(err) {
        console.log("save error: ", err);
    }
};
useEffect(() => {
  const loadcontent = async() => {
    try {
      const res = await fetch(`http://localhost:5000/api/DOC/loadDOC/${docId}`);
      const data = await res.json();
      if(editor && data.content) {
        editor.commands.setContent(data.content);
      }
    } catch(err) {
      console.log(err);
    }
  };
  if(editor) {loadcontent();}
}, [editor, docId]);

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
        <button onClick={saveDOC} className="btn btn-primary">저장</button>
      </div>
      <EditorContent editor={editor}/>
    </main> 
  );
};

export default DOC_edit;
