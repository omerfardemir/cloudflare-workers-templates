#!/usr/bin/env node

import {program} from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'
import {execa} from 'execa'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'))

program
  .name(packageJson.name)
  .description('Create a new MonoCF monorepo project using template')
  .version(packageJson.version)
  .option('-y, --yes', 'Skip confirmation prompt')
  .option('-d, --directory <directory>', 'Directory to create the project in')
  .parse(process.argv)

const options = program.opts()

async function main() {
  console.log(chalk.bold('\n🚀 Welcome to create-monocf - MonoCF Generator\n'))

  let projectName = options.directory

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your project?',
      initial: 'my-cloudflare-monorepo',
    })

    if (!response.projectName) {
      console.log(chalk.red('❌ Project name is required'))
      process.exit(1)
    }

    projectName = response.projectName
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  if (fs.existsSync(targetDir)) {
    if (fs.readdirSync(targetDir).length > 0) {
      if (!options.yes) {
        const {overwrite} = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `Directory ${chalk.cyan(projectName)} already exists and is not empty. Do you want to overwrite it?`,
          initial: false,
        })

        if (!overwrite) {
          console.log(chalk.red('❌ Operation cancelled'))
          process.exit(1)
        }
      }

      fs.removeSync(targetDir)
    }
  }

  fs.mkdirSync(targetDir, {recursive: true})

  const spinner = ora('Cloning template...').start()

  try {
    // Clone the repository
    await execa('git', [
      'clone',
      'https://github.com/omerfardemir/cloudflare-workers-templates.git',
      '--depth=1',
      '--filter=blob:none',
      '--sparse',
      targetDir,
    ])

    // Change to the target directory
    process.chdir(targetDir)

    // Set up sparse checkout for the turborepo-with-npm directory and exclude create-monocf
    await execa('git', ['sparse-checkout', 'set', 'turborepo-with-npm'])

    // Make sure we're not cloning the create-monocf directory itself
    if (fs.existsSync(path.join(targetDir, 'create-monocf'))) {
      fs.removeSync(path.join(targetDir, 'create-monocf'))
    }

    // Move the contents of turborepo-with-npm to the root
    const tempDir = path.join(targetDir, 'temp')
    fs.mkdirSync(tempDir, {recursive: true})

    fs.copySync(path.join(targetDir, 'turborepo-with-npm'), tempDir)

    // Clean up the original directory structure
    fs.removeSync(path.join(targetDir, '.git'))
    fs.removeSync(path.join(targetDir, 'turborepo-with-npm'))

    // Move the contents back to the root
    const files = fs.readdirSync(tempDir)
    for (const file of files) {
      fs.moveSync(path.join(tempDir, file), path.join(targetDir, file), {overwrite: true})
    }

    // Remove the temp directory
    fs.removeSync(tempDir)

    // Initialize a new git repository
    await execa('git', ['init'])

    // Create initial commit
    await execa('git', ['add', '.'])
    await execa('git', ['commit', '-m', 'Initial commit from create-monocf'])

    spinner.succeed('Template cloned successfully!')

    // Install dependencies
    spinner.text = 'Installing dependencies...'
    spinner.start()

    await execa('npm', ['install'])

    spinner.succeed('Dependencies installed successfully!')

    console.log(chalk.green('\n✅ Project created successfully!'))
    console.log(chalk.bold('\nNext steps:'))
    console.log(`  cd ${chalk.cyan(projectName)}`)
    console.log('  npm run dev my-worker')
    console.log('\nHappy coding! 🎉\n')
  } catch (error) {
    spinner.fail('Failed to create project')
    console.error(chalk.red(`\n❌ Error: ${(error as Error).message}`))
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(chalk.red(`\n❌ Error: ${error.message}`))
  process.exit(1)
})
