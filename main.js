#!/usr/bin/env node
const treeFn = require("./commands/tree");
const organizeFn = require("./commands/organize");
const helpFn = require("./commands/help");

let inputArr = process.argv.slice(2); // 0, 1st index has Path Of Node and File
// console.log(inputArr);

/**
 * Commands We will be Using:
 * node main.js tree "directory path"
 * node main.js organize "directory path"
 * node main.js help
 */

let command = inputArr[0];

switch (command) {
    case "tree":
        treeFn.treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn.organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn.helpFn();
        break;
    default:
        console.log("Please🙏 Input Correct Command");
        break;
}

