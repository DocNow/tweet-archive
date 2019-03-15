#!/usr/bin/env node

const program = require('commander')
const config = require('../../package.json')

program
  .version(config.version)
  .command('build <tweet-id-file> [archive-dir]', 'build archive')
  .parse(process.argv)
