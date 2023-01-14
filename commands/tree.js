const fs = require("fs");
const path = require("path");

function treeFn(dirPath) {
    if (dirPath == undefined) {
        treeHelper(process.cwd(), "");
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist === true) {
            treeHelper(dirPath, "");
        } else {
            console.log("Enter the Correct Path 🤷‍♂️");
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    let file = fs.lstatSync(dirPath).isFile();
    let name = path.basename(dirPath);
    if (file === true) {
        console.log(indent + "├──" + name);
        return;
    }

    console.log(indent + "└──" + name);
    let childFiles = fs.readdirSync(dirPath);
    for (let i = 0; i < childFiles.length; i++) {
        let childPath = path.join(dirPath, childFiles[i]);
        treeHelper(childPath, indent + "\t");
    }
}

module.exports = {
    treeFn
};