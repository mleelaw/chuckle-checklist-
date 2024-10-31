export const postJoke = (joke) => {
  return fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      text: joke,
      told: false,
    }),
  });
};

export const updateJoke = async (editedJoke) => {
  return await fetch(`http://localhost:8088/jokes/${editedJoke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedJoke),
  });
};

export const deleteJoke = async (jokeId) => {
  return await fetch(`http://localhost:8088/jokes/${jokeId}`, {
    method: "DELETE",
  });
};
