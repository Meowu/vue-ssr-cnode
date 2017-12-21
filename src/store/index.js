import Vue from "vue";
import Vuex from "vuex";
import actions from './actions';
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      showNavbar: true,
      content: null,
      params: {
        tab: '',
        limit: '',
        page: ''
      },
      lists: {
        all: [],
        ask: [],
        good: [],
        share: [],
        job: []
      }
    },
    getters,
    mutations,
    actions
  });
}
