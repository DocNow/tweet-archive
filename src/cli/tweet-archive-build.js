#!/usr/bin/env node

import program from 'commander'
import Builder from './builder';

program
  .arguments('<ids> <dir>')
  .action((ids, dir) => {
    console.log('hi')
    if (! dir) dir = "tweeet-archive"
    const builder = new Builder()
    builder.build(ids, dir)
  })

program.parse(process.argv)
