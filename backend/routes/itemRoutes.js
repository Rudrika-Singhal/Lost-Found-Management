const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");


// 🔹 ADD ITEM (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      userId: req.user.id
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


// 🔹 GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


// 🔹 GET ITEM BY ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


// 🔹 UPDATE ITEM (Only owner)
router.put("/:id", auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    // check owner
    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


// 🔹 DELETE ITEM (Only owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    // check owner
    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ msg: "Item deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


// 🔹 SEARCH ITEM
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    const items = await Item.find({
      itemName: { $regex: name, $options: "i" }
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});


module.exports = router;