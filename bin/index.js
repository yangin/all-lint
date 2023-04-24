#!/usr/bin/env node

const { Command } = require('commander')
const Lint = require('./lint')

const program = new Command()

/**
 * lint
 * command: devops lint
 */
program
  .command('init')
  .description('init lint for front project')
  .action(() => {
    Lint.init()
  })

program.parse()
