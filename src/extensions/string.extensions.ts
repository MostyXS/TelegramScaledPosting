export {}

declare global {
    interface String {
        hasLink(this: string): boolean
        toClearArray(this: string): string[],
    }
}

String.prototype.hasLink = function (this) {
    return this.includes('http')
}

String.prototype.toClearArray = function (this) {
    return this.replace(/(\r\n|\n|\r)/gm, ' ')
        .trim()
        .split(' ')
        .filter((i) => i)
}
