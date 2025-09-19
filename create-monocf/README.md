# create-monocf

A CLI tool to create a new MonoCF monorepo project using template.

## Features

- Creates a new MonoCF monorepo project based on template
- Includes Hono framework for building Cloudflare Workers
- Provides a structured monorepo setup with shared packages
- Includes generator configurations for creating new workers

## Usage

You can create a new project using any of the following methods:

```bash
# Using npm
npm create monocf@latest

# Using npx
npx create-monocf@latest

# Using yarn
yarn create monocf

# Using pnpm
pnpm create monocf@latest
```

### Options

- `-d, --directory <directory>`: Specify the directory to create the project in
- `-y, --yes`: Skip confirmation prompts
- `-h, --help`: Display help information
- `-v, --version`: Display version information

## Project Structure

The generated project includes:

- A main worker structure in `workers/my-worker`
- Turborepo generator configuration in `turbo/generators/config.ts`
- Template files for generating new workers in `turbo/generators/template`
- Workers depend on a root `monocf.config.json` file for configuration
- Uses Hono framework for building Cloudflare Workers

## Development

To build the package locally:

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run the package locally
npm start
```