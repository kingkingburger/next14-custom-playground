export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const useCustomFetch = async (
  url: string,
  options: FetchOptions = {},
) => {
  const accessToken = localStorage.getItem("access-token") || "";

  const headers = {
    ...options.headers,
    "access-token": accessToken,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const newAccessToken = response.headers.get("access-token") || "";
    if (response.status === 401) {
      localStorage.setItem("access-token", newAccessToken);
      // handle token expiration, e.g., redirect to login
    }

    const message = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? (await response.json()).message
      : "An error occurred";

    throw new Error(message);
  }

  const data = await response.json();
  return data;
};
