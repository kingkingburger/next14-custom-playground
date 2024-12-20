import ky from "@toss/ky";

export const globalApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
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
