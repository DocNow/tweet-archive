#!/usr/bin/env node

const program = require('commander')

program
    .version('0.0.1')
    .command('build <ids> <dir>', 'build archive', {isDefault: true})
    .parse(process.argv)