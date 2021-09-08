const fs = require('fs');
const path = require("path");

class Bible {
  list;

  constructor(text) {
    this.list = this.getSliceText(text)
  }

  getBook() {
    if (this.getSliceList('book')) {
      return this.getSliceList('book')
    }
    return null;
  }

  getChapterNumber() {
    if (this.getSliceList('chapter')) {
      return this.getSliceList('chapter')
    }
    return null;
  }

  getVersionNumber() {
    if (this.getSliceList('version')) {
      return this.getSliceList('version')
    }
    return null;
  }

  getSliceText(text) {
    if (typeof text == "string") {
      const arr = text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().split(" ");
      if (arr) {
        return arr;
      } else {
        return null;
      }
    }
    return null;
  }

  getSliceList(part) {
    if (this.verifyList()) {
      switch (part) {
        case 'book':
          if (this.verifyIncludeName()) {
            return (this.list.slice(1, this.list.length).length == 4) ? this.list[1] + " " + this.list[2] : this.list[1];
          } else {
            return (this.list.length == 4) ? this.list[0] + " " + this.list[1] : this.list[0];
          }
        case 'chapter':
          if (this.verifyIncludeName()) {
            return (this.list.slice(1, this.list.length).length == 4) ? this.list[3] : this.list[2];
          } else {
            return (this.list.length == 4) ? this.list[2] : this.list[1];
          }
        case 'version':
          if (this.verifyIncludeName()) {
            return (this.list.slice(1, this.list.length).length == 4) ? this.list[4] : this.list[3];
          } else {
            return (this.list.length == 4) ? this.list[3] : this.list[2];
          }
        default:
          return null;
      }
    }
    return null;
  }

  verifyList() {
    if (this.list && this.list.length <= 5) {
      return true;
    }
    return false;
  }

  verifyIncludeName() {
    if (this.list && this.list[0].includes("@")) {
      return true;
    }
    return false;
  }

  getVersion() {
    if (this.getBook() && this.getChapterNumber && this.getVersionNumber()) {
      const book = this.getBook();
      let file;
      if (fs.existsSync(path.resolve(__dirname, '../biblia_acf/' + book + '.json'))) {
        file = require(path.resolve(__dirname, '../biblia_acf/' + book + '.json'));
      }

      if ( this.getExistsVersion(file) ) {
        return file[parseInt(this.getChapterNumber()) - 1][this.getChapterNumber()][this.getVersionNumber()];
      }

    }
    return null;
  }

  getExistsVersion(file) {
    if (file && file[parseInt(this.getChapterNumber()) - 1] &&
      file[parseInt(this.getChapterNumber()) - 1][this.getChapterNumber()] &&
      file[parseInt(this.getChapterNumber()) - 1][this.getChapterNumber()][this.getVersionNumber()]
    ) {
      return true;
    }
    return false
  }

}

module.exports = Bible
