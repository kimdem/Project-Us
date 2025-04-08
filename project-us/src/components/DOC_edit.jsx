import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const DOC_edit = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>문서를 시작하세요...</p>",
  });

  return (
    <main className="doc-editor">
      <EditorContent editor={editor}/>
    </main> 
  );
};

export default DOC_edit;
