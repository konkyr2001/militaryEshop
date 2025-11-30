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
    const promises = ids.map(async (id) => {
      const response = await fetch(`${url}/${id}`);
      const product = await response.json();
      return product;
    });

    const products = await Promise.all(promises);
    return products;
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

export { getAllProducts, getProductsById, getProductById };
