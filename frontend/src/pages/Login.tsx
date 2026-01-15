import React, { useState } from "react";
import type { FormEvent } from "react";

import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom, isAdminAtom } from "../atoms/tokenAtom"; 

import InputField from "../components/InputField";
import { LOGIN_ENDPOINT } from "../config/config";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();
  const [, setIsAdmin] = useAtom(isAdminAtom);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { email: string; password: string };
    console.log("Sending login data:", data);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.message || "Login failed");
        return;
      }

      const result = await response.json();
      console.log("API response:", result);

      if (result.token) {
        localStorage.setItem("token", result.token);
        setToken(result.token);

        localStorage.setItem("isAdmin", String(result.isAdmin));
        setIsAdmin(result.isAdmin);

        setError("");


        navigate("/dashboard");
        
      }
      else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network or server error");
    }
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center px-2 bg-[#C1282E]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center text-right justify-center w-full max-w-md sm:max-w-sm py-6 px-2 md:p-6 sm:p-4 bg-white rounded shadow"
      >
        <h2 className="text-4xl sm:text-3xl mb-8 text-center">تسجيل الدخول</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <InputField name="email" label="البريد الإلكتروني" type="text" placeholder="ادخل البريد الإلكتروني" />
        <InputField name="password" label="كلمة المرور" type="password" placeholder="ادخل كلمة المرور" />

        <button type="submit" className="mt-4 bg-[#C1282E] text-white py-2 px-1 md:px-4 rounded hover:bg-[#a01e1e] w-full">
          تسجيل الدخول
        </button>
      </form>
    </main>
  );
};

export default Login;
