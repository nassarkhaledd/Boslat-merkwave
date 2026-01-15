// InputField.tsx
import React from 'react';

interface InputFieldProps {
  name: string; // key in the object
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string; 
  canEdit?: boolean; 
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  canEdit = true, 
}) => {
  return (
    <div className="flex flex-col mb-4 w-full">
      <label htmlFor={name} className="mb-1 text-black font-semi-bold text-right">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        disabled={!canEdit} 
        className={`p-2 border border-yellow-400 text-right rounded-md focus:outline-none w-full focus:ring-2 focus:ring-yellow-500 ${!canEdit ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
    </div>
  );
};

export default InputField;
