const utils = require("./server/utils")

utils.getGitContentJsonDec("config").then(result => {
    const config = result.content
    
    if(config){
        const exports = Object.keys(config).map(key => `export ${key.toUpperCase()}=${config[key]}`).join("\n")

        console.log(exports)
    }
})