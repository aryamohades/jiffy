import Vue from 'vue'
import Vuex from 'vuex'
import gif from './modules/gif'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gif
  }
})

export default store
