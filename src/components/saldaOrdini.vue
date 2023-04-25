<template lang="html">
<div class="outer">
<Card class="card-component">
  <template #header>
  </template>
  <template #title> Ordine </template>
  <template #content class="inner">
<div class="inner">
  <DataTable :value="currentOrder"  :columnClasses='text-right' tableStyle="min-width: 5rem" @row-click="">
  <Column field="itemName" header="Nome"></Column>
  <Column field="extraInfo" header="extraInfo"></Column>
  <Column header="Salda Oggetto">
    <template #body="currentOrder">
      <Button :icon="currentOrder.data.paid===true ?  'pi pi-check':'pi pi-times'" :severity="currentOrder.data.paid===true ? 'primary':'danger'" text rounded aria-label="Filter" v-model="currentOrder.associatedOrder" :binary="true" @click="test('cc')" />
      </template>
  </Column>
</DataTable>
</div>
  </template>
</Card>
</div>
</template>

<script lang="js">

  export default  {
    name: 'salda-ordini',
    props: [],
    mounted () {

    },
    data () {
      return {
        currentOrder:"",

      }
    },
    methods: {
test(x){
console.log(x)
}
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .salda-ordini {

  }
</style>
