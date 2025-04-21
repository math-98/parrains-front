import axios from 'axios'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

const useFilleulsStore = defineStore('filleuls', {
  state: () => ({
    _filleuls: [],
  }),
  getters: {
    filleuls(state: any) {
      return state._filleuls
        .map((filleul: any) => {
          filleul.created_at = dayjs(filleul.created_at)

          return filleul
        })
        .sort((a: any, b: any) => {
          let compare = a.lastname.localeCompare(b.lastname)
          if (compare === 0) {
            compare = a.firstname.localeCompare(b.firstname)
          }

          return compare
        })
    },
  },
  actions: {
    async add(firstname: string, lastname: string) {
      return axios
        .post('/filleuls', {
          firstname,
          lastname,
        })
        .then((response) => {
          this._filleuls.push(response.data)
        })
    },
    async edit(data: any) {
      return axios.put(`/filleuls/${data.id}`, data).then((response) => {
        this._filleuls = this._filleuls.map((aFilleul: any) => {
          if (aFilleul.id == response.data.id) {
            return response.data
          }
          return aFilleul
        })
      })
    },
    async fetch() {
      return axios.get('/filleuls').then((response) => {
        this._filleuls = response.data
      })
    },
    async remove(filleulId: number) {
      return axios.delete(`/filleuls/${filleulId}`).then(() => {
        this._filleuls = this._filleuls.filter((parrain: any) => {
          return parrain.id !== filleulId
        })
      })
    },
  },
})

export { useFilleulsStore }
