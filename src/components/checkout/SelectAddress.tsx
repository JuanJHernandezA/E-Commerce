import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";


interface SelectAddressProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  name: string;
  placeholder: string;
  options: { id: number; name: string }[];
  isLoading?: boolean;
  required?: boolean;
}

export const SelectAddress: React.FC<SelectAddressProps> = ({
  register,
  errors,
  name,
  placeholder,
  options,
  isLoading,
  disabled,
  onChange,
  required,
  ...props
}) => {
  const { onChange: registerOnChange, ...restRegister } = register(name);

  return (
    <div className="flex flex-col gap-1 w-full">
      <select
        {...restRegister}
        disabled={disabled || isLoading}
        onChange={(e) => {
          registerOnChange(e);
          if (onChange) onChange(e);
        }}
        className="border border-slate-200 rounded-md p-3 text-sm bg-white disabled:bg-slate-100 disabled:cursor-not-allowed w-full cursor-pointer"
        {...props}
        required={required}
      >
        <option value="">
          {isLoading ? "Cargando..." : placeholder}
        </option>
        {options.map((item) => (
          <option key={item.id} value={item.name} >
            {item.name}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-xs text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};