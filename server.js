const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5050;

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* AI Logic */
function generateSystemResponse(input) {
    const text = input.toLowerCase();

    if (text.includes("port")) {
        return "Server is listening on port 5050. All ports on this server are working correctly.";
    }

    if (text.includes("text")) {
        return "Text messaging service is operating normally.";
    }

    if (text.includes("network") || text.includes("internet")) {
        return "Network connectivity is stable and active.";
    }

    if (text.includes("who are you")) {
        return "I am an AI server built using Node.js.";
    }

    if (text.includes("who made you")) {
        return "I was created by Ranjan Das.";
    }

    if (text.includes("work")) {
        return "I am an AI server running services and processing requests efficiently.";
    }

    return "Request processed successfully. No system issues detected.";
}

/* Routes */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/ai/message", (req, res) => {
    const input = req.body.input || "";
    res.json({
        responseMessage: generateSystemResponse(input),
        timestamp: new Date().toISOString()
    });
});

/* Start Server */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
