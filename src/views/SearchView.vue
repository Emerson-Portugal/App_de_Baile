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
          <CategorySelect v-for="result in filteredResults" :key="result.category.join('-')"
            :category="result.category" :arts="result.arts" :image="result.image" :genero="result.genero"
            :cancion="result.cancion" :artista="result.artista" />
        </template>
        <template v-else>
          <p class="text-white text-lg">Sin resultados</p>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import CategorySelect from '../components/CategorySelect.vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const searchText = ref('');
  const results = ref([


    { category: ["enchufla", "vuelta_doble", "exhibe"], arts: "PASOS", image: "../../public/images/buscador/1.png", genero: "Salsa", cancion: "Aquel lugar", artista: "Adolescent's Orquesta" },
    { category: ["paso_basico", "dile_que_no", "giro_doble"], arts: "PASOS", image: "../../public/images/buscador/2.png", genero: "Salsa", cancion: "Vivir lo Nuestro", artista: "Marc Anthony y La India" },
    { category: ["paso_lateral_vuelta", "giro_sencillo", "cruzado_cambio_manos"], arts: "PASOS", image: "../../public/images/buscador/3.png", genero: "Salsa", cancion: "Valió la Pena", artista: "Marc Anthony" },
    { category: ["enchufla_complicado", "vuelta_una_mano", "vuelta_dos_manos"], arts: "PASOS", image: "../../public/images/buscador/4.png", genero: "Salsa", cancion: "Aquel lugar (remix)", artista: "Adolescent's Orquesta ft. Elvis Crespo" },
    { category: ["paso_basico_giro", "gancho_cruzado", "vuelta_doble"], arts: "PASOS", image: "../../public/images/buscador/5.png", genero: "Salsa", cancion: "Te Conozco Bien", artista: "Marc Anthony" },

    { category: ["giro_dama_vuelta", "desplazamiento_lateral_toque", "giro_gancho"], arts: "PASOS", image: "../../public/images/buscador/6.png", genero: "Bachata", cancion: "Bachata en Fukuoka", artista: "Juan Luis Guerra" },
    { category: ["paso_basico_bachata", "giro_vuelta", "desplazamiento_lateral"], arts: "PASOS", image: "../../public/images/buscador/7.png", genero: "Bachata", cancion: "Propuesta Indecente", artista: "Romeo Santos" },
    { category: ["giro_ganchos", "movimientos_sensuales_manos", "desplazamiento_circulo"], arts: "PASOS", image: "../../public/images/buscador/8.png",  genero: "Bachata", cancion: "Obsesión", artista: "Aventura" },
    { category: ["paso_basico_toque", "vuelta_vuelta_doble", "desplazamiento_lateral_cruzado"], arts: "PASOS", image: "../../public/images/buscador/9.png", genero: "Bachata", cancion: "Eres Mía", artista: "Romeo Santos" },
    { category: ["desplazamiento_lateral_giro", "paso_basico_toque_vuelta", "movimientos_sensuales_pareja"], arts: "PASOS", image: "../../public/images/buscador/10.png", genero: "Bachata", cancion: "Me Enamoré de Ti", artista: "Chayanne" },

    { category: ["perreo", "twerking", "pasos_laterales_actitud"], arts: "PASOS", image: "../../public/images/buscador/11.png", genero: "Reguetón", cancion: "Diles", artista: "Bad Bunny, Ozuna, Farruko, Arcángel" },
    { category: ["paso_basico_reguetón", "movimientos_manos_pistola", "puente_inclinación"], arts: "PASOS", image: "../../public/images/buscador/12.png", genero: "Reguetón", cancion: "Soy Peor", artista: "Bad Bunny" },
    { category: ["movimientos_sensuales_manos", "paso_lateral_giro", "coreografía_estribillo"], arts: "PASOS", image: "../../public/images/buscador/13.png", genero: "Reguetón", cancion: "Tusa", artista: "Karol G, Nicki Minaj" },
    { category: ["paso_basico_movimiento_hombros", "giro_movimiento_manos", "desplazamiento_lateral"], arts: "PASOS", image: "../../public/images/buscador/14.png", genero: "Reguetón", cancion: "Baila Baila Baila", artista: "Ozuna" },
    { category: ["movimientos_sensuales_cadera", "giro_actitud", "pasos_laterales_energía"], arts: "PASOS", image: "../../public/images/buscador/15.png", genero: "Reguetón", cancion: "Pa' Mala Yo", artista: "Natti Natasha" },

    { category: ["shuffle_dance", "movimientos_manos_sincronizados", "paso_característico_estribillo"], arts: "PASOS", image: "../../public/images/bailes_Search/1.png", genero: "K-pop", cancion: "Dynamite", artista: "BTS" },
    { category: ["movimientos_intensos_piernas", "coreografía_estribillo", "movimientos_manos_expresivos"], arts: "PASOS", image: "../../public/images/bailes_Search/5.png", genero: "K-pop", cancion: "Kill This Love", artista: "BLACKPINK" },
    { category: ["movimientos_suaves_brazos", "giro_salto", "coreografía_grupo"], arts: "PASOS", image: "../../public/images/bailes_Search/6.png", genero: "K-pop", cancion: "Boy With Luv", artista: "BTS ft. Halsey" },
    { category: ["movimientos_piernas_sincronizados", "coreografía_espejo", "giro_actitud"], arts: "PASOS", image: "../../public/images/bailes_Search/7.png", genero: "K-pop", cancion: "How You Like That", artista: "BLACKPINK" },
    { category: ["movimientos_expresivos_manos", "coreografía_grupo", "movimientos_cadera"], arts: "PASOS", image: "../../public/images/bailes_Search/8.png", genero: "K-pop", cancion: "Lovesick Girls", artista: "BLACKPINK" },

    { category: ["movimientos_suaves_fluidos_brazos", "paso_lateral_cambios_dirección", "movimientos_pies_sintonía_melodía"], arts: "PASOS", image: "../../public/images/bailes_Search/9.png", genero: "Electrónica", cancion: "Strobe", artista: "Deadmau5" },
    { category: ["movimientos_brazos_dramáticos", "movimientos_piernas_energía", "giro_salto"], arts: "PASOS", image: "../../public/images/bailes_Search/10.png", genero: "Electrónica", cancion: "Titanium", artista: "David Guetta ft. Sia" },
    { category: ["movimientos_pies_enérgicos", "salto_giro", "movimientos_brazos_ritmo"], arts: "PASOS", image: "../../public/images/bailes_Search/12.png", image: "../../public/images/bailes_Search/11.png", genero: "Electrónica", cancion: "Wake Me Up", artista: "Avicii" },
    { category: ["movimientos_cadera", "coreografía_pasos_laterales", "giro_actitud"], arts: "PASOS", image: "../../public/images/bailes_Search/13.png", genero: "Electrónica", cancion: "On The Floor", artista: "Jennifer Lopez ft. Pitbull" },
    { category: ["movimientos_suaves_fluidos", "desplazamiento_lateral", "movimientos_manos_ritmo"], arts: "PASOS", image: "../../public/images/bailes_Search/14.png", genero: "Electrónica", cancion: "Stay (Kygo Remix)", artista: "Kygo ft. Maty Noyes" },


  ]);
  
  // Filtra los resultados basados en el texto de búsqueda
  const filteredResults = ref([]);
  
  // Función para realizar el filtrado
  const filterResults = () => {
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
  
  // Función para normalizar una cadena (quitar tildes y poner en minúsculas)
  const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  </script>
  