import {expect} from 'chai'
import Builder from './dist/builder'
import fs from 'fs'
import rimraf from 'rimraf'

describe('tweet-archive', () => {

  beforeEach((done) => {
    rimraf('test-archive', done)
  })

  it('should build', async () => {
    const builder = new Builder()
    await builder.build('example/ids.csv', {title: "xyz"}, 'test-archive')
    expect(fs.existsSync('test-archive/js/data.js')).to.equal(true)

    // a trick to load the data file
    var __TWEET_ARCHIVE_DATA = {}
    eval(fs.readFileSync('test-archive/js/data.js', 'utf8'))

    expect(__TWEET_ARCHIVE_DATA.ids.length).to.equal(299)
    expect(__TWEET_ARCHIVE_DATA.metadata.title).to.equal('xyz')
  })
    
})
