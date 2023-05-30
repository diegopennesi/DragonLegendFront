<template>

  <Dialog calss="modal" v-model:visible="modalvisible" :header="`${headerModal}`" :style="{ width: '50vw' }" :position="'top'" :modal="true" :draggable="false">
  <p class="m-0" v-html="bodyModal">
  </p>
  <Button icon="pi pi-check" label="Save" @click="closeTable()" v-if="headerModal=='ok'" />
  <Button icon="pi pi-check" label="Indietro" @click="modalvisible=false" v-if="headerModal!='ok'" />
  </Dialog>
<div class="outer">
<Card class="card-component">
  <template #header>
  </template>
  <template #title> Salda Un Tavolo </template>
  <template #content class="inner">
<div class="inner">
  <DataTable :value="tavoliMOK"  :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="getAssociatedOrder">
  
  <Column field="nameId" header="Nome"></Column>
  <Column field="extraInfo" header="extra"></Column>
  <Column header="Chiudi Tavolo">
    <template #body="tavoli">
      <Button :icon="!closingTableIsAllowed(tavoli.data.associatedOrder)===true ?  'pi pi-times':'pi pi-check'" :severity="!closingTableIsAllowed(tavoli.data.associatedOrder)===true ? 'danger':'primary'" text rounded aria-label="Filter" v-model="tavoli.associatedOrder" :binary="true" @click="modaleChiudiTavolo(tavoli)" />
      </template>
  </Column>
</DataTable>
</div>
  </template>
</Card>
</div>
<br>

<saldaOrdini :currentOrderInner="currentOrder2" :currentTableInner="currentTableInner"></saldaOrdini>
</template>

<script lang="js">
import axios from 'axios';
import config from '/config.js'
import {reactive, toRaw,computed} from 'vue';
import saldaOrdini from './saldaOrdini.vue';  



  export default  {
    name:'saldaTavolo',
    components:{
      saldaOrdini
    },
    props:[],
     mounted(){
      this.getTableList();
      
    },
    data (){
        return {
        apiUrl: config.apiUrl,
        test2:[1,2,3],
        tavoliMOK: "",
        headerModal:"",
        bodyModal:"",
        modalvisible:false,
        closingTable:"",
        currentOrder2:[],
        currentTableInner:""
        }
    },
    methods:{
      modaleChiudiTavolo(tavolo){
          this.headerModal=(!this.closingTableIsAllowed(tavolo.data.associatedOrder)===true)?"Errore":"ok";
          this.bodyModal=(!this.closingTableIsAllowed(tavolo.data.associatedOrder)===true)?"Impossibile chiudere tavolo, si prega di saldare conti":
          "Vuoi chiudere il tavolo?<br>Confermi?<br>Non potranno più essere eseguite altre operazioni"
          this.closingTable=tavolo;
          this.modalvisible=true;
        },
        closeTable(){
          const url = config.apiUrl+'/table?nameId='+this.closingTable.data.nameId;
          const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      console.log("invio richiesta");
      axios.delete(url,{headers})
      .then(response=>{
        this.getTableList();
        this.currentOrder2="";
      });

      this.modalvisible=false
        },
        getTableList(){
          const url = config.apiUrl+'/table';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      console.log("invio richiesta");
      axios.get(url,{headers})
      .then(response=>{
        this.tavoliMOK=response.data
      }).catch(error =>{
        this.bodyModal=error
        this.modalvisible=true

      })
        },
        getAssociatedOrder(event){
          this.currentTableInner=(event.data.nameId);
        this.currentOrder=toRaw(event.data.associatedOrder);
        this.currentOrder2=toRaw(event.data.associatedOrder);
        console.log("current order")
        console.log(this.currentOrder)

          },
        closingTableIsAllowed(orderlist){
            return orderlist.every(order=> order.paid)
        }  
        
      
    
        
        },
       
    
  }
</script>
<style scoped lang="scss">
.card-component{
    display: flex;
  margin-top: 40px;
  border: 10px;
  
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