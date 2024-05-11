module.exports = (objectPagination, req, totalProduct) => {
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.totalPage = Math.ceil(
        totalProduct / objectPagination.limitProduct
    );

    objectPagination.skip =
        (objectPagination.currentPage - 1) * objectPagination.limitProduct;

    return objectPagination;
};
