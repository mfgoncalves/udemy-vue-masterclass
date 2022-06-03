import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import state from "@/store/state";
import { GlobalState } from "@/store/types";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export const key: InjectionKey<Store<GlobalState>> = Symbol();

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "procuction",
});

export default store;
