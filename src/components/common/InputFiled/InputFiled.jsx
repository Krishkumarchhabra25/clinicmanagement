import * as React from "react";


export function InputField({ label, name, icon, value, onChange, type = "text", hasError, errorMessage, endIcon }) {
    const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;
  
    return (
      <div className="flex flex-col w-full max-md:max-w-full">
        <label htmlFor={inputId} className="text-lg text-neutral-600 max-md:max-w-full">
          {label}
        </label>
        <div
          className={`flex items-center gap-2.5 p-2.5 mt-3.5 w-full text-base rounded-xl ${
            hasError ? 'bg-red-50' : 'bg-zinc-100'
          } border ${hasError ? 'border-red-500' : 'border-transparent'} focus-within:border-blue-500`}
        >
          {/* Icon */}
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch w-8 aspect-square"
          />
  
          {/* Input */}
          <input
            type={type}
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            className="flex-1 bg-transparent outline-none text-black placeholder-neutral-400"
            placeholder={`Enter your ${label.toLowerCase()}`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
          />
  
          {/* End Icon */}
          {endIcon && (
            <img
              loading="lazy"
              src={endIcon}
              alt=""
              className="object-contain shrink-0 self-stretch w-6 aspect-square"
            />
          )}
        </div>
  
        {/* Error Message */}
       
      </div>
    );
  }
  