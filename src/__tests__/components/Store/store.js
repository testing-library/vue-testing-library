export const store = {
  state() {
    return {
      count: 0,
    }
  },
  actions: {
    increment: ({commit, state}) => commit('SET_COUNT', state.count + 1),
    decrement: ({commit, state}) => commit('SET_COUNT', state.count - 1),
  },
  mutations: {
    SET_COUNT: (state, count) => {
      state.count = count
    },
  },
}
