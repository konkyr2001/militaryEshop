import { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./ReminderDialog.css";
const ReminderDialog = forwardRef(({ handleModal }, ref) => {
  function handleDialog(event) {
    if (event.currentTarget === event.target) {
      handleModal();
    }
  }

  return (
    <dialog
      ref={ref}
      id="reminder-dialog"
      className="fixed font-cabinet bg-white shadow-lg rounded-lg w-[90%] max-w-md left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-6 z-50 border"
      onKeyDown={(e) => e.preventDefault()}
      // onClick={handleDialog}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Sign Up or Log In to Continue
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Save your favorite items or add them to your cart by creating an account or logging in.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Sign Up
        </Link>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <button onClick={handleModal} className="text-gray-400 hover:underline text-center">
          Continue as Guest
        </button>
      </div>
    </dialog>
  );
});

export default ReminderDialog;
