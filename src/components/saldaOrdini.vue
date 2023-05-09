<template lang="html">
  
<div class="outer">
<Card class="card-component">
  <template #header>
  </template>
  <template #title> Ordine </template>
  <template #content class="inner">
<div class="inner">
  <DataTable :value="currentOrderInner"  :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="">
  <Column field="itemName" header="Nome"></Column>
  <Column field="extraInfo" header="extraInfo"></Column>
  <Column header="Salda Oggetto">
    <template #body="currentOrderInner">
      <Button :icon="currentOrderInner.data.paid===true ?  'pi pi-check':'pi pi-times'" :severity="currentOrderInner.data.paid===true ? 'primary':'danger'" text rounded aria-label="Filter" v-model="currentOrderInner.associatedOrder" :binary="true" @click="test('cc')" />
      <Checkbox v-model="currentOrderInner.data.paid" :binary="true" />
    </template>
  </Column>
</DataTable>
<br>
        <Button icon="pi pi-check" label="Save" @click="save()" />
</div>
  </template>
</Card>
</div>


</template>

<script lang="js">
import axios from 'axios';
import {reactive, toRaw,computed} from 'vue';
  export default  {
    name: 'salda-ordini',
    props: {currentOrderInner:{type:Array,require:true},currentTableInner:{type:String,require:true}},
    mounted () {

    },
    data () {
      return {
       
      }
    },
    methods: {
test(x){
console.log(x)
}
    },
    computed: {

    },
    methods:{
      test(){
        console.log(this.currentOrderInner)
      },
      async  save(){
        console.log(this.currentTableInner)
        console.log(this.currentOrderInner.id)
        this.currentOrderInner.forEach(element => {
        const url = 'http://localhost:8080/order/'+this.currentTableInner;
        const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      const data = element //ciclo occhio
      console.log("invio richiesta");
      console.log(toRaw(data));
       axios.put(url,data,{headers}).then(response=> console.log(response))
        });
       

      }
    }
}


</script>

<style scoped lang="scss">
  .salda-ordini {

  }
</style>
