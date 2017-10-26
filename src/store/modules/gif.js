import api from '../../api/gif'

import {
  GIF_LOADING,
  GIF_LOADED
} from '../types'

import {
  ERROR_GIF,
  LOADING_GIF
 } from '../../constants'

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const state = {
  gifUrl: ''
}

const actions = {
  getGif({ commit }, q) {
    commit(GIF_LOADING)

    api.getGif(q)
      .then((res) => {
        const idx = randomInt(0, res.data.data.length - 1)
        const gifUrl = res.data.data[idx].images.original.url

        commit(GIF_LOADED, {
          gifUrl
        })
      }).catch((err) => { // eslint-disable-line
        commit(GIF_LOADED, {
          gifUrl: ERROR_GIF
        })
      })
  }
}

const mutations = {
  [GIF_LOADED](state, action) {
    state.gifUrl = action.gifUrl
  },
  [GIF_LOADING](state) {
    state.gifUrl = LOADING_GIF
  }
}

export default {
  state,
  actions,
  mutations
}
