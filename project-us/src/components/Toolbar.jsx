import React from "react";
import {useState} from "react";
import "../css/tool.css"

const Toolbar = ({ editor }) => {
    const [tool, nowtool] = useState("allign");

    const setLink = () => {
        const url = prompt("하이퍼링크를 입력하세요");
        if(url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const editor_pdf = async (editor) => {
        const html = editor.getHTML();
        const response = await fetch('https://project-us-backend.onrender.com/api/DOC/editor_pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'text/html' },
            body: html
        });

        if (!response.ok) {
            alert('Failed to generate PDF');
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }; 

    if (!editor) return null;
    return (
        <div className="toolbar">
            <div className="toolbar-menu">
                <button className={tool === "align" ? "active" : ""} onClick={() => nowtool("align")}>정렬</button>
                <button className={tool === "style" ? "active" : ""} onClick={() => nowtool("style")}>스타일링</button>
                <button className={tool === "title" ? "active" : ""} onClick={() => nowtool("title")}>제목</button>
                <button className={tool === "insert" ? "active" : ""} onClick={() => nowtool("insert")}>표</button>
                <button className={tool === "special" ? "active" : ""} onClick={() => nowtool("special")}>특수기능</button>
                <button className={tool === "print" ? "active" : ""} onClick={() => nowtool("print")}>내보내기</button>
                <button onClick={() => editor.chain().focus().clearNodes().run()}>문단 초기화</button>
            </div><hr></hr><br></br>
            <div className="toolbar-buttons">
                {tool === "align" && (
                    <>
                        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>왼쪽__</button>
                        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>__가운데__</button>
                        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>오른쪽__</button>
                    </>
                )}
                {tool === "style" && (
                    <>
                        <button onClick={() => editor.chain().focus().toggleBold().run()}><strong>강조</strong></button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()}><i>기울이기</i></button>
                        <button onClick={() => editor.chain().focus().toggleUnderline().run()}><u>밑줄</u></button>
                        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>리스트</button>
                        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>번호매기기</button>
                        <button onClick={() => editor.chain().focus().toggleStrike().run()}><strike>취소선</strike></button>
                        <button onClick={() => editor.chain().focus().toggleHighlight().run()}>형광펜</button>
                        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>스타일 제거</button>
                    </>
                )}
                {tool === "title" && (
                    <>
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>제목1</button>
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>제목2</button>
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>제목3</button>
                        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>구분선</button>
                    </>
                )}
                {tool === "insert" && (
                    <>
                        <button onClick={() => {
                            if(editor) {
                                editor.commands.insertTable({rows: 2, cols: 2, withHeaderRow: true});
                            }
                        }}>테이블 추가</button>
                        <button onClick={() => editor.commands.addRowAfter()}>위쪽 행 추가</button>
                        <button onClick={() => editor.commands.addRowBefore()}>아래쪽 행 추가</button>
                        <button onClick={() => editor.commands.addColumnAfter()}>오른쪽 열 추가</button>
                        <button onClick={() => editor.commands.addColumnBefore()}>왼쪽 열 추가</button>
                        <button onClick={() => editor.commands.deleteRow()}>행 삭제</button>
                        <button onClick={() => editor.commands.deleteColumn()}>열 삭제</button>
                        <button onClick={() => editor.commands.deleteTable()}>테이블 삭제</button>
                    </>
                )}
                {tool === "special" && (
                    <>
                        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>인용</button>
                        <button onClick={setLink}>하이퍼링크</button>
                    </>
                )}
                {tool === "print" && (
                    <>
                        <button onClick={() => editor_pdf(editor)}>PDF로 내보내기</button>
                    </>
                )}
            </div>
        </div>
    );
};
export default Toolbar;