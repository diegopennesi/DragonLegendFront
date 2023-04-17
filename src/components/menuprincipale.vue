<template >
<div class="menuprincipale">
<Button icon='pi pi-calendar-plus' label="Apri tavolo" class="button" @click="apriTavolo()"></Button>
<Button icon='pi pi-cart-plus' label="Gestisci Tavolo" class="button" @click="gestisciTavolo()"></Button>
<Button icon='pi pi-calendar-times' label="Salda tavolo e chiudi" class="button" @click="saldatavolo()"></Button>
</div>
<div>
  <apritavolo v-if="apriTavoloShow"></apritavolo>
  <p v-if="gestisciTavoloShow"> gestisciTavoloShow</p>
  <p v-if="saldatavoloShow"> saldatavoloShow</p>
</div>
</template>

<script lang="js">
import apritavolo from './apriTavolo.vue';
  export default  {
    name: 'menuprincipale',
 components:{
  apritavolo
 },
    props: [],
    mounted () {

    },
    data () {
      return {
         apriTavoloShow: false,
         gestisciTavoloShow: false,
         saldatavoloShow: false
      }
    },
    methods: {
      apriTavolo(){
        this.apriTavoloShow=true;
        this.gestisciTavoloShow=false;
        this.saldatavoloShow=false;
        console.log('apriTavoloShow')
      },
      gestisciTavolo(){
        this.apriTavoloShow=false;
        this.gestisciTavoloShow=true;
        this.saldatavoloShow=false;
      },
      saldatavolo(){
        this.apriTavoloShow=false;
        this.gestisciTavoloShow=false;
        this.saldatavoloShow=true;
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .menu {
    display: flex;
    align-items: center;
  justify-content: center;
  }
  .menuprincipale{
    align-items: center;
  justify-content: center;
  }
  .button{
    margin-left: 4px;
    margin-right: 4px;
  }
</style>
