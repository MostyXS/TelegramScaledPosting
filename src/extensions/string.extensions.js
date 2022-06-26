String.prototype.hasLink = function () {
    return this.includes('http');
};
String.prototype.toClearArray = function () {
    return this.replace(/(\r\n|\n|\r)/gm, ' ')
        .trim()
        .split(' ')
        .filter((i) => i);
};
export {};
