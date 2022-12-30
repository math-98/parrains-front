import { createStore } from "vuex";
import axios from "axios";
import dayjs from "dayjs";

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
    managers: {
      namespaced: true,
      state: () => ({
        managers: [],
      }),
      getters: {
        managers(state) {
          return state.managers.map((manager: any) => {
            manager.created_at = dayjs(manager.created_at);

            return manager;
          });
        },
      },
      mutations: {
        add(state, manager) {
          state.managers.push(manager);
        },
        edit(state, manager) {
          state.managers = state.managers.map((aManager: any) => {
            if (aManager.id == manager.id) {
              return manager;
            }
            return aManager;
          });
        },
        remove(state, managerId) {
          state.managers = state.managers.filter((manager: any) => {
            return manager.id !== managerId;
          });
        },
        set(state, managers) {
          state.managers = managers;
        },
      },
      actions: {
        async add({ commit }, data) {
          return axios.post("/managers", data).then((response) => {
            commit("add", response.data);
          });
        },
        async edit({ commit }, data) {
          return axios.put(`/managers/${data.id}`, data).then((response) => {
            commit("edit", response.data);
          });
        },
        async fetch({ commit }) {
          return axios.get("/managers").then((response) => {
            commit("set", response.data);
          });
        },
        async remove({ commit }, managerId) {
          return axios.delete(`/managers/${managerId}`).then(() => {
            commit("remove", managerId);
          });
        },
      },
    },
    parrains: {
      namespaced: true,
      state: () => ({
        parrains: [],
      }),
      getters: {
        parrains(state) {
          return state.parrains
            .map((parrain: any) => {
              parrain.created_at = dayjs(parrain.created_at);

              return parrain;
            })
            .sort((a: any, b: any) => {
              let compare = a.lastname.localeCompare(b.lastname);
              if (compare === 0) {
                compare = a.firstname.localeCompare(b.firstname);
              }

              return compare;
            });
        },
      },
      mutations: {
        add(state, parrain) {
          state.parrains.push(parrain);
        },
        edit(state, parrain) {
          state.parrains = state.parrains.map((aParrain: any) => {
            if (aParrain.id == parrain.id) {
              return parrain;
            }
            return aParrain;
          });
        },
        remove(state, parrainId) {
          state.parrains = state.parrains.filter((parrain: any) => {
            return parrain.id !== parrainId;
          });
        },
        set(state, parrains) {
          state.parrains = parrains;
        },
      },
      actions: {
        async add({ commit }, data) {
          return axios.post("/parrains", data).then((response) => {
            commit("add", response.data);
          });
        },
        async edit({ commit }, data) {
          return axios.put(`/parrains/${data.id}`, data).then((response) => {
            commit("edit", response.data);
          });
        },
        async fetch({ commit }) {
          return axios.get("/parrains").then((response) => {
            commit("set", response.data);
          });
        },
        async remove({ commit }, parrainId) {
          return axios.delete(`/parrains/${parrainId}`).then(() => {
            commit("remove", parrainId);
          });
        },
      },
    },
  },
});

export default store;
