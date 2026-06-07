import express from "express";
import Thread from "../models/Thread.js";
import getOpenRouterAPIResponse from "../utils/openai.js";
const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "testing new thread",
    });

    const response = await thread.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to save in DB");
  }
});

//Get all threads in descending order
router.get("/thread", async (req, res) => {
  try {
    let threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to fetch threads");
  }
});

//Get a Chat
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json("Chat not found");
    }
    res.json(thread.messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed to fetch chat");
  }
});

//Delete a Thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    let deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      return res.status(404).json("Chat not found");
    }
    return res.status(200).json("Chat was successfully deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed to delete chat");
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message.slice(0, 40),
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const assistantReply = await getOpenRouterAPIResponse(thread.messages);
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = Date.now();
    await thread.save();
    res.json(assistantReply);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
