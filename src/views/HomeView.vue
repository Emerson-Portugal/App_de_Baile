<script setup>
import HomeCard from '../components/HomeCard.vue';


</script>

<template>
    <div class="p-1">

        <div class="items-center">



            <HomeCard image="../../public/images/banner/valo2.png" />


        </div>
    </div>
</template>





<style>
.margin_texto {
    border-width: 2px;
    /* Ancho del borde */
    border-style: solid;
    /* Estilo del borde (en este caso, sólido) */
    border-color: #ffffff;
}

.margin_texto {
    display: grid;
    grid-template-columns: 30% 70%;
    /* Dos columnas */
    /*background-color: #69695d; */
    /*background-color: #ffa502;*/
    /*background-color: #F79F1F;*/
    background-color: #f1c40f;
    border-radius: 10px;
}


.margin_info {
    margin: 5px;
    margin-left: 50px;

}

.categoria_pasos {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.categoria_pasos button {
    background-color: orangered;
    border-radius: 10px;
    padding: 5px 15px;
    margin: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    /* Agregado para suavizar la transición */
}

.categoria_pasos button:hover {
    background-color: orange;
}


.color_boton div {
    color: red;
}
</style>  


<script>
export default {

    methods: {
        reproducirSonido() {
            try {
                // Ruta al archivo de sonido
                const rutaSonido = '/public/music/sonidos_intro/intro3.mp3'; // Ajusta la ruta según tu estructura

                // Detener la reproducción anterior si existe
                this.detenerSonido();

                // Crear una instancia de Audio
                this.sonido = new Audio(rutaSonido);

                // Reproducir el sonido
                this.sonido.play();
            } catch (error) {
                console.error('Error al reproducir la canción:', error);
            }
        },



    },
};
</script>


