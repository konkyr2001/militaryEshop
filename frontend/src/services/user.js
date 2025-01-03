import { useNavigate } from "react-router-dom";

async function checkUser(email, password) {
  try {
    const response = await fetch(`http://localhost:3000/users/login/${email}`);
    const data = await response.json();
    if (response.ok) {
      if (password === data.password) {
        return {
          found: true,
          role: data.role,
        };
      }
      return {
        found: false,
      };
    }
  } catch (error) {
    throw error.message;
  }
}

async function getUser(email) {
  try {
    const response = await fetch(`http://localhost:3000/users/login/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message;
  }
}
async function signupUser(email, password, role) {
  try {
    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role,
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

export { checkUser, getUser, signupUser };
