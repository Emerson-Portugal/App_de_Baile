<template>
    <div>
        <v-row class="contenedor-principal" cols="2" row>
            <div class="informacion_play_list">


                <div class="imagen_play">

                    <video ref="miVideo" controls :src="videoUrl" type="video/mp4"></video>

                </div>


                <div class="info_play">
                    <div class="imagen_baile">
                        <img src="/public/images/just_dance/just_dance-removebg-preview.png" alt="baile">
                    </div>
                    <div class="iconos_estrella">
                        <button @click="irABailar">
                            <span>A BAILAR !!</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="linea_dividir"></div>

            <div class="lista_canciones">



                <v-col v-for="(video, index) in videos" :key="index" cols="12" sm="5" md="4" lg="3"
                    class="canciones_musica">
                    <v-card @click="reproducirVideo(index)" class="mx-auto my-4 pushable mix_tall" elevation=16
                        :style="{ zIndex: video.zIndex }">
                        <!-- Resto del código -->

                        <v-card-subtitle class="contenedor_autor_clas">
                            <span class="me-1 contenedor_autor">{{ video.autor }}</span>
                        </v-card-subtitle>


                        <div class="video-container">
                            <img class="video_edit" :src="video.url" :ref="'videoElement-' + index" />


                            <div class="barra_dificultadd">
                                <p>{{ video.dificultad }} </p>
                                <div class="barra">
                                    <img src="/public/images/icons/barra/barra_amarilla.png" alt="barra">
                                    <img src="/public/images/icons/barra/barra_amarilla.png" alt="barra">
                                    <img src="/public/images/icons/barra/barra_blanca.png" alt="barra">
                                    <img src="/public/images/icons/barra/barra_blanca.png" alt="barra">
                                </div>
                            </div>
                        </div>

                        <div class="cotenedor_info_video">
                            <v-card-text>
                                <v-row class="mx-0">
                                    <div class="contenedor_promedio">
                                        <div class="tiempo-color ms-4">Tiempo de aprendizaje:</div>
                                        <div class="color_tiempo_texto text-grey ms-4">{{ video.tiempo }}</div>
                                    </div>
                                </v-row>
                            </v-card-text>


                        </div>
                    </v-card>
                </v-col>


            </div>




        </v-row>

    </div>
</template>





  
<script>
export default {


    beforeRouteUpdate(to, from, next) {
        this.scrollToTop();
        next();
    },

    mounted() {
        console.log('Componente montado');
        this.$nextTick(() => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);  // Ajusta el tiempo según sea necesario
        });

        this.videoUrl = this.$route.query.videoUrl || '';
    },




    data() {
        return {
            videoUrl: '',
            videos: [
                {
                    cancion: 'Paso de Baile',
                    autor: 'Pies Adentro y Afuera',
                    tiempo: '01:00',
                    url: '/public/images/pasos_salsa_icono/Group_1.png',
                    inicio: '00:00',
                    fin: '00:04'


                },
                {
                    cancion: 'Paso de Baile',
                    autor: 'Pies Adentro  y Afuera Veloz',
                    tiempo: '0:30',
                    url: '/public/images/pasos_salsa_icono/Group_2.png',
                    inicio: '00:04',
                    fin: '00:08'

                },
                {
                    cancion: 'Paso de Baile',
                    autor: 'Costados',
                    tiempo: '02:00',
                    url: '/public/images/pasos_salsa_icono/Group_5.png',
                    inicio: '00:09',
                    fin: '00:16'

                },
                {
                    cancion: 'Paso de Baile',
                    autor: 'Brasos para Atras',
                    tiempo: '01:00',
                    url: '/public/images/pasos_salsa_icono/Group_6.png',
                    inicio: '00:17',
                    fin: '00:20'

                },

            ],





        };
    },
    methods: {


        scrollToTop() {
            // Desplázate al inicio de la página después de detener el video
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        reproducirVideo(index) {
            // Obtén el elemento de video usando la referencia
            this.videoElement = this.$refs.miVideo;

            // Asegúrate de que el elemento de video existe
            if (this.videoElement) {
                // Establece el tiempo de inicio y fin según el índice del paso
                const inicio = parseInt(this.videos[index].inicio.split(":")[1]); // en segundos
                const fin = parseInt(this.videos[index].fin.split(":")[1]); // en segundos

                // Establece el tiempo actual del video al inicio
                this.videoElement.currentTime = inicio;

                // Reproduce el video
                this.videoElement.play();

                // Configura un temporizador para detener el video después de 'fin' segundos
                setTimeout(() => {
                    this.videoElement.pause();
                }, (fin - inicio) * 1000); // Convierte a milisegundos
            }
        },



        irABailar() {
            // Redirige a la URL deseada al hacer clic en el botón
            window.location.href = 'http://127.0.0.1:5501/index.html';

        },


    },


};
</script>
  
<style scoped>
.contenedor-principal {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    justify-content: center;
}

/* Informacion Video */

.informacion_play_list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 70px;
}

/* video presentacion */

.imagen_play {
    border-width: 3px;
    /* Ancho del borde */
    border-style: solid;
    /* Estilo del borde (en este caso, sólido) */
    border-color: #fffa65;
    border-radius: 24px;


}




.imagen_play video {
    border-radius: 20px;


    width: 600px;
    height: 250px;
}

/* video texto */
.info_play {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.imagen_baile {
    max-width: 130px;
}

/* estrella */
.iconos_estrella {
    display: flex;
    flex-direction: row;
}

.linea_dividir {
    border: 1px solid #fff;
    margin: 0 150px;
    margin-top: 20px;
}



/*lista de canciones contenedor */
.lista_canciones {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-content: center;
    margin: 10px 50px;
    cursor: pointer;
}

.canciones_musica {
    border-width: 2px;
    /* Ancho del borde */
    border-style: solid;
    /* Estilo del borde (en este caso, sólido) */
    border-color: #fffa65;


}

.canciones_musica {
    background-color: #252525;
    border-radius: 10px;
    padding-top: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    position: relative;
    /* Añadir posición relativa */
}

.canciones_musica:hover {
    transform: scale(1.05);
}

/* Marco negro */



.video-container {
    max-width: 120px;
    margin: auto;
    position: relative;
}

.video-container::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    /* Ajusta la altura según tus necesidades */
    background-color: rgba(37, 37, 37, 0.7);
    z-index: 2;
}

/* Barra infomacion */
.barra_dificultadd {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* Ajusta el relleno según sea necesario */
    box-sizing: border-box;
    /* Asegura que el relleno se incluya en el ancho total */
    z-index: 3;
    /* Asegura que la barra de información esté sobre la barra negra */
    align-items: flex-end;
}

.barra_dificultadd p {
    font-size: 10px;
    color: white;
    text-transform: capitalize;
}

.barra {
    display: flex;
    flex-direction: row;
    gap: 2px;
}

.barra img {
    width: 6px;
    height: 15px;
}


/* Informacion del video */
.video_edit {
    border-radius: 15px;
}

/* infomacion del video*/
.cotenedor_info_video {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
    text-align: center;
}


/* Estilos para el contenedor del video y el rectángulo negro */

.contenedor_cancion {
    font-size: 10px;
    text-transform: uppercase;
    color: #fff;
}


.contenedor_autor_clas {
    margin-left: 40px;
    margin-bottom: 20px;
}

.contenedor_autor {
    font-size: 17px;
    color: #f5d7d7;
    font-weight: bold;
}

.tiempo-color {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;

}

.color_tiempo_texto {
    font-size: 12px;
    color: #f5d7d7;
}



/* Diseño del Boton */

button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #1d1d1d;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: none;
}

button:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #FFD401;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
}

button:hover::after {
    right: auto;
    left: 0;
    width: 100%;
}

button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #fff;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
}

button:hover span {
    color: #183153;
    animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);
    }
}

/* valor de la informacion */
</style>
  