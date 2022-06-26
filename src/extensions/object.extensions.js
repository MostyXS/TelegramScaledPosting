Object.prototype.toStringList = function () {
    let list = '';
    Object.entries(this).map(([key, value]) => {
        list = list.concat(`${key}: ${value}\n`);
    });
    return list;
};
export {};
