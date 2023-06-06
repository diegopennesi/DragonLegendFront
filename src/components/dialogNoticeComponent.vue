<template lang="html">

<p>
  {{ dialogComponent.header }} è l'header!
  {{ dialogComponent.footer }} è il footer!!
</p>
</template>

<script lang="js">

  export default  {
    name: 'dialog-notice-component',
    props: {dialogComponent:{type:Object,require:true,default: ()=>{
      return {
        header:"",
        footer:""
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
</style>
