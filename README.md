# DevDuel

Duke it out with your fellow devs!

<img src="/client/src/assets/devduel.png" />

---

DevDuel lets you enter two GitHub usernames and watch them face off in a stat-based animated battle.

<p align="center">
  <img src="/client/src/assets/brawlerGirl/idle.gif" width="200" style="display:inline-block; margin-right: 10px;" />
  <img src="/client/src/assets/enemyPunk/idle.gif" width="200" style="display:inline-block;" />
</p>

---

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---

## Tech Stack

**Frontend**: Angular, TailwindCSS  
**Backend**: Node.js, Express  
**API**: GitHub REST API
**Deployment**: Render  
**Animation**: Pure HTML/CSS + setTimeout + GIFs

---

## Motivation

<table>
  <tr>
    <td width="140">
      <img src="/client/src/assets/brawlerGirl/jab.gif" width="220" />
    </td>
    <td>
      <p>
        I made <strong>DevDuel</strong> because I wanted to build something fun that mixes coding with animation,
        while getting more practice with Angular. It gave me a chance to learn how to work with routes, services,
        and APIs, and to see how I could bring real GitHub data to life with custom animations and UI.
      </p>
    </td>
  </tr>
</table>

---

<p align="center">
  <img src="/client/src/assets/screens/COUNTDOWN.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/FIGHT.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/KO.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/STATS.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/LOADING.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/ERROR.png" width="300" style="vertical-align: top;"/>
</p>

---

## Mono Repo Structure

```
dev-duel/
├── client/    # Angular frontend using TailwindCSS
├── server/    # Node.js + Express backend calling GitHub API
└── README.md
```

---

## Features

<table>
  <tr>
    <td width="140">
      <img src="/client/src/assets/brawlerGirl/walk.gif" width="220" />
    </td>
    <td>
      <ul>
        <li>Look up a single GitHub user</li>
        <li>Duel two GitHub users using custom backend logic</li>
        <li>Complex frontend animations</li>
        <li>Custom character animation with user avatars</li>
        <li>Mobile-optimized, animated, and deployed via <a href="https://render.com">Render</a></li>
        <li>GitHub API token used to avoid rate limits</li>
      </ul>
    </td>
  </tr>
</table>

---

## Backend

Built in **Javascript** using **Node** and **Express**.

To determine user stats and titles, the backend analyzes GitHub profiles with custom logic:

### Titles:

```ts
const isForker = (repos) =>
  repos.filter((repo) => repo.fork).length > repos.length / 2 ? "Forker" : "";
const isOneTrickPony = (repos) =>
  onlyUnique(repos.map((repo) => repo.language)).length === 1
    ? "One-Trick Pony"
    : "";
const isJackOfAllTrades = (repos) =>
  onlyUnique(repos.map((repo) => repo.language)).length >= 10
    ? "Jack of all Trades"
    : "";
const isStalker = (user) => (user.following > user.followers ? "Stalker" : "");
const isMrPopular = (user) =>
  user.followers > user.following ? "Mr. Popular" : "";
```

### Stats:

```ts
const totalStars = repos => repos.reduce((total, repo) => total + repo.stargazers_count, 0);
const highestStarred = repos => repos.reduce((highest, repo) => Math.max(highest, repo.stargazers_count), 0);
const perfectRepos = repos => repos.filter(repo => repo.has_issues).length;
const favoriteLanguage = repos => /* Most common language used */
```

All data is merged via a `userMapper()` function that returns a structured user profile.

---

## Frontend

Built in **Angular** with **TailwindCSS**.

### Routes:

- `/` — Home page
- `/inspect` — Enter a username to inspect a GitHub user
- `/duel` — Enter two usernames and watch them battle

### Duel Page Features:

- Countdown overlay: "3... 2... 1... FIGHT!"
- Animated Gif Pixel Art characters (thanks to [Ansimuz](https://ansimuz.itch.io/))
- Gifs updated with `setTimeout`, moved via CSS absolute positioning
- Avatar bubbles reflect the GitHub users
- User stats shown below after the fight
- Full mobile responsiveness
- Loading + error state UI

---

## Environment Variables

In `/server/.env`:

```bash
GITHUB_TOKEN=your_personal_access_token
```

Used to authenticate GitHub API requests and avoid rate limits.

---

## Deployment

<table>
  <tr>
    <td width="140">
      <img src="/client/src/assets/brawlerGirl/kick.gif" width="220" />
    </td>
    <td>
      <p>
        Deployed on <strong>Render</strong> with a <code>render.yaml</code> file to handle both client and server.
      </p>
    </td>
  </tr>
</table>

---

## Acknowledgements

<table>
  <tr>
    <td>
      <ul>
        <li>Sprite art by <a href="https://ansimuz.itch.io/">Ansimuz</a></li>
        <li>GitHub <a href="https://docs.github.com/en/rest?apiVersion=2022-11-28">REST API</a></li>
        <li><a href="https://render.com">Render</a> for deployment</li>
        <li>Initial repo built by CookSys</li>
      </ul>
    </td>
    <td width="140">
      <img src="/client/src/assets/enemyPunk/punch.gif" width="220" />
    </td>
  </tr>
</table>


---

## Reflection

During this project, I was learning Angular for the first time, and getting used to its project strucure compared to React. I had to learn how to pass state and handle complex frontend logic such as timing the animations and importing assets.

The most difficult part of the project was setting up the server and deploying the application. I ran into several issues with deployment and it took quite a long time to debug and get this deployed to Render. The issues I encountered and their resolutions are listed below.

1. **Monorepo Configuration**

- _Issue:_ Client and server were deployed together, causing build and routing conflicts.
- _Resolution:_ Split into two Render services — one `web` for the Node server and one `static` for the Angular client, using `render.yaml`.

2. **Angular Route Refresh Failures**

- _Issue:_ Direct navigation to client routes like `/inspect` resulted in 404 errors.
- _Resolution:_ Added a rewrite rule in Render to send all unknown routes to `index.html` so Angular's router can take over.

3. **Joi Version and Validation Conflicts**

- _Issue:_ Received `Joi.validate is not a function` due to use of deprecated `express-validation` and uninstalled/mismatched Joi versions locally.
- _Resolution:_ Removed `express-validation`, rewrote validation using `schema.validate()`, and installed `joi@17` locally to match production.

4. **ES Module Compatibility**

- _Issue:_ Using `"type": "module"` triggered missing extension errors and bundling issues with CommonJS-based dependencies.
- _Resolution:_ Removed `esbuild`, added `.js` to all local imports, and used `import.meta.url` to replicate `__dirname`.

5. **Environment Variable and Build Configs**

- _Issue:_ Client made requests to `localhost`, and server failed without `GITHUB_TOKEN` in some environments.
- _Resolution:_ Defined `apiUrl` in Angular’s `environment.prod.ts`, used `--configuration production` in build commands, and configured `.env` handling with `dotenv`.

---

## Contact

Made with by [Lucie Chevreuil](https://github.com/sasszz) 2025
