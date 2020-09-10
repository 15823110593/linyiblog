import { CHANGEACTIVEINDEX} from '../mutation-types'
const state = {
  activeIndex: sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : '1',//默认激活菜单
};


// getters
const getters = {
  getActiveIndex:state => state.activeIndex,
};

// mutations
const mutations = {
  //改变激活菜单
  CHANGEACTIVEINDEX(state,payload){
    console.log(payload)
    state.activeIndex = payload;
  },
};

// actions
const actions = {
  changeActiveIndex({ commit },payload){
    commit(CHANGEACTIVEINDEX,payload);
  },
};


export default {
  state,
  getters,
  actions,
  mutations
}
