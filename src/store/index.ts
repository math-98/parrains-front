import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  modules: {
    authentication: {
      state: () => ({
        user: null,
      }),
      mutations: {
        setUser(state, user) {
          if (user) {
            sessionStorage.setItem("isAuthenticated", "true");
          } else {
            sessionStorage.removeItem("isAuthenticated");
          }
          state.user = user;
        },
      },
      actions: {
        async init({ commit }) {
          return axios.get("/sanctum/csrf-cookie").then(() => {
            commit;
          });
        },
        async login({ commit }, { email, password }) {
          return axios.post("/login", { email, password }).then(() => {
            this.dispatch("fetchUser");
            commit;
          });
        },
        async logout({ commit }) {
          return axios.post("/logout").then(() => {
            commit("setUser", null);
          });
        },
        async fetchUser({ commit }) {
          return axios
            .get("/user")
            .then((response) => {
              commit("setUser", response.data);
            })
            .catch((error) => {
              commit("setUser", null);

              throw error;
            });
        },
      },
    },
  },
});

export default store;
