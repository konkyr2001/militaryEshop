import { useNavigate } from "react-router-dom";

async function checkUser(email, password) {
  try {
    const response = await fetch(`http://localhost:3000/users/login/${email}`);
    const data = await response.json();
    if (response.ok) {
      if (password === data.password) {
        return true;
      }
      return false;
    }
  } catch (error) {
    throw error.message;
  }
}

async function signupUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error.message;
  }
}

export { checkUser, signupUser };
