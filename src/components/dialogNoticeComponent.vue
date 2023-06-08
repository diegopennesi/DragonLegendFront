<template lang="html">

<Dialog class="modal" v-model:visible="dialogComponent.isVisible" :header="`${dialogComponent.header}`" :style="{ width: '50vw' }" :position="'top'" :modal="true" :draggable="false" >
  <p>
    {{ dialogComponent.footer }}
  </p>
  <Button icon="pi pi-check" label="Indietro" @click="dialogComponent.isVisible=false" />
  </Dialog>


</template>

<script lang="js">

  export default  {
    name: 'dialog-notice-component',
    props: {dialogComponent:{type:Object,require:true,default: ()=>{
      return {
        header:"",
        footer:"",
        isVisible:false
      }
    }}},
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .dialog-notice-component {

  }
  .modal{
    white-space: pre-line !important;
  }
</style>
