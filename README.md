# Gatekeeper

**Gatekeeper** is the evolution of Disboot — a Discord bot designed to make **ban management across multiple servers simple and collaborative**.

---

## ✨ What is Gatekeeper?
Gatekeeper allows server owners to efficiently **ban problematic users** and **share/import ban lists** with other communities. This creates a shared defense system where server owners can **exchange ban categories** to prevent specific groups or malicious users from accessing their servers.

---

## 🚀 Key Features
- Manage bans across **multiple servers**, each with their own configurations.
- Easily **export ban lists** to share with trusted communities.
- **Import shared ban lists** to instantly block groups of harmful users.
- Maintain a **centralized banlist per server**, making moderation faster and more consistent.

---

## 🛠️ Planned Commands
| Command            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `/export`           | Exports your server’s current ban list into a **sharable code**.             |
| `/import <code>`    | Imports a ban list from a shared code and applies it to your server.         |
| `/ban <user> <reason>` | Bans a user from your server and adds them to your server’s ban list.     |

---

## 📝 Goals
- Support **multiple servers** with isolated configurations and ban lists.
- Build robust **export/import systems** for ban list sharing.
- Enable server moderators to quickly ban and categorize problematic users.
- Provide a modular foundation for future expansion (categories, ban appeals, etc.).

---

## 📂 Folder Structure (Planned)
Gatekeeper/

├── Commands/

│   ├── Ban.js

│   ├── Export.js

│   ├── Import.js

│   └── Ping.js

├── Utils/

│   └── Logger.js

├── Data/

│   └── Servers/

│       └── [SERVER IDENTIFIER]/

│           └── Bans.json

├── bot.js

├── LICENSE

├── package.json

├── .env

└── README.md


---

## 📌 Future Plans
- Add **ban categories** (e.g., spammers, raiders, scam bots).
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
