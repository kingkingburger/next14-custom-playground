import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY;

export const currentProfile = async (req) => {
  const session = await getSession({ req });

  if (!session) {
    return null;
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return null;
  }

  try {
    const profile = await getProfileById(decodedToken.id);
    return profile;
  } catch (error) {
    return null;
  }
};

async function getProfileById(userId: string) {
  if (!userId) {
    return;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to fetch posts:", error.message);
    throw error;
  }
  return null;
}
