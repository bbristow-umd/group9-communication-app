// Group 9 Communication App - backend API (first version)
// Messages are kept in memory for now. They reset when the server restarts.
// A real database (Azure) will replace this later.

const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sample data so the API has something to return right away.
const conversations = {
  general: { id: "general", name: "Group 9 General", type: "group" },
};

const messages = [
  {
    id: 1,
    conversationId: "general",
    sender: "Devansh",
    text: "Backend server is up.",
    sentAt: new Date().toISOString(),
  },
];

let nextId = 2;

// Check that the server is running.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// List all conversations.
app.get("/api/conversations", (req, res) => {
  res.json(Object.values(conversations));
});

// Get every message in one conversation, oldest first.
app.get("/api/conversations/:id/messages", (req, res) => {
  const { id } = req.params;
  if (!conversations[id]) {
    return res.status(404).json({ error: `Conversation "${id}" not found` });
  }
  res.json(messages.filter((m) => m.conversationId === id));
});

// Send a new message to a conversation.
app.post("/api/conversations/:id/messages", (req, res) => {
  const { id } = req.params;
  if (!conversations[id]) {
    return res.status(404).json({ error: `Conversation "${id}" not found` });
  }

  const { sender, text } = req.body || {};
  if (typeof sender !== "string" || !sender.trim()) {
    return res.status(400).json({ error: "sender is required" });
  }
  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }

  const message = {
    id: nextId++,
    conversationId: id,
    sender: sender.trim(),
    text: text.trim(),
    sentAt: new Date().toISOString(),
  };
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Group 9 API running at http://localhost:${PORT}`);
});
