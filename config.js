
const config = {
    apiUrl: '',
  };
  
  // Imposta l'ambiente corrente
  const environment = 'dev'; // Puoi impostare questa variabile esternamente al file di configurazione
  
  if (environment === 'dev') {
    config.apiUrl = 'http://localhost:8080'; // URL del server locale di sviluppo
  } else if (environment === 'prod') {
    config.apiUrl = 'http://192.168.1.200:8080'; // URL del server di produzione
  }
  
  export default config;