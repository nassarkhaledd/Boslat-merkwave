import { useAtom } from "jotai";
import { isAdminAtom, tokenAtom } from "../atoms/tokenAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomerCard from "../components/CustomerCard";
import { API_NEW_CUS } from "../config/config"; 

interface Customer {
  id: number;
  companyName: string;
  person1Name: string;
  contacted: boolean;
  createdByName: string;
}

const AdminCustomers = () => {
  const [isAdmin] = useAtom(isAdminAtom);
  const [token] = useAtom(tokenAtom);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/dashboard");
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${API_NEW_CUS}/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch customers");

        const data: Customer[] = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAdmin) fetchCustomers();
  }, [isAdmin, token]);

  if (!isAdmin) return null;

  return (
    <main
      className="max-w-screen min-h-screen flex flex-col items-center justify-start px-2 bg-[#C1282E]"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <h1 className="text-white text-2xl mt-4">Total Customers: {customers.length}</h1>

      <section className="flex flex-col items-center justify-center gap-6 w-full lg:w-2/3 bg-white p-4 my-4 rounded-xl">
        {customers.map((c) => (
          <CustomerCard
            key={c.id}
            userId={c.id.toString()}
            customerName={c.companyName}
            servantName={c.person1Name}
            contacted={c.contacted}
            createdByName={c.createdByName} 
          />
        ))}
      </section>
    </main>
  );
};

export default AdminCustomers;
