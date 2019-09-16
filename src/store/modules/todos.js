import axios from "axios";

const state = {
  todos: []
};
const getters = {
  allTodos: state => state.todos
};
const actions = {
  FETCH_TODOS: context => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(response => {
      context.commit("SET_TODOS_DATA", response.data);
    });
  },
  ADD_TODO: (context, title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false
      })
      .then(response => {
        context.commit("NEW_TODO", response.data);
      });
  },
  DELETE_TODO: (context, id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        context.commit("REMOVE_TODO", id);
      });
  }
};
const mutations = {
  SET_TODOS_DATA: (state, todos) => {
    state.todos = todos;
  },
  NEW_TODO: (state, newTodo) => {
    state.todos.unshift(newTodo);
  },
  REMOVE_TODO: (state, id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
