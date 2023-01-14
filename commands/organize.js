const fs = require("fs");
const path = require("path");

const types = {
    media: ['mp4', 'mkv'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc','pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    codes: ['cpp', 'js', 'java', 'py', 'dart', 'jsx']
};


function organizeFn(dirPath) {
    if (dirPath === undefined) {
        console.log("Enter a Path");
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    if (doesExist === false) {
        console.log("Enter a Correct Path");
        return;
    }

    let destPath = path.join(dirPath, "organized_files");
    let destExists = fs.existsSync(destPath);
    if (destExists === false) {
        fs.mkdirSync(destPath);
    }
    organizerHelper(dirPath, destPath);
}

function organizerHelper(srcPath, destPath) {
    let childrenFiles = fs.readdirSync(srcPath);
    for (let i = 0; i < childrenFiles.length; i++) {
        let childAddr = path.join(srcPath, childrenFiles[i]);
        let file = fs.lstatSync(childAddr).isFile();
        if (file === true) {
            let category = getCategory(childAddr);
            // console.log(childrenFiles[i], "Belongs to --->>>", category);
            copyFile(childAddr, destPath, category);
        }
    }
}

function getCategory(fileName) {
    let exte = path.extname(fileName).slice(1);

    for (type in types) {
        let curr = types[type];
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] == exte) {
                return type;
            }
        }
    }
    return "others";
}

function copyFile(srcFilePath, destPath, category) {
    let catPath = path.join(destPath, category);
    let catExist = fs.existsSync(catPath);
    if (catExist === false) {
        fs.mkdirSync(catPath);
    }
    let fileName = path.basename(srcFilePath);
    // console.log(fileName);
    let destAdrr = path.join(catPath, fileName);
    // console.log(destAdrr);

    //! This only Copies the File and Doesn't do any change to the original Files
    fs.copyFileSync(srcFilePath, destAdrr);
    // console.log("File Copied\n");

    //! Uncomment the Below line to remove the file from the source
    fs.unlinkSync(s);
}

module.exports = {
    organizeFn
};
