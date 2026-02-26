export const getRandomProducts = (products, count = 8) => {
    return [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export const getTopRatedProducts = (products, count = 8) => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};

export const getBestDiscountProducts = (products, count = 8) => {
  return [...products]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, count);
};

