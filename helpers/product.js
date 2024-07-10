module.exports.priceNew = (products) => {
    const newProducts = products.map((item) => {
        item.priceNew = (
            ((100 - item.discountPercentage) * item.price) /
            100
        ).toFixed(0);
        return item;
    });

    return newProducts;
};

module.exports.priceNewOne = (product) => {
    const priceNew = (
        ((100 - product.discountPercentage) * product.price) /
        100
    ).toFixed(0);
    return priceNew;
};
