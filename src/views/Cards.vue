<template>
  <template v-if="SCREEN_WIDTH < 1280">
    <CardsMobileView
      :activeCard="activeCard"
      @showPromt="prompt = true"
      @removeCard="confirm = true"
    />
  </template>
  <template v-else>
    <CardsDesktopView
      :activeCard="activeCard"
      @showPromt="prompt = true"
      @removeCard="confirm = true"
    />
  </template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Are you sure you want to delete the card?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="primary"
          @click="() => {
            removeCard()
            confirm = false
          }"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="cardNo" autofocus @keyup.enter="onEnter" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add Card" @click="() => onEnter(cardNo)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useWindowSize from "@/composables/useWindowSize";
import CardsMobileView from "@/components/CardsMobileView.vue";
import CardsDesktopView from "@/components/CardsDesktopView.vue";
import { mapState, mapActions, useStore } from "vuex";
import { getRandomNumber } from "@/utils";
export default defineComponent({
  name: "Cards",
  components: {
    CardsMobileView,
    CardsDesktopView,
  },
  computed: {
    ...mapState({
      activeCard: (state: any) => state.cards.active
    })
  },
  methods: {
    ...mapActions({
      addCard: 'cards/addCard'
    }),
    onEnter(e: any) {
      let val = e.target?.value || e
      if (!val) return
      let obj = {
        nameOnCard: val,
        textColor: "text-blue",
        color: "bg-blue",
        number: `${getRandomNumber(1000, 9999)} ${getRandomNumber(1000, 9999)} ${getRandomNumber(1000, 9999)} ${getRandomNumber(1000, 9999)}`,
        cvv: getRandomNumber(100, 999),
        validThrough: "04/22",
        freeze: false,
        id: getRandomNumber(1000, 9999),
      }
      this.addCard(obj)
      this.prompt = false
      this.cardNo = ''
    }
  },
  setup() {
    const store = useStore();
    const removeCard = () => {
      store.commit('cards/removeCard', store.state.cards.active)
    }
    const { width: SCREEN_WIDTH } = useWindowSize();
    return {
      SCREEN_WIDTH,
      confirm: ref(false),
      prompt: ref(false),
      cardNo: ref(''),
      removeCard
    };
  },
});
</script>