import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import LostPetModel from "./Models/LostPetModel.js";
import PetModel from "./Models/PetModel.js";
import UserModel from "./Models/UserModel.js";
const app = express();

app.use(express.json());
app.use(cors());

const connectString =
  "mongodb+srv://ariam:1234@aleefcluster.pbik5nl.mongodb.net/aleefDb?retryWrites=true&w=majority&appName=aleefCluster";

mongoose
  .connect(connectString)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


app.post("/registerUser", async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const { name, email, phone, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.send({ msg: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User saved:", newUser);

    res.send({ msg: "User registered successfully.", user: newUser });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ error: "Error in registration" });
  }
});

// LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGOUT API
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// ADD PET API
app.post("/addPet", async (req, res) => {
  try {
    const pet = new PetModel(req.body);
    await pet.save();

    res.send({ pet: pet, msg: "Pet added successfully." });
  } catch (error) {
    console.log("Add pet error:", error);
    res.status(500).json({ error: "Error adding pet" });
  }
});

// GET PETS API
app.get("/getPets", async (req, res) => {
  try {
    const pets = await PetModel.find({}).sort({ createdAt: -1 });
    res.send({ pets: pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting pets" });
  }
});

// GET ONE PET API
app.get("/getPet/:id", async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    res.send({ pet: pet });
  } catch (error) {
    res.status(500).json({ error: "Error getting pet" });
  }
});
// ADD LOST PET
app.post("/reportLostPet", async (req, res) => {
  try {
    const pet = new LostPetModel(req.body);
    await pet.save();

    res.send({ pet: pet, msg: "Lost pet reported." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error reporting lost pet" });
  }
});

// GET LOST PETS
app.get("/getLostPets", async (req, res) => {
  try {
    const pets = await LostPetModel.find({}).sort({ createdAt: -1 });
    res.send({ pets: pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting lost pets" });
  }
});

// GET MY ADOPTION PETS
app.get("/myPets/:email", async (req, res) => {
  try {
    const pets = await PetModel.find({ createdByEmail: req.params.email }).sort({
      createdAt: -1,
    });

    res.send({ pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting my pets" });
  }
});

// DELETE ADOPTION PET
app.delete("/deletePet/:id", async (req, res) => {
  try {
    await PetModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "Pet deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pet" });
  }
});

// GET MY LOST PETS
app.get("/myLostPets/:email", async (req, res) => {
  try {
    const pets = await LostPetModel.find({
      createdByEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.send({ pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting my lost pets" });
  }
});

// DELETE LOST PET
app.delete("/deleteLostPet/:id", async (req, res) => {
  try {
    await LostPetModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "Lost pet deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting lost pet" });
  }
});
app.put("/updatePet/:id", async (req, res) => {
  try {
    const pet = await PetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.send({ pet });
  } catch (error) {
    res.status(500).json({ error: "Error updating pet" });
  }
});

app.put("/updateLostPet/:id", async (req, res) => {
  try {
    const pet = await LostPetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.send({ pet });
  } catch (error) {
    res.status(500).json({ error: "Error updating lost pet" });
  }
});