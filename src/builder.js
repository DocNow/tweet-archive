import fs from 'fs'
import path from 'path'

class Builder {
    
    constructor(tweetIdFile, outputDir="tweets") {
        this.tweetIdFile = tweetIdFile
        this.outputDir = outputDir
    }

    build(ids, ) {
        this.makeOutputDirectory()
        this.addJavaScript()
        this.addHtml()
        this.addCss()
        this.addIds()
    }

    makeOutputDirectory() {
        this.mkdir(this.outputDir)
    }

    addJavaScript() {
        const jsDir = path.join(this.outputDir, 'js')
        this.mkdir(jsDir)
        const src = path.join(__dirname, '..', '/node_modules/react/umd/react.production.min.js')
        const dst = path.join(jsDir, 'react.production.min.js')
        console.log(src, dst)
        fs.copyFileSync(src, dst)
    }

    addHtml() {
    }

    addCss() {
    }

    addIds() {
    }

    mkdir(dir) {
        if (! fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true})
        }
    }

}

export default Builder