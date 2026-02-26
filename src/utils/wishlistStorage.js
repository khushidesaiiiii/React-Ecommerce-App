export const loadWishlist = (userId) => {
  try {
    const data = localStorage.getItem(`wishlist_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};  

export const saveWishlist = (userId, items) => {
  if (!userId) return;
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(items));
};

export const clearWishlist = (userId) => {
  if (!userId) return;
  localStorage.removeItem(`wishlist_${userId}`);
};
