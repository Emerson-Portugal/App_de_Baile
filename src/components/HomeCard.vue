<template>
  <RouterLink to="library">
    <!-- Cambiamos la clase 'p-4' por 'p-2' para reducir el padding y hacer que la forma sea más rectangular -->
    <!-- Añadimos 'w-full' para que el contenedor ocupe todo el ancho de su contenedor -->
    <div class="bg-[#111111] p-2 rounded-md mx-8 my-0 hover:bg-[#252525] relative contenedor">

      <!-- Ajustamos la clase 'w-full' para que la imagen ocupe todo el ancho del contenedor -->
      <!-- Ajustamos la clase 'h-32' para establecer la altura de la imagen según tus preferencias -->
      <img class="rounded-md w-300 h-33" :src="image" alt="" />

    </div>
  </RouterLink>
</template>

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
      sonido: null,
      mostrarBoton: false,
    };
  },
  methods: {




  },
};
</script>
  

