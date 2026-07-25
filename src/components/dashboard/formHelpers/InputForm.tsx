import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  className?: string;
  label: string;
  placeholder?: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
}

const InputForm = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type,
  placeholder,
  className,
  required,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="text-xs font-bold tracking-tight capitalize text-slate-900"
        >
          {label}:
        </label>

        {required && (
          <span
            className={`${required && "text-red-500 text-sm mr-3"} font-bold self-end`}
          >
            *
          </span>
        )}
      </div>

      <div
        className={`border border-gray-300 rounded-md overflow-hidden gap-5 items-center ${errors[name] ? "border-red-500" : ""}`}
      >

        <input type={type} placeholder={placeholder} id={name} {...register(name)} className={`py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600 outline-none focus:outline-none ${className}`}
        autoComplete="off" />
      </div>
    </div>
  );
};

export default InputForm;
