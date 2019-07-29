import fs from 'fs-extra'
import path from 'path'
import csv from 'csv-parser'
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
  tweets: [
`)

      fs.createReadStream(tweetIdFile)
        .pipe(csv())
        .on('data', (row) => {
          const t = {id: row.id}
          if (row.hasOwnProperty('retweet')) t['retweet'] = row.retweet == "true"
          if (row.hasOwnProperty('screen_name')) t['screen_name'] = row.screen_name
          output.write('    ' + JSON.stringify(t) + ',\n')
        })
        .on('end', () => {
          output.write('  ]\n}')
          output.end()
        })
    })

  }

}

export default Builder
