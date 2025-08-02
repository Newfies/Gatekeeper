<p align="center">
  <img src="https://raw.githubusercontent.com/Newfies/Gatekeeper/refs/heads/main/res/Logo2.png" alt="Gatekeeper">
</p>

# Gatekeeper

**Gatekeeper** is the evolution of Disboot — a Discord bot designed to make **ban management across multiple servers simple and collaborative**.

---

## ✨ What is Gatekeeper?
Gatekeeper allows server owners to efficiently **ban problematic users** and **share/import ban lists** with other communities. This creates a shared defense system where server owners can **exchange ban categories** to prevent specific groups or malicious users from accessing their servers.

---

## ⚠️ Notice
- This is another learning project of mine, I don't want to use ChatGPT for this however I always seem to end up using it either way and then I loose all desire to work on it.
- If you are reading this and your not me, Hey! what are you doing here..? This probably won't go anywhere, so unless you wanna try to help I don't see a reason for you to be here, this isn't exactly a good place to learn from, but its open source so.. knock yourself out I guess.
- If you are curious on my other projects that kinda went nowhere I suggest you look at any of the following.
  - [**Disboot**](https://github.com/Newfies/Disboot) [**OPEN SOURCE DISCORD BOT**]
  - [**DWT**](https://github.com/GsLibrary/dwt) [**OPEN SOURCE NODEJS TEMPLATE I USED OFTEN**]
  - [**NewfiesJS**](https://newfies.github.io/module/) [**OPEN SOURCE NPM PACKAGE**] Ended up being a logging system. I wanted to turn it into a library for easy access to all the things I use.. But I can't add much when I can't code for shit

---

## 🚀 Key Features
- Manage bans across **multiple servers**, each with their own configurations.
- Easily **export ban lists** to share with trusted communities.
- **Import shared ban lists** to instantly block groups of harmful users.
- Maintain a **centralized banlist per server**, making moderation faster and more consistent.

---

## 🛠️ Planned Commands
| Command                | Description                                                           |
|------------------------|-----------------------------------------------------------------------|
| `/export`              | Exports your server’s current ban list into a **sharable code**.      |
| `/import <code>`       | Imports a ban list from a shared code and applies it to your server.  |
| `/ban <user> <reason>` | Bans a user from your server and adds them to your server’s ban list. |

---

## 📝 Goals
- Support **multiple servers** with isolated configurations and ban lists.
- Build robust **export/import systems** for ban list sharing.
- Enable server moderators to quickly ban and categorize problematic users.
- Provide a modular foundation for future expansion (categories, ban appeals, etc.).

---

## 📂 Folder Structure
```plaintext
Gatekeeper/
├── commands/
│   ├── ban.js
│   ├── export.js
│   ├── import.js
│   └── ping.js
├── utils/
│   └── logger.js
├── data/
│   └── servers/
│       └── [SERVER IDENTIFIER]/
|           ├── configs.json
│           └── bans.json
├── bot.js
├── package.json
├── .env
├── LICENSE
└── README.md
```

---

## 📌 Future Plans
- Add **ban categories** (e.g., spammers, raiders, scam bots, **Disboard leachers**).
- Allow **global ban codes** trusted by multiple servers.
- Build a **web dashboard** for easier ban list management.
- Optional: Implement **appeal system** for banned users.

---

## 📜 License
MIT License — Free to use, modify, and contribute.

---

## 🤝 Contributions
Feel free to open issues, suggest features, or contribute via Pull Requests!

---

## 💬 Credits
Built by **Newfies** with the help of **ChatGPT** as a successor to **Disboot**.
