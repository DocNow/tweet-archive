#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .command('build <tweet-id-file> [archive-dir]', 'build archive')
  .parse(process.argv)