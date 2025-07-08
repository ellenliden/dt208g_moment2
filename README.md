# Att göra-lista (Todo-app)

Detta är en enkel och modern att göra-lista byggd med TypeScript, HTML och CSS. Applikationen låter dig lägga till, prioritera, markera och ta bort uppgifter. Den är responsiv och ska fungera lika bra på mobil/tablet som på dator.

## Funktionalitet

- Lägg till nya uppgifter med prioritet (1–3)
- Se en lista över alla dina todos
- Markera uppgifter som klara med en checkmark
- Ta bort klara uppgifter (var och en för sig) med en kryss-knapp
- Alla uppgifter sparas automatiskt i webbläsarens LocalStorage
- Snygg, responsiv och ungdomlig design

## Typescript, HMTL, CSS, LocalStorage, Vite

- **TypeScript** – för typkontroll och tydlig kodstruktur
- **HTML/CSS** – för layout och responsiv design
- **LocalStorage** – för att spara todos mellan sidvisningar
- **Vite** – för snabb utvecklingsserver och enkel build

## Så fungerar lösningen

### TodoList-klassen

All logik för att hantera todos ligger i klassen "TodoList" (i "src/main.ts"). Klassen ansvarar för att:

- Lägga till nya todos (med validering av inmatning)
- Markera todos som klara
- Ta bort specifika todos
- Spara och läsa todos från LocalStorage
- Returnera listan av todos till resten av appen

Klassen hanterar endast data och logik. Ingen kod i klassen ändrar vad som syns på sidan (dvs jag använder ingen DOM-manipulation på klassen).

### DOM-hantering

All kod som ändrar vad som syns på sidan (exempelvis lägger till rader i listan, visar knappar, visar felmeddelanden) ligger utanför klassen, i samma fil. Här:

- Skapas och uppdateras HTML-element dynamiskt
- Kopplas eventlyssnare till formulär och knappar
- Renderas listan om när något ändras

### LocalStorage

Alla todos sparas automatiskt i webbläsarens LocalStorage. Det betyder att dina uppgifter finns kvar även om du stänger ner eller laddar om sidan.

### Responsiv design

Appen är byggd för att fungera och se bra ut på både mobile, tablet och desktop. Layouten anpassar sig automatiskt efter skärmens storlek.

## Så här kör du projektet i utvecklingsmiljö

1. **Installera beroenden**
   npm install

2. **Starta utvecklingsservern**
   npm run dev

3. **Öppna webbläsaren**
   Gå till adressen som visas i terminalen (i mitt fall http://localhost:5173)

## Användning

- Skriv in en uppgift och välj prioritet, klicka på "Lägg till"
- Markera en todo som klar med checkmark-knappen
- Ta bort en klar todo med kryss-knappen
- Alla ändringar sparas automatiskt

## Vidareutveckling

- Möjlighet att redigera uppgifter
- Sortering/filter på prioritet eller status
- Fler teman/färgval

## Publicering

Under utveckling arbetar jag i en separat dev-branch och gör regelbundna commits till GitHub: https://github.com/ellenliden/dt208g_moment2.git. När funktionaliteten är klar och testad slås ändringarna ihop till main-branchen.
Varje gång jag pushar till main publiceras den senaste versionen automatiskt på Netlify: https://dt208g-moment2-elli1807.netlify.app/.
