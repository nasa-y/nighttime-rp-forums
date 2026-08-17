const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// === CONFIGURATION ===
const FIVEM_IP = "81.111.74.157";
const FIVEM_PORT = 40120;
const FIVEM_URL = `http://${FIVEM_IP}:${FIVEM_PORT}`;
const SERVER_NAME = "NightTime RP";
const MAX_PLAYERS = 48;

// === CORS + STATIC FILES ===
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

// === CHAT STORAGE ===
let chatMessages = [];
const MAX_CHAT = 50;

// === SERVER STATUS ===
app.get("/api/status", async (req, res) => {
  try {
    const response = await fetch(`${FIVEM_URL}/info.json`, { timeout: 3000 });
    if (!response.ok) throw new Error("Server returned error");
    const data = await response.json();

    res.json({
      online: true,
      name: data.hostname || SERVER_NAME,
      players: data.players ? data.players.length : 0,
      maxPlayers: data.sv_maxclients || MAX_PLAYERS,
      map: data.mapname || "Los Santos",
      gamemode: data.gamemode || "roleplay",
      version: data.version || "unknown",
      uptime: data.uptime || 0,
    });
  } catch (err) {
    res.json({
      online: false,
      name: SERVER_NAME,
      players: 0,
      maxPlayers: MAX_PLAYERS,
      map: "Los Santos",
      gamemode: "roleplay",
      version: "unknown",
      uptime: 0,
    });
  }
});

// === PLAYER LIST ===
app.get("/api/players", async (req, res) => {
  try {
    const response = await fetch(`${FIVEM_URL}/players.json`, { timeout: 3000 });
    if (!response.ok) throw new Error("Server returned error");
    const data = await response.json();

    const players = Array.isArray(data)
      ? data.map((p) => ({
          id: p.id,
          name: p.name || "Unknown",
          ping: p.ping || 0,
          identifiers: p.identifiers || [],
          isStaff: p.end ? p.end.includes("staff") : false,
        }))
      : [];

    res.json({ online: true, players });
  } catch (err) {
    res.json({ online: false, players: [] });
  }
});

// === CHAT: GET MESSAGES ===
app.get("/api/chat", (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  res.json(chatMessages.slice(-limit));
});

// === CHAT: SEND MESSAGE ===
app.post("/api/chat", (req, res) => {
  const { username, message } = req.body;
  if (!username || !message) {
    return res.status(400).json({ error: "Username and message required" });
  }

  const chatMsg = {
    id: Date.now(),
    username,
    message: message.substring(0, 200),
    timestamp: new Date().toISOString(),
    source: "website",
  };

  chatMessages.push(chatMsg);
  if (chatMessages.length > MAX_CHAT) {
    chatMessages = chatMessages.slice(-MAX_CHAT);
  }

  // Forward to FiveM server via HTTP POST
  fetch(`${FIVEM_URL}/nighttime-chat/receive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatMsg),
    timeout: 3000,
  }).catch(() => {});

  res.json({ ok: true, message: chatMsg });
});

// === CHAT: RECEIVE FROM FIVEM ===
app.post("/api/chat/game", (req, res) => {
  const { username, message } = req.body;
  if (!username || !message) return res.status(400).json({ error: "Missing fields" });

  const chatMsg = {
    id: Date.now(),
    username,
    message: message.substring(0, 200),
    timestamp: new Date().toISOString(),
    source: "game",
  };

  chatMessages.push(chatMsg);
  if (chatMessages.length > MAX_CHAT) {
    chatMessages = chatMessages.slice(-MAX_CHAT);
  }

  res.json({ ok: true });
});

// === SPA FALLBACK ===
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║  NightTime RP Backend                ║`);
  console.log(`  ║  Running on http://localhost:${PORT}   ║`);
  console.log(`  ║  FiveM Server: ${FIVEM_IP}:${FIVEM_PORT}  ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);
});
