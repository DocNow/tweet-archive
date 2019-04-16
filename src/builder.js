import fs from 'fs-extra'
import path from 'path'
import readline from 'readline'

class Builder {
  
  async build(tweetIdFile, metadata, outputDir) {
    await this.makeOutputDirectory(outputDir)
    await this.createDataFile(tweetIdFile, metadata, outputDir)
  }

  async makeOutputDirectory(outputDir) {
    await fs.copy(path.join(__dirname, './site'), outputDir)
  }

  createDataFile(tweetIdFile, metadata, outputDir) {

    return new Promise((resolve, reject) => {

      const dataFile = path.join(outputDir, 'js', 'data.js')
      const output = fs.createWriteStream(dataFile)
      output.on('close', resolve)

      const metadataJson = JSON.stringify(metadata)

      output.write(`
__TWEET_ARCHIVE_DATA = {
  metadata: ${metadataJson},
  ids: [
`)

      const rl = readline.createInterface({
        input: fs.createReadStream(tweetIdFile),
        crlfDelay: Infinity
      })

      rl.on('line', (line) => {
        output.write('    "' + line.trim() + '",\n')
      })

      rl.on('close', () => {
        output.write('  ]\n}')
        output.end()
      })

    })

  }

}

export default Builder
