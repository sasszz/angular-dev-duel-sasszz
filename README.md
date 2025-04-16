# DevDuel
Duke it out with your fellow devs

---

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<p align="center">
  <img src="/client/src/assets/screens/COUNTDOWN.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/FIGHT.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/KO.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/LOADING.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/ERROR.png" width="300" style="vertical-align: top;"/>
  <img src="/client/src/assets/screens/STATS.png" width="300" style="vertical-align: top;"/>
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

- Inspect Page - look up a single GitHub user and display profile details
- Duel Page - two GitHub users duel in an animated head-to-head battle
- Custom character animation with user avatars and dramatic effects
- Mobile-optimized, animated, and deployed via [Render](https://render.com)
- GitHub API token used to avoid rate limits


---

## GitHub Profile Analyzer (Backend)

To determine user stats and titles, the backend analyzes GitHub profiles with custom logic:

### Titles:
```ts
const isForker = repos => repos.filter(repo => repo.fork).length > repos.length / 2 ? 'Forker' : '';
const isOneTrickPony = repos => onlyUnique(repos.map(repo => repo.language)).length === 1 ? 'One-Trick Pony' : '';
const isJackOfAllTrades = repos => onlyUnique(repos.map(repo => repo.language)).length >= 10 ? 'Jack of all Trades' : '';
const isStalker = user => user.following > user.followers ? 'Stalker' : '';
const isMrPopular = user => user.followers > user.following ? 'Mr. Popular' : '';
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
- Countdown: "3... 2... 1... FIGHT!"
- Animated Gif Pixel Art characters (thanks to [Ansimuz](https://ansimuz.itch.io/))
- Gifs updated with `setTimeout`, moved via CSS absolute positioning
- Avatar bubbles reflect the GitHub users
- KO and WINNER effects
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

Deployed on **Render** with a `render.yaml` file to handle both client and server.

---

## Acknowledgements

- Sprite art by [Ansimuz](https://ansimuz.itch.io/)
- GitHub [REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- [Render](https://render.com) for deployment

---

## Tech Stack

**Frontend**: Angular, TailwindCSS  
**Backend**: Node.js, Express  
**API**: GitHub REST API
**Deployment**: Render  
**Animation**: Pure HTML/CSS + setTimeout + GIFs

---

## Contact

Made with by [Lucie Chevreuil](https://github.com/sasszz) 2025
