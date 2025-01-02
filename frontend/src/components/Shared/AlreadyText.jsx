import { Link } from "react-router-dom";
function AlreadyText({ to, pText, linkText, linkClass }) {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      {pText}
      <Link to={to} className={`ml-1 text-blue-600 hover:underline font-semibold ${linkClass}`}>
        {linkText}
      </Link>
    </p>
  );
}

export default AlreadyText;
