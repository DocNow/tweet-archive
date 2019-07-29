import {expect} from 'chai'
import Builder from './dist/builder'
import fs from 'fs'
import rimraf from 'rimraf'

describe('tweet-archive', () => {

  beforeEach((done) => {
    rimraf('test-archive', done)
  })

  it('should build w/ more than ids', async () => {
    const builder = new Builder()
    await builder.build('example/tweets.csv', {title: "xyz"}, 'test-archive')
    expect(fs.existsSync('test-archive/js/data.js')).to.equal(true)

    // a trick to load the data file
    var __TWEET_ARCHIVE_DATA = {}
    eval(fs.readFileSync('test-archive/js/data.js', 'utf8'))

    expect(__TWEET_ARCHIVE_DATA.tweets.length).to.equal(250)
    expect(__TWEET_ARCHIVE_DATA.metadata.title).to.equal('xyz')

    const t = __TWEET_ARCHIVE_DATA.tweets[0]
    expect(t.id).to.equal("1074539600348102657")
    expect(t.screen_name).to.equal('rapperstory_')
    expect(t.retweet,false)
  })

  it('should build with just ids', async () => {
    const builder = new Builder()
    await builder.build('example/ids.csv', {title: "xyz"}, 'test-archive')
    expect(fs.existsSync('test-archive/js/data.js')).to.equal(true)

    var __TWEET_ARCHIVE_DATA = {}
    eval(fs.readFileSync('test-archive/js/data.js', 'utf8'))

    expect(__TWEET_ARCHIVE_DATA.tweets.length).to.equal(250)
    expect(__TWEET_ARCHIVE_DATA.metadata.title).to.equal('xyz')

    const t = __TWEET_ARCHIVE_DATA.tweets[0]
    expect(t.id).to.equal("1074539600348102657")
  })
    
})
