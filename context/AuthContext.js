import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const signup = async (user) => {
    const res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/dashboard/tasks");
    } else {
      setError(data.message);
      setError(null);
    }
    console.log("User: ", user);
  };

  // Login user
  const login = async ({ email, password }) => {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/dashboard/tasks");
    } else {
      setError(data.message);
      setError(null);
    }
    console.log(`Email: ${email}, password: ${password}`);
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
