<template class="bk">
  
<img src="./assets/logoDl.png">
<hr>
<div>
<menuprincipale></menuprincipale>

</div>


</template>

<script>
import menuprincipale from './components/menuprincipale.vue';



export default {
  name: 'App',
  components: {
    menuprincipale
}
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
