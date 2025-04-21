import axios from "axios";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const useManagersStore = defineStore("managers", {
  state: () => ({
    _managers: [],
  }),
  getters: {
    managers(state: any) {
      return state._managers.map((manager: any) => {
        manager.created_at = dayjs(manager.created_at);

        return manager;
      });
    },
  },
  actions: {
    async add(name: string, email: string, password: string) {
      return axios
        .post("/managers", {
          name,
          email,
          password,
        })
        .then((response) => {
          this._managers.push(response.data);
        });
    },
    async edit(data: any) {
      return axios.put(`/managers/${data.id}`, data).then((response) => {
        this._managers = this._managers.map((aManager: any) => {
          if (aManager.id == response.data.id) {
            return response.data;
          }
          return aManager;
        });
      });
    },
    async fetch() {
      return axios.get("/managers").then((response) => {
        this._managers = response.data;
      });
    },
    async remove(managerId: number) {
      return axios.delete(`/managers/${managerId}`).then(() => {
        this._managers = this._managers.filter((manager: any) => {
          return manager.id !== managerId;
        });
      });
    },
  },
});

export { useManagersStore };
