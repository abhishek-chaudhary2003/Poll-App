# Real-Time Poll App

## Features

* Create polls with unique shareable links

* Vote in real time with instant updates (Socket.io)

* One vote per user protection

* Live vote counts & percentages

* Local storage to keep track of created polls

## Tech Stack

* Frontend: React, Tailwind, Vite
* Backend: Node.js, Express
* Database: MongoDB
* Realtime: Socket.io

## How to Run

    npm install
    npm run dev

## Fairness / Anti-Abuse Mechanisms

1 Voter ID (Persistent Client Identity)

Each user get a assigned a unique voterId, which is stored in localStorage.
This ensures that not a vote is cast multiple times from the same browser.

2 IP Hashing

The server hashes the user’s IP address and associates it with the vote.
Even if the user clears localStorage, no votes are cast twice from the same IP.

## Edge Cases Handled

* Poll not found → returns 404

* Invalid option ID → returns 400

* Duplicate vote attempt → returns 403

* Empty poll options validation

* UI fallback while poll is loading

* Safe vote counting when votes = 0

* Page refresh does not break poll link (stored locally)

## Known Limitations / Improvements

* IP-based protection may block multiple users on same network

* No authentication (poll ownership not guaranteed)

* Polls do not expire

* No analytics or charts yet

* LocalStorage tracking works only per device

## Possible Next Improvements

* Add user accounts (JWT auth)

* Poll expiration timer

* Better visualization (charts)

* Rate limiting

* Deploy with Docker + CI/CD