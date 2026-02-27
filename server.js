const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection string এখানে বসাবে
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ message: "Data Saved" });
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});

app.get("/", (req, res) => {
  res.send("Hasan Azmol Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
