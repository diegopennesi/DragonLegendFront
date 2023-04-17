<template lang="html">
  <Dialog v-model:visible="visible" :header="`${headerModal}`" :style="{ width: '50vw' }" :position="'top'" :modal="true" :draggable="false">
    <p class="m-0">
       {{bodyModal}}
    </p>
</Dialog>
  <div class="outer">
<Card class="card-component">
    <template #header>
    </template>
    <template #title> Apri un tavolo </template>
    <template #content>
<div class="inner">
  <InputText type="text" v-model="nomeTavolo" placeholder="Nome Tavolo"/>
</div>
<div class="inner">
  <InputText type="text" v-model="extraInfo" placeholder="Extra info"/>
</div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Save" @click="save()" />
        <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" @click="reset()"/>
    </template>
</Card>
</div>
</template>
<script lang="js">
import axios from 'axios';
  export default  {
    name: 'apritavolo',
    props: [],
    mounted () {

    },
    data () {
      return {
          nomeTavolo:"",
          extraInfo:"",
          visible:false,
          headerModal:"",
          bodyModal:""
      }
    },
    methods: {
      reset() {
      this.nomeTavolo = '';
      this.extraInfo = '';
    },
    save() {
      const url = 'http://localhost:8080/table';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'user': 'SYSADMIN'
      };
      const data = {
        nameId: this.nomeTavolo,
        extraInfo: this.extraInfo
      };
      console.log(data);
console.log("invio richiesta")
      axios.post(url, data, { headers })
        .then(response => {
          console.log(response);
          this.visible = true;
          this.headerModal = response.status;

          this.bodyModal ="Aperto tavolo con nome:"+response.data.nameId;
        })
        .catch(error => {
          console.log(error.response.status,error.response.data);
          this.visible = true;
          this.headerModal = error.response.status;
          this.bodyModal =error.response.data;
        });
      
    },
    computed: {

    }
  }
}


</script>

<style scoped lang="scss">
.card-component{
  margin-top: 40px;
  border: 10px;
  background-color: rgb(236, 236, 236);
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
  
}

</style>
