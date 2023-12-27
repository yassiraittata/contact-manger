const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const contactModel = require("../models/contactModel");

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const contacts = await contactModel.find({ user_id: id });
  res.json(contacts);
});

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  // check if the array is not empty
  // the validationResult returns an array of all the errors
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  // destructure the field from the request body
  const { email, name, phone } = req.body;

  // feild validation
  if (!req.body.email) {
    throw new Error("All fiels are mandatory");
  }

  // Add the contact to the database
  const contact = await contactModel.create({
    email,
    phone,
    name,
    user_id: req.user.id });

  res.status(201).json(contact);
});

// Get a single contact
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await contactModel.findById(id);

  if (!contact) {
    console.log("entered here");
    res.status(404);
    throw new Error("Contact not found!");
  }

  res.status(200).json(contact);
});

// Update a contact
const updateContact = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "contact updated" });
});

// Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "contact deleted" });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
