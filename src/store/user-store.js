import { getCurrentUser } from 'api/login';

const getters = {
  namespaced: true,
  state: {
    isLogined: '',
    userInfo: {},
    permissionList: []
  },

  mutations: {
    updateLoginStatus(state, isLogined) {
      state.isLogined = isLogined;
    },
    updateUser(state, user) {
      state.userInfo = user;
    },
    updatePermissionList(state, permissionList) {
      state.permissionList = permissionList;
    },
  },
  actions: {
    async getUserInfo({ commit }) {
      try {

        const { success, data } = await getCurrentUser();

        commit('updateLoginStatus', success ? 'Y' : 'N');
        commit('updatePermissionList', data.permissionList || []);
        commit('updateUser', data);
      } catch (error) {

        commit('updateLoginStatus', '');
        commit('updatePermissionList', []);
        commit('updateUser', {});
      }
    },
  },
};
export default getters;
