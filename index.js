//https://github.com/actions/toolkit/tree/main/packages/github

const core = require("@actions/core");
const github = require("@actions/github");

(async function () {
  try {
    const githubToken = core.getInput("github_token", { required: true });
    const labels = (core.getInput("labels", { required: true }) || "")
      .split(",")
      .filter((label) => label && label.length);

    if (labels.length === 0) {
      throw new Error('no label provided')
    }

    const gitHubClient = github.getOctokit(githubToken);
    const repoData = gitHubClient.context.repo ;
    if (!repoData.owner || repoData.repo) {
      throw new Error('no label provided')
    }
    for (const label of labels) {
      console.error("*****ju***** index.js.30", "label", label);
      try {
        await gitHubClient.issues.removeLabel({
          name: label,
          owner: repoData.owner,
          repo: repoData.repo,
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
