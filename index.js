const core = require('@actions/core');
const cp = require("child_process");

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.info(`Start downloading direnv`)
    cp.execSync('curl -sfL https://direnv.net/install.sh | bash', { encoding: "utf-8" })
    core.info(`Done downloading direnv`)

    cp.execSync('direnv allow', { encoding: "utf-8" });
    const envs = JSON.parse(cp.execSync('direnv export json', { encoding: "utf-8" }));

    Object.keys(envs).forEach(function (name) {
      const value = envs[name];
      core.info("Exported variables " + name + " : " + value);
      core.exportVariable(name, value);
    });
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
