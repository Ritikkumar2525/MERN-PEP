import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Confession from "../models/Confession.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { text, secretCode } = req.body;

    if (!text || !secretCode)
      return res.status(400).json({ message: "Text and secret code required" });

    if (secretCode.length < 4)
      return res.status(400).json({ message: "Secret code must be at least 4 characters" });

    const hashedCode = await bcrypt.hash(secretCode, 10);

    const confession = await Confession.create({
      text,
      secretCode: hashedCode,
      userId: req.user.id
    });

    res.status(201).json(confession);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const confessions = await Confession.find()
      .sort({ createdAt: -1 });

    res.json(confessions);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { newText, secretCode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const confession = await Confession.findById(req.params.id);

    if (!confession)
      return res.status(404).json({ message: "Confession not found" });

    const match = await bcrypt.compare(secretCode, confession.secretCode);

    if (!match)
      return res.status(403).json({ message: "Wrong Secret Code" });

    confession.text = newText;
    await confession.save();

    res.json({ message: "Updated Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { secretCode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const confession = await Confession.findById(req.params.id);

    if (!confession)
      return res.status(404).json({ message: "Confession not found" });

    const match = await bcrypt.compare(secretCode, confession.secretCode);

    if (!match)
      return res.status(403).json({ message: "Wrong Secret Code" });

    await confession.deleteOne();

    res.json({ message: "Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/:id/react", async (req, res) => {
  try {
    const { type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID" });

    const confession = await Confession.findById(req.params.id);

    if (!confession)
      return res.status(404).json({ message: "Confession not found" });

    if (!["like", "love", "laugh"].includes(type))
      return res.status(400).json({ message: "Invalid reaction type" });

    confession.reactions[type] += 1;
    await confession.save();

    res.json(confession.reactions);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;