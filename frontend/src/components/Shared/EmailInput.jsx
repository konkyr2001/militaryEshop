import { forwardRef } from "react";
const EmailInput = forwardRef(function EmailInput({ placeholder, className, ...props }, inputRef) {
  if (!placeholder) {
    placeholder = "Enter your email";
  }
  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      className={`border rounded-sm p-2 w-full tracking-wide outline-gray-300 focus:outline-blue-500 ${className}`}
      name="email"
      type="email"
      aria-label="Email"
      {...props}
    />
  );
});

export default EmailInput;
