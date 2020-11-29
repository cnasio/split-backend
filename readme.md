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

=== UPPGIFT 6 ===

> > DONE 1. Test
> > Skriv minst ett test till en av dina CRUD metoder i controllern.
> > Du får använda valfri ramverk till att skriva testerna, men jag rekommenderar att man arbetar
> > med Mocha & Chai. Alternativt JEST.

> > DONE 2. Koppla din backend & frontend
> > Gör ett API anrop ifrån ditt React projekt till din backend i Node och visa grafiskt upp någon
> > form av data som medföljer ifrån ditt API. För att kunna utföra dett ordentligt behöver du
> > åtgärda CORS alternativt använda dig av en proxy.
> > Läs mer om CORS här: https://www.npmjs.com/package/cors

3. Deployment på valfri molnbaseradtjänst
   https://www.heroku.com/ är ett bra alternativt att kostnadsfritt göra en deployment av sin applikation.

> > DONE4. Bekanta dig med de juridiska aspekterna innan du deployar
> > General Data Protection Regulation:
> > https://ico.org.uk/media/for-organisations/ guide-to-the-general-data-protection-regulation-gdpr-1-0.pdf
> > Personuppgiftslagen:
> > https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/personuppgiftslag-1998204_sfs-1998-204

5. Ladda upp ändringarna på github

.
.
