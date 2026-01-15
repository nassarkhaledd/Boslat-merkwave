import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.webp";
import InputField from "../components/InputField";
import { API_NEW_CUS, API_BASE_URL } from "../config/config";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/tokenAtom";

interface Customer {
  id: string;
  companyName: string;
  person1Name: string;
  person1Phone: string;
  person1Job: string;
  person1Email: string;
  person2Name?: string;
  person2Phone?: string;
  person2Job?: string;
  person2Email?: string;
  country: string;
  city: string;
  block: string;
  industry: string;
  products: string;
  notes?: string;
  customerType?: string;
  contacted?: boolean;
  photoPath?: string;
  createdBy: string;
}

const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const customerId = parseInt(id || "0", 10);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [token] = useAtom(tokenAtom);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Fetch customer details
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id || !token) return;

      try {
        const res = await fetch(`${API_NEW_CUS}/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Customer not found");

        const data = await res.json();
        setCustomer(data);

        if (data.photoPath)
          setPhotoPreview(`${API_BASE_URL}/${data.photoPath}`);
      } catch (err) {
        console.error(err);
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, token]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !customer) return;

    const formData = new FormData(e.currentTarget);

    // Include Id in FormData for update
    formData.set("Id", customerId.toString());

    // Send contacted as "true" or "false"
    const contactedValue = formData.get("contacted") as string;
    formData.set("Contacted", contactedValue); // matches DTO property name

    try {
      const res = await fetch(API_NEW_CUS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (res.ok) {
        alert("تم تحديث العميل بنجاح!");
        if (result.photoPath)
          setPhotoPreview(`${API_BASE_URL}/${result.photoPath}`);
        setCustomer(result);
      } else {
        alert("حدث خطأ: " + (result.message || "خطأ غير معروف"));
      }
    } catch (err) {
      console.error("Failed to submit", err);
      alert("حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!customer)
    return <div className="text-center mt-10">Customer not found</div>;

  return (
    <main
      className="max-w-screen min-h-screen flex items-center justify-center px-2 bg-[#C1282E]"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <section className="flex flex-col items-center justify-center gap-4 md:gap-8 bg-white p-4 my-2 rounded-xl w-full md:w-2/3">
        <img src={logo} alt="Logo" className="w-1/2 h-full py-4 " />
        <form
          className="flex flex-col items-center justify-center w-full gap-3"
          onSubmit={handleSubmit}
        >
          <InputField
            name="createdBy"
            label="تم التسجيل بواسطة"
            value={customer.createdBy}
            canEdit={false}
          />
          <InputField
            name="companyName"
            label="اسم الشركة"
            value={customer.companyName}
          />
          <InputField
            name="person1Name"
            label="اسم الشخص المسؤول"
            value={customer.person1Name}
          />
          <InputField
            name="person1Phone"
            label="رقم التليفون"
            value={customer.person1Phone}
          />
          <InputField
            name="person1Job"
            label="وظيفته"
            value={customer.person1Job}
          />
          <InputField
            name="person1Email"
            label="email"
            type="email"
            value={customer.person1Email}
          />

          <InputField
            name="person2Name"
            label="اسم الشخص المسؤول 2"
            value={customer.person2Name || ""}
          />
          <InputField
            name="person2Phone"
            label="رقم التليفون 2"
            value={customer.person2Phone || ""}
          />
          <InputField
            name="person2Job"
            label="وظيفته 2"
            value={customer.person2Job || ""}
          />
          <InputField
            name="person2Email"
            label="email 2"
            type="email"
            value={customer.person2Email || ""}
          />

          <div className="w-full h-2 bg-red-800 rounded-full"></div>

          {/* Address */}
          <h3 className="text-center text-3xl mt-3 font-medium">العنوان</h3>
          <InputField name="country" label="الدولة" value={customer.country} />
          <InputField name="city" label="المدينة" value={customer.city} />
          <InputField name="block" label="المنطقة" value={customer.block} />

          <div className="w-full h-2 bg-red-800 rounded-full"></div>

          {/* Interests */}
          <h3 className="text-center text-3xl mt-3 font-medium">
            اهتمامات العميل
          </h3>
          <InputField
            name="industry"
            label="الصناعة"
            value={customer.industry}
          />
          <InputField
            name="products"
            label="المنتجات المهتم بها"
            value={customer.products}
          />

          <div className="w-full h-2 bg-red-800 rounded-full"></div>

          {/* Notes */}
          <h3 className="text-center text-3xl mt-3 font-medium">ملاحظات اخرى</h3>
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="notes"
              className="mb-1 text-black font-semi-bold text-right"
            >
              ملاحظات
            </label>
            <textarea
              className="p-2 border text-right border-yellow-400 rounded-md focus:outline-none w-full focus:ring-2 focus:ring-yellow-500"
              rows={3}
              name="notes"
              defaultValue={customer.notes || ""}
            ></textarea>
          </div>

          {/* Customer Type */}
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="customerType"
              className="mb-1 text-black font-semi-bold text-right"
            >
              نوع العميل
            </label>
            <select
              className="border border-yellow-400 rounded-md focus:outline-none w-full focus:ring-2 focus:ring-yellow-500 p-2"
              name="customerType"
              defaultValue={customer.customerType || ""}
            >
              <option value="">اختار</option>
              <option value="مستورد">مستورد( كبار عملاء)</option>
              <option value="موزع">شركة تجاريه(موزع)</option>
              <option value="محل تجارى">محل تجارى</option>
              <option value="مصنع">مصنع</option>
              <option value="مستخدم نهائى">مستخدم نهائى</option>
            </select>
          </div>

          {/* Contacted */}
          <div className="flex flex-col mb-4 w-full">
            <div className="flex gap-4 justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contacted"
                  value="true"
                  defaultChecked={customer.contacted === true}
                  className="accent-green-600"
                />
                <span className="text-green-600 font-medium">تم التواصل</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contacted"
                  value="false"
                  defaultChecked={customer.contacted === false}
                  className="accent-red-600"
                />
                <span className="text-red-600 font-medium">لم يتم التواصل</span>
              </label>
            </div>
          </div>

          {/* Photo */}
          <div className="flex flex-col mb-4 w-full">
            <label className="mb-1 text-black font-semi-bold text-right">
              صورة العميل
            </label>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="w-32 h-32 rounded-md object-cover mb-2"
              />
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPhotoPreview(URL.createObjectURL(file));
              }}
              className="border border-yellow-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#C1282E] text-white py-2 px-1 md:px-4 rounded hover:bg-[#a01e1e] w-full"
          >
            حفظ العميل
          </button>
        </form>
      </section>
    </main>
  );
};

export default CustomerDetailsPage;
