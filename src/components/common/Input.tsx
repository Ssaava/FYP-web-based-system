import usePasswordToggle from "@/hooks/usePasswordToggle";
import { InputHTMLAttributes } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const Input = ({
  label,
  error,
  className = "",
  disabled,
  type = "text",
  ...props
}: InputProps) => {
  const { inputType, handlePasswordToggle } = usePasswordToggle();
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-medium text-gray-900 dark:text-gray-50">
          {label}
        </label>
      )}
      <div className="relative mt-2">
        <input
          type={type === "password" ? inputType : type}
          className={`${
            disabled && "bg-gray-200"
          } w-full rounded-lg focus:outline-none focus:border px-6 py-3 border focus:ring-0  ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {inputType === "password" ? (
              <FaEyeSlash className="text-gray-500 dark:text-gray-50 text-xl" />
            ) : (
              <FaEye className="text-gray-500 dark:text-gray-50 text-xl" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
