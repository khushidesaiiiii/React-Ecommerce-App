export const calculateRevenue = (carts = []) => {
  return carts.reduce((sum, cart) => {
    const total = Number(cart?.total);
    return sum + (Number.isFinite(total) ? total : 0);
  }, 0);
};

export const groupMontlyRevenue = (carts = [], monthCount = 0) => {
  if (!Number.isInteger(monthCount) || monthCount <= 0) {
    return [];
  }

  const months = Array(monthCount).fill(0);

  carts.forEach((cart, i) => {
    const total = Number(cart?.total);
    if (Number.isFinite(total)) {
      months[i % monthCount] += total;
    }
  });

  return months;
};

export const groupMonthlyOrders = (carts = [], monthCount = 0) => {
  if (!Number.isInteger(monthCount) || monthCount <= 0) {
    return [];
  }

  const months = Array(monthCount).fill(0);

  carts.forEach((_, i) => {
    months[i % monthCount] += 1;
  });

  return months;
};
