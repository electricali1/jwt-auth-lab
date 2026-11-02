const router = require("express").Router();
const Entry = require("../models/Entry");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  try {
    console.log(req.user);
    const entry = await Entry.create({ ...req.body, owner: req.user._id });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find({ isPublic: true });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my-entries", verifyToken, async (req, res) => {
  try {
    const entries = await Entry.find({ owner: req.user._id });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    if (!entry.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    if (!entry.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await Entry.findByIdAndDelete(req.params.id);
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
