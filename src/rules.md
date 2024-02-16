# Viinaharava 0.2

By [niklasluomala](https://github.com/niklasluomala) & [Loimaranta](https://github.com/Loimaranta)

*"Pelkkä nimi ei välttämättä ole paras mahdollinen lähtökohta aloittaa juomapelin suunnittelu."*

Albert Einstein kätellessään Abraham Lincolnia

## Pelivälineet:

Jakaja

n pelaajaa, n kuuluu välille [3, 6]

2 x 52 kortin korttipakkaa

2n noppaa

Omavalintaiset juotavat

## Pelin valmistelu (jakajalle):

Järjestä pakka numerojärjestykseen.

Generoi Viinaharava (alla) ja rakenna pelialue sijoittamalla ruutuja vastaavat kortit pelialueelle kuvapuoli alaspäin. Pelaajat eivät saa katsoa pelialueen kasaamista tasapuolisen kilpailuasetelman säilymiseksi.

Pelaajat selvittävät pelin aloittajan heittämällä noppaa jakajasta alkaen myötäpäivään. Suurimman silmäluvun saanut aloittaa pelin.

Kasattuaan pelialueen jakaja ilmoittaa miinojen lukumäärän sekä pelialueelta löytyvän suurimman yksittäisen ruudun arvon - eli montako miinaa enimmillään yhden ruudun vieressä voi olla tällä pelikerralla.

Kun pelialue on kasattu, pelialueen säännöt kerrattu ja pelin aloittaja selvillä, peli voi alkaa.

## Pelin kulku:

Jakaja pysyy kartalla pelin tilanteesta ja pitää pelaajat ajan tasalla pelin kulusta.

Jokainen pelaaja valitsee vuorollaan yhden (1) kortin. Tämän jälkeen pelaajalla on kolme (3) vaihtoehtoa:

### Kortin kääntäminen

Pelaaja arvaa, onko valittu kortti tyhjä vai yksi pelissä olevista numerokorteista. Pommia ei voi arvata. Tämän jälkeen pelaaja heittää noppaa ja käyttää tämän silmälukua kertoimena. Kortti käännetään ja mikäli arvaus osui oikein, pelaaja jakaa juotavia kortin arvon ja kertoimen tulon verran. Väärin arvatessa juomat tulevat arvaajalle.

### Kortin liputtaminen

Pelaaja voi epäillä kortin olevan pommi ja liputtaa tämän. Kortti liputetaan heittämällä noppaa ja asettamalla se saatu silmäluku ylöspäin liputetun kortin päälle. Kortti kääntyy enää kahdella tavalla:

Toisen pelaajan haastaessa liputuksen

Pelin päättyessä

### Liputetun kortin haastaminen

Pelaaja voi haastaa toisen pelaajan liputtaman kortin. Tällöin jakaja kääntää kortin ja tapahtuu yksi kahdesta asiasta:

Mikäli liputus oli väärä, saa liputuksen haastanut pelaaja jakaa kortin arvon ja kertoimen tulon verran juotavia. Juomat tulevat lisäksi väärin liputtaneelle pelaajalle itselleen.

Mikäli liputus oli oikein, saa liputtanut pelaaja jakaa kortin arvon ja kertoimen tulon verran juotavia. Juomat tulevat lisäksi haaston hävinneelle pelaajalle itselleen.

## Pelin päättyminen

Peli päättyy, kun laudalla on kääntämättä enää yhtä monta korttia, kuin miinoja on jäljellä.

Pelin päättyessä käännetään jäljellä olevat liputetut kortit pelilaudan vasemmasta yläkulmasta lähtien suunnassa oikealle-alas.

Onnistuneesta liputuksesta kortin liputtanut pelaaja saa jakaa kortin arvon ja kertoimen tulon verran juotavia. Väärin arvatessa juomat tulevat liputtajalle.

## Erikoistilanteita

### Pelilaudalla on enää miinoja kääntämättä

Peli katsotaan päättyneeksi sen pelivuoron jälkeen, jonka aikana on tullut ilmeiseksi, että pelialueen kääntämättömät kortit ovat kaikki miinoja. Seuraava pelaajavuoro ei siis ehdi enää alkaa, eivätkä seuraavat pelaajat saa enää helppoja liputuksia.

### Pelilauta on väärin kasattu tai puutteellinen

Mikäli pelilauta todetaan pelaajien toimesta yksimielisesti väärin kasatuksi tai puutteelliseksi, voidaan peli päättää tai pelata loppuun pienellä jännityselementillä.

Pelilaudan ollessa väärin kasattu tai puutteelinen jakaja mitä nöyrimmin inhimillistä virhettään pahoitelkoot ja äärimmäistä tarkkaavaisuutta seuraavaa pelilautaa kasatessa noudattakoot, mikäli pelaajat tämän edelleen jakajaksi kelpuuttavat.

Mikäli epäily pelilaudan kelpoisuudesta osoittautuu aiheettomaksi, tätä epäilleet pelaajat omalla ajallaan miinaharavan säännöt kerratkoot.
