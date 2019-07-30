# tweet-archive

*tweet-archive* is a command line utility for creating a view of tweets from a
list of tweet identifiers. The resulting display will include publicly available
tweets. The tweets are pulled in dynamically from twitter.com using Twitter's
embed JavaScript. This means that tweets that have been deleted or protected
will no longer display. This is by design.

You can see an example of a published archive [here].

## Install

    npm install -g tweet-archive

## Build

If you have a file of tweet identifiers in `ids.csv` you can build a tweet archive in the directory `my-tweet-archive`:

    tweet-archive build ids.csv my-tweet-archive

Then you should be able to open `my-tweet-archive/index.html` in your browser.

[here]: https://www.docnow.io/tweet-archive/
