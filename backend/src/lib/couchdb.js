import nanoCreator from "nano";
import { omit, isEqual } from "lodash";

const COUCH_USER = "admin";
const COUCH_PASSWORD = "y3fLHVhHKJ9V3K";
const COUCH_HOST = process.env.COUCH_HOST || "localhost:5984";

const nano = nanoCreator(
  `http://${COUCH_USER}:${COUCH_PASSWORD}@${COUCH_HOST}`
);
const createDB = name =>
  nano.db.create(name).catch(err => {
    if (err.error !== "file_exists") {
      throw err;
    }
  });
createDB("chats");
const chatsDB = nano.use("chats");

// Design Doc
// function mapUserId(doc) {
//   doc.userIds.forEach(function (userId) {
//     return emit(userId, doc);
//   });
// }

const ddoc = {
  _id: "_design/chats",
  views: {
    userId: {
      map: function (doc) {
        doc.userIds.forEach(function (userId) {
          emit(userId, doc);
        });
      }.toString()
    },
  },
  language: 'javascript'
};
chatsDB.insert(ddoc).catch(err => {
  if (err.error === "conflict") {
    // question allready exist in database
    return questionsDB.get(_id).then(oldQuestion => {
      const { _id, _rev } = oldQuestion;
      if (isEqual(sanitize(oldQuestion), sanitize(question))) {
        // if equal, all is good
        return { ok: true, id: _id, rev: _rev };
      }
      // else update
      return questionsDB.insert({ _id, _rev, ...sanitize(question) });
    });
  }
})



export const getChats = async (userId) => {
  const { rows } = await chatsDB.list({ include_docs: true });
  console.log('debug getChats', rows);
  return rows.map().filter(doc => {
    console.log('debug doc 2', doc.doc);
    return doc.doc.userIds.includes(userId)
  });
}

export function getChat(chatId) {
  return userDB.get(id);
}

export function addMessage(chatId, message) {
  return;
}




export function getUserDoc(id, rev) {
  return userDB.get(id, { rev }).catch(err => {
    if (err.error === "not_found") {
      return userDB.insert({ _id: id, questions: [] }).then(() => {
        return userDB.get(id);
      });
    }
    throw err;
  });
}

export function inserUserDoc(userDoc) {
  userDB.insert(userDoc);
}

export function getQuestionDoc(id, rev) {
  return questionsDB.get(id, { rev });
}

export function insertQuestion(question) {
  const _id = question.id;
  const sanitize = q => omit(q, ["id", "_id", "_rev"]);
  return questionsDB
    .insert({
      _id,
      ...sanitize(question)
    })
    .catch(err => {
      if (err.error === "conflict") {
        // question allready exist in database
        return questionsDB.get(_id).then(oldQuestion => {
          const { _id, _rev } = oldQuestion;
          if (isEqual(sanitize(oldQuestion), sanitize(question))) {
            // if equal, all is good
            return { ok: true, id: _id, rev: _rev };
          }
          // else update
          return questionsDB.insert({ _id, _rev, ...sanitize(question) });
        });
      }
      throw err;
    });
}
