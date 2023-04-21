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
      <div calass="inner">
<div >
  <InputText type="text" v-model="nomeTavolo" placeholder="Nome Tavolo"/>
</div>
<div >
  <InputText type="text" v-model="extraInfo" placeholder="Extra info"/>
</div>
</div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Save" @click="saveT()" />
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
          bodyModal:"",
          id:"",
      }
    },
    methods: {
      reset() {
      this.nomeTavolo = '';
      this.extraInfo = '';
    },
    saveT(){
      const data = {
        nameId: this.nomeTavolo,
        ordini:true,
        id:Math.floor(Math.random()*100)+1,
        extraInfo: this.extraInfo
      };
        sessionStorage.setItem('tavolo'+data.id,JSON.stringify(data));
    },
    save() {
      const url = 'http://localhost:8080/table';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
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
          this.bodyModal =(error.response.status==404)?'Richiesta non raggiungibile':error.response.data;
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
  width: 60%;
  display: inline;
 
}
.outer{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.inner{

  padding-top: 5px;
  padding-left: 30px;

  align-items: center;

  
}

</style>
