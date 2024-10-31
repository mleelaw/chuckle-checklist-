import "./App.css";
import { useState, useEffect } from "react";
import { postJoke, updateJoke, deleteJoke } from "./jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [userInput, setUserInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      const response = await fetch("http://localhost:8088/jokes");
      const jokeArray = await response.json();
      setAllJokes(jokeArray);
      console.log("jokes set!");
    };

    fetchJokes();
  }, []);

  useEffect(() => {
    // Always update both states whenever allJokes changes
    const untoldJokesList = allJokes.filter((joke) => joke.told === false);
    const toldJokesList = allJokes.filter((joke) => joke.told === true);

    setUntoldJokes(untoldJokesList);
    setToldJokes(toldJokesList);
  }, [allJokes]);

  const handleSubmitJoke = async (event) => {
    event.preventDefault();
    await postJoke(userInput);

    const response = await fetch("http://localhost:8088/jokes");
    const updatedJokes = await response.json();
    setAllJokes(updatedJokes);

    setUserInput("");
  };

  //   getJokes().then((jokeArr) => {
  //     setAllJokes(jokeArr)
  // })
  return (
    <div className="app-container">
      <div className="app-heading ">
        <h1 className="app-heading-text"> Chuckles Checklist</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </div>
      <div>
        <h2>Add Joke</h2>
        <form className="joke-add-form" onSubmit={handleSubmitJoke}>
          <input
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            value={userInput}
          />
          <button className="joke-input-submit" type="submit">
            HA!
          </button>
        </form>
      </div>

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Told <span className="told-count">{toldJokes.length} </span>
          </h2>
          {toldJokes.map((joke) => (
            <div className="joke-list-item" key={joke.id}>
              {joke.text}
              <div className="joke-list-action-toggle">
                <button
                  onClick={async () => {
                    const editedJoke = { ...joke, told: false };
                    await updateJoke(editedJoke);
                    const response = await fetch("http://localhost:8088/jokes");
                    const updatedJokes = await response.json();
                    setAllJokes(updatedJokes);
                  }}
                >
                  <i className="fa-regular fa-face-smile" />
                </button>
                <button
                  onClick={async () => {
                    await deleteJoke(joke.id);
                    const response = await fetch("http://localhost:8088/jokes");
                    const updatedJokes = await response.json();
                    setAllJokes(updatedJokes);
                  }}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="joke-list-container">
          <h2>
            Untold<span className="untold-count">{untoldJokes.length}</span>
          </h2>
          {untoldJokes.map((joke) => (
            <div className="joke-list-item" key={joke.id}>
              {joke.text}
              <div className="joke-list-action-toggle">
                <button
                  onClick={async () => {
                    const editedJoke = { ...joke, told: true };
                    await updateJoke(editedJoke);
                    const response = await fetch("http://localhost:8088/jokes");
                    const updatedJokes = await response.json();
                    setAllJokes(updatedJokes);
                  }}
                >
                  <div>
                    <i className="fa-regular fa-face-meh" />
                  </div>
                </button>

                <button
                  onClick={async () => {
                    await deleteJoke(joke.id);
                    const response = await fetch("http://localhost:8088/jokes");
                    const updatedJokes = await response.json();
                    setAllJokes(updatedJokes);
                  }}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
