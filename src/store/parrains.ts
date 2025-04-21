import axios from "axios";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const useParrainsStore = defineStore("parrains", {
  state: () => ({
    _parrains: [],
  }),
  getters: {
    parrains(state: any) {
      return state._parrains
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
  actions: {
    async add(firstname: string, lastname: string) {
      return axios
        .post("/parrains", {
          firstname,
          lastname,
        })
        .then((response) => {
          this._parrains.push(response.data);
        });
    },
    async edit(data: any) {
      return axios.put(`/parrains/${data.id}`, data).then((response) => {
        this._parrains = this._parrains.map((aParrain: any) => {
          if (aParrain.id == response.data.id) {
            return response.data;
          }
          return aParrain;
        });
      });
    },
    async fetch() {
      return axios.get("/parrains").then((response) => {
        this._parrains = response.data;
      });
    },
    async remove(parrainId: number) {
      return axios.delete(`/parrains/${parrainId}`).then(() => {
        this._parrains = this._parrains.filter((parrain: any) => {
          return parrain.id !== parrainId;
        });
      });
    },
  },
});

export { useParrainsStore };
