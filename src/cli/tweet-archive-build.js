#!/usr/bin/env node

import fs from 'fs'
import program from 'commander'
import chalk from 'chalk'
import prompt from 'prompt'
import Builder from './builder'

function doPrompt() {

  const schema = {
    properties: {
      title: {
        description: chalk.green.bold('title'),
        required: false
      },
      desc: {
        description: chalk.green.bold('description'),
        required: false
      },
      creator: {
        description: chalk.green.bold('creator'),
        required: false
      },
      startDate: {
        description: chalk.green.bold('start date'),
        required: false
      },
      endDate: {
        description: chalk.green.bold('end date'),
        required: false
      },
      searchQuery: {
        description: chalk.green.bold('search query'),
        required: false
      }
    }
  }

  prompt.message = ''
  prompt.start()

  return new Promise((resolve, reject) => {
    prompt.get(schema, function (err, result) {
      resolve(result)
    })
  })
}

program
  .arguments('<ids> [dir]')
  .action(async (ids, dir) => {
    console.log('')

    if (! fs.existsSync(ids)) {
      console.log(chalk.red('Please supply valid tweet id file.\n'))
      process.exit(1)
    }

    if (! dir) dir = "tweet-archive"

    console.log(chalk.bold('Please enter some optional metadata for your tweet archive:\n'))
    const metadata = await doPrompt()
    const builder = new Builder()
    await builder.build(ids, metadata, dir)
    console.log(`\n🎉  Your tweet archive is ready in ${chalk.bold(dir)}\n`)
  })

program.parse(process.argv)
