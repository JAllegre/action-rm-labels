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
      github.context.repo
    );
    console.error(
      "*****ju***** index.js.35",
      "github.context.issue.labels:",
      JSON.stringify(github.context)
    );
    for (const label of labels) {
      try {
        await gitHubClient.issues.deleteLabel({
          name: label,
          owner: github.context.owner,
          repo: github.context.repo,
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
