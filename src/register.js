const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();
// endpoint for the contact message form
router.post("/contact", async (req, res) => {
  const { name, email, context, subject, message } = req.body;
  if (!name || !email || !context || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    let contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        context,
        subject,
        message,
      },
    });
    return res.status(201).json(contactMessage);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while save to contact message" });
  }
});

// get all contact details
router.get("/contact", async (req, res) => {
  try {
    const contactMessages = await prisma.contactMessage.findMany();
    return res.status(200).json(contactMessages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error while getting  contact messages." });
  }
});
//endpoint for the inquiry form
router.post("/inquiry", async (req, res) => {
  const { name, email, figmaUrl } = req.body;
  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        figmaUrl,
      },
    });
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "Faild to create inquiry" });
  }
});

// get all inquiry details
router.get("/inquiry", async (req, res) => {
  try {
    const inquiry = await prisma.inquiry.findMany();
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "An error getting the inquiry details" });
  }
});
module.exports = router;
