const ghpages = require('gh-pages')
const Builder = require('../dist/builder').default

async function publish() {

  const builder = new Builder()
  await builder.build(
    'example/tweets.csv', 
    {
      title: "tweet-archive test",
      creator: "Raff Viglianti",
      startDate:"2018-12-17T11:05:40.642Z",
      endDate: "2018-12-18T01:33:11.989Z",
      searchQuery: "#opera"
    },
    'public'
  )
 
  ghpages.publish('public', err => {
    if (err) {
      console.log(err += '💥\n' )
    } else {
      console.log('published ✅\n')
    }
  })

}

publish()
