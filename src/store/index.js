import { createStore } from "vuex";
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import state from "@/store/state";

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "procuction",
});

export default store;
