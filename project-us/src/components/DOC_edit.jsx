import React from "react";
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Textsize from "../js/Textsize"
import Toolbar from "./Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import io from "socket.io-client";
import ParagraphMeta from "../js/ParagraphMeta"

const socket = io("http://localhost:5000");

const DOC_edit = ({docId}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Textsize, TextStyle, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    ParagraphMeta,
  ],
    content: "<p>문서를 시작하세요...</p>",
  });


const typingtime = useRef(null);
const Updatetime = useRef({});

const Autosave = async() => {
  const json = editor.getJSON();
  const blocks = json.content || [];


  let update = false;
  blocks.forEach(block => {
    if(block.type !== "paragraph" && block.type !== "heading") {return;}

    const {id, time} = block.attrs || {};
    if(!id || !time) {return;}

    const newtime = new Date(time);
    const oldtime = Updatetime.current[id] ? new Date(Updatetime.current[id]) : null;

    if(!oldtime || newtime > oldtime) {
      Updatetime.current[id] = newtime.toISOString();
      update = true;
    }
  });
  if (update) {
    const html = editor.getHTML();
    const res = await fetch("http://localhost:5000/api/DOC/saveDOC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ DOC_id: docId, msg: html }),
    });

    const data = await res.json();
    if(!data.success) {
      console.log("백앤드 저장 실패", data);
    }
  }
};

useEffect(() => {
  if (!editor) {return;}

  const Typing = () => {
    clearTimeout(typingtime.current);
    typingtime.current = setTimeout(() => {
      Autosave();
    }, 1000);
  };

  editor.on("update", Typing);

  return () => {
    clearTimeout(typingtime.current);
    editor.off("update", Typing);
  };
}, [editor]);

useEffect(() => {
  if(!editor || !docId) {return;}
  const loadcontent = async() => {
    try {
      const res = await fetch(`http://localhost:5000/api/DOC/loadDOC/${docId}`);
      const data = await res.json();
      if(data.content) {
        editor.commands.setContent(data.content);
      }
    } catch(err) {
      console.log(err);
    }
  };
  loadcontent();
}, [editor, docId]);

// text1: 입력전송 || text2: 입력받기
useEffect(() => {
  if(!editor || !docId) {return;}

  const UpdateDoc = () => {
    const text1 = editor.getHTML();
    socket.emit("docEdit", {docId, content: text1});
  };
  
  const UpdateReceive = (text2) => {
    if(editor.getHTML() !== text2) {
      editor.commands.setContent(text2);
    }
  };

  socket.emit("joinDOC", `DOC_${docId}`);

  editor.on("update", UpdateDoc);
  socket.on("docUpdate", UpdateReceive);

  return () => {
    editor.off("update", UpdateDoc);
    socket.off("docUpdate", UpdateReceive);
  };
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
      </div>
      <EditorContent editor={editor}/>
    </main> 
  );
};

export default DOC_edit;
