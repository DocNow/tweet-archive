#!/usr/bin/env node

import program from 'commander'
import Builder from '../builder';
//import Builder from '../builder'

program
    .arguments('<ids> <dir>')
    .action((ids, dir) => {
        if (! dir) dir = "tweeet-archive"
        const builder = new Builder(ids, dir)
        builder.build()
    })

program.parse(process.argv)
