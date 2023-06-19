<template>
<p>
<Card>
    <template #title>
        Novità
    </template>
    <template #hedaer>
    </template>
    <template #content>
        <div style="display: center; text-align: center; margin-left: auto;">
            18/06/2023<br>

            Bugfix
<li>Risolto bug che forzava a refresh di pagina per inserimento nuovi prodotti.</li>
<li>Risolto bug su inserimento price multiplo su nuovi prodotti</li>
Changes
<li>Modificata logica per campo subchoice: dividere le scelte con carattere ","</li>
<li>Auto caricamento della lista di oggetti cancellati nel pannello di inserimento</li>
Work In Progress
<li>Validazione form attualmente implementata nella adm</li>
<li>W.i.p. stessa modifica altre tabelle</li>
Know Bugs
<li>La finestra della menuClass che specifica che tipo di nuovo oggetto si stà caricando, non viene aggiornata all'eliminazione di ogni record di una categoria (se si eliminano tutti i Dolci, rimarrebbe presente in lista Dolci fino al prossimo refresh di pagina)</li>
</div>
    </template>
    <template #footer>
    </template>
</Card>
</p>
</template>

<script>
export default  {
    name: 'changeLog'}

</script>

<style>
</style>