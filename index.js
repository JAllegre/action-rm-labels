const core = require('@actions/core');
const github = require('@actions/github');

(async function () {
  try {
    const githubToken = core.getInput('github_token', { required: true });
    const labels = (core.getInput('labels') || '').split(',').filter(label => (label && label.length));

//    const [owner, repo] = github.context.owner
    console.error('*****ju***** index.js.8','labels', labels);
    core.error('*****ju***** index.js.7','labels', labels);
    
    if (labels.length === 0) {
      return;
    }

    const gitHubClient = new github.GitHub(githubToken);
    console.error('*****ju***** index.js.32','github.context.owner:', github.context.owner);
    console.error('*****ju***** index.js.32','github.context.repo:', github.context.owner);
    console.error('*****ju***** index.js.34','github.context.issue.number:', github.context.issue.number);
    console.error('*****ju***** index.js.35','github.context.issue.labels:', github.context.issue.labels);
    for (const label of labels) {

      try{
        await gitHubClient.issues.removeLabel({
          name: label,
          owner: github.context.owner,
          repo: github.context.repo,
          issue_number: github.context.issue.number
        });
  
      }catch(err){
        //label not found continue
      }
    }
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
})()

