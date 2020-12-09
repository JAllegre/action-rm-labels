//https://github.com/actions/toolkit/tree/main/packages/github

const core = require("@actions/core");
const github = require("@actions/github");

(async function () {
  try {
    const githubToken = core.getInput("github_token", { required: true });
    const labels = (core.getInput("labels") || "")
      .split(",")
      .filter((label) => label && label.length);

    if (labels.length === 0) {
      return;
    }

    const gitHubClient = github.getOctokit(githubToken);
    console.error(
      "*****ju***** index.js.32",
      "github.context.repo:",
      github.context.repo.owner,
      github.context.repo.repo
    );
    const {owner, repo } = github.context.repo
    // console.error(
    //   "*****ju***** index.js.35",
    //   "github.context.issue.labels:",
    //   ...github.context
    // );
    for (const label of labels) {
      console.error('*****ju***** index.js.30','label', label);
      try {
        await gitHubClient.issues.removeLabel({
          name: label,
          owner,
          repo,
          issue_number: github.context.issue.number,
        });
      } catch (err) {
        core.error(err);
        //label not found continue
      }
    }
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
})();
