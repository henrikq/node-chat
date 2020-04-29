export const API_URL = "/api/v1";

export const get = path =>
  fetch(`${API_URL}/${path}`, {
    headers: {
      User: sessionStorage.getItem('user')
    }
  }).then(response => {
    if (response.status === 200) {
      return response;
    }
    throw new Error("unexpected status code");
  });

export const getJSON = path => get(path).then(response => response.json());

export const post = (path, body) =>
  fetch(`${API_URL}/${path}`, {
    method: "POST",
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "User": sessionStorage.getItem('user')
    }
  });
