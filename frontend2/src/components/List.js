import React from "react";

function List(props) {
  return (
    <div>
      <button
        type="button"
        onClick={props.getJokesOnClick}
        className="btn btn-outline-dark waves-effect"
      >
        Get Jokes
      </button>
      {props.jokes.map((joke, index) => {
        return (
          <div className="container">
            <br />
            <div className="card">
              <div className="card-body">
                <h4>{joke.joke}</h4>
                <p> {joke.author}</p>
                {joke.funnyLevel}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default List;
