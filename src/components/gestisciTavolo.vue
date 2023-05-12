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
  <template #title> Tavoli aperti </template>
  <template #content class="inner">
<div class="inner">
  <DataTable :value="tavoliAperti"  :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="getAssociatedOrder">
  <Column field="nameId" header="Nome"></Column>
  <Column field="extraInfo" header="extra"></Column>
  <Column header="Inserisci Ordine">
    <template #body="rowData">
      <Button label="Inserisci ordine" @click="addnewItem(rowData.data)" />

    </template>
    </Column>
</DataTable>
</div>
  </template>
</Card>
</div>
<br>
<Card class="card-component">
  <template #header>
  </template>
  <template #title> Ordine </template>
  <template #content class="inner">
<div class="inner">
  <DataTable :value="currentOrdergestisciTavolo"  :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="">
  <Column field="itemName" header="Nome"></Column>
  <Column field="count" header="Unità"></Column>
</DataTable>
<br>
        <Button icon="pi pi-check" label="Save" @click="" />
</div>
  </template>
</Card>

</template>

<script lang="js">

import axios from 'axios';
import {reactive, toRaw,computed} from 'vue';
  export default  {
    
    name:'gestisciTavolo',
    props:[],
    mounted(){ 
      this.getTableList();

    },
    data (){
      return{
        tavoliAperti: "",
        currentOrdergestisciTavolo:[],
        currentTableInner2:""
      }
    },
    methods:{
      getTableList(){
          const url = 'http://localhost:8080/table';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      console.log("invio richiesta");
      axios.get(url,{headers})
      .then(response=>{
        this.tavoliAperti=response.data
      })
        },
        getAssociatedOrder(event){
        this.currentTableInner=(event.data.nameId);
        this.recalculateTrueOrderListGestisciTavolo(toRaw(event.data.associatedOrder));
        console.log("current order")
        console.log(this.currentOrder)
          },
          recalculateTrueOrderListGestisciTavolo(items) {
  const counts = items.reduce((acc, item) => {
    const key = `${item.itemName} ${item.extraInfo}`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});
  this.currentOrdergestisciTavolo= Object.entries(counts).map(([itemName, count]) => ({ itemName, count }));
  console.log("test")
  console.log(this.currentOrdergestisciTavolo)
},
addnewItem(rowData){
  console.log(rowData.nameId)
}
        }
    
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