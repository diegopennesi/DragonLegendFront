<template>
  <Dialog calss="modal" v-model:visible="modalvisible" :header="`${headerModal}`" :style="{ width: '50vw' }" :position="'top'" :modal="true" :draggable="false">
  <p class="m-0" v-html="bodyModal">

  </p>
  </Dialog>
<div class="outer">
<Card class="card-component">
  <template #header>
  </template>
  <template #title> Salda Un Tavolo </template>
  <template #content>
<div class="inner">
  <DataTable :value="tavoliMOK"  :columnClasses='text-right' tableStyle="min-width: 5rem">
  <Column field="id" header="Id"></Column>
  <Column field="nameId" header="Nome"></Column>
 
  <Column header="Chiudi Tavolo">
    <template #body="tavoli">
      <Button :icon="tavoli.data.ordini ?  'pi pi-times':'pi pi-check'" :severity="tavoli.data.ordini ? 'danger':'primary'" text rounded aria-label="Filter" v-model="tavoli.ordini" :binary="true" @click="chiuditavolo(tavoli)" />
      </template>
  </Column>

</DataTable>

</div>
  </template>
  
</Card>
</div>







</template>

<script lang="js">

import axios from 'axios';
  export default  {
    name:'saldaTavolo',
    props:[],
    mounted(){
        const value=JSON.parse(sessionStorage.getItem('tavolo%'));
        this.tavoliMOK.push(value);
    },
    data (){
        return {
        tavoliMOK: [
            { id:1,nameId:'Tavolo1',ordini:false, test:'test'},
            { id:2,nameId:'Tavolo2',ordini:true,test:'test'},
            { id:3,nameId:'Tavolo3',ordini:false,test:'test'}
        ],
        headerModal:"",
          bodyModal:"",
          modalvisible:false,

        }
    },
    methods:{
        chiuditavolo(tavolo){
          this.headerModal=tavolo.data.ordini?"Errore":"ok";
          this.bodyModal=tavolo.data.ordini?"Impossibile chiudere tavolo, si prega di saldare conti":
          "Vuoi chiudere il tavolo?<br>Confermi?<br>Non potranno più essere eseguite altre operazioni"
          this.modalvisible=true;
        }
        }
    
  }
</script>
<style scoped lang="scss">
.card-component{
    display: flex;
  margin-top: 40px;
  border: 10px;
  background-color: rgb(236, 236, 236);
  width: 80%;
  display: inline;
 
}
.outer{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.inner{

  padding-top: 5px;
  text-align:center;
  align-items: center;
  justify-content: center;

}
.modal{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}</style>