import ky from "@toss/ky";

const api = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER}/comment`,
  hooks: {
    beforeRequest: [
      (request: any) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async (error: any) => {
        const { response } = error;
        if (response) {
          const data = await response.json();
          error.message = data.message || "요청 처리 중 오류가 발생했습니다.";
        }
        return error;
      },
    ],
  },
});
