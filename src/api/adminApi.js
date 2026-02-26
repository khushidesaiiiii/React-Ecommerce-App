const baseUrl = import.meta.env.VITE_BASE_URL; 

export const getUsers = async () => {
    const res = await fetch (`${baseUrl}/users?limit=300`);
    return res.json();
}

export const getProducts = async () => {
    const res = await fetch(`${baseUrl}/products?limit=200`);
    return res.json();
}

export const getCart = async () => {
    const res = await fetch (`${baseUrl}/carts?limit=200`);
    return res.json();
}