import { forwardRef } from "react";
const LoginDialog = forwardRef(({ children, handleModal }, ref) => {
  function handleDialog(event) {
    // event.currentTarget = the element that the function is added on! (FATHER)
    // event.target = the specific element that i just clicked within the dialog
    if (event.currentTarget === event.target) {
      handleModal();
    }
  }

  return (
    <dialog
      ref={ref}
      className="fixed left-1/2 -translate-x-1/2 top-1/2 transalte-y-1/2 rounded-lg py-3 px-6"
      onClick={(e) => handleDialog(e)}
    >
      {children}
      <button onClick={handleModal}>Close</button>
    </dialog>
  );
});

export default LoginDialog;
