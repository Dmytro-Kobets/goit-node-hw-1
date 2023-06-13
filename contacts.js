const { readFile, writeFile } = require("fs").promises;

const path = require("path");
const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  try {
    const readResult = await readFile(contactsPath);

    console.log("List Contacts:");
    console.log(JSON.parse(readResult));
    console.log("-----------------------------------");
  } catch (err) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const result = parsedContacts.find((contact) => contact.id === contactId);
    console.log("Found contact:");
    console.log("-----------------------------------");

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const index = parsedContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (index !== -1) {
      const removedContact = parsedContacts.splice(index, 1);

      console.log("Deleted contact:");
      console.log(removedContact);
      console.log("-----------------------------------");
    } else {
      return console.log("There is no contact with this id.");
    }

    await writeFile(contactsPath, JSON.stringify(parsedContacts));

    console.log("Updated contacts:");
    console.log(parsedContacts);
    console.log("-----------------------------------");
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  const { nanoid } = await import("nanoid");
  try {
    const contacts = await readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const newContact = {
      id: nanoid(),
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
    };
    parsedContacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(parsedContacts));

    console.log("New contact:");
    console.log(newContact);
    console.log("-----------------------------------");
    console.log("Updated contacts:");
    console.log(parsedContacts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
