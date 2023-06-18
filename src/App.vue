<template class="bk">
  <div>
<dialognoticecomponent :dialogComponent="myProp"></dialognoticecomponent>
    

<img src="./assets/logoDl.png" style="max-width: 25%">
<div style="text-align: justify;">
<Button text rounded aria-label="Filter" @click="toggleFullscreen">Fullscreen</Button>
<Button text rounded aria-label="Filter" label="Admin" @click="goToAdm('/adm')"/>
<Button text rounded aria-label="Filter" label="Home" @click="goToAdm('/')"/>
<Button text rounded aria-label="Filter" label="Novità" @click="goToAdm('/changelog')"/>
</div>
<hr>
<div>
  <router-view @custom-event="updateDialog"></router-view>
</div>
</div>


</template>

<script>
import menuprincipale from './components/menuprincipale.vue';
import dialognoticecomponent from './components/dialogNoticeComponent.vue';
import { routes } from './routes';

export default {
  name: 'App',
  components: {
    menuprincipale,
    dialognoticecomponent
},data() {
return{
myProp: ''
}
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
    goToAdm(url){
      this.$router.push(url);
    },
    updateDialog(data){
        this.myProp=data.propValue;
      },
    TEST(){
      
    }
  },mounted () {
  this.toggleFullscreen()//non funziona
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
