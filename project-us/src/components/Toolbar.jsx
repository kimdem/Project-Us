import React from "react";

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex gap-2 bg-gray-800 p-2 rounded-md text-white">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-pink-500 px-2 rounded' : 'px-2'}>강조</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-pink-500 px-2 rounded' : 'px-2'}>기울이기</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-pink-500 px-2 rounded' : 'px-2'}>밑줄</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-pink-500 px-2 rounded' : 'px-2'}>제목</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-pink-500 px-2 rounded' : 'px-2'}>리스트</button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 text-red-400">초기화</button>
        <tr></tr>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>왼쪽</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>가운데</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>오른쪽</button>
        </div>
        
        
    );
};
export default Toolbar;