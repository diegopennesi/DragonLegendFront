
const config = {
    apiUrl: '',
  };
  
  // Imposta l'ambiente corrente
  const environment = 'prod'; // Puoi impostare questa variabile esternamente al file di configurazione
  
  if (environment === 'dev') {
    config.apiUrl = 'http://localhost:8090/DragonLegendTable'; // URL del server locale di sviluppo
  } else if (environment === 'prod') {
    config.apiUrl = 'http://192.168.1.36:8090/DragonLegendTable'; // URL del server di produzione
  }
  
  export default config;