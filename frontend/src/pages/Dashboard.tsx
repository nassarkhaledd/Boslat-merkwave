import React from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { isAdminAtom } from "../atoms/tokenAtom";

const Dashboard: React.FC = () => {
  const [isAdmin] = useAtom(isAdminAtom);
  const navigate = useNavigate();

  return (
    <main
      className="w-screen h-screen flex items-center justify-center px-2 bg-[#C1282E]"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <div className="flex flex-col items-center text-right justify-center w-full max-w-md sm:max-w-sm py-6 px-2 md:p-6 sm:p-4 bg-white rounded shadow gap-4">
        {isAdmin && (
          <button
            onClick={() => navigate("/customers")}
            className="w-full py-2 bg-yellow-300 text-black rounded hover:bg-yellow-500 transition"
          >
            عرض العملاء
          </button>
        )}
        <button
          onClick={() => navigate("/new-customer")}
          className="w-full p-2 bg-yellow-300 text-black rounded hover:bg-yellow-500 transition"
        >
          تسجيل عميل
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
