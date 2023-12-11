<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, RouterLink, useRouter } from 'vue-router';
import { useSongStore } from './stores/song';
import { storeToRefs } from 'pinia';

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);


onMounted(() => {
    isPlaying.value = false;
});

let openMenu = ref(false);
let searchText = ref('');

const router = useRouter();

const navigateToSearch = () => {
    router.push({ path: '/search', query: { name: searchText.value } });
};

const playPageChangeSound = () => {
    // Adjust the sound path based on your file structure
    const soundPath = '../public/music/sonidos_intro/intro2.mp3';
    const pageChangeSound = new Audio(soundPath);
    pageChangeSound.play();
};

const beforeRouteLeave = (to, from, next) => {
    playPageChangeSound();
    next();
};

const beforeRouteEnter = (to, from, next) => {
    playPageChangeSound();
    next();
};






</script>

<template>
    <div>
        <div id="TopNav" class="
        w-[calc(100%)] 
            h-[60px] 
            fixed 
            right-0 
            z-20 
            bg-[#101010] 
            bg-opacity-80 
            flex 
            items-center 
            justify-between
    ">
            <div class="flex items-center ml-6">


                <RouterLink to="/" class="cursor-pointer">
                    <img class="ml-[1px]" src="../public/images/iconoLogo/home.svg" width="40" height="40" alt="Home" />
                </RouterLink>



            </div>



            <div class="buscador_texto">
                <div class="flex items-center">
                    <div class="ml-20 relative">


                        <input v-model="searchText" @keydown.enter="navigateToSearch" type="text"
                            placeholder="¿Que quieres Bailar?"
                            class="bg-transparent border-none text-white focus:outline-none pl-20 pr-20 py-2 rounded-full" />


                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M21 21l-5.2-5.2"></path>
                                <circle cx="10" cy="10" r="8"></circle>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>



            <button @click="cambiarSeccion('todo')" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-2 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <div class="text-white text-[14px] ml-1.5 font-semibold">#Todo</div>
                </div>
            </button>



            <button @click="cambiarSeccion('basico')" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-2 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <div class="text-white text-[14px] ml-1.5 font-semibold">#basico</div>
                </div>
            </button>


            <button @click="cambiarSeccion('tendencia')" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-2 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <div class="text-white text-[14px] ml-1.5 font-semibold">#tendencia</div>
                </div>
            </button>



            <button @click="cambiarSeccion('animo')" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-2 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <div class="text-white text-[14px] ml-1.5 font-semibold">#Animo</div>
                </div>
            </button>



            <button @click="cambiarSeccion('electronica')" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-2 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <div class="text-white text-[14px] ml-1.5 font-semibold">#electronica</div>
                </div>
            </button>






        </div>





        <div class="
        fixed
            right-0
            top-0
            w-[calc(100%)]
            overflow-auto
            h-full
            bg-gradient-to-b
            from-[#1C1C1C]
            to-black
    ">
            <div class="mx-8 my-8"></div>

            <RouterView />


            <div v-if="seccionActual === 'basico' || seccionActual === 'todo' || seccionActual === ''" class="mx-8 my-2">
                <div class="margin_texto">
                    <div type="button" class="text-white text-2xl font-semibold hover:underline margin_info">
                        DA TUS PRIMEROS PASOS !!!
                    </div>
                </div>

                <div class="py-1.5"></div>

                <div class="flex items-center valor_conjunto">
                    <div v-for="(item, index) in videoFull_1" :key="index"
                        class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer relative contenedor"
                        @mouseenter="mostrarElemento_1(index); detenerSonido(); reproducirCancion(item.musica)"
                        @mouseleave="ocultarElemento_1(index); detenerSonido()"
                        @click="reproducirSonido(); ruta_destino(item.ruta, item.videoUrl)">

                        <!-- Utiliza v-if para alternar entre la imagen y el video -->
                        <img v-if="!item.mostrarVideo" class="rounded-md" :src="item.imageUrl" />
                        <video v-if="item.mostrarVideo" ref="video" class="rounded-md" controls autoplay muted>
                            <source :src="item.videoUrl" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>

                        <div class="text-white pt-4 font-semibold text-[17px] text-center">
                            PASOS
                        </div>
                        <div class="text-gray-400 pt-1 pb-3 text-[14px] text-center">
                            {{ item.steps }}
                        </div>
                    </div>
                </div>
            </div>



            <div v-if="seccionActual === 'tendencia' || seccionActual === 'todo' || seccionActual === ''" class="mx-8 my-2">
                <div class="margin_texto">
                    <div type="button" class="text-white text-2xl font-semibold hover:underline margin_info">
                        TENDENCIAS
                    </div>
                </div>

                <div class="py-1.5"></div>

                <div class="flex items-center valor_conjunto">
                    <div v-for="(item, index) in videoFull_2" :key="index"
                        class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer relative contenedor"
                        @mouseenter="mostrarElemento_2(index); detenerSonido(); reproducirCancion(item.musica)"
                        @mouseleave="ocultarElemento_2(index); detenerSonido()"
                        @click="reproducirSonido(); ruta_destino(item.ruta, item.videoUrl)">

                        <!-- Utiliza v-if para alternar entre la imagen y el video -->
                        <img v-if="!item.mostrarVideo" class="rounded-md" :src="item.imageUrl" />
                        <video v-if="item.mostrarVideo" ref="video" class="rounded-md" controls autoplay muted>
                            <source :src="item.videoUrl" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>

                        <div class="text-white pt-4 font-semibold text-[17px] text-center">
                            PASOS
                        </div>
                        <div class="text-gray-400 pt-1 pb-3 text-[14px] text-center">
                            {{ item.steps }}
                        </div>
                    </div>
                </div>
            </div>



            <div v-if="seccionActual === 'animo' || seccionActual === 'todo' || seccionActual === ''" class="mx-8 my-2">

                <div class="margin_texto">
                    <div type="button" class="text-white text-2xl font-semibold hover:underline margin_info">
                        ESTADOS DE ANIMO
                    </div>
                </div>

                <div class="py-1.5"></div>

                <div class="flex items-center valor_conjunto">
                    <div v-for="(item, index) in videoFull_3" :key="index"
                        class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer relative contenedor"
                        @mouseenter="mostrarElemento_3(index); detenerSonido(); reproducirCancion(item.musica)"
                        @mouseleave="ocultarElemento_3(index); detenerSonido()"
                        @click="reproducirSonido(); ruta_destino(item.ruta, item.videoUrl)">

                        <!-- Utiliza v-if para alternar entre la imagen y el video -->
                        <img v-if="!item.mostrarVideo" class="rounded-md" :src="item.imageUrl" />
                        <video v-if="item.mostrarVideo" ref="video" class="rounded-md" controls autoplay muted>
                            <source :src="item.videoUrl" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>

                        <div class="text-white pt-4 font-semibold text-[17px] text-center">
                            PASOS
                        </div>
                        <div class="text-gray-400 pt-1 pb-3 text-[14px] text-center">
                            {{ item.steps }}
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="seccionActual === 'electronica' || seccionActual === 'todo' || seccionActual === ''"
                class="mx-8 my-2">

                <div class="margin_texto">
                    <div type="button" class="text-white text-2xl font-semibold hover:underline margin_info">
                        LOS PASOS DEL MOMENTOS
                    </div>
                </div>

                <div class="py-1.5"></div>

                <div class="flex items-center valor_conjunto">
                    <div v-for="(item, index) in videoFull_4" :key="index"
                        class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer relative contenedor"
                        @mouseenter="mostrarElemento_4(index); detenerSonido(); reproducirCancion(item.musica)"
                        @mouseleave="ocultarElemento_4(index); detenerSonido()"
                        @click="reproducirSonido(); ruta_destino(item.ruta, item.videoUrl)">

                        <!-- Utiliza v-if para alternar entre la imagen y el video -->
                        <img v-if="!item.mostrarVideo" class="rounded-md" :src="item.imageUrl" />
                        <video v-if="item.mostrarVideo" ref="video" class="rounded-md" controls autoplay muted>
                            <source :src="item.videoUrl" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>

                        <div class="text-white pt-4 font-semibold text-[17px] text-center">
                            PASOS
                        </div>
                        <div class="text-gray-400 pt-1 pb-3 text-[14px] text-center">
                            {{ item.steps }}
                        </div>
                    </div>
                </div>
            </div>


            <div class="mb-24"></div>
        </div>


    </div>
</template>

<style>
.buscador_texto {
    border-width: 2px;
    /* Ancho del borde */
    border-style: solid;
    /* Estilo del borde (en este caso, sólido) */
    border-color: #fffa65;
}

.buscador_texto {
    background-color: #4a5568;
    /* Cambia el color de fondo según tus preferencias */
    padding: -1px;
    border-radius: 25px;
    margin-right: 20px;
    /* Ajusta el margen derecho según tus necesidades */
}

/* Estilo para el ícono de búsqueda */
.buscador_texto input~div {
    transition: color 0.2s;
}

.buscador_texto input:focus~div {
    color: #718096;
    /* Cambia el color cuando el campo de búsqueda está enfocado */
}



/*animacion musica */

.contenedor {
    position: relative;
    overflow: hidden;
}

.contenedor .animacion {
    background-color: rgba(0, 0, 0, 0.726);
    border-radius: 60px;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.contenedor[data-show-animation="true"] .animacion {
    opacity: 1;
}

.contenedor .animacion:hover svg {
    animation: girar 2s linear infinite;
    /* Cambia la duración y otros parámetros según sea necesario */
}

@keyframes girar {
    to {
        transform: rotate(360deg);
    }
}

.contenedor {
    border-width: 2px;
    /* Ancho del borde */
    border-style: solid;
    /* Estilo del borde (en este caso, sólido) */
    border-color: #fffa65;
}

/* Estilo adicional para la rotación suave */
.contenedor .animacion svg {
    transition: transform 0.5s ease-in-out;
}

.color_boton div {
    color: red;
}
</style>



<script>
export default {


    beforeRouteUpdate(to, from, next) {
        this.scrollToTop();
        next();
    },

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
            mostrarVideo: false,
            seccionActual: '', // Agrega esta línea


            videoFull_1: [
                {
                    type: 'video',
                    videoUrl: "/public/videos/basico_salsa.mp4",
                    imageUrl: "../../public/images/icons/salsa/1.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Salsa/1.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/videos_kpop/video1.mp4",
                    imageUrl: "../../public/images/icons/kpop/1.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Kpop/1.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                // Agrega más elementos de video según sea necesario
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_bachata/video2.mp4",
                    imageUrl: "../../public/images/icons/bachata/1.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Bachata/1.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_bachata/video3.mp4",
                    imageUrl: "../../public/images/icons/bachata/2.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Bachata/2.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/videos_salsa/video1.mp4",
                    imageUrl: "../../public/images/icons/salsa/2.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Salsa/2.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },

            ],


            videoFull_2: [
                {
                    type: 'video',
                    videoUrl: "/public/videos/videos_salsa/video2.mp4",
                    imageUrl: "../../public/images/icons/salsa/3.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Salsa/3.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/videos_kpop/video2.mp4",
                    imageUrl: "../../public/images/icons/kpop/4.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Kpop/2.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },

                {
                    type: 'video',
                    videoUrl: "/public/videos/video_bachata/video4.mp4",
                    imageUrl: "../../public/images/icons/bachata/3.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Bachata/3.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/videos_kpop/video3.mp4",
                    imageUrl: "../../public/images/icons/kpop/5.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Kpop/3.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/basico_salsa.mp4",
                    imageUrl: "../../public/images/icons/salsa/4.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Salsa/1.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },

            ],

            videoFull_3: [
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video1.mp4",
                    imageUrl: "../../public/images/icons/animo/1.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion1.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'

                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video2.mp4",
                    imageUrl: "../../public/images/icons/animo/2.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion2.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                // Agrega más elementos de video según sea necesario
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video3.mp4",
                    imageUrl: "../../public/images/icons/animo/3.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion3.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video4.mp4",
                    imageUrl: "../../public/images/icons/animo/4.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion4.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video5.mp4",
                    imageUrl: "../../public/images/icons/animo/5.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion5.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },

            ],

            videoFull_4: [
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video6.mp4",
                    imageUrl: "../../public/images/icons/tendencia/1.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion6.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video7.mp4",
                    imageUrl: "../../public/images/icons/tendencia/2.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion7.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                // Agrega más elementos de video según sea necesario
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video8.mp4",
                    imageUrl: "../../public/images/icons/tendencia/3.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion8.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video9.mp4",
                    imageUrl: "../../public/images/icons/tendencia/4.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion9.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },
                {
                    type: 'video',
                    videoUrl: "/public/videos/video_electronica/video10.mp4",
                    imageUrl: "../../public/images/icons/tendencia/5.png",
                    steps: "Lineal - Lateral - Adelante",
                    musica: '../public/music/Canciones_nuevas/cancion10.mp3',
                    mostrarVideo: false,
                    ruta: '/library_salsa2'
                },

            ]




        };
    },
    methods: {


        scrollToTop() {
            // Desplázate al inicio de la página después de detener el video
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        cambiarSeccion(seccion) {
            this.seccionActual = seccion;
        },


        beforeRouteLeave(to, from, next) {
            playPageChangeSound();
            next();
        },

        beforeRouteEnter(to, from, next) {
            playPageChangeSound();
            next();
        },

        reproducirCancion(index) {
            try {



                const rutaCancion = index;

                // Detener la reproducción anterior si existe
                this.detenerSonido();

                // Crear una instancia de Audio específica para este elemento
                this.sonido = new Audio(rutaCancion);

                // Reproducir la canción
                this.sonido.play();

                // Ocultar el botón después de iniciar la reproducción
                this.mostrarBoton = false;

                // Agregar eventos y lógica según sea necesario
            } catch (error) {
                console.error('Error al reproducir la canción:', error);
            }
        },

        detenerSonido() {
            try {
                if (this.sonido && !this.sonido.paused) {
                    this.sonido.pause();
                    this.sonido.currentTime = 0;
                }
            } catch (error) {
                console.error('Error al detener el sonido:', error);
            }
        },

        mostrarBotonReproduccion() {
            this.mostrarBoton = true;
        },

        ocultarBotonReproduccion() {
            this.mostrarBoton = false;
        },

        reproducirSonido() {
            try {
                // Ruta al archivo de sonido
                const rutaSonido = '/public/music/sonidos_intro/intro2.mp3'; // Ajusta la ruta según tu estructura

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



        reproducirVideo() {
            this.mostrarVideo = true;
            this.$refs.video.play();
        },
        pausarVideo() {
            this.mostrarVideo = false;
            this.$refs.video.pause();
        },

        /*componenet  */
        mostrarElemento_1(index) {
            this.videoFull_1[index].mostrarVideo = true;

        },
        ocultarElemento_1(index) {
            this.videoFull_1[index].mostrarVideo = false;
        },




        /*componenet  */
        mostrarElemento_2(index) {
            this.videoFull_2[index].mostrarVideo = true;

        },
        ocultarElemento_2(index) {
            this.videoFull_2[index].mostrarVideo = false;
        },


        /*componenet  */
        mostrarElemento_3(index) {
            this.videoFull_3[index].mostrarVideo = true;

        },
        ocultarElemento_3(index) {
            this.videoFull_3[index].mostrarVideo = false;
        },

        /*componenet  */
        mostrarElemento_4(index) {
            this.videoFull_4[index].mostrarVideo = true;

        },
        ocultarElemento_4(index) {
            this.videoFull_4[index].mostrarVideo = false;
        },



        ruta_destino(index, valor) {
            // Use router.push to navigate to another route
            //this.$router.push({ path: index });



            this.$router.push({
                path: index,
                query: {
                    videoUrl: valor,

                }
            });



            // Scroll to the top of the page after a delay
            setTimeout(() => {
                // Desplázate al inicio de la página después de detener el video
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000); // You can adjust the delay as needed
        },




    },
};
</script>