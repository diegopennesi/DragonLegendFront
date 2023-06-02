<template lang="html">

<Dialog class="modal" v-model:visible="modalvisible" :header="`Tavolo ${headerModal}`" :style="{ width: '100%' }" style="display: flex;" :position="'top'" :modal="true" :draggable="false">
  <p class="m-0" v-html="bodyModal"/>
</Dialog>
<div class="outer">
<Card class="card-component">
    <template #header>
    </template>
      <template #title> Inserisci un nuovo oggetto in menu! </template>
    <template #content>
    <div>
    <InputText type="text" v-model="newItem.itemName" placeholder="nome"> </InputText>
    <InputText type="text" v-model="newItem.description" placeholder="descrizione"> </InputText>
    <InputNumber placeholder="costo" v-model="newItem.costo"> </InputNumber>
    <MultiSelect type="text" :options="listOfMenuClass" v-model="newItem.menuClass" placeholder="menuClass" :maxSelectedLabels="1"> </MultiSelect>
    <InputText type="text" v-model="newItem.allergens" placeholder="allergeni"> </InputText>

    </div>
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Aggiungi" text rounded aria-label="Filter" @click="test()" /> <!--che merda-->
      <Button icon="pi pi-times" label="Cancella" text rounded aria-label="Filter" severity="secondary" style="margin-left: 0.5em" @click=""/>

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
      return {
        apiUrl: config.apiUrl,
        headerModal:"",
        bodyModal:"",
        menuItems:[],
        listOfMenuClass:[],
        newItem:{"itemName": "",
        "subChoice": [],
        "description": "",
        "price": 0.0,
        "menuClass": "",
        "allergens":""}
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
    test(){
      console.log(this.newItem)
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
