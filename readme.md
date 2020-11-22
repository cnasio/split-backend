@ ARASTO:

Min backend är uppdelad i två delar, User och Items.
I appen ska användare ha ett inventory med items,
där man kan se och "trada" items mellan varandra.

Det fungerar att registrera nya users och logga in.
Det använder sig av JWT och har en expiration date.

Under community listas alla users från databasen.
Det går att logga ut via "Log out" i ProfileCard (i LeftBar)
Logouten rensar JWT i LocalStorage.

Inventory och att skapa items buggar/är WIP för tillfället.
Jag har listat buggar/WIP i README på frontend.
Där har jag också listat det jag gjort i varje uppdatering.

=== UPPGIFT 5 ===

> > DONE > > 1. Model
> > Skapa ett schema & modellera hur den skall se ut.
> > Se till att den är kopplad gentemot databasen
> > och använder sig av Mongoose som ORM.

> > DONE > > 2. Controller CRUD – (Create, Read, Update & Delete) & Routes
> > Skapa en Controller och skriv funktioner
> > för att utföra CRUD operationerna.
> > Skapa även en route som anropar dessa funktioner.
> > Prova gärna att anropa dessa funktioner din klient
> > alternativt en REST-klient (ex Insomnia/Postman)

3. Ladda upp dina ändringar till Github

.
.

=== SPLIT BACKEND README ====
