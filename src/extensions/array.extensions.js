// Array.prototype.toTelegramIds = function (this) {
//     return this.filter((id) => id[0] === '-' && Number(id.slice(4)))
// }
Array.prototype.toStringList = function () {
    let list = '';
    this.map((str) => (list = list.concat(`${str}\n`)));
    return list;
};
Array.prototype.addArray = function (other) {
    return Array.from(new Set(this.concat(other)));
};
Array.prototype.removeArray = function (other) {
    return this.filter((item) => !other.some((itemToRemove) => item == itemToRemove));
};
export {};
