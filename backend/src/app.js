import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import { omit } from 'lodash';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const ChatSchema = new mongoose.Schema({
  users: [String],
  messages: [{
    user: String,
    created: Date,
    message: String,
  }]
});
const Chat = mongoose.model('Chat', ChatSchema)


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/v1/chats", async (req, res) => {
  try {
    const user = req.header('User');
    if (!user) { return res.send(400) }
    const chats = await Chat.find({ users: user }).exec();
    res.send(chats.map(chat => ({
      id: chat._id,
      users: chat.users.filter(u => u !== user),
      lastMessage: chat.messages.slice(-1)[0],
    })));
  } catch (err) {
    res.send(500);
  }
});

app.get("/api/v1/chat/:uid", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.uid)
    res.send(chat);
  } catch (err) {
    console.log(err);
    res.send(500)
  }
});

app.post("/api/v1/chat/create", async (req, res) => {
  try {
    const user = req.header('User');
    if (!user) { return res.send(400) }
    const { to, message, created } = req.body;
    const users = [user, to]
    const chat = new Chat({ users, messages: [{ user, created, message }] })
    chat.save()
    res.send(chat._id);
  } catch (err) {
    console.log(err);
    res.send(500)
  }
});

app.post("/api/v1/chat/:uid/message", async (req, res) => {
  try {
    const user = req.header('User');
    const { message, created } = req.body;
    const chat = await Chat.findById(req.params.uid);
    chat.messages = [...chat.messages, { user, created, message }];
    chat.save();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.send(500)
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
