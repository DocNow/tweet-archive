# tweet-archive

A command line utility for working with tweet archives. You can see an example
of a published archive [here].

## Install

    npm install -g tweet-archive

## Build

If you have a file of tweet identifiers in `ids.csv` you can build a tweet archive in the directory `my-tweet-archive`:

    tweet-archive build ids.csv my-tweet-archive

Then you should be able to open `my-tweet-archive/index.html` in your browser.

[here]: https://www.docnow.io/tweet-archive/
