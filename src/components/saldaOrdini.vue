<template lang="html">
    <Dialog calss="modal" v-model:visible="modalvisible" :header="`${headerModal.header}`" :style="{ width: '50vw' }" :position="'top'" :modal="true" :draggable="false">
  <p class="m-0" v-html="bodyModal">
  </p>
  <Button icon="pi pi-check" label="Save" @click="" v-if="headerModal=='ok'" />
  <Button icon="pi pi-check" label="Indietro" @click="modalvisible=false" v-if="headerModal!='ok'" />
  </Dialog>
<div class="outer">
<Card class="card-component">
  <template #header>
  </template>
  <template #title> Ordine </template>
  <template #content class="inner">
<div class="inner">
  <DataTable :value="currentOrderInner"  :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="">
    <Column header="Paga">
    <template #body="currentOrderInner">
      <Checkbox  class="inner2" v-model="currentOrderInner.data.paid" @click="calculateScontrino(currentOrderInner.data)" :binary="true" />
    </template>
  </Column>
  <Column style="" field="price" header="price"></Column>
  <Column field="itemName" header="Nome"></Column>
  <Column v-modeldynamicValue field="extraInfo" header="extraInfo"></Column>
</DataTable>
<br>
<div >
            <label for="currency-germany" class="font-bold block mb-2"> costo </label>
            <InputNumber v-model="this.amountToPa" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" />
        </div><br>
        <Button icon="pi pi-check" label="Save" @click="save()" />
</div>
  </template>
</Card>

</div>


</template>

<script lang="js">
import axios from 'axios';
import config from '/config.js';
import {reactive, toRaw,computed} from 'vue';
  export default {
    name: 'salda-ordini',
    props: {currentOrderInner:{type:Array,require:true},currentTableInner:{type:String,require:true}},
    mounted () {

    },
    data () {
      return {
        headerModal:{header:"",footer:"",isVisible:false},
        modalvisible:false,
        apiUrl: config.apiUrl,
       amountToPa: 0.0
      }
    },
      computed: {
    dynamicValue() {
      return currentOrderInner.extraInfo + currentOrderInner.subChoice
    }
  },
    computed: {

    },
    methods:{
      updateDialog(){
      const data={
        propValue:{header:"Testone ",footer:"Piedone "}}
        console.log("siamo menu salda ordine"," ", data.propValue)
        this.$emit('custom-event',data)
      },
      calculateScontrino(currentorder){
      var order=toRaw(currentorder)
      this.amountToPa=(!order.paid)?this.amountToPa+order.price:this.amountToPa-order.price;
      },
       async save(){
        var scontrinoPrice=0
        console.log(this.currentTableInner)
        console.log(this.currentOrderInner.id)
        for (const element of this.currentOrderInner){
        const url = this.apiUrl+'/order/'+this.currentTableInner;
        const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      const data = element//ciclo occhio
      scontrinoPrice=scontrinoPrice+element.price
      console.log("invio richiesta");
      console.log(toRaw(data));
       await axios.put(url,data,{headers}).then(response=> {
      if (response.status === 200) {
      console.log(response.data);
      this.amountToPa=0,0
      this.headerModal.header='OK'
      this.headerModal.footer='Pagamento Riuscito'
      //this.headerModal.header='ok'
      //this.bodyModal="Pagamento Riuscito"
      } else {
        console.log(response.data);
        this.headerModal.header=response.status
        this.headerModal.footer=response.data
      }
      })
      .catch(error => {
        console.log('Errore nella chiamata:', error);
        this.headerModal.header='ERROR'
        this.headerModal.footer=error.data
        });
      }this.headerModal.isVisible=true;
      const data={
        
        propValue:this.headerModal}
        console.log("siamo menu salda ordine"," ", data.propValue)
        this.$emit('custom-event',data)
      //this.modalvisible=true
    }
  }
}


</script>

<style scoped lang="scss">

 
</style>
