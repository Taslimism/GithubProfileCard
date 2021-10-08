const btn = document.querySelector('#btn');
const search = document.querySelector('#search')
const main = document.querySelector('#main');
const form = document.querySelector('#form');

const APIURL = 'https://api.github.com/users/'

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userName = search.value;
    search.value = '';
    callAPI(APIURL + userName);
})

async function callAPI(url) {
    try {
        const { data } = await axios(url);
        creatCard(data);
        createRepos(url + '/repos?sort=created');
        // createRepo(repos);
    } catch (error) {
        console.log(error);
    }
}

async function createRepos(url) {
    try {
        const repos = await axios(url);
        createRepo(repos.data);
    } catch {
        console.log(error);
    }
}


const creatCard = (data) => {
    const card = `<div class="card">
    <div>
      <img
        src="${data.avatar_url}"
        alt="${data.name}" img
        class="avatar"
      />
    </div>

    <div class="user-info">
      <h2>${data.name}</h2>
      <p>
        ${data.bio}
      </p>

      <ul>
        <li>${data.followers} <strong>Followers</strong></li>
        <li>${data.following} <strong>Following</strong></li>
        <li>${data.public_repos} <strong>Repos</strong></li>
      </ul>

      <div class = "repos" id="repos">
      
      </div>
    </div>
  </div>`

    main.innerHTML = card;

}

const createRepo = (repos) => {
    const reposEl = document.querySelector('#repos');

    repos.
        slice(0, 6).forEach(repo => {
            const name = repo.name;
            const repoURL = repo.html_url;

            const a = document.createElement('a');
            a.classList.add('repo');
            a.href = `${repoURL}`;
            a.innerHTML = name;
            a.target = '_blank';

            reposEl.appendChild(a);
        })
}
