import { toast } from "sonner";

export const errorPostToast = () => {
  toast(`게시글이 생성되지 않았습니다.`, {
    description: "게시글이 생성 에러",
    action: {
      label: "확인",
      onClick: () => console.log("확인 버튼 클릭됨"),
    },
  });
};
