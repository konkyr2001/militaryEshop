function SubmitButton({ className, buttonText, ...props }) {
  return (
    <button
      {...props}
      type="submit"
      className={`text-white py-2 px-4 rounded w-full transition-all shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 ${className}`}
    >
      {buttonText}
    </button>
  );
}

export default SubmitButton;
