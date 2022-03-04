<template>
  <q-carousel
    @before-transition="changeActives"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    navigation
    height="auto"
    class="bg-transparent mt-4 xl:mt-0"
  >
    <template v-slot:navigation-icon="{ active, onClick }">
      <div v-if="active" class="w-4 h-2 bg-white mx-0.5 rounded-lg mb-2" @click="onClick" />
      <div v-else class="w-4 h-2 bg-white mx-0.5 rounded-lg opacity-70 mb-2" @click="onClick" />
    </template>
    <q-carousel-slide :key="item.id" v-for="(item, index) in cardsList" :name="item.id">
      <div class="q-mt-md text-center">
        <CardItem
          :name="item.nameOnCard"
          :textColor="item.textColor"
          :cardColor="item.color"
          :cardNumber="item.number"
          :validThrough="item.validThrough"
          :cvv="item.cvv"
          :index="index"
          :freeze="item.freeze"
        />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import CardItem from "@/components/CardItem.vue";

export default defineComponent({
  name: "CardsCarousel",
  components: {
    CardItem
  },
  props: ["cardsList"],
  emits: ['changeActive'],
  setup(props, ctx) {
    const changeActives = (e: any, i: any) => {
      ctx.emit('changeActive', e, i)
    }
    let slide = ref(props.cardsList[0].id)
    watch(() => props.cardsList, (newValue, oldValue) => {
      slide.value = newValue[0]?.id
    });
    return {
      changeActives,
      slide,
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
});
</script>
