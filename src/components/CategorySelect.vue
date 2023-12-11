<!-- CategorySelect.vue -->
<template>
  <div v-if="randColor.color" :style="`background-color: ${randColor.color};`" class="
      contrast-[2] 
      brightness-[0.87] 
      rounded-xl 
      aspect-square 
      relative 
      overflow-hidden
      cursor-pointer
    " @click=" ruta_destino('/library_salsa3')">


    <div class="text-black pt-1 pl-4 font-bold text-[18px]">Pasos: </div>
    <div class="text-black pt-1 pl-4 font-semibold text-[13px]">
      <template v-if="category.length > 0">{{ category.join('\n- ') }} </template>
    </div>

    <!-- Estilos para Género -->
    <div class="text-black pt-1 pl-4 font-semibold text-[13px]">
      <span class="font-bold">Género:</span> {{ genero }}
    </div>

    <!-- Estilos para Canción -->
    <div class="text-black pt-1 pl-4 font-semibold text-[13px]">
      <span class="font-bold">Canción:</span> {{ cancion }}
    </div>

    <div class="text-black pt-1 pl-4 font-semibold text-[13px]">
      <span class="font-bold">Artista:</span> {{ artista }}
    </div>

    <img class="
        absolute 
        contrast-[0.55]
        -right-3.5 
        bottom-0 
        max-w-[100px] 
        rotate-[20deg]
      " :src="image || ''">
  </div>
</template>
  
<script setup>
import { ref, toRefs, defineProps } from 'vue';
import uniqolor from 'uniqolor';

let randColor = ref('');
randColor.value = uniqolor.random();

const props = defineProps({ category: Array, arts: String, image: String, to: String, genero: String, cancion: String, artista: String });
const { category, arts, image, genero, cancion, artista } = toRefs(props);
</script>





<script>
export default {
  props: {
    image: String,
    title: String,
    subTitle: String,
    musica: String,
  },
  data() {
    return {
      // Puedes dejar esto vacío si no necesitas inicializar ninguna variable en data
    };
  },
  methods: {
    ruta_destino(index) {
      // Use router.push to navigate to another route
      this.$router.push({ path: index });

    },
  },
};
</script>
