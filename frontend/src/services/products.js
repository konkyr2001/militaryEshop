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
    if (response.ok) {
      const product = await response.json();
      return product;
    }
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
    const data = new FormData();
    data.append("title", createdProduct.title);
    data.append("creator", createdProduct.creator);
    data.append("oldPrice", createdProduct.oldPrice);
    data.append("currentPrice", createdProduct.currentPrice);
    data.append("discount", createdProduct.discount);
    data.append("description", createdProduct.description);
    data.append("iconName", createdProduct.iconName);
    data.append("userId", userId);
    data.append("file", createdProduct.file);
    const response = await fetch(`${url}/create`, {
      method: 'POST',
      body: data,
    });
    const result = await response.json();
    if (response.ok) {
      return {
        found: true,
        data: result.newProduct
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
    const data = await response.json();
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
    if (response.ok) {
      const data = await response.json();

      return {
        found: true,
        data: data.data
      }
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteReview(productId, reviewRating, userId) {
  try {
    const response = await fetch(`${url}/deleteRating`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        reviewRating,
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
