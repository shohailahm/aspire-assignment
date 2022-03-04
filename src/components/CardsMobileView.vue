<template>
  <div class="cards-root bg-app-primary flex-1 pb-14">
    <div class="sticky top-0">
      <div class="p-6">
        <div class="flex justify-end">
          <AppLogo />
        </div>
        <div class="flex justify-between items-center">
          <AccountBalance :amount="`3,000`" />
          <AddNewButton label="New Card" />
        </div>
      </div>
      <CardTabs />
      <CardsCarousel :cardsList="cards" @changeActive="setActive" />
    </div>
    <div class="bg-white rounded-tl-3xl rounded-tr-3xl mt-6">
      <q-card class="pb-6 bg-transparent">
        <div>
          <div class="bg-white rounded-tl-3xl rounded-tr-3xl">
            <CardActions
              v-if="cards.length > 0"
              :activeCard="activeCard"
              @toggleFreeze="toggleFreeze"
              @removeCard="removeCard"
            />
            <div class="bg-white px-6">
              <CardDetails />
              <RecentTransactions />
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <BottomTabNav />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BottomTabNav from "@/components/BottomTabNav.vue";
import AccountBalance from "@/components/AccountBalance.vue";
import CardsCarousel from "@/components/CardsCarousel.vue";
import CardActions from "@/components/CardActions.vue";
import RecentTransactions from "@/components/RecentTransactions.vue";
import CardDetails from "@/components/CardDetails.vue";
import CardTabs from "@/components/CardTabs.vue";
import AppLogo from "@/legos/AppLogo.vue";
import AddNewButton from "@/legos/AddNewButton.vue";
import { mapState, mapActions, useStore } from "vuex";

export default defineComponent({
  name: "CardsMobileView",
  props: ["activeCard"],
  emits: ['showPromt', 'removeCard'],
  components: {
    BottomTabNav,
    AppLogo,
    AccountBalance,
    AddNewButton,
    CardsCarousel,
    CardActions,
    RecentTransactions,
    CardDetails,
    CardTabs,
  },
  computed: {
    ...mapState({
      cards: (state: any) => {
        return state.cards.cards
      }
    })
  },
  methods: {
    ...mapActions({
      setActiveCard: 'cards/setActiveCard'
    })
  },
  setup(props, ctx) {
    const store = useStore()
    const setActive = (e: number, s: number) => {
      store.dispatch('cards/setActiveCard', { e, s })
    }
    const toggleFreeze = (id: number) => {
      store.dispatch('cards/toggleFreeze', id)
    }
    const togglePromt = () => {
      ctx.emit('showPromt')
    }
    const removeCard = (id: number): void => {
      ctx.emit('removeCard', id)
    }
    return {
      setActive,
      toggleFreeze,
      togglePromt,
      removeCard
    }
  }
});
</script>
