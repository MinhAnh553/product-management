const createTree = (arr, parentId = '') => {
    let count = 0;
    const tree = [];
    arr.forEach((item) => {
        count++;
        if (item.parent_id == parentId) {
            const newItem = item;
            const children = createTree(arr, item.id);
            newItem.index = count;
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
};

module.exports = createTree;
