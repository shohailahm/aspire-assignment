<template>
  <div class="bg-app-semi-primary rounded-tl-3xl rounded-tr-3xl xl:rounded-3xl xl:mx-4 xl:mt-4">
    <div class="flex justify-between py-5 px-2 rounded-tl-3xl rounded-tr-3xl">
      <template :key="item.actionName" v-for="item in card_actions">
        <div
          class="flex flex-col items-center w-16"
          v-on="item.actionName.toLowerCase().includes('freeze') ? { click: toggleFreeze } : item.actionName.toLowerCase().includes('cancel') ? { click: removeCard } : {}"
        >
          <img class="w-8 mb-2" :src="item.icon" />
          <div
            class="text-xsm text-center leading-4"
          >{{ item.actionName.toLowerCase().includes("freeze") ? activeCard.freeze ? 'Un-freeze' : 'Freeze' : item.actionName }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CARDS_ACTIONS } from "@/composables/useCardActions";

export default defineComponent({
  name: "CardActions",
  props: ["activeCard"],
  emits: ["toggleFreeze", "removeCard"],
  setup(props, ctx) {
    const toggleFreeze = () => {
      ctx.emit('toggleFreeze', props.activeCard.id);
    }
    const removeCard = () => {
      ctx.emit('removeCard', props.activeCard.id)
    }
    return {
      card_actions: CARDS_ACTIONS,
      toggleFreeze,
      removeCard
    };
  },
});
</script>
