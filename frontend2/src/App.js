import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import {
  PostJokeThunk,
  GetJokesThunk,
  Loading,
} from "./redux/jokes";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const [list, setList] = useState([]);
  const [joke, setJoke] = useState("");
  const [author, setAuthor] = useState("");
  const [funnyLevel, setFunnyLevel] = useState("");
  const dispatch = useDispatch();
  const jokeList = useSelector(
    (state) => state.jokeStore.list
  );
  console.log("joke list in react component", jokeList);
  const loading = useSelector(
    (state) => state.jokeStore.loading
  );
  console.log("loading state", loading);

  useEffect(() => {
    dispatch(GetJokesThunk());
    setList(jokeList);
  }, [loading]);

  function onSubmit(event) {
    event.preventDefault();
    const newJoke = {
      joke: joke,
      author: author,
      funnyLevel: parseInt(funnyLevel),
    };
    setJoke("");
    setAuthor("");
    setFunnyLevel("");
    console.log("new joke", newJoke);
    dispatch(PostJokeThunk(newJoke));
  }
  function getJokesOnClick() {
    console.log("get jokes on click, clicked");
    dispatch(GetJokesThunk());
    setList(jokeList);
  }
  function jokeOnChange(event) {
    setJoke(event.target.value);
  }
  function authorOnChange(event) {
    setAuthor(event.target.value);
  }
  function funnyLevelOnChange(event) {
    setFunnyLevel(event.target.value);
  }
  return (
    <div className="App">
      <h1>Programming Jokes</h1>
      <Form
        onSubmit={onSubmit}
        joke={joke}
        jokeOnChange={jokeOnChange}
        author={author}
        authorOnChange={authorOnChange}
        funnyLevel={funnyLevel}
        funnyLevelOnChange={funnyLevelOnChange}
      />
      <List
        getJokesOnClick={getJokesOnClick}
        jokes={list}
      />
    </div>
  );
}

export default App;
