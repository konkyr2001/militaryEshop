import { UNSAFE_ErrorResponseImpl } from "react-router-dom";

// const url = "https://militaryeshop-1.onrender.com/products";
const url = "http://localhost:3000/products";

async function getAllProducts() {
  try {
    const response = await fetch(`${url}`);
    const products = await response.json();
    return {
      found: true,
      products,
    };
  } catch (error) {
    return {
      found: false,
    };
  }
}

async function getProductsById(ids) {
  try {
    const response = await fetch(`${url}/byIds`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids
        })
      });

    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getReviewProduct(productsId) {
  try {
    const response = await fetch(`${url}/ratedByUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productsId
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getBestSellers() {
  try {
    const response = await fetch(`${url}/bestSellers`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log(error.message)
    return null;
  }
}

async function createNewProduct(createdProduct, userId) {
  try {
    const response = await fetch(`${url}/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdProduct,
        userId
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return {
        found: true,
        data: data.newProduct
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteProduct(productId, userId) {
  try {
    const response = await fetch(`${url}/delete`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        userId
      })
    });
    const data = response.json();
    if (response.ok) {
      return {
        found: true,
        data: data.message
      }
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function createReviewToProduct(productId, userId, ratingInfo) {
  try {
    const response = await fetch(`${url}/addRating`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        userId,
        ratingInfo
      })
    });
    const data = response.json();
    if (response.ok) {
      return {
        found: true,
        data: data.message
      }
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteReview(productId, userId) {
  try {
    const response = await fetch(`${url}/deleteRating`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        userId
      })

    });
    const data = await response.json();
    if (response.ok) {
      return {
        found: true,
        message: data.message
      }
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
}

export {
  getAllProducts,
  getProductsById,
  getProductById,
  getBestSellers,
  createNewProduct,
  deleteProduct,
  getReviewProduct,
  createReviewToProduct,
  deleteReview,
};
