<template lang="html">

<Dialog class="modal" v-model:visible="modalvisible" :header="`${headerModal}`" :style="{ width: '100%' }" style="display: flex;" :position="'top'" :modal="true" :draggable="false">
  <p class="m-0" v-html="bodyModal"/>
  <Button icon="pi pi-check" text rounded aria-label="Filter" label="Indietro" @click="modalvisible=false"  />
</Dialog>
<div class="outer">
<Card class="card-component">
    <template #header>
    </template>
      <template #title> inserimento oggetto menu </template>
    <template #content>
    <div >
    <InputText type="text" v-model="newItem.itemName" placeholder="nome"> </InputText>
    <InputText type="text" v-model="newItem.description" placeholder="descrizione"> </InputText>
    <AutoComplete type="text" v-model="newItem.subChoice" placolder="opzioni"></AutoComplete>
    <InputNumber :minFractionDigits="2" placeholder="costo" v-model="newItem.price"> </InputNumber>
    <Dropdown type="text" editable :options="listOfMenuClass" v-model="newItem.menuClass" placeholder="menuClass"> </Dropdown>
    <InputText type="text" v-model="newItem.allergens" placeholder="allergeni"> </InputText>

    </div>
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Aggiungi" text rounded aria-label="Filter" @click="additem()" /> <!--che merda-->
      <Button icon="pi pi-times" label="Cancella" text rounded aria-label="Filter" severity="secondary" style="margin-left: 0.5em" @click="clear()"/>
    </template>
</Card>
<Card class="card-component">
  <template #header>
  </template>
  <template #title> elimina articolo</template>
  <template #content>
    <DataTable :value="menuItems" :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="updateDialog">
      <Column field="itemName" header="Nome"></Column>
      <Column header="elimina">
          <template #body="ItemOfmenuItems">
      <Button icon="pi pi-times" text rounded aria-label="Filter" severity="secondary" style="margin-left: 0.5em" @click="deleteItemOfItem(ItemOfmenuItems.data)"/>
      </template>
      </Column>
    </DataTable>
  </template>
  <template #footer>

  </template>
</Card>
</div>
</template>
<script lang="js">
import axios from 'axios';
import config from '/config.js'
import {ref, toRaw,computed,reactive, VueElement } from 'vue';
  export default {
    name: 'AdmPannel',
    props: [],
    mounted () {
      this.getMenuList();
    },
    data () {
      const defaultItem={
  "itemName": "",
  "subChoice": [],
  "description": "",
  "price": 0.0,
  "menuClass": "",
  "allergens": ""
};
      return {
        modalvisible:false,
        apiUrl: config.apiUrl,
        headerModal:"",
        bodyModal:"",
        menuItems:[],
        listOfMenuClass:[],         
        newItem: { ...defaultItem },//così posso resettare agilmente avendo la stessa struttura
        myProp:''
      }
    },

    methods: {
      getMenuList(){
          const url = this.apiUrl+'/adm/menuItem';
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
        console.log("list of menu class?");
      this.listOfMenuClass = [...new Set(this.menuItems.map(item => item.menuClass))];
      console.log(this.listOfMenuClass)
      })
    },
    test(event){
      console.log(event.data)
      },
      updateDialog(event){
      const data={
        propValue:{header:event.data.itemName,
          footer:
          event.data.description+"\n"+
          event.data.price+"\n"+
          event.data.menuClass+"\n",isVisible:true
      }}

        this.$emit('custom-event',data)
    } , 
    deleteItemOfItem(data){
      console.log(data.id)
    },
    async additem(){
      const url = this.apiUrl+'/adm/menuItem';
          const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      console.log("invio richiesta");
      console.log(toRaw(this.newItem))
      this.newItem.subChoice=this.newItem.subChoice.split(" ")
      console.log(toRaw(this.newItem.subChoice))
      const data=toRaw(this.newItem)
      /*await axios.post(url,data,{headers}).then( response => {
        this.modalvisible=true;
        this.headerModal="Nuovo prodotto Inserito!"
        this.clear()
      });*/
      
    },
    clear(){
      this.newItem = { ...this.defaultItem };
    }
  }
}


</script>

<style scoped lang="scss">
.card-component{
  margin-top: 40px;
  border: 10px;
  width: 60%;
  display: inline;
}
.outer{
  align-items: center;
  width: 80vw;
  justify-content: center;
  background-color: #1e1e1e;
  margin:0 auto;
}
.inner{
padding-top: 5px;
padding-left: 30px;
align-items: center;
}
.p-inputtext{
margin-bottom: 3px !important
}
.p-inputnumber{
  margin-bottom: 3px !important
}
</style>
