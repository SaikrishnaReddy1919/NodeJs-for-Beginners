const fetch = require("node-fetch");
const getAllFollowers = () => {
  console.log("getting followers...");
  fetch(
    `https://api.github.com/users/${process.env.NODE_APP_USERNAME}/followers`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const followers = [];
      json.map((follower) => {
        followers.push({
          name: follower.login,
          url: follower.url,
        });
      });
      console.log(followers);
    });
};

getAllFollowers();

const getReposOfOrganization = () => {
    console.log('getting repos of an organization...')
    fetch("https://api.github.com/orgs/ibm/repos")
        .then((res) => res.json(res))
        .then(json => {
            const repos = []
            let max = 0
            const highestWatcherRepoIs = []
            json.map(repo => {
                if (repo.watchers >= 20) {
                    repos.push({
                        repoName: repo.name,
                        watchers: repo.watchers
                    })
                }
            })

            json.map(repo => {
                if (repo.watchers > max) {
                    max = repo.watchers
                }
                if (max === repo.watchers) {
                    highestWatcherRepoIs.push({
                        repoName: repo.name,
                        watchers : repo.watchers
                    })
                }
            })
            console.log(repos)
            console.log('Repo with highest watchers is : ')
            console.log(highestWatcherRepoIs)
        });
};

getReposOfOrganization()
