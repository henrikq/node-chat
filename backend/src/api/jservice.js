import fetch from "node-fetch";

export const fetchRandomQuestion = () =>
  fetch("http://jservice.io/api/random").then(response => {
    if (response.status === 200) {
      // TODO: validate that is a list with one question:
      return response.json().then(questions => ({
        ...questions[0],
        id: String(questions[0].id)
      }));
    }
    throw new Error("unknown response");
  });
