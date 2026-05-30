# Express Blog - API CRUD (Parte 1)

## Milestone 1: Struttura del Progetto
*   Sposta il file dei dati dei post nella cartella `data`.
*   Creato e organizzare le seguenti cartelle:
    *   `controllers/`: per contenere le logiche delle rotte.
    *   `routers/`: per contenere l'instradatore dei post.

## Milestone 2: Logiche CRUD
Completa le seguenti funzioni di controllo per le operazioni CRUD:
*   **Index**: deve restituire l'intera lista dei post in formato JSON.
    *   *Nota:* Verifica che i codici di stato HTTP restituiti siano corretti.
*   **Show**: deve restituire un singolo post in formato JSON identificato tramite ID.
    *   *Nota:* Verifica che i codici di stato HTTP restituiti siano corretti.
*   **Destroy**: deve eliminare un singolo post dalla lista, previa verifica della sua effettiva esistenza.
    *   *Nota:* Stampa in console la lista dei post aggiornata dopo la rimozione per confermare l'avvenuta eliminazione.

Verificare su **Postman** tutti i casi limite (ID non presenti, valori errati, ID negativi, ecc.).

## Bonus
*   **Filtri di ricerca**: Implementa almeno 2 filtri nella rotta `Index` per consentire la ricerca o il filtraggio dei post in base ai campi disponibili.
*   **Test dei filtri**: Utilizza Postman per verificare la correttezza e l'efficacia dei filtri inseriti.

## Super Bonus
1.  Importa uno dei due middleware seguenti nel file principale `server.js`:
    *   `app.use(express.urlencoded());` (per richieste `application/x-www-form-urlencoded`)
    *   `app.use(express.json());` (per richieste `application/json`)
2.  Modifica la rotta **Create/Store** per leggere i dati contenuti in `req.body` e stamparli nella console del server.
3.  Invia una richiesta di test tramite Postman nel formato configurato.
4.  Restituisci nella risposta del server gli stessi campi inviati nella richiesta (*echo-back*).

### Esempio di Risposta JSON attesa:
```json
{
    "messaggio": "Stai provando a creare dei dati",
    "dati": {
        "title": "...",
        "content": "...",
        "image": "...",
        "tags": ["..."]
    }
}
```

# Express Blog - API CRUD (Parte 2)

Ampliare le funzionalità delle API del blog implementando la creazione (`Store`) e l'aggiornamento (`Update`) dei post, integrando la gestione del body della richiesta, la validazione dei dati e la gestione degli errori.

## Milestone 1: Configurazione e Test della Rotta Store
1. Apri **Postman** e prepara una nuova chiamata verso la rotta `store`.
   * Imposta il verbo HTTP (`POST`) e l'endpoint corretto.
   * Seleziona il tab **Body**, scegli il formato **raw** e seleziona **JSON**.
   * Inserisci nel corpo della richiesta un oggetto JSON che rappresenti un nuovo post.
   * *Nota:* Le immagini possono essere inventate. **Non passare l'ID** nel JSON: sarà il server a generarlo automaticamente.
2. Configura il **body-parser** (middleware `express.json()`) nell'applicazione Express per decifrare il request body.
3. All'interno della rotta `Store`, stampa i dati in arrivo nel terminale (`console.log(req.body)`) e restituiscili al client come risposta JSON.

## Milestone 2: Validazione Backend e Debug
* Testai tutti i possibili casi di errore nei dati inviati dal client (es. campi obbligatori mancanti, formati errati).
* Sistema il codice per correggere eventuali bug o dimenticanze nella validazione.
* *Nota:* La validazione lato backend è fondamentale; è normale che una parte significativa del codice sia dedicata a questo aspetto.

## Milestone 3: Logica di Creazione (Store)
* Implementa la logica per aggiungere effettivamente il nuovo post all'array/database del blog.
* Prepara una risposta HTTP adeguata (es. codice di stato `201 Created` con l'oggetto appena creato).
* Effettua i test di verifica completi utilizzando Postman.

## Milestone 4: Logica di Aggiornamento (Update)
* Ripeti il procedimento per la rotta di `Update` (`PUT` o `PATCH`).
* Implementa la logica per modificare le risorse esistenti tramite il loro ID.
* Gestisci la validazione anche per i dati modificati e testa il funzionamento con Postman.

---

##  Bonus 
Scegli e implementa una delle seguenti funzionalità:

* **Slug al posto di ID:** Gestisci le chiamate di ricerca e aggiornamento dei post tramite lo `slug` (es. `/posts/mio-nuovo-articolo`) invece del classico ID numerico.
* **Soft-Delete:** Implementa l'eliminazione logica dei post tramite un flag. Puoi usare una chiave già esistente oppure aggiungerne una specifica nel modello dati (es. `deleted: true/false`). I post contrassegnati come eliminati non dovranno più apparire nelle normali chiamate di lettura.


