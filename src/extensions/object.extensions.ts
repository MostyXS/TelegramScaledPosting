export {}

declare global {
    interface Object {
        toStringList(this: any): string
    }
}

Object.prototype.toStringList = function (this) {
    let list = ''
    Object.entries<any>(this).map(([key, value]) => {
        list = list.concat(`${key}: ${value}\n`)
    })
    return list
}