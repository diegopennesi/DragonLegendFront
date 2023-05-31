<template class="bk">
  <div>

    

<img src="./assets/logoDl.png" style="max-width: 25%">
<br> <button @click="toggleFullscreen">fullscreen on\off</button>
<hr>
<div>
<menuprincipale></menuprincipale>
</div>
</div>


</template>

<script>
import menuprincipale from './components/menuprincipale.vue';




export default {
  name: 'App',
  components: {
    menuprincipale
},

methods: {
    toggleFullscreen() {
      const element = document.documentElement; // L'elemento radice del documento HTML
      const fullscreenEnabled =
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.documentElement.webkitRequestFullScreen; // Verifica la compatibilità del browser per la modalità schermo intero

      if (fullscreenEnabled) {
        if (document.fullscreenElement) {
          // Se la modalità schermo intero è già attiva, disattivala
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        } else {
          // Altrimenti, attiva la modalità schermo intero
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          }
        }
      }
    },
  },mounted () {
  this.toggleFullscreen()
},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 5px;
  text-align: center;
  align-items: center;
  justify-content: center;

}

</style>
