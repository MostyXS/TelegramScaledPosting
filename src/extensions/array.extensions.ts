export {}

declare global {
    interface Array<T> {
        toStringList(this: T[]): string
        toTags(this: string[]): string
        addArray(this: T[], other: T[]): T[]
        removeArray(this: T[], other: T[]): T[]
        //toSet(this: T[]): Set<T>
        //toTelegramIds(this: string[]): string[]
    }
}

// Array.prototype.toTelegramIds = function (this) {
//     return this.filter((id) => id[0] === '-' && Number(id.slice(4)))
// }

Array.prototype.toStringList = function (this) {
    let list = ''
    this.map((str) => (list = list.concat(`${str}\n`)))
    return list
}

Array.prototype.addArray = function (this, other) {
    return Array.from(new Set(this.concat(other)))
}

Array.prototype.removeArray = function (this, other) {
    return this.filter(
        (item) => !other.some((itemToRemove) => item == itemToRemove)
    )
}

Array.prototype.toTags = function(this) {
    return this.map(element => `#${element}`).toString().replace(',', ' ')
}
