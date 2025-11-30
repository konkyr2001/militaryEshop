import "./DeleteButton.css";
import { useState, useEffect, useRef } from "react";
import { deleteUser } from "../../services/user";
import Loading from "../../components/Shared/Loading";
function DeleteButton({ className, buttonText, currentUser, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogContentRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dialogContentRef.current &&
        !dialogContentRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialogContentRef.current]);

  function handleButton() {
    setIsModalOpen((prevModal) => !prevModal);
  }

  async function handleDelete() {
    try {
      const userExist = await deleteUser(currentUser.id);
      if (userExist.found) {
        localStorage.clear();
        setIsLoading(true);
        setTimeout(() => {
          location.reload();
          setIsLoading(false);
        }, 200);
      } else {
        console.log(userExist)
        alert('something went wrong');
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setUserFound(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <span className="w-full h-full">
        <button
          {...props}
          onClick={handleButton}
          title="Delete"
          className={`delete-button text-red-500 py-3 px-6 transition-all rounded-lg w-full shadow-md bg-gradient-to-r ${className}`}
        >
          <strong className="tracking-wider">{buttonText}</strong>
        </button>
        {
          isModalOpen &&
          <dialog
            className={`absolute left-0 top-0 w-full h-full cursor-default bg-opacity-50 flex justify-center items-center`}
          >
            <div ref={dialogContentRef} className="bg-gray-800 min-w-[480px] min-h-[300px] text-white">
              <div className="border-b-2 border-gray-500 h-[50px] flex items-center flex-row-reverse px-5">
                <button onClick={(e) => setIsModalOpen(false)} className="flex-right px-2 py-1 rounded-md bg-red-500">X</button>
              </div>
              <div className="h-[250px] flex justify-center items-center flex-col gap-2">
                <p className="text-center">Are you sure you want to permantly delete your account?</p>
                <p>{currentUser.email}</p>
                <button className="bg-gray-600 hover:bg-gray-700 px-5 py-1 rounded" onClick={handleDelete}>Delete this account</button>
              </div>

            </div>
          </dialog>
        }
      </span>
    </>
  );
}

export default DeleteButton;