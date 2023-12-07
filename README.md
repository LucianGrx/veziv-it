# veziv-it

Am realizat o mică aplicație web, mai exact un portofoliu pentru un designer grafic care își expune experiența online.

**Instrucțiuni de instalare:**

Clonează acest repository către mașina ta locală.
Navighează în cele două directoare ale proiectului (cd server, cd veziv-it-services).

Rulează npm install pentru a instala toate dependențele.

Pentru a configura conexiunea cu baza de date MySQL, accesează fișierul index.js din directorul (server) și schimbă următoarele detalii:
```
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "password",
  port: "3306",
});
```
După ce ai făcut modificarea, tastează npm start pentru a rula aplicația.

Automat, vor fi generate două tabele în baza de date, una dintre ele fiind populată cu date!

Pentru a rula frontend-ul, utilizează comanda npm run dev în terminal, în folderul veziv-it-services.

Ai pornit aplicația cu succes!

**Rute:**
```
/ - Pagina principală;
/write - Poți crea o experiență nouă în portofoliu;
/post/:id - Poți selecta o experiență pentru a vedea detalii despre proiect, îl poți edita, șterge sau ascunde folosind butonul "hide", aceasta fiind ulterior stocată în baza de date;
/update/:id - Aici editezi datele postării respective.
```

**Detalii:**

Pentru Hide/Unhide, am creat un atribut în baza de date de tip Boolean; dacă este setat pe false, postarea nu este ascunsă, iar dacă este setat pe true, postarea va fi ascunsă.

Pentru stocarea imaginilor, am folosit un serviciu numit Cloudinary pentru a stoca imaginile online și în baza de date preiau doar ruta imaginii.

**Testare:**

Am testat dacă aplicația este complet responsivă pentru toate tipurile de dispozitive.

În cazul unei probleme la server care împiedică funcționarea, pagina nu va afișa erori, ci doar nu va prezenta datele.

Dacă imaginile nu sunt disponibile, aplicația nu va da crash, dar pentru o postare separată, am utilizat un placeholder pentru a afișa altceva în cazul în care există probleme cu serverele Cloudinary.

În cazul în care un utilizator încearcă să acceseze o postare care nu există, va primi un mesaj de eroare 404 personalizat.

Nu vor exista probleme de sincronizare a datelor.

![1](https://i.imgur.com/HIH6dny.png)
