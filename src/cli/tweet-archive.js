#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.8')
  .command('build <tweet-id-file> [archive-dir]', 'build archive')
  .parse(process.argv)
