#!/usr/bin/env node

const fs = require("fs")
const os = require("os")
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

function isUsingYarn() {
  return (process.env.npm_config_user_agent || "").indexOf("yarn") === 0
}

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

    console.log("\n\nRemoving useless files...")

    fs.rmSync(path.join(appPath, ".git"), { recursive: true, force: true })
    fs.rmSync(path.join(appPath, "bin"), { recursive: true, force: true })
    fs.rmSync(path.join(appPath, "package.json"), {
      force: true,
    })
    fs.rmSync(path.join(appPath, "yarn.lock"), {
      force: true,
    })

    console.log("\n\nCreating package.json file...")

    const packageJson = {
      name: appName,
      version: "0.1.0",
      private: true,
      scripts: {
        start: "parcel src/index.html",
        build: "parcel build src/index.js",
      },
      dependencies: {
        gvdom: "0.0.3",
      },
      devDependencies: {
        parcel: "2.9.1",
        "@babel/core": "7.22.1",
        "@babel/plugin-transform-react-jsx": "7.22.3",
      },
    }

    fs.writeFileSync(
      path.join(appPath, "package.json"),
      JSON.stringify(packageJson, null, 2) + os.EOL
    )

    console.log("\n\nInstalling dependencies...")

    if (isUsingYarn()) {
      execSync("yarn install")
    } else {
      execSync("npm install")
    }

    console.log("\n\nDone with dependencies 🙂")

    console.log("\n\nEverything is done! Happy coding! 😎")
  } catch (e) {
    console.log(error)
  }
}

main()
