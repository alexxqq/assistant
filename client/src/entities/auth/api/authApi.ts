import { API } from "@/src/shared/endpoints";

export const fetchUser = async () => {
    const response = await fetch(API.me, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    return await response.json();
}

export const logout = async () => {
    const response = await fetch(API.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to logout");
    }

    return await response.json();
}