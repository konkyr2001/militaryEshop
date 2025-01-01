function IconButton({ icon, text }) {
  return (
    <button className="border-gray-500 border py-2 px-4 rounded-3xl flex items-center gap-2 hover:bg-gray-100 transition">
      <div
        style={{ backgroundImage: `url("${icon}")` }}
        className="w-5 h-5 bg-no-repeat bg-center bg-contain"
      ></div>{" "}
      {/* Icon as a background image */}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}

export default IconButton;
