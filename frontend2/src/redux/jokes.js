import axios from "redaxios";
export const GET_JOKES_SUCCESS = "GET_JOKES_SUCCESS";
export const GET_JOKES_FAILURE = "GET_JOKES_FAILURE";
export const POST_JOKES_SUCCESS = "POST_JOKES_SUCCESS";
export const POST_JOKES_FAILURE = "POST_JOKES_FAILURE";
export const LOADING = "LOADING";

export function Loading(trueOrFalse) {
  return {
    type: LOADING,
    payload: {
      loading: trueOrFalse,
    },
  };
}
// receives array of objects from axios.get()
export function GetJokesSuccess(data) {
  return {
    type: GET_JOKES_SUCCESS,
    payload: {
      data: data,
    },
  };
}
export function GetJokesFailure(error) {
  return {
    type: GET_JOKES_FAILURE,
    payload: {
      error: error,
    },
  };
}

export function PostJokesSuccess(joke) {
  return {
    type: POST_JOKES_SUCCESS,
    payload: {
      joke: joke,
    },
  };
}

export function PostJokesFailure(error) {
  return {
    type: POST_JOKES_FAILURE,
    payload: {
      error: error,
    },
  };
}

export function PostJokeThunk(joke) {
  return (dispatch) => {
    dispatch(Loading(true));
    axios
      .post("http://localhost:3001/api/jokes", {
        joke: joke,
      })
      .then((response) => {
        dispatch(PostJokesSuccess(joke));
        dispatch(Loading(false));
      })
      .catch((error) => {
        dispatch(PostJokesFailure(error));
        dispatch(Loading(false));
      });
  };
}

// called when I have a button / useEffect that would load this data
export function GetJokesThunk() {
  return (dispatch) => {
    dispatch(Loading(true));
    axios
      .get("http://localhost:3001/api/jokes")
      .then((data) => {
        console.log("data", data.data);
        dispatch(GetJokesSuccess(data.data));
        dispatch(Loading(false));
      })
      .catch((error) => {
        dispatch(GetJokesFailure(error));
        dispatch(Loading(false));
      });
  };
}

const initialState = {
  loading: false,
  list: [
    {
      id: 1,
      joke: "Why did a functional programmer get kicked out of school? Because it refused to take classes",
      author: "Bibek",
      funnyLevel: 9,
    },
    {
      id: 2,
      joke: "What's the object oriented way to become wealthy? Inheritance",
      author: "Lesley",
      funnyLevel: 9,
    },
  ],
  message: "",
};

export function jokeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOKES_SUCCESS:
      // make sure that you console.log what is occuring at every state
      console.log(
        "get jokes success in reducer",
        state.list
      );
      console.log("action payload", action.payload.data);
      return {
        ...state,
        list: action.payload.data,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case GET_JOKES_FAILURE:
      return {
        ...state,
        message: action.payload.error,
      };
    case POST_JOKES_SUCCESS:
      console.log(
        "post jokes success in reducer",
        action.payload.joke
      );
      console.log("GRAB THE CORRECT STATE", state);
      let newList = state.list.concat(action.payload.joke);
      return {
        ...state,
        list: newList,
      };
    case POST_JOKES_FAILURE:
      return {
        ...state,
        message: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
}
