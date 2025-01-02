function EmailInput({ placeholder, className, ...props }) {
  if (!placeholder) {
    placeholder = "Enter your email";
  }
  return (
    <input
      placeholder={placeholder}
      className={`border rounded-sm p-2 w-full tracking-wide outline-gray-300 focus:outline-blue-500 ${className}`}
      name="email"
      type="email"
      aria-label="Email"
      {...props}
      required
    />
  );
}

export default EmailInput;
