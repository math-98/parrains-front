import axios from "axios";
import { defineStore } from "pinia";

const useAuthStore = defineStore("authentication", {
  state: () => ({
    user: null,
  }),
  actions: {
    async init() {
      return axios.get("/sanctum/csrf-cookie");
    },
    async login(email: string, password: string) {
      return axios.post("/login", { email, password }).then(() => {
        this.fetchUser();
      });
    },
    async logout() {
      return axios.post("/logout").then(() => {
        this.setUser(null);
      });
    },
    async fetchUser() {
      return axios
        .get("/user")
        .then((response) => {
          this.setUser(response.data);
        })
        .catch((error) => {
          this.setUser(null);

          throw error;
        });
    },
    setUser(user: any) {
      if (user) {
        sessionStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.removeItem("isAuthenticated");
      }
      this.user = user;
    },
  },
});

export { useAuthStore };
