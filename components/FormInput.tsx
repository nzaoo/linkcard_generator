import { useState } from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "url" | "textarea";
  required?: boolean;
  error?: string;
  onErrorClear?: () => void;
}

export default function FormInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  error,
  onErrorClear
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (error && onErrorClear) {
      onErrorClear();
    }
  };

  const baseClasses = `w-full p-4 rounded-xl border-2 focus-ring transition-all duration-200 bg-gray-800/50 text-white placeholder-gray-400 ${
    error 
      ? 'border-red-400 bg-red-900/20' 
      : isFocused
        ? 'border-yellow-400 bg-gray-800/70'
        : 'border-gray-600'
  }`;

  return (
    <div>
      <label className="block mb-3 text-gray-100 font-semibold">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseClasses} min-h-[120px] resize-y`}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={baseClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
      
      {error && (
        <p className="text-red-400 text-sm mt-2 animate-fade-in flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
