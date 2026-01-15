import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';

interface CustomerCardProps {
  userId: string; 
  customerName: string;
  servantName: string;
  contacted: boolean;
  createdByName: string; 
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  userId,
  customerName,
  servantName,
  contacted,
  createdByName,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/customers/${userId}`); 
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col border p-4 border-yellow-400 rounded shadow-md bg-white w-full gap-2 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <InputField
        label="اسم العميل"
        name="customerName"
        value={customerName}
        canEdit={false}
      />
      <InputField
        label="اسم المسئول"
        name="servantName"
        value={servantName}
        canEdit={false}
      />
      <InputField
        label="تم الإنشاء بواسطة"
        name="createdByName"
        value={createdByName}
        canEdit={false}
      />
      <div className="text-right font-medium mt-1">
        <span
          className={`px-2 py-1 rounded text-white ${
            contacted ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {contacted ? 'تم التواصل' : 'لم يتم التواصل'}
        </span>
      </div>
    </div>
  );
};

export default CustomerCard;
