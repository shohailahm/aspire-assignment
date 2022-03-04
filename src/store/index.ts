import { CARDS_LIST } from "@/composables/useCardsCarousel";
import { createStore } from "vuex";

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    cards: {
      namespaced: true,
      state: { cards: CARDS_LIST, active: 123 },
      actions: {
        setActiveCard({ commit }, { e, s }) {
          commit("setActive", { e, s });
        },
        toggleFreeze({ commit }, id) {
          commit("toggleFreeze", id);
        },
        addCard({ commit }, obj) {
          commit("addCard", obj);
        },
      },
      mutations: {
        setActive(state, { e }) {
          state.active = e;
        },
        toggleFreeze(state, id) {
          const cards = [...state.cards];
          const ind = cards.findIndex((itm) => itm.id === id);
          if (ind !== -1) {
            cards[ind].freeze = !cards[ind].freeze;
            state.cards = cards;
          }
        },
        addCard(state, obj) {
          const cards = [...state.cards];
          cards.push(obj);
          state.cards = cards;
        },
        removeCard(state, id) {
          const cards = state.cards.filter((it: any) => it.id !== id);
          state.cards = cards;
          state.active = state.cards[0]?.id;
        },
      },
      getters: {},
    },
  },
});
