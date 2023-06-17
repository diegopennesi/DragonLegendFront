<template lang="html">
  <Dialog v-model:visible="modalvisible" :header="`${headerModal}`" :style="{ width: '50vw' }" :position="'top'" :modal="true" :draggable="false">
    <p class="m-0">
       {{bodyModal}}
    </p>
    <Button icon="pi pi-check" label="Indietro" @click="modalvisible=false"  />
</Dialog>
  <div class="outer">
<Card class="card-component">
    <template #header>
    </template>
    <template #title> Apri un tavolo </template>
    <template #content>
      <div calass="inner">
<div >
  <InputText type="text" v-model="nomeTavolo" placeholder="Nome Tavolo" pattern="^\S*$"/>
</div>
<div >
  <InputText type="text" v-model="extraInfo" placeholder="Extra info"/>
</div>
</div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" text rounded aria-label="Filter" label="Save" @click="save()" />
        <Button icon="pi pi-times" text rounded aria-label="Filter" label="Cancel" severity="secondary" style="margin-left: 0.5em" @click="reset()"/>
    </template>
</Card>
</div>
</template>
<script lang="js">
import axios from 'axios';
import config from '/config.js'
  export default  {
    name: 'apritavolo',
    props: [],
    mounted () {
      
    },
    data () {
      return {
        apiUrl: config.apiUrl,
          nomeTavolo:"",
          extraInfo:"",
          modalvisible:false,
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
      console.log(this.nomeTavolo.length)
      if(this.nomeTavolo.length>=1 || !this.nomeTavolo===' '){
      const url = this.apiUrl+'/table';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*', // non serve mi sà eh
        'user': 'SYSADMIN'
      };
      const data = {
        nameId: this.nomeTavolo.trim(),
        extraInfo: this.extraInfo
      };
      console.log(data);
console.log("invio richiesta")
       axios.post(url, data, { headers })
        .then(response => {
          console.log(response);
          this.modalvisible = true;
          this.headerModal = response.status;

          this.bodyModal ="Aperto tavolo con nome:"+response.data.nameId;
        })
        .catch(error => {
          console.log(error.response.status,error.response.data);
          this.modalvisible = true;
          this.headerModal = error.response.status;
          this.bodyModal =(error.response.status==404)?'Richiesta non raggiungibile':error.response.data;
        });
      }
          this.modalvisible = true;
          this.headerModal = "Errore";
          this.bodyModal ="Non è possibile inviare richiesta con nome tavolo vuota"
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
