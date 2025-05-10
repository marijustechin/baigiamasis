# Endpoints

/register, /login, /me, /refresh (token), /logout

/users (list, update, delete)

# Geras kontroleris atrodo taip:

1. Asinchroninis (del klaidu apdorojimo ir duomenu gavimo)
2. try/catch blokas (klaidos apdorojamos centralizuotai,
   nesimeto status(500), lengviau derinti)
3. "return" naudojamas TIK TADA, kai reikia anksciau nutraukti vykdyma
4. Paskirtis: gauti uzklausa -> perduoti vykdyma helperiui/servisui -> grazinti atsakyma
5. Pastovi atsakymo forma: {success: true/false, data: atsakymas}
6. next(error): kalaidos turi buti apdorojamos
   centralizuotai (funkcija, klase, middleware) - ne kontrolerio darbas
7. Priima tik "teigiamus" atsakymus - jei klaida ivyko helperyje/servise,
   servisas kviecia klaidu middleware ir nutraukia vykdyma
