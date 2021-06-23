import React from "react";

function Form(props) {
  return (
    <div className="container my-5 py-5 z-depth-1">
      <section className="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">
        <div className="row d-flex justify-content-center">
          <form
            onSubmit={props.onSubmit}
            className="text-center"
            method="post"
          >
            <p className="h4 mb-4">Joke</p>
            <input
              onChange={props.jokeOnChange}
              value={props.joke}
              type="text"
              name="joke"
              className="form-control mb-4"
              placeholder="Joke"
            />

            <input
              onChange={props.authorOnChange}
              value={props.author}
              type="text"
              name="author"
              className="form-control mb-4"
              placeholder="Author"
            />
            <input
              onChange={props.funnyLevelOnChange}
              value={props.funnyLevel}
              type="integer"
              name="funnyLevel"
              className="form-control mb-4"
              placeholder="Funny Level"
            />

            <button
              type="submit"
              className="btn btn-outline-dark waves-effect"
            >
              Add
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Form;
