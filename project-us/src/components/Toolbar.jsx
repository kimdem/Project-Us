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
        window.confirm("PDF로 내보냅니다. 시간이 다소 걸립니다.");
        if(window.confirm) {
            const html = editor.getHTML();
            const response = await fetch('https://project-us-backend.onrender.com/api/DOC/editor_pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'text/html' },
            body: html
        });
            if (!response.ok) {
                alert('PDF 변환 실패');
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
            }
    }; 

    const selectionleft = (command) => {
        const { from, to } = editor.state.selection;
        command();
        setTimeout(() => {
            editor.commands.setTextSelection({ from, to });
            editor.commands.focus();
        }, 0);
    };

    if (!editor) return null;
    return (
        <div className="toolbar">
            <div className="toolbar-menu">
                <button onMouseDown={e=>e.preventDefault()} className={tool === "align" ? "active" : ""} onClick={() => nowtool("align")}>정렬</button>
                <button onMouseDown={e=>e.preventDefault()} className={tool === "style" ? "active" : ""} onClick={() => nowtool("style")}>스타일링</button>
                <button onMouseDown={e=>e.preventDefault()} className={tool === "title" ? "active" : ""} onClick={() => nowtool("title")}>제목</button>
                <button onMouseDown={e=>e.preventDefault()} className={tool === "insert" ? "active" : ""} onClick={() => nowtool("insert")}>표</button>
                <button onMouseDown={e=>e.preventDefault()} className={tool === "special" ? "active" : ""} onClick={() => nowtool("special")}>특수기능</button>
                <button onMouseDown={e=>e.preventDefault()} className={tool === "print" ? "active" : ""} onClick={() => nowtool("print")}>내보내기</button>
                <button onMouseDown={e=>e.preventDefault()} onClick={() => editor.chain().focus().clearNodes().run()}>문단 초기화</button>
            </div><hr></hr><br></br>
            <div className="toolbar-buttons">
                {tool === "align" && (
                    <>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().setTextAlign("left").run())}>왼쪽__</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().setTextAlign("center").run())}>__가운데__</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().setTextAlign("right").run())}>오른쪽__</button>
                    </>
                )}
                {tool === "style" && (
                    <>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleBold().run())}><strong>강조</strong></button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleItalic().run())}><i>기울이기</i></button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleUnderline().run())}><u>밑줄</u></button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleBulletList().run())}>리스트</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleOrderedList().run())}>번호매기기</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleStrike().run())}><strike>취소선</strike></button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleHighlight().run())}>형광펜</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().unsetAllMarks().run())}>스타일 제거</button>
                    </>
                )}
                {tool === "title" && (
                    <>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleHeading({ level: 1 }).run())}>제목1</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleHeading({ level: 2 }).run())}>제목2</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleHeading({ level: 3 }).run())}>제목3</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().setHorizontalRule().run())}>구분선</button>
                    </>
                )}
                {tool === "insert" && (
                    <>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => {
                            if(editor) {
                                editor.commands.insertTable({rows: 2, cols: 2, withHeaderRow: true});
                            }
                        }}>테이블 추가</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() =>editor.commands.addRowBefore()}>위쪽 행 추가</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => editor.commands.addRowAfter()}>아래쪽 행 추가</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() =>editor.commands.addColumnAfter()}>오른쪽 열 추가</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() =>editor.commands.addColumnBefore()}>왼쪽 열 추가</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() =>editor.commands.deleteRow()}>행 삭제</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() =>editor.commands.deleteColumn()}>열 삭제</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() =>editor.commands.deleteTable()}>테이블 삭제</button>
                    </>
                )}
                {tool === "special" && (
                    <>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => selectionleft(()=>editor.chain().focus().toggleBlockquote().run())}>인용</button>
                        <button onMouseDown={e=>e.preventDefault()} onClick={setLink}>하이퍼링크</button>
                    </>
                )}
                {tool === "print" && (
                    <>
                        <button onMouseDown={e=>e.preventDefault()} onClick={() => editor_pdf(editor)}>PDF로 내보내기</button>
                    </>
                )}
            </div>
        </div>
    );
};
export default Toolbar;