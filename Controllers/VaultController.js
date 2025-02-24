const express = require("express");

const Vault = require("../Models/Vault");
// const Therapist = require("../Models/Therapist");

//Add Vault
const addVault = async (req, res) => {
  try {
    var vaultId;

    const vault = await Vault.find();

    if (vault.length > 0) {
      vaultId = vault[vault.length - 1].id + 1;
    } else {
      vaultId = 1;
    }

    const newVault = new Vault({
      id: vaultId,
      folder: req.files[0].filename,
    });

    const savedVault = await newVault.save();

    res.status(201).send(savedVault);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All Vault
const getAllVault = async (req, res) => {
  try {
    var data = await Vault.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Vault by id--
const getVaultById = async (req, res) => {
  const vault = await Vault.findOne({ id: req.params.id });
  if (vault) {
    res.status(201).send(vault);
  } else {
    res.status(400).send({ message: "No vault found" });
  }
};

//Delete vault
const deleteVault = async (req, res) => {
  const vault = await Vault.findOne({ id: req.params.id });
  if (vault) {
    await vault.remove();
    res.status(201).json({ message: "Vault removed" });
  } else {
    res.status(404).json({ message: "Vault is not present" });
  }
};

//Update Vault
const updateVault = async (req, res) => {
  try {
    const vault = await Vault.findOne({ id: req.params.id });
    (vault.image = req.files[0].filename), await vault.save();

    res.status(201).json({ message: "Vault is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addVault,
  getAllVault,
  getVaultById,
  updateVault,
  deleteVault,
};
