import { forwardRef, useState } from "react";
const PasswordInput = forwardRef(({ placeholder, className, ...props }, ref) => {
  if (!placeholder) {
    placeholder = "Enter your password";
  }
  const [icon, setIcon] = useState("fa-eye");
  function handlePassword() {
    if (!ref.current) {
      return;
    }
    ref.current.type === "password" ? (ref.current.type = "text") : (ref.current.type = "password");

    setIcon((prevState) => {
      return prevState === "fa-eye" ? "fa-eye-slash" : "fa-eye";
    });
    ref.current.focus();
  }

  return (
    <span className="relative w-full">
      <input
        placeholder={placeholder}
        className={`border rounded-sm p-2 pr-8 w-full tracking-wide outline-gray-300 focus:outline-blue-500 ${className}`}
        type="password"
        name="password"
        aria-label="Password"
        ref={ref}
        required
        {...props}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center">
        <i className="vertical-line h-5"></i>
        <i onClick={handlePassword} className={`fa-regular ${icon} cursor-pointer`}></i>
      </div>
    </span>
  );
});

export default PasswordInput;
