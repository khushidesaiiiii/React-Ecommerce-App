export const loadOrders = (userId) => {
  try {
    const data = localStorage.getItem(`orders_${userId}`);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveOrders = (userId, order) => {
  if (!userId) return;
  localStorage.setItem(`order_${userId}`, JSON.stringify(order));
};

export const clearOrders = (userId) => {
  if (!userId) return;
  localStorage.removeItem(`order_${userId}`);
};
