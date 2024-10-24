"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

const TiptapComponent = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content, // 초기 콘텐츠 설정
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
        style: "min-height: 400px;",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML()); // HTML 형태로 저장
    },
  });

  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />

      <EditorContent
        style={{ whiteSpace: "pre-line", minHeight: "400px" }}
        editor={editor}
      />
    </div>
  );
};

export default TiptapComponent;
