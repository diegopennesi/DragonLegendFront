<template >
<div class="menuprincipale">
<Button icon='pi pi-calendar-plus' label="Apri tavolo" class="button" @click="apriTavolo()"></Button>
<Button icon='pi pi-cart-plus' label="Gestisci Tavolo" class="button" @click="gestisciTavolo()"></Button>
<Button icon='pi pi-calendar-times' label="Salda tavolo" class="button" @click="saldatavolo()"></Button>
</div>
<div>
  <apritavolo v-if="apriTavoloShow"></apritavolo>
  <gestisciTavolo v-if="gestisciTavoloShow"></gestisciTavolo>
  <saldatavolo @custom-event="this.$emit('custom-event',$event)" v-if="saldatavoloShow" ></saldatavolo>
</div>
</template>

<script lang="js">
import apritavolo from './apriTavolo.vue';
import gestisciTavolo from './gestisciTavolo.vue';
import saldatavolo from './saldaTavolo.vue';
  export default  {
    name: 'menuprincipale',
 components:{
  apritavolo,
  gestisciTavolo,
  saldatavolo
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
    updateDialog(data){
      console.log("siamo menu principale"," ", data.propValue)
        this.$emit('custom-event',data.propValue);
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
    margin-bottom: 4px;
    max-width: 50%;
  }
</style>
