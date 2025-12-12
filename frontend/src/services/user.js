import bcrypt from "bcryptjs-react";

// const url = "https://militaryeshop-1.onrender.com/users";
const url = "http://localhost:3000/users";

async function checkUser(email, password) {
  try {
    const response = await fetch(`${url}/${email}`);
    const data = await response.json();
    const passwordCheck = await bcrypt.compare(password, data.password);
    if (response.ok) {
      if (passwordCheck) {
        data.password = password;
        return {
          found: true,
          data
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
    const response = await fetch(`${url}/email/${email}`);
    const data = await response.json();
    console.log("get User by email: ", data);
    return data;
  } catch (error) {
    throw error.message;
  }
}

async function getUserById(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    console.log("get User by id: ", data);
    return data;
  } catch (error) {
    throw error.message;
  }
}

async function updateUser(oldUser, newUser) {
  try {
    if (newUser.password) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    const response = await fetch(`${url}/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldUser,
        newUser,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return {
        found: true,
        user: {
          email: data.email,
          password: data.password,
        },
      };
    }
    return false;
  } catch (error) {
    throw error.message;
  }
}

async function addToFavourites(email, productId) {
  try {
    const response = await fetch(`${url}/favourites/add/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return {
        found: true,
        favourites: data.favourites,
      };
    }
    return {
      found: false,
    };
  } catch (error) {
    return error.message;
  }
}

async function removeFromFavourites(email, productId) {
  try {
    console.log("remove");
    const response = await fetch(`${url}/favourites/remove/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return {
        found: true,
        favourites: data.favourites,
      };
    }
    return response;
  } catch (error) {
    return error.message;
  }
}

async function addToCart(email, productId) {
  try {
    const response = await fetch(`${url}/cart/add/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return {
        found: true,
        cart: data.cart,
      };
    }
    return {
      found: false,
    };
  } catch (error) {
    return error.message;
  }
}

async function removeFromCart(email, productId) {
  try {
    const response = await fetch(`${url}/cart/remove/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return {
        found: true,
        cart: data.cart,
      };
    }
    return {
      found: false,
    };
  } catch (error) {
    return error.message;
  }
}

async function signupUser(email, password, role) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(password);
    console.log(hashedPassword);
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: hashedPassword,
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

async function deleteUser(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      return {
        found: true,
        data
      };
    } else {
      return {
        found: false
      };
    }
  } catch (error) {
    throw error.message;
  }
}

async function addUserCheckout(userID, checkoutID) {
  try {
    const response = await fetch(`${url}/checkout/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkoutID
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
}
export {
  checkUser,
  getUser,
  getUserById,
  updateUser,
  addToFavourites,
  removeFromFavourites,
  addToCart,
  removeFromCart,
  signupUser,
  deleteUser,
  addUserCheckout
};
