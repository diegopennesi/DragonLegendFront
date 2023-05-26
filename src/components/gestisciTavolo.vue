<template>

<Dialog class="modal" v-model:visible="modalvisible" :header="`Tavolo ${headerModal.header}`" :style="{ width: '100%' }" style="display: flex;" :position="'top'" :modal="true" :draggable="false">
  <p class="m-0" v-html="bodyModal"/>
  <div>
  <AutoComplete v-model="searchValue" placeholder="Item name" :suggestions="filtredItems" :optionLabel="itemName" @change="handleOptionSelection"
 autocomplete="off" @input="search" @click="handleOptionSelection" class="w-full md:w-20rem"  />  <Button :icon="'pi pi-times'" :severity="'danger'" text rounded aria-label="Filter"  @click="() => {selectedItemProperties={};searchValue=null;temp=''}" />
  <!--<InputText v-model="selectedItemProperties.subchoice"  placeholder="Subchoice" @click="TEST" />-->
  <MultiSelect v-model="temp" :options="selectedItemProperties.subChoice"  placeholder="Option"
    :maxSelectedLabels="3"  />
  <InputText v-model="selectedItemProperties.extraInfo"  placeholder="extraInfo" />
  <br>

  <InputText v-model="selectedItemProperties.price" disabled  placeholder="costo" />   <Button icon="pi pi-check" v-if="this.selectedItemProperties.itemName!=null" label="Aggiungi" @click="addComanda()" /> 

  <DataTable :value="comandalist" :columnClasses='text-right' tableStyle="min-width: 5rem" >
    <Column header="elimina">
    <template #body="oggettoComanda">
      <Button :icon="'pi pi-times'" :severity="'danger'" text rounded aria-label="Filter"  @click="TEST(oggettoComanda.data)" />
   </template>
    </Column>
    <Column field="itemName" header="Nome"></Column>
    <Column field="subChoice" header="Sub"></Column>
    <Column field="extraInfo" header="Extra"></Column>
  </DataTable>


</div>
  
<template #footer>
  <Button icon="pi pi-check" label="Invia Comanda" @click="postComanda()" /> <!--che merda-->
  <Button icon="pi pi-check" label="Indietro" @click="modalvisible=false"/>
</template>
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
import {ref, toRaw,computed,reactive, VueElement } from 'vue';
  export default  {
    
    name:'gestisciTavolo',
    props:[],
    mounted(){ 
      this.getMenuList();
      this.getTableList();


    },
    data (){
      return{
        tavoliAperti: "",
        currentOrdergestisciTavolo:[],
        currentTableInner2:"",
        modalvisible:false,
        menuItems:[],
        headerModal:{'header':"Aggiungi un oggeto","footer":"footer"},
        searchValue:[],
        filtredItems:[],
        selectedItem:ref({}),
        selectedItemComanda:ref({}),
        comandalist:[],
        temp:""
        
      }
    },
    computed: {
      selectedItemProperties: {
    get() {
      return this.selectedItem.value || {};
    },
    set(value) {

      this.selectedItem.value = value;
    },
  },
  selectedItemComanda: {
    get() {
      return this.selectedItemComanda.value || {};
    },
    set(value) {

      this.selectedItemComanda.value = value;
    },
  },
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
        getMenuList(){
          const url = 'http://localhost:8080/adm/menuItem';
          const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      console.log("invio richiesta");
      axios.get(url,{headers})
      .then(response=>{
        this.menuItems=toRaw(response.data)
        console.log(toRaw(this.menuItems))
      })
        },
        async postComanda(){
          for(const ordini of this.comandalist){
          const url = 'http://localhost:8080/order/'+this.headerModal.header;
          const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      ordini.extraInfo=((ordini.extraInfo!==undefined)?ordini.extraInfo+":":"")+ordini.subChoice
      const data = ordini
      console.log("invio richiesta");
      console.log(ordini);
      await axios.put(url,data,{headers})
    }
    this.getMenuList();
      this.getTableList();
    this.modalvisible=false
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
  this.comandalist=[]
  console.log(rowData.nameId)
  this.modalvisible=true
  this.headerModal.header=rowData.nameId
  this.headerModal.visibility=true
},
search() {
  console.log(this.menuItems.menuClass);
  setTimeout(()=>{
  this.filtredItems = this.menuItems.filter(item => {
    return (item.menuClass.toLowerCase().includes(this.searchValue.toLowerCase())!="")?item.menuClass.toLowerCase().includes(this.searchValue.toLowerCase()):item.itemName.toLowerCase().includes(this.searchValue.toLowerCase())
    return item.itemName.toLowerCase().includes(this.searchValue.toLowerCase());  
    })
    .map(item => item.itemName );
    console.log(toRaw(this.filtredItems))},50);
},
handleOptionSelection(option){
  const searchProd=(option.value!==undefined)?option.value:this.searchValue;
 const itemBlank=
  this.menuItems.filter(item =>{
  return item.itemName===searchProd
 })
 console.log("oggetto caricato" )
 console.log(itemBlank[0]);
 this.selectedItem.value=(itemBlank[0])
 
},
addComanda(){
  if(this.selectedItemProperties.itemName!=null){
  this.selectedItemComanda= Object.assign({},this.selectedItemProperties)
  this.selectedItemComanda.subChoice=(this.temp!=null)?this.temp:""
  this.comandalist.push(this.selectedItemComanda)
  console.log(this.comandalist)}
  else{}
},
recalculateComanda(items)  {//bisogna standardizzare il codice, è una uility di filtro che deve asservire per più logiche cazzarola!
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
TEST(oggettoComanda){
  const index = this.comandalist.findIndex(item => item === oggettoComanda);
  if (index !== -1) {      this.comandalist.splice(index, 1);
}
  }}
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
#p-carousel-item p-carousel-item-active p-carousel-item-start p-carousel-item-end{
  background-color: red;
}
.modal{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.p-autocomplete .p-autocomplete-loader {
    right: 1rem;
    display: none !important
}</style>