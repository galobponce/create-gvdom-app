#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

if (process.argv.length < 3) {
  console.log("You must provide a name to your app 😤.")
  console.log("For example :")
  console.log("    npx create-gvdom-app my-app")
  process.exit(1)
}

const appName = process.argv[2]
const currentPath = process.cwd()
const appPath = path.join(currentPath, appName)
const gitRepoUrl = "https://github.com/galobponce/create-gvdom-app"

try {
  fs.mkdirSync(appPath)
} catch (e) {
  if (e.code === "EEXIST") {
    console.log(
      `The file ${appName} already exists in the current directory 😕.\nPlease remove it, rename it or provide another name.`
    )
  } else {
    console.log(e)
  }
  process.exit(1)
}

async function main() {
  try {
    console.log("Downloading files...")
    execSync(`git clone --depth 1 ${gitRepoUrl} ${appPath}`)

    process.chdir(appPath)

    console.log("Installing dependencies...")

    execSync("yarn install")

    console.log("Removing useless files...")

    fs.rmSync(path.join(appPath, ".git"), { recursive: true, force: true })
    fs.rmSync(path.join(appPath, "bin"), { recursive: true, force: true })

    console.log("Everything is done! Happy coding! 😎")
  } catch (e) {
    console.log(error)
  }
}

main()
