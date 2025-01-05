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

export { getAllProducts };
