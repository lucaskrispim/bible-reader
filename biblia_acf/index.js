const fs = require('fs')
const path = require('path')
const testFolder = './biblia_acf';

const Bible = {}
const _Bible = {}

String.prototype.soundex = function() {
	var string = this.toUpperCase().replace(/[^A-Z]/g,"");
	string = [
		string.substr(0,1),
		string.substr(1)
			  .replace(/A|E|H|I|O|U|W|Y/g,0)
			  .replace(/B|F|P|V/g,1)
			  .replace(/C|G|J|K|Q|S|X|Z/g,2)
			  .replace(/D|T/g,3)
			  .replace(/L/g,4)
			  .replace(/M|N/g,5)
			  .replace(/R/g,6)
			  .replace(/1{2}|2{2}|3{2}|4{2}|5{2}|6{2}/g,"")
			  .replace(/0/g,"")
	].join("").substr(0,4);

	return string+
		  (string.length==4?"":(new Array(5-string.length)).join("0"));
};

const getVersiculos = (str) => str.match(/\d{1}.\d{1}$/gim)[0].split(" ")
const getName = (str) => str.replace(".json", "")
const getData = (str) => String(str).replace(/\,/gim, '').split(" ")

const splitData = (str) => {
    const [data0, data1, ...rest] = getData(str)
    return [
        (Number.isNaN(+data0)) ? data0 : `${data0} ${data1}`,
        rest
    ]
}

fs.readdirSync(testFolder).forEach(file => {
  Bible[getName(file).soundex()] = require(path.resolve(`./${testFolder}/${file}`))
  _Bible[splitData(getName(file))[0]] = require(path.resolve(`./${testFolder}/${file}`))
});

module.exports = {
    findSoundex: (str) => Bible[splitData(str.toLowerCase().soundex())],
    find: (str) => {
        const [index, [...rest]] = splitData(str.toLowerCase())
        const versiculos = getVersiculos(str)
        console.log(!!_Bible[index], {index})
        if(_Bible[index])
            return versiculos.reduce((bible, actual, i) => (bible[actual]), _Bible[index][0])
        return "NAOEXISTE"
    }
}
 