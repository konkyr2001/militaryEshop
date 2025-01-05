const url = "http://localhost:3000/users";
async function checkUser(email, password) {
  try {
    const response = await fetch(`${url}/${email}`);
    const data = await response.json();
    if (response.ok) {
      if (password === data.password) {
        return {
          found: true,
          role: data.role,
          favourites: data.favourites,
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
    const response = await fetch(`${url}/${email}`);
    const data = await response.json();
    return data;
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

async function removeFromFavourites(email, productId) {
  try {
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

async function signupUser(email, password, role) {
  try {
    const response = await fetch(`${url}/signup`, {
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

export { checkUser, getUser, addToFavourites, removeFromFavourites, signupUser };
