export const fetchUser = async () => {
    const response = await fetch("http://localhost:8000/auth/me", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    return await response.json();
}

export const logout = async () => {
    const response = await fetch("http://localhost:8000/auth/logout", {
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