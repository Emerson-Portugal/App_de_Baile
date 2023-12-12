<!-- SearchView.vue -->
<template>
  <div class="p-8">
    <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
      Tus Pasos de Baile
    </button>

    <div class="py-1.5"></div>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
      <template v-if="filteredResults.length > 0 || searchText.length === 0">
        <!-- Utiliza un v-for para iterar sobre los resultados filtrados -->
        <CategorySelect v-for="result in filteredResults" :key="result.category.join('-')" :category="result.category"
          :arts="result.arts" :image="result.image" :genero="result.genero" :cancion="result.cancion"
          :artista="result.artista" />
      </template>
      <template v-else>
        <p class="text-white text-lg">Sin resultados</p>
      </template>
    </div>
  </div>
</template>
  
<script setup>
import CategorySelect from '../components/CategorySelect.vue';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';




const searchText = ref('');
const results = ref([


  { category: ["Enchufla", "Vuelta Doble", "Exhibe"], arts: "PASOS", image: "../../public/images/buscador/1.png", genero: "Salsa", cancion: "Aquel lugar", artista: "Adolescent's Orquesta" },
  { category: ["Paso Basico", "Giro Doble"], arts: "PASOS", image: "../../public/images/buscador/2.png", genero: "Salsa", cancion: "Vivir lo Nuestro", artista: "Marc Anthony y La India" },
  { category: ["Paso Lateral Vuelta", "Giro Sencillo", "Cruzado Cambio"], arts: "PASOS", image: "../../public/images/buscador/3.png", genero: "Salsa", cancion: "Valió la Pena", artista: "Marc Anthony" },
  { category: ["Enchufla Complicado", "Vuelta", "Doble Vuelta"], arts: "PASOS", image: "../../public/images/buscador/4.png", genero: "Salsa", cancion: "Aquel lugar (remix)", artista: "Adolescent's Orquesta ft. Elvis Crespo" },
  { category: ["Giro Basico", "Gancho Cruzado", "Vuelta Doble"], arts: "PASOS", image: "../../public/images/buscador/5.png", genero: "Salsa", cancion: "Te Conozco Bien", artista: "Marc Anthony" },

  { category: ["Vuelta", "Desplazamiento Lateral", "Giro"], arts: "PASOS", image: "../../public/images/buscador/6.png", genero: "Bachata", cancion: "Bachata en Fukuoka", artista: "Juan Luis Guerra" },
  { category: ["Paso Basico", "Vuelta", "Desplazamiento Lateral"], arts: "PASOS", image: "../../public/images/buscador/7.png", genero: "Bachata", cancion: "Propuesta Indecente", artista: "Romeo Santos" },
  { category: ["Lateral Derecha", "Lateral Izquierda", "Derecha Veloz" , "Izquierda Veloz"], arts: "PASOS", image: "../../public/images/buscador/8.png", genero: "Bachata", cancion: "Obsesión", artista: "Aventura" },
  { category: ["Paso Toque", "Vuelta Doble", "Desplazamiento Lateral"], arts: "PASOS", image: "../../public/images/buscador/9.png", genero: "Bachata", cancion: "Eres Mía", artista: "Romeo Santos" },
  { category: ["Lateral Derecha", "Lateral Izquierda", "Derecha Veloz" , "Izquierda Veloz"], arts: "PASOS", image: "../../public/images/buscador/10.png", genero: "Bachata", cancion: "Me Enamoré de Ti", artista: "Chayanne" },

  { category: ["Perreo", "Twerking", "Pasos Laterales"], arts: "PASOS", image: "../../public/images/buscador/11.png", genero: "Reguetón", cancion: "Diles", artista: "Bad Bunny, Ozuna, Farruko, Arcángel" },
  { category: ["Paso Basico", "Movimientos Manos", "puente_inclinación"], arts: "PASOS", image: "../../public/images/buscador/12.png", genero: "Reguetón", cancion: "Soy Peor", artista: "Bad Bunny" },
  { category: ["Movimientos Sensuales", "Paso Lateral", "Giro"], arts: "PASOS", image: "../../public/images/buscador/13.png", genero: "Reguetón", cancion: "Tusa", artista: "Karol G, Nicki Minaj" },
  { category: ["Paso Basico", "Giro", "Desplazamiento Lateral"], arts: "PASOS", image: "../../public/images/buscador/14.png", genero: "Reguetón", cancion: "Baila Baila Baila", artista: "Ozuna" },
  { category: ["Movimientos Sensuales", "Giro", "Pasos Laterales"], arts: "PASOS", image: "../../public/images/buscador/15.png", genero: "Reguetón", cancion: "Pa' Mala Yo", artista: "Natti Natasha" },

  { category: ["Shuffle", "Movimientos Manos", "Giro"], arts: "PASOS", image: "../../public/images/bailes_Search/1.png", genero: "K-pop", cancion: "Dynamite", artista: "BTS" },
  { category: ["Movimientos Piernas", "Movimientos Manos", "Giro Doble"], arts: "PASOS", image: "../../public/images/bailes_Search/5.png", genero: "K-pop", cancion: "Kill This Love", artista: "BLACKPINK" },
  { category: ["Movimientos Suaves", "Giro", "Salto"], arts: "PASOS", image: "../../public/images/bailes_Search/6.png", genero: "K-pop", cancion: "Boy With Luv", artista: "BTS ft. Halsey" },
  { category: ["Movimientos Piernas", "Salto", "Giro"], arts: "PASOS", image: "../../public/images/bailes_Search/7.png", genero: "K-pop", cancion: "How You Like That", artista: "BLACKPINK" },
  { category: ["Movimientos Manos", "Salto", "Movimientos Cadera"], arts: "PASOS", image: "../../public/images/bailes_Search/8.png", genero: "K-pop", cancion: "Lovesick Girls", artista: "BLACKPINK" },

  { category: ["Movimientos Suaves", "Paso Lateral", "Movimientos Pies"], arts: "PASOS", image: "../../public/images/bailes_Search/9.png", genero: "Electrónica", cancion: "Strobe", artista: "Deadmau5" },
  { category: ["Movimientos Brazos", "Movimientos Piernas", "Giro"], arts: "PASOS", image: "../../public/images/bailes_Search/10.png", genero: "Electrónica", cancion: "Titanium", artista: "David Guetta ft. Sia" },
  { category: ["Movimientos Pies", "Giro", "Movimientos Brazos"], arts: "PASOS", image: "../../public/images/bailes_Search/12.png", image: "../../public/images/bailes_Search/11.png", genero: "Electrónica", cancion: "Wake Me Up", artista: "Avicii" },
  { category: ["Movimientos Cadera", "Pasos Laterales", "Giro"], arts: "PASOS", image: "../../public/images/bailes_Search/13.png", genero: "Electrónica", cancion: "On The Floor", artista: "Jennifer Lopez ft. Pitbull" },
  { category: ["Movimientos Suaves", "Desplazamiento Lateral", "Movimientos Manos"], arts: "PASOS", image: "../../public/images/bailes_Search/14.png", genero: "Electrónica", cancion: "Stay (Kygo Remix)", artista: "Kygo ft. Maty Noyes" },


]);

// Filtra los resultados basados en el texto de búsqueda
const filteredResults = ref([]);

const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Función para realizar el filtrado
const filterResults = () => {
  if (!results.value) {
    return;
  }

  const query = normalizeString(searchText.value);
  filteredResults.value = results.value.filter(result =>
    result.category.some(word => normalizeString(word).includes(query)) ||
    normalizeString(result.arts).includes(query) ||
    normalizeString(result.genero).includes(query) ||
    normalizeString(result.cancion).includes(query) ||
    normalizeString(result.artista).includes(query)
  );
};

// Observa cambios en el texto de búsqueda y filtra los resultados
watch(searchText, filterResults);

// Utiliza useRoute para obtener el query parameter 'name'
const route = useRoute();

// Observa cambios en el query parameter y actualiza el searchText
watch(() => route.query.name, (newName) => {
  searchText.value = newName || '';
  filterResults();
});

// Llama a filterResults cuando el componente se ha montado
onMounted(() => {
  filterResults();
});
</script>