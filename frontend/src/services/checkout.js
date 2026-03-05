import bcrypt from "bcryptjs-react";

// const url = "https://militaryeshop-1.onrender.com/checkouts";
const url = "http://localhost:3000/checkout";

async function getCheckoutsById(ids) {
    try {
        if (!ids) return;
        const response = await fetch(`${url}/getCheckouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids
            })
        });
        if (response.ok) {
            const checkouts = await response.json();
            return checkouts;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

async function createCheckout(checkout) {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkout
            })
        });
        if (response.ok) {
            const product = await response.json();
            return product.checkout;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {
    getCheckoutsById,
    createCheckout,
};
