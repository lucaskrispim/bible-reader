const fs = require('fs')
const path = require('path')
const testFolder = './biblia_acf'

const splitData = (str) => {
    const [data0, data1, ...rest] = getData(str)
    return [
        (Number.isNaN(+data0)) ? data0 : `${data0} ${data1}`,
        rest
    ]
}

const getVersiculos = (str) => str.match(/\d{1}.\d{1}$/gim)[0].split(" ")
const getName = (str) => str.replace(".json", "")
const getData = (str) => String(str).replace(/\,/gim, '').split(" ")
const createBible = (folder) => {
    const Bible = {}
    fs.readdirSync(testFolder).forEach(file => {
        Bible[splitData(getName(file))[0]] = require(path.resolve(`./${testFolder}/${file}`))
    })
    return Bible
};

const Bible = createBible(testFolder)

module.exports = {
    Bible,
    find: (str) => {
        const [index, [...rest]] = splitData(str.toLowerCase())
        const versiculos = getVersiculos(str)
        if(Bible[index])
            return getVersiculos(str).reduce((bible, actual, i) => (bible[actual]), Bible[index][0])
        return "NAOEXISTE"
    }
}
 