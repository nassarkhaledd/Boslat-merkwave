import React, { useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/tokenAtom";
import logo from "../assets/logo.webp";
import InputField from "../components/InputField";
import { API_NEW_CUS } from "../config/config"; 
import { useNavigate } from "react-router-dom";

const NewCustomer = () => {

  const [token] = useAtom(tokenAtom);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const companyName = formData.get("companyName")?.toString().trim();
  const file = formData.get("photo");

  if ((!companyName || companyName === "") && (!file || (file as File).size === 0)) {
    alert("Please provide either a company name or upload a file.");
    return;
  }

  try {
    const res = await fetch(`${API_NEW_CUS}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to create customer:", errorText);
      alert("Failed to create customer. See console for details.");
      return;
    }

    alert("Customer created successfully!");
    navigate("/dashboard");
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error occurred. Please try again.");
  }
};


const [selectedFile, setSelectedFile] = useState<File | null>(null);


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setSelectedFile(e.target.files[0]);
  } else {
    setSelectedFile(null);
  }
};


  return (
    <main
      className="max-w-screen min-h-screen flex items-center justify-center px-2 bg-[#C1282E]"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <section className="flex flex-col items-center justify-center gap-4 md:gap-8 md:w-2/3 lg:w-1/2 bg-white p-4 my-2 rounded-xl">
        <img src={logo} alt="Logo" className="w-1/2 h-full py-4 " />
        <form className="felx flex-col items-center justify-center w-full gap-3" onSubmit={handleSubmit}>
          <InputField name="companyName" label="اسم الشركة" />
          <InputField name="person1Name" label="اسم الشخص المسؤول" />
          <InputField name="person1Phone" label="رقم التليفون" />
          <InputField name="person1Job" label="وظيفته" />
          <InputField name="person1Email" label="email" type="email" />

          <InputField name="person2Name" label="اسم الشخص المسؤول 2" />
          <InputField name="person2Phone" label="رقم التليفون 2" />
          <InputField name="person2Job" label="وظيفته 2" />
          <InputField name="person2Email" label="email 2" type="email" />
          <div className="w-full h-2 bg-red-800 rounded-full"></div>
          <h3 className="text-center text-3xl mt-3 font-medium">العنوان</h3>
          <InputField name="country" label="الدولة" />
          <InputField name="city" label="المدينة" />
          <InputField name="block" label="المنطقة" />
          <div className="w-full h-2 bg-red-800 rounded-full"></div>
          <h3 className="text-center text-3xl mt-3 font-medium">
            اهتمامات العميل
          </h3>
          <InputField name="industry" label="الصناعة" />
          <InputField name="products" label="المنتجات المهتم بها " />
          <div className="w-full h-2 bg-red-800 rounded-full"></div>

          <h3 className="text-center text-3xl mt-3 font-medium">
            ملاحظات اخرى
          </h3>
          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="notes" className="mb-1 text-black font-semi-bold text-right">ملاحظات </label>

              <textarea
                className=" p-2 w- border text-right border-yellow-400 rounded-md focus:outline-none w-full focus:ring-2 focus:ring-yellow-500"
                rows={3}
                name="notes"
              ></textarea>
          </div>
          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="customerType" className="mb-1 text-black font-semi-bold text-right">نوع العميل</label>

              <select
                name="customerType"
                className="border border-yellow-400 rounded-md focus:outline-none w-full focus:ring-2 focus:ring-yellow-500 p-2"
              >
              <option value="" className="text-right">اختار </option>
              <option value="مستورد" className="text-right">مستورد( كبار عملاء)</option>
              <option value="موزع" className="text-right">شركة تجاريه(موزع)</option>
              <option value="محل تجارى" className="text-right">محل تجارى</option>
              <option value="مصنع" className="text-right">مصنع </option>
              <option value="مستخدم نهائى" className="text-right">مستخدم نهائى</option>
            </select>
          </div>

        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="photo" className="mb-1 text-black font-semi-bold text-right">
            ارفاق صورة 
          </label>
          <label
            htmlFor="photo"
            className="cursor-pointer bg-yellow-400 text-black py-2 px-4 rounded-md text-center hover:bg-yellow-500 transition w-full"
          >
            {selectedFile ? selectedFile.name : "اختر صورة"}
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>


        <button
          type="submit"
          className="mt-4 bg-[#C1282E] text-white py-2 px-1 md:px-4 rounded hover:bg-[#a01e1e] w-full"
        >
          تسجيل العميل
        </button>
        </form>
      </section>
    </main>
  );
};

export default NewCustomer;
