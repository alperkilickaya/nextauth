import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    client.close();
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  const db = client.db();
  const newMessage = {
    email: email,
  };

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  try {
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    newMessage.id = result.insertedId;
    newMessage.status = "success";
    newMessage.message = "User created successfully!";
  } catch (error) {
    res.status(500).json({ message: "Inserting user failed!" });
    client.close();
    return;
  }
  res.status(201).json(newMessage);
  client.close();
}

export default handler;
