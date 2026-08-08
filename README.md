# La Poule qui vole

Un jeu de course infinie tenant dans un seul fichier HTML. La poule court, saute,
et vole tant qu'il lui reste des plumes. Ouvre `index.html` : rien à installer,
rien à télécharger, aucun réseau.

Il se joue en deux styles : le **trait d'origine** ou le **pixel art**. Le bouton
d'engrenage, à côté du bouton de son, bascule de l'un à l'autre.

## Jouer

| Geste | Effet |
|---|---|
| Appui bref | Petit saut |
| Appui plus long | Saut plus haut, jusqu'au saut entier |
| Appui maintenu | Le saut entier, **puis** le vol tant qu'il reste des plumes |
| `Espace`, `↑`, `W` | Idem au clavier |
| `M` | Couper ou remettre le son |

La poule a **une vie de rattrapage** : au premier choc elle tombe, se relève au bout
d'une demi-seconde et la course repart où elle en était ; au choc suivant, la partie
s'arrête. Un cœur dans le bandeau du haut dit combien il lui en reste, et on peut en
**ramasser d'autres** en vol — voir [La vie de rattrapage](#la-vie-de-rattrapage).

Le saut part toujours à pleine impulsion et se **coupe net au relâchement** : la
hauteur suit donc la durée de l'appui, sans qu'il faille attendre de savoir combien
de temps le doigt va rester. Passé le moment où la pesanteur a ramené la vitesse
sous le plancher — un peu plus d'un dixième de seconde — relâcher ne change plus
rien et le saut est entier.

| Appui | Hauteur |
|---|---|
| relâché aussitôt | 89 |
| 0,04 s | 158 |
| 0,08 s | 200 |
| 0,12 s | 254 |
| 0,20 s et au-delà | 309, le saut entier |

Le plancher est descendu de 1 020 à 820 : l'appui le plus bref donne un saut de 89
au lieu de 140, et il faut tenir deux dixièmes de seconde au lieu d'un peu plus d'un
pour le saut entier. La plage utile est donc bien plus large, et le doigt commande
vraiment la hauteur.

Le vol ne prend la main qu'**au sommet du saut**, pas avant. Il plafonne la montée
à 310 par seconde ; s'il démarrait au premier dixième de seconde, comme c'était le
cas, il écrasait l'élan du saut et on ne voyait jamais sauter la poule, seulement
monter. Maintenir donne donc le saut d'abord — pose de saut, montée pleine — puis
les ailes prennent le relais et la montée continue.

Tous les obstacles restent franchissables d'un appui tenu ; d'un appui bref, seuls
la balle de paille et le seau. Vérifié type par type, en cherchant pour chacun
l'instant de saut qui passe.

Un bouton rond en bas de l'écran donne la même chose : appui court pour sauter,
maintenu pour voler. Sa face est un dessin, pas un cercle CSS — l'ombre passe donc
par un filtre et non par `box-shadow`, pour qu'elle épouse le disque au lieu d'en
cerner le carré. Elle est **douce**, et c'est un changement : le disque porte
maintenant son propre rebord relevé, et l'aplat d'encre qu'il avait dessous lui faisait
un croissant noir qui se lisait comme un défaut. L'ancienne pastille, elle, était un
aplat rouge sans contour à elle, et cette ombre d'encre lui tenait lieu de bord.
L'ombre se rétracte à l'appui, le bouton descend de trois pixels et s'assombrit — il
s'enfonce. Il se pose dans la bande de terre sous le sol, là où le pouce
tombe déjà et où il ne cache rien du terrain, et n'apparaît qu'en course. L'appui
n'importe où sur l'écran continue de marcher — le bouton ne fait que le rendre
visible.

Le dessin est arrivé sans couche alpha, sur du blanc, son ombre douce peinte autour :
même détourage que les obstacles, mais **sans la règle des trous** — la poule du bouton
est une silhouette blanche enfermée dans le disque, exactement ce que cette règle
percerait. L'ombre peinte, elle, part avec le fond, puisque le bouton a la sienne. Le
dessin est ramené à 320 pixels : c'est encore trois fois et demie la taille
d'affichage sur un écran ordinaire.

La pastille est **rouge**, et porte une **flèche** blanche au-dessus du souffle de la
poule : elle dit ce qu'elle fait, là où la silhouette de poule qu'elle portait avant
redisait seulement de qui il s'agit. Ce changement de couleur change aussi le seuil du
détourage : la pastille crème d'avant obligeait à ne prendre pour fond que ce qui
était très clair — au-delà de 238 de luminance — et la queue de l'ombre peinte
restait accrochée sous le disque. Un disque saturé se défend tout seul : c'est la
**saturation** qui le protège, pas la clarté, et le seuil de luminance peut donc
descendre à 130 pour emporter l'ombre entière. La silhouette blanche à l'intérieur
ne risque rien — elle est enfermée, l'inondation partie du bord ne l'atteint pas.
Mesuré sur la plaque : 0,4 % de matière hors du disque inscrit, contre 1,2 % pour
la plaque crème.

La jauge de plumes se vide en vol et se remplit au sol. Gober une mouche rend
deux plumes. Gober plusieurs mouches sans laisser retomber la chaîne monte un
combo : plus elle est longue, plus l'éclat au gobage est fourni et plus le
bruitage monte. Le combo ne paie rien d'autre — c'est le compte de mouches qui
fait le score, et une chaîne rapporte simplement plus de mouches en moins de
temps.

Un **corbeau** traverse le ciel à contre-sens, à hauteur constante : il tire sa hauteur
à la naissance, n'importe où entre le ras du sol et le plafond de vol, et la tient
jusqu'au bord de l'écran. Il a un temps ondulé sur une sinusoïde ; la vague est
retirée. Vérifié sur 73 oiseaux suivis chacun sur 900 pas : pas une unité d'écart
de hauteur, boîte de collision comprise.

*Ce qui suit — l'aigle et le cerf-volant — ne vole plus dans la ferme mais reste dans le
jeu, en attente d'un autre monde. Voir « Les mondes, et l'oiseau de la ferme ».*

Un **cerf-volant** traverse lui aussi le ciel. Il file dans le **même sens que la
poule**, du bas à gauche vers le haut à droite : il avance et il monte. Mais il vole
moins vite qu'elle — 300 contre 500 à 900 — donc **elle le rattrape**. À l'écran il
dérive donc vers l'arrière comme les autres obstacles, mais deux à trois fois plus
lentement, et l'écart se comble sous les yeux du joueur : suivi image par image, il
passe de 893 unités devant la poule à 365 derrière en moins de sept secondes.

Le vent l'ondule au passage. La montée comme l'ondulation se lisent sur sa position et
non sur l'horloge, donc sa boîte de collision les suit exactement.

Le dessin le montre déjà dans ce sens : queue à gauche, losange à droite. Il n'y a donc
rien à retourner. La coupure entre les deux est **relevée sur le dessin** et non écrite
à la main : en partant de la colonne la plus haute, au milieu du losange, et en
remontant vers la gauche, c'est la première colonne où il ne reste plus que la ficelle.
Elle tombe à 49,0 % de la largeur. La boîte de collision est le losange ainsi isolé,
rentré de six pour cent sur chaque côté.

Seul son **corps** tue — la moitié du dessin qui porte la voilure. Une queue de
ficelle n'assomme personne, et elle est de toute façon trop mince pour qu'on lui prête
une hitbox.

Sa queue claque au vent : elle est dessinée en quarante-quatre tranches verticales,
chacune décalée par une onde qui court le long d'elle, d'amplitude croissante vers le
bout. Elle ondule donc au lieu de suivre le corps comme un bloc.

Une tranche simplement décalée laisse une **marche** à la jonction avec la suivante, et
le fil montre autant de petites cassures qu'il y a de tranches — jusqu'à 2,8 unités
d'écart d'une tranche à l'autre. Chaque tranche est donc aussi **cisaillée à la pente
de l'onde** : son bord droit descend exactement sur le décalage de la suivante. La
marche tombe à zéro, exactement, et le fil est continu d'un bout à l'autre. Cisailler
coûte moins cher que multiplier les tranches, et surtout ça marche à n'importe quelle
amplitude — plus de tranches ne fait que réduire la marche, jamais l'annuler.

Il mesure 285 unités de large. Le dessin d'origine en fait 1306 : même agrandi d'une
moitié il reste réduit de 4,6 fois à l'écran, jamais étiré.

Les autres obstacles sont au sol et arrivent d'autant plus vite que la course
dure.

### Ce qu'on croise, et à quelle fréquence

Le tirage n'est pas uniforme, et il ne l'est pas pour une raison qui n'a rien à voir
avec la difficulté : **un champ n'est pas rempli en parts égales**. Il y a des ballots
de paille partout, une barrière par clôture, une fourche ou deux plantées quelque part,
et une seule brouette pour toute la ferme. Les poids disent ce rapport-là et rien
d'autre — la difficulté se règle par la cadence et la vitesse, pas en inondant le champ
de brouettes.

| Objet | Part | Pourquoi |
|---|---|---|
| Ballot de paille | 30 % | C'est *l'*objet du champ |
| Corbeau | 17 % | Le ciel en a toujours un qui tourne |
| Seau | 16 % | Il en traîne toujours un |
| Barrière | 12 % | Une par clôture |
| Pneu | 10 % | Quelques-uns, pour tenir les bâches |
| Pile de ballots | 7 % | Plus rare qu'un ballot seul |
| Fourche | 5 % | On n'en croise pas dix |
| Brouette | 2 % | Une seule pour toute la ferme |

*L'aigle et le cerf-volant tenaient 14 % et 5 % : sortis du tirage de la ferme, leurs
parts se sont redistribuées sur les autres.*

Chaque objet entre dans le tirage à partir d'une certaine distance — le début de la
course reste volontairement pauvre, le temps d'apprendre à sauter. Mesuré sur vingt
parties de quatre mille mètres, 900 obstacles : ce sont les parts ci-dessus.

### Deux règles d'espacement pour le ciel

Deux oiseaux côte à côte ne se lisent plus comme deux obstacles mais comme un mur.

**L'oiseau**, quel qu'il soit : on n'en lance pas un tant que le précédent n'a pas
quitté l'écran par la gauche, plus une marge — mesurée sur son propre canevas, pas sur
celui d'un autre. Il vole à contre-sens, donc il traverse vite et l'attente est courte —
le corbeau garde 15 % du tirage malgré la règle.

**Le cerf-volant** : jamais deux d'affilée, et jamais un second tant que le premier est
en vue. Lui fuit dans le **même sens** que la poule et reste longtemps à l'écran ; deux
de suite, c'est le même obstacle deux fois.

Les deux règles ne rejettent pas le tirage pour le refaire : l'objet interdit est
**retiré du chapeau** avant de tirer, et son poids est redistribué sur les autres. Une
heure de jeu simulée, image par image : pas une seule image avec deux oiseaux à l'écran,
pas une avec deux cerfs-volants, pas un cerf-volant suivi d'un cerf-volant.

## La mouche dorée

De loin en loin, une mouche **dorée** traverse le ciel, seule, sans dérive, à une hauteur
tirée au hasard dans tout le ciel jouable (voir *Une hauteur tirée dans tout le ciel*) :
on doit la voir venir et décider d'aller la chercher. Une
toutes les **38 à 60 secondes**, soit environ soixante-dix sur une heure de jeu : assez
rare pour rester un événement. La gober donne **six secondes de traversée** — les
obstacles ne l'arrêtent plus.

### La barre dit six secondes, le pouvoir en tient six et demie

La barre du HUD se vide en six secondes, mais le pouvoir tient **une demi-seconde de
plus**. C'est une marge, pas un mensonge : celui qui s'engage dans un obstacle en voyant
la barre finir passe quand même. Rater le pouvoir d'un dixième de seconde se lit comme
un bug ; l'avoir une demi-seconde en rab ne se remarque pas. Le clignotement qui
s'emballe, lui, court jusqu'à la vraie fin — c'est **lui** le vrai compte à rebours.

### Une barre qui apparaît, sous une jauge qui ne bouge pas

Les deux barres du coin haut gauche se confondaient : une jauge de vol orange, et juste
en dessous une barre de pouvoir dorée. On ne savait plus laquelle se vidait. Elles ont
été refaites en bloc.

**La jauge de vol est rouge** d'un bout à l'autre. Elle virait au rouge en fin de
réserve, ce qui n'a plus de sens maintenant qu'elle l'est déjà : c'est un **battement**
qui prend le relais. Sous un quart, le rouge s'éclaircit et s'assombrit six fois par
seconde — même nature de signal, urgence croissante, sans emprunter une couleur à une
autre jauge.

**La barre de pouvoir est jaune**, comme la mouche qui la déclenche. Et elle
**n'existe que pendant le pouvoir** : hors traversée il n'y a rien à cet endroit, pas
même une barre vide. Une jauge toujours là se lit comme une ressource du jeu ; une
jauge qui apparaît se lit comme un événement, et c'en est un. Vérifié en comptant les
pixels de sa bande : zéro pixel qui ne soit du ciel quand le pouvoir est éteint.

**Le mot a laissé la place à une étoile.** « TRAVERSÉE » prenait une ligne entière sous
la barre pour dire ce qu'un pictogramme dit d'un coup d'œil. C'est la même étoile que
celles qui tournent au-dessus de la poule assommée — le jeu n'en a qu'une. Elle se cale
à gauche, là où la plume tient la jauge de vol, et la barre se raccourcit d'autant : les
deux gardent ainsi le même bord droit.

L'or reste donc sur la mouche, sur la poule et sur cette barre — là où il sert à
repérer. Le rouge tient le compte de ce qui s'épuise.

Ce n'est pas un autre dessin : c'est la même mouche passée dans une rampe d'or. On
garde la **luminance** du dessin, donc son modelé, ses reflets et son trait, et on ne
remplace que la teinte. L'œil rouge, seul point saturé, passe en clair et fait
l'éclat : sans lui la mouche dorée n'a plus de regard. Elle est fabriquée au démarrage
et refaite à chaque bascule de style, si bien qu'elle suit le trait comme le pixel
**sans peser un octet de plus** dans le fichier.

### La brillance

Une couleur n'attire pas l'œil : c'est le mouvement qui l'attire. La mouche et la poule
portent donc chacune un effet **animé**, en plus de l'or. Plusieurs pistes ont été
dessinées et animées côte à côte pour choisir ; ce sont celles-ci qui ont été retenues,
et les autres — l'étoile de lumière qui bat, le liseré doré, les étincelles qui
tournent autour de la poule — ont été abandonnées.

**Sur la mouche, un halo qui respire et un reflet qui passe.** Le halo est un dégradé
radial dont le rayon et l'opacité battent ensemble : c'est ce qui la fait repérer de
loin, avant qu'on distingue le dessin. Le reflet est une bande claire qui balaie la
mouche, retenue à l'intérieur par `source-atop` — la mécanique d'un reflet sur du
métal, qui épouse la silhouette au lieu de la déborder. Il ne balaie pas en continu :
il passe, puis attend presque une seconde. Une brillance permanente cesse d'être un
événement et redevient une couleur. Les deux rythmes sont volontairement décalés, pour
que ça scintille au lieu de pulser comme une ampoule.

**Sur la poule, le clignotement d'invincibilité des jeux d'arcade.** Elle passe par
éclipses en silhouette pleine, **blanche puis dorée**, dans le même battement. Rien
n'est ajouté autour d'elle : c'est elle qui change d'état, ce qui se lit tout de suite
même quand elle est petite et que le décor est chargé. Le battement occupe un tiers du
cycle, assez pour être franc sans qu'on perde la pose.

La cadence **s'emballe dans la dernière seconde**, de 5,5 à 11 battements par seconde.
C'est ce qui prévient que le pouvoir va s'arrêter, là où un clignotement régulier
dirait seulement qu'il dure.

Deux pièges de performance en passant, tous deux dus au fait que ces effets repeignent
un dessin à chaque image.

Le reflet d'abord : un seul canevas hors écran partagé se **redimensionnait entre la
mouche et la poule**, donc deux réallocations par image — 54 images par seconde au lieu
de 60. Il y a maintenant un canevas par dessin, borné à 256 pixels : la planche de la
poule en fait 920, remplir un dégradé là-dessus soixante fois par seconde ne sert à
rien puisqu'elle est affichée à 157.

Le clignotement ensuite : la fonction de teinte du décor ne garde **qu'une couleur par
dessin**, et le blanc et l'or se chassaient l'un l'autre — la poule était donc
entièrement repeinte à chaque bascule, 44 images par seconde. Les silhouettes sont
maintenant gardées par couple (dessin, couleur), peintes une fois pour toutes, bornées
elles aussi. Les deux bornes laissent les planches pixel intactes.

Mesuré ensuite en conditions réelles : le pouvoir allumé et une mouche dorée à l'écran
coûtent, à la mesure près, **ce que coûtent quatre mouches ordinaires**.

Le pouvoir se lit à trois endroits, et il en faut trois :

| Où | Quoi |
|---|---|
| Sur la mouche | Un halo qui respire, un reflet qui la balaie par intermittence |
| Sur la poule | Elle clignote en blanc et en or ; le rythme double dans la dernière seconde |
| Dans le HUD | Une barre jaune, sous une étoile, qui apparaît le temps du pouvoir |

Deux règles de jeu, pour que ça reste lisible :

- une dorée gobée pendant que le pouvoir dure **repart de la durée pleine**, elle ne
  l'empile pas ;
- elle rend **toutes** les plumes, là où une mouche ordinaire en rend deux.

## Le score

**Le score est la distance multipliée par les mouches.** 500 mètres et 20 mouches
font 10 000, et rien d'autre.

Ce n'est ni l'un ni l'autre pris séparément, et c'est tout l'intérêt : courir loin
sans rien gober ne vaut rien, gober beaucoup sans avancer ne vaut rien non plus. Il
faut les deux à la fois, et un produit le dit d'un seul chiffre là où deux compteurs
côte à côte laisseraient choisir.

Le jeu a compté trois choses différentes au fil du temps — des mètres, puis des
mouches, maintenant leur produit. Les deux premières formules avaient chacune leur
angle mort ; la course pure récompensait celui qui esquive et ignore les mouches, le
compte de mouches récompensait celui qui tourne en rond au même endroit.

Les mètres affichés sont ceux de la barre, arrondis, pour que le compte se vérifie à
l'œil.

### Un respire entre les milliers, pas une coupure

Un nombre à cinq chiffres se lit mal d'un bloc, mais une virgule ou une espace le coupe
en **deux mots** : `1,924,736` et `1 924 736` se lisent comme trois nombres posés côte à
côte. Ce qu'il faut est plus petit que ça — un simple **respire**.

Il n'est confié à **aucun caractère**. Les espaces fines de l'Unicode se sont toutes
révélées inutilisables ici, pour deux raisons. La première est mesurable : dans la fonte
du jeu, l'espace ultrafine (U+200A) ne creuse qu'**un pixel** à la taille du bandeau,
c'est-à-dire rien du tout sur un téléphone — essayée, elle ne se voyait pas. La seconde
est plus grave : les fontes du mode pixel sont des **sous-ensembles**, elles ne
contiennent que les signes dont le jeu se sert, et un signe absent est rendu par ce que
le système veut bien lui donner — parfois une chasse nulle. Un séparateur qui dépend de
la fonte du lecteur n'est pas un séparateur.

Le nombre est donc écrit **par groupes**, et le creux posé à la main :

```
MIL_EM = 0,16        // le creux, en cadratins — un seul réglage
```

`chiffre()` coupe le nombre en groupes de trois. Sur la toile, `txtP()` mesure chaque
groupe, additionne les creux et écrit les groupes un par un — le total sert de point de
départ, si bien que le calage à droite, à gauche ou au centre reste exact. Dans le HTML,
la même marque devient une boîte vide de `.16em`.

Une boîte vide est un élément à part entière, et la ligne **peut** se couper juste avant
ou juste après : vérifié, un score à onze chiffres passait à la ligne sur un écran de
320. Le nombre entier est donc enfermé dans une étiquette insécable. Vérifié à nouveau
sur trois écrans jusqu'à 300 pixels : toujours une seule ligne.

Mesuré sur la toile du vrai jeu, en comptant les colonnes de fond entre les chiffres de
`14 820 m` :

| | creux ordinaire entre deux chiffres | respire des milliers |
| --- | --- | --- |
| trait, 390×844 | 1 à 3 px écran | **9** |
| pixel, 390×844 | 1 à 2 px écran | **11** |
| pixel, 320×568 | 1 px | **8** |

Les deux langues le partagent. L'anglais avait sa virgule, le français son espace fine
insécable ; un nombre se lit maintenant de la même façon partout.

### Le gabarit qui ne remplaçait rien

La place du bloc de droite se réserve sur un **gabarit** où tous les chiffres sont des
zéros : les chiffres de Fredoka n'ont pas la même chasse — le `1` fait 6 pixels quand le
`0` en fait 10 — et une largeur mesurée sur le texte réel changerait à chaque mètre
parcouru.

Le remplacement était écrit `/\\d/` au lieu de `/\d/`, c'est-à-dire « un antislash suivi
d'un d » : il ne remplaçait **rien**, et le gabarit valait le texte lui-même. Mesuré, le
bord gauche du bloc — donc le compte de mouches, et la pastille du festin avec lui —
sautait entre cinq positions étalées sur **15 pixels** selon les chiffres affichés :

| distance | bord droit du compte de mouches |
| --- | --- |
| 11 111 m | 299,6 |
| 88 888 m | 284,6 |
| 99 999 m | 289,6 |
| 70 707 m | 287,6 |

Après correction, la même colonne vaut 284,6 pour les six distances essayées, dans les
deux styles.

### Le score ne s'affiche pas pendant la course

Le HUD ne montre que les deux **facteurs** : les mouches et la distance. Le produit se
lit à la fin, dans le carnet et dans le record. Pendant la course il n'apprend rien
qu'on puisse utiliser, alors que ses deux facteurs disent chacun quoi faire — aller
chercher une mouche, ou tenir encore un peu. On ne décide pas d'un score ; on décide
d'aller chercher une mouche de plus.

### Un bandeau, et tout dedans

Un seul **bandeau crème** d'un bord à l'autre du terrain. **À gauche ce qui se dépense**
— les plumes, les vies, le pouvoir. **Au milieu** la chaîne de mouches, quand elle est
allumée. **À droite ce qui se compte** — les mouches, les mètres, chacun avec son record
dessous, marqué d'une couronne.

```
  🪶 ▬▬▬▬▬▬▬▬▬▬        ╭────╮   │  🪰 12   │   953 m
  ♥ ×2  ⭐ ▬▬▬▭        │ ×12│   │  👑 34   │  👑 2 100 m
                       │FESTIN│
                       ╰────╯
```

Le bandeau a remplacé deux colonnes posées à même le ciel. Il coûte une bande de ciel
en haut ; il rend une lisibilité qu'aucune couleur de texte n'obtenait, parce que **le
fond ne change plus sous les chiffres** au fil de l'heure du jour. Le ciel passe du bleu
au crème puis au mauve, et un chiffre d'encre qui se lisait très bien à midi se battait
contre le décor au crépuscule.

Un filet plus sombre ferme le bandeau en bas. Il n'est pas décoratif : vers le
crépuscule le ciel prend exactement la teinte du bandeau, et sans cette ligne le
bandeau n'aurait plus de bord.

#### Toutes les tailles descendent d'une seule

`u`, la hauteur du bandeau, vaut 15,5 % de la largeur du terrain, plafonnée à 64. Tout
le reste en découle : plume 0,27 u, jauge de vol 0,150 u, barre de pouvoir 0,133 u,
cœur 0,25 u, grands nombres 0,27 u, records 0,147 u, couronne 0,13 u, pastille
0,84 × 0,60 u.

Les deux jauges ont maigri d'un septième par rapport au visuel, qui les donnait à 0,175
et 0,155 : à l'écran elles pesaient plus que ce qu'elles disent. Elles gardent leur
ligne et leur longueur, seule l'épaisseur change. Les fractions sont relevées **au compas
sur le visuel de référence** — une bande de 1 840 sur 285 — si bien que le bandeau garde
ses proportions du téléphone de 360 au bureau.

Vérifié en rejouant le calcul dans le jeu et en comparant, en pourcentage de la largeur
du bandeau :

| | Visuel | Jeu | Écart |
| --- | --- | --- | --- |
| hauteur de la bande | 15,5 % | 15,5 % | 0,0 pt |
| plume, bord gauche | 3,5 % | 3,4 % | −0,1 pt |
| jauge, fin | 39,1 % | 40,1 % | +0,9 pt |
| **pastille, centre** | **51,1 %** | **50,0 %** | −1,1 pt |
| pastille, largeur | 13,0 % | 13,0 % | 0,0 pt |
| premier filet | 63,3 % | 61,5 % | −1,8 pt |
| bloc de droite, largeur | 36,7 % | 38,5 % | +1,8 pt |

L'écart le plus grand est de **1,8 point**. La pastille tombe au milieu exact du
bandeau ; celle du visuel est elle-même un point à droite du milieu.

#### Un seul trait pour tout le bandeau

Le cœur, l'étoile, les couronnes et le contour des jauges sont **tracés en code**, la
plume et la mouche sont des **dessins**. Rien n'obligeait les uns à ressembler aux
autres, et ils n'y ressemblaient pas : quatre épaisseurs différentes sur un même
bandeau.

| | Épaisseur | En parts de la plume |
| --- | --- | --- |
| la plume, mesurée | 0,833 px | 1,0 |
| la mouche, mesurée | 0,667 px | 0,8 |
| le cœur | 2,36 px | **2,8** |
| les jauges | 1,81 px | 2,2 |
| la couronne | 1,64 px | 2,0 |
| l'étoile | 1,45 px | 1,7 |

*(mesures prises quand la plume valait 0,37 u)*

L'épaisseur commune n'est donc pas choisie : c'est celle du trait des dessins posés à
côté, **mesurée à la taille où le bandeau les pose**. À la taille actuelle de la plume,
0,27 u, elle donne 0,667 px pour une hauteur de bandeau de 60,5, soit **0,0110 u** — et
la mouche, mesurée de la même façon, donne exactement la même valeur. Les deux dessins
posés dans le bandeau s'accordent sur ce trait.

Cette valeur **suit la taille de la plume**. Quand la plume est passée de 0,315 à 0,27 u,
son trait est descendu de 0,0138 à 0,0110 u, et tout le reste avec — c'est la
conséquence assumée de la règle : le trait tracé imite le trait dessiné, et le trait
dessiné maigrit quand le dessin rapetisse.

La mesure se fait à six fois la taille réelle puis se divise : à la taille réelle le
trait fait un pixel et une médiane de 1 ne dit plus rien. Vérifié sur quatre largeurs
d'écran, l'écart entre le trait appliqué et la plume mesurée va de 0 à −12 % — c'est le
bruit de quantification de la mesure elle-même, dont la médiane saute de 0,833 à 1,0
entre deux tailles.

#### Ce qui se compte, à droite

Deux cellules, séparées par un filet vertical, chacune avec son grand nombre et, juste
dessous, une **couronne** et le record en gris.

La couronne remplace le mot « record » : elle ne demande pas de traduction, elle tient
en un sixième de `u` là où le mot prenait le double, et c'est déjà le symbole du record
sur le panneau de fin. Les deux lignes sont **calées à droite** l'une sur l'autre, ce
qui donne au bloc son alignement quel que soit le nombre de chiffres.

Les barres de progression vers le record ont disparu avec les colonnes. Elles disaient
« où en es-tu » en occupant une ligne entière ; la couronne et le nombre le disent en
une demi-ligne, et la couleur du grand chiffre dit le reste.

#### La chaîne de mouches : une pastille, et un mot

Au milieu du bandeau, une pastille rouge : le multiplicateur en blanc, le mot **FESTIN**
dessous, et le temps qu'il reste dans une barre au bas de la pastille. Elle rebondit à
chaque mouche gobée. Elle a porté un moment les traits du gobage tout autour ; ils
encombraient plus qu'ils ne disaient, la tache rouge se voit toute seule.

Le mot plutôt qu'un chiffre seul : la chaîne ne compte pas de points — le score se fait
aux mouches et aux mètres — elle dit qu'on est en train d'en enchaîner. C'est un moment,
pas une mesure.

**Ce n'est pas un rectangle, c'est un nuage.** Un rectangle arrondi, plus dix bosses
rondes posées sur son bord et à peine rentrées : elles ne dépassent que de six centièmes
de la hauteur. Le tout est tracé d'un seul trait et rempli en une fois — le remplissage
non nul en fait l'union, comme le nuage de la pierre tombale. Plus saillantes, les bosses
faisaient tourner la pastille à la fleur.

**Pas de contour d'encre** : le rouge plein porte le blanc tout seul, et un cerne
l'aurait rendue à la famille des jauges alors que c'est un événement.

**Sa place lui est gardée même éteinte.** Une jauge de vol qui se raccourcirait au
démarrage d'une chaîne ferait bouger tout le bandeau au pire moment.

#### La mesure se fait sur un gabarit, pas sur le texte

La fonte n'a pas des chiffres de largeur égale : « 1 » est plus étroit que « 8 ». En
mesurant le texte réel à chaque image, la largeur des cellules changeait à chaque mètre
parcouru — et tout le bandeau respirait.

Mesuré à l'époque des colonnes, sur huit secondes de course : **17,3 changements de
corps par seconde**. On mesure donc une chaîne de même longueur où tous les chiffres
sont des zéros ; la largeur ne bouge plus qu'au passage d'un ordre de grandeur — **0,1
par seconde**, soit une fois en huit secondes.

#### La couleur dit l'approche du record

Un signal commun aux deux mesures, en **quatre paliers francs** :

| | |
| --- | --- |
| encre | rien à dire |
| ambre `#E2801F` | le record approche, aux trois quarts |
| rouge `#D6342B` | les dix derniers pour cent, la tension |
| **jaune `#EFAA20`** | **le record est tombé** |

Le rouge marquait autrefois le dépassement, mais il disait « attention » à un moment
où il n'y a plus rien à craindre : battre son record est une bonne nouvelle, elle se
peint en or.

Le jaune est mesuré, pas choisi à l'œil. Il est posé sur le ciel, qui monte à 233 de
clarté le matin, et il doit rester distinct de l'ambre de l'approche. `#F5B93E`
n'avait que 44 d'écart avec le ciel, `#E0A21C` que 19 avec l'ambre ; celui-ci garde
**58 et 29**.

Le dernier palier battait entre l'ambre et le rouge neuf fois par seconde ; sur un
chiffre qu'on surveille en esquivant, un clignotement se lit comme un défaut
d'affichage et non comme une alerte. La couleur seule suffit.

Au tout premier essai il n'y a rien à situer : pas de couronne, pas de record, juste les
deux nombres.

#### En mode pixel, le bandeau est au grain du jeu

Tout ce que le bandeau **trace** — le fond, le cœur, l'étoile, les couronnes, les jauges,
la pastille, le texte — est peint dans le tampon, donc à la grille par construction. Ce
qu'il **pose** vient d'une planche, et une planche n'est au grain que si son nombre de
colonnes égale sa largeur d'affichage divisée par le pas de la grille.

Vérifié, et deux planches ne l'étaient pas :

| Dessin posé | Grain avant | Grain après |
| --- | --- | --- |
| la plume | ×1,12 | ×1,06 |
| **la mouche du bandeau** | **×2,99** | ×1,09 |
| la coupe du trophée | ×1,31 | ×1,13 |

Le cas de la mouche est le plus net : **une seule planche servait au bandeau et au
panneau de fin**, qui la pose à 76 px quand le bandeau ne lui en donne que 27. Taillée
pour le panneau, elle sortait dans le bandeau à trois fois le grain du jeu — la seule
chose de l'écran à avoir des pixels plus fins que ses voisins. Elle a désormais sa propre
planche, `fly_hud`, comme la poule K.-O. a la sienne pour le panneau. En mode trait les
deux clés pointent sur le même dessin, sans un octet de plus.

Le résidu de 6 à 13 % n'est pas un défaut : chaque planche est taillée pour la **plus
grande** de ses utilisations — l'écran le plus large — et se retrouve donc un peu fine
sur un écran plus étroit. C'est la règle du jeu depuis le début.

#### En mode pixel, le texte passe par la grille

Le HUD est peint **dans le tampon**, avant l'agrandissement, donc son texte suivait
déjà la même route que le reste du jeu. Il en ressortait pourtant bien plus fin, et
ce n'était pas une illusion. Mesuré sur le chiffre des mouches et sur l'icône de
mouche posée juste à côté — même taille, même endroit, tout ce qui les sépare est la
façon dont chacun est peint :

| | Teintes | Marche médiane |
| --- | --- | --- |
| le chiffre, avant | **123** | 1 px |
| la planche pixel | 15 | 2 px |
| le chiffre, après | **11** | 2 px |

La différence n'était pas la grille, c'était le **lissage**. `fillText` peint des bords
en dégradé à la résolution du tampon, quand une planche pixel n'a que ses quatorze
teintes et des bords francs.

Le texte s'écrit donc maintenant dans un petit tampon à l'échelle du monde — une
unité de monde, un pixel — dont l'alpha est coupé net pour supprimer le dégradé, puis
agrandi sans lissage. Le chiffre a dès lors exactement le grain du reste. Le coût est
nul à la mesure : 59,5 images par seconde en pixel, contre 59,7 en trait.

Une conséquence à assumer : à cette taille, le mot FESTIN et les records deviennent de
vrais textes en pixel art, lisibles mais rugueux. C'est le prix de la cohérence.


### L'écran de fin dit la formule

Le score en grand, et sous lui, en petit, **« 12 mouches × 1 240 m »**. C'est la seule
façon de faire comprendre d'un coup d'œil qu'il ne sert à rien de courir sans gober
— une règle expliquée nulle part se devine en une partie quand le résultat est écrit
sous le chiffre.

### Plus rien ne s'annonce, sauf un trophée

Le jeu avait trois façons de féliciter en même temps : un bandeau au milieu de
l'écran tous les dix gobages et à chaque record battu, une étiquette flottante qui
montait au-dessus de la poule, et une fanfare pour chacun. Toutes ont disparu.

Ce n'était pas de la générosité, c'était du bruit. Un palier toutes les dix mouches
tombe toutes les dix ou quinze secondes ; une récompense à cette cadence n'est plus
une récompense, c'est un décor qui clignote. Et l'information était déjà à l'écran
en permanence, sans rien couvrir : le grand chiffre dit les mouches, la jauge de
record dit où l'on en est et bascule au rouge en écrivant **RECORD BATTU** dès qu'il
tombe.

Il ne reste donc qu'une seule chose qui s'annonce dans ce jeu, et c'est le bandeau
d'un trophée. Le record garde sa fanfare — un son ne couvre rien.

## Les trophées

Le record dit ce qu'on a fait de mieux, et rien d'autre. Les trophées disent ce
qu'on a fait **une fois** : ils se gagnent une seule fois, restent acquis, et ne
se reperdent pas au bout d'une mauvaise partie. C'est la seule chose du jeu qui
s'accumule au lieu de recommencer à zéro.

Il y en a douze, et ils tiennent en une table de douze lignes — un intitulé, le
nombre gravé sur la coupe, un test. Ajouter ou retirer une ligne suffit, il n'y a
pas de machinerie derrière : les tests portent sur des compteurs que la partie
tient déjà.

| Trophée | Condition |
| --- | --- |
| 10, 50, 100 mouches | gobées dans **une** partie |
| Une mouche dorée | la première de toutes |
| 12 à la chaîne | douze mouches enchaînées sans casser le combo |
| 6 obstacles traversés | passés au travers pendant le pouvoir, dans une partie |
| 18 secondes en l'air | d'un décollage à la pose suivante, pas en cumulé |
| Le crépuscule | atteindre la dernière heure du jour |
| 100, 250, 1000 mouches en tout | tous comptes faits, parties précédentes comprises |
| 50 parties jouées | — |

Les cumuls comptent la partie en cours : sans cela le trophée tomberait sur
l'écran de fin, au moment précis où plus personne ne regarde le jeu.

Le temps passé en l'air se compte d'un décollage à la pose suivante. Le cumul
d'une partie ne dirait rien : tenir dix-huit secondes d'affilée est un exploit,
sauter cinquante fois n'en est pas un.

### L'échelle compte autant que la liste

Un trophée n'est une récompense que s'il est **rare**. La première échelle ne l'était
pas : la dixième et la vingt-cinquième mouche tombaient coup sur coup, et toucher le
plafond du ciel — ce qui arrive au premier vol de la première partie — valait autant
que cent mouches. Deux lignes sont donc parties, les 25 mouches et le plafond, et les
exploits ont été remontés : la chaîne de 8 à 12, les 3 traversées à 6, les 12 secondes
en l'air à 18, les 25 parties à 50.

Le premier repère reste la dixième mouche. Après quoi il ne se passe plus rien avant
la cinquantième.

Et deux cartes ne se suivent jamais. Une carte tient **3,4 secondes**, puis le ciel
reste vide **4 secondes** avant la suivante — jamais moins de 7,4 secondes entre deux.
Enchaînées, deux récompenses n'en font plus qu'une.

Mesuré en jouant une première partie sans rien forcer : deux ou trois bandeaux sur
soixante-dix secondes, espacés de 7,5 et 7,4 secondes. Et rien n'est avalé en
silence — chaque trophée gagné a bien eu sa carte.

### Le bandeau

Une carte crème, la coupe à gauche avec son nombre gravé dessus, l'intitulé à
droite. Elle entre par le bord droit, tient trois secondes
et repart du même côté — jamais par le centre, où elle couvrirait la poule au
moment où l'on a le plus besoin de la voir. Elle se pose sous la jauge de record,
dans le même alignement à droite que tout ce coin-là, et rentre sous le bord de la
bande de jeu : sur un écran large elle n'ira pas flotter dans les marges.

La coupe tient tout entière dans la carte, socle, touffe d'herbe et caillou
compris. Débordante, son ombre au sol passait par-dessus le bord et la carte
n'avait plus de contour franc.

Elle garde de surcroît la **même marge sur les quatre côtés**, 13 % de la hauteur de
la carte. Sa planche est détourée au plus juste — le dessin touche les quatre côtés
de l'image — si bien qu'une coupe posée à la hauteur de la carte venait frotter le
trait du haut. Mesuré sur la capture, dans une colonne au milieu du bol : 18 pixels
d'écran de crème au-dessus de la coupe, soit 10 % de la carte. Le nombre gravé
suit, il se dimensionne sur elle.

#### Moitié moins large, et le titre en moins

La carte occupait 37 % de la largeur de jeu. Elle en occupe **19 %**. À cette taille
elle ne peut plus porter un titre *et* un intitulé, et c'est le titre qui part : la
coupe dorée et la fanfare disent déjà qu'il s'agit d'un trophée, le texte n'a plus
qu'à dire lequel.

L'intitulé lui-même a maigri. Il ne dit plus que l'**unité** — « mouches gobées », « à
la chaîne », « secondes en l'air » — parce que le compte est déjà gravé sur la coupe
et que l'écrire deux fois prenait la moitié de la carte pour rien. Il se replie sur
deux lignes si besoin, et le corps se réduit tant qu'il déborde : l'anglais et le
français n'ont pas la même longueur, et la carte ne doit pas dépendre de la langue.

#### Un bord de sable, pas un trait d'encre

Le trait noir du reste du jeu cerne des **objets**. Ici il cernait un **panneau**, et
un panneau cerclé de noir en plein ciel se lit comme une fenêtre de système posée
par-dessus le jeu. Le bord est donc un sable de la même famille que le crème qu'il
entoure, juste plus sombre.

Combien plus sombre, c'est le ciel qui le dit — et il change d'heure en heure. La
clarté derrière la carte tombe de 235 le matin à **214 au crépuscule**. Six valeurs
ont été posées sur le vrai ciel, aux quatre heures :

| Bord | Écart au ciel le plus sombre | Écart au crème de la carte |
| --- | --- | --- |
| `#DFD1B8` | 4 — disparaît le soir | 34 |
| `#D2C2A4` | 19 | 49 |
| **`#C9B896`** | **29** | **59** |
| `#B9A481` | 48 — redevient un trait | 78 |

`#C9B896` est le plus clair qui tienne encore au crépuscule.

Elle arrive sur du blanc, comme les obstacles, et son détourage suit la même
méthode — est fond ce qui est à la fois très clair et gris, inondé depuis le bord.
Inondé depuis le bord **seulement**, le blanc enfermé dans les anses restait plein :
la coupe avait deux plaques blanches à la place de ses trous, et elles se voyaient
sur le crème de la carte comme sur le ciel. C'est la **règle des trous**, celle que
le bouton de saut interdit justement parce qu'il est une silhouette blanche
enfermée : toute tache de fond que l'inondation n'atteint pas est percée elle
aussi, à condition d'être assez grande. Le seuil ne se devine pas, il se mesure —
trois taches enfermées sur la source, les deux anses à 9 281 et 8 732 pixels, et
une poussière de 6 pixels dans l'herbe. Cent pixels séparent les deux cas d'un
facteur cent.

Deux trophées peuvent tomber dans la même seconde — la dixième mouche et la
centième au total. Ils font la queue et défilent l'un après l'autre : deux
bandeaux superposés ne se liraient ni l'un ni l'autre. Et ils continuent d'être
servis pendant la culbute, pour que celui qui tombe sur la dernière mouche ait le
temps de s'afficher.

L'intitulé se replie sur deux lignes s'il ne tient pas sur une : « Première mouche
dorée » n'y tient pas, et le corps du texte ne doit pas dépendre de la langue.

## La course

Deux poses en boucle : pattes écartées, pattes croisées. La pose croisée n'est pas
le dessin d'origine : elle est le corps de la pose pattes écartées, cousu à ses
propres jambes à la rangée 550, juste au-dessus du ventre. Les deux corps sont
donc **identiques au pixel près** — écart mesuré nul sur tout ce qui est au-dessus
de la couture — et seules les jambes bougent d'une image à l'autre. La rangée est
mesurée et non choisie : le désaccord entre les deux dessins tient sous quatre
cents pixels par tranche de dix rangées jusque-là, et double dès qu'on descend
plus bas, là où les cuisses se séparent. La pose pattes serrées servait de passage
entre les deux, mais elle est aussi la pose d'arrêt, et la garder dans la boucle
donnait une foulée qui marque le pas. Le corps rebondit deux fois par cycle, soit
un rebond par appui et non un par image.

Le cycle se déduit de la liste `COURSE` : y remettre `"idle"` entre les deux
extrêmes suffit à revenir à quatre images, le rebond et la traînée suivent.

La pose qu'on vient de quitter s'attarde derrière l'actuelle et s'efface sur un
tiers de l'image : les pattes gardent une traînée, ce qui donne l'illusion d'une
pose intermédiaire qui n'a jamais été dessinée — c'est elle qui tient lieu de
passage entre les deux extrêmes. La traînée passe **avant**,
l'actuelle par-dessus et opaque — un fondu croisé classique aurait rendu la poule
elle-même translucide pendant l'échange.

Le même principe vaut désormais pour les trois battements d'ailes : celui de la
poule en vol (`VOL`), celui de l'aigle (`AIGLE`) et celui des mouches
(`MOUCHE`). La fonction `cycle()` les traite toutes les trois : elle reçoit une
liste de poses et une avance décimale, pose la précédente en traînée tant qu'on
est dans les premiers `FONDU_BAT` de l'image, puis la courante par-dessus et
opaque.

Pour les battements d'ailes, `TRACE_BAT` est à **zéro** : la traînée est coupée, les
positions se succèdent nettes. Elle estompait l'écart entre deux positions sans le
combler, et il a été décidé de voir sans. La remettre tient à un chiffre — 0,5
rétablit ce qu'elle était. La course, elle, garde la sienne, réglée à part par
`FONDU` et `TRACE`.

Aucun calcul ne peut fabriquer les images manquantes, cela a été mesuré : entre
deux positions d'aile voisines de l'aigle, le recouvrement est de 0,18 et 0,37, et
la meilleure rotation possible — tous centres et tous angles essayés — ne le monte
qu'à 0,21 et 0,38. L'aigle est vu de profil : son aile ne tourne pas dans le plan
de l'image, elle **raccourcit**. Ce n'est pas un solide qui pivote, c'est une forme
qui change, et une silhouette moyenne ne ressemble à aucune aile. La seule chose
qui donne vraiment de la fluidité est d'avoir plus de positions dessinées.

## Le vol

La poule **anticipe** : la fenêtre qui déclenche l'ouverture du bec est bien plus
large devant que derrière — de 115 unités en arrière à 300 en avant — puisque les
mouches arrivent de la droite. Le bec s'ouvre donc avant qu'elle atteigne la proie,
et il s'ouvre aussi quand la mouche passe à côté sans être gobée.

Elle ouvre le bec **sans cesser de battre des ailes** : ce n'est plus la pose de gobage entière qui remplace la pose de vol — elle
figeait l'aile — mais seulement sa **tête**, posée par-dessus la pose en cours.
Le dessin dont elle vient est de la même famille que les trois du vol : même corps,
même aile repliée, seul le bec s'ouvre en grand. Il est posé dans le cadre de vol
crête sur crête, à l'échelle commune 1,1999, puis coupé verticalement à la colonne
où il s'accorde le mieux avec le corps de vol — **0,886 d'accord**, contre 0,43 avec
l'ancien dessin de gobage qui n'était pas de la même série. La coupe n'est pas nette : elle s'ouvre sur
quarante-quatre colonnes. Nette, elle laissait un petit décrochement en haut et en
bas du cou, là où les traits des deux dessins ne retombent pas exactement l'un sur
l'autre.

La couche est enfin retenue à l'intérieur de la silhouette de vol élargie de
trente-quatre pixels, sans quoi le corps débordait du dos — mais **seulement du côté
du corps**, à gauche de la colonne 620. Appliqué jusqu'à la tête, ce masque coupait
le bas du bec grand ouvert, qui sort largement de la silhouette au bec fermé, et on
apercevait l'ancien bec derrière. Il restait enfin un bout du bec fermé visible **au travers de la bouche ouverte** :
la couche de tête ne le couvre pas partout. On relève donc le jaune du bec des trois
poses de vol qui dépasse d'elle — 9 767 pixels une fois élargis — et on comble avec
la couleur du voisinage de la couche elle-même.

### Le plafond s'arrête sous le bandeau

Le plafond de vol se comptait depuis le **haut de l'écran** : soixante-dix unités de
monde, une valeur ronde choisie avant que le bandeau de scores existe. La poule montait
donc **derrière lui**, tête coupée, et on ne voyait plus où elle allait — mesuré, sa
crête dépassait de treize à vingt-sept pixels au-dessus du bord de l'écran, et de
soixante-huit à quatre-vingt-onze au-dessus du bas du bandeau.

Il se compte maintenant depuis le **bas du bandeau**, et il retranche la hauteur de la
poule elle-même :

```
bandU  = min(64, largeur du cadre × 0,155) / échelle    // le bandeau, en unités de monde
flyCeil = min(-320, -(ciel - 99 - bandU - 16))
```

Les 99 unités sont la hauteur de sa tête au-dessus de ses pattes, relevée sur la pose la
plus haute. On ne l'a pas devinée : on espionne les appels à `drawImage` pendant un
`draw()`, on retient celui qui pose la poule, et on mesure l'**encre réelle** de la
planche — l'alpha, pas le cadre — qu'on ramène en pixels écran par la matrice du
contexte. La photo ne pouvait pas servir : le bandeau est peint par-dessus elle, une
différence d'images n'aurait jamais vu le haut de sa tête.

Le tri des poses compte : `CLE` connaît aussi la plume qui s'envole et la mouche du
bandeau, et les deux se sont retrouvées « plus hautes » que la poule dans une première
mesure. Seules les poses de vol, de course, de saut et de becquée sont retenues.

| pose | haut d'encre |
| --- | --- |
| becquée | 2,3 % de la planche |
| course, saut | 3,4 % |
| vol | 5,1 % |

La becquée est plus haute encore, mais elle ne se joue qu'**au sol** : elle ne peut pas
toucher le plafond. C'est donc le saut qui commande.

Le résultat, mesuré sur cinq écrans et dans les deux styles : la crête s'arrête **7 à 15
pixels sous le bandeau**, jamais dessous. Le second terme du `min` garde toujours de
quoi voler, même sur une fenêtre si basse que le bandeau mangerait tout le ciel.

Les oiseaux et le cerf-volant tirent leur hauteur à partir de `flyCeil` : ils
redescendent avec lui, sans une ligne à changer.

### Le bec de dessous, deuxième prise

Ce comblage n'a traité que le **jaune**. Le **trait d'encre** qui le cerne, lui, est
resté : une pique noire pointue au milieu du gosier, à l'endroit où les deux mandibules
se rejoignent. Mesurée : 198 pixels sur `fly_mid`, 242 sur `fly_up`, tous d'encre pure.
À taille de jeu on la prend pour un détail du dessin ; sur l'icône en gros plan elle
saute aux yeux.

Elle est maintenant traitée à la composition et non plus sur la planche. On efface la
**gorge** de la pose de vol avant d'y poser la tête. Le bouchon, c'est la gorge
elle-même — le brun sombre, relevé sur le dessin, aucune autre partie n'a cette
couleur — épaissie de 5,5 % de la largeur pour attraper le contour. Il est confiné à
l'intérieur de la tête : ni la crête ni le corps ne sont touchés, et la crête
volontairement incomplète de la couche continue d'être terminée par celle de dessous.

Le relevé se fait toujours sur la planche **au trait**, même en mode pixel : la
réduction de palette assombrit ce brun et le test de couleur ne le reconnaissait plus.
C'est la même géométrie dans les deux styles, et le bouchon est mis à l'échelle de la
sortie au moment de servir.

La composition se fait **hors écran** — effacer sur le canevas du jeu emporterait le
ciel avec — dans un canevas gardé d'une image à l'autre, refait seulement si la taille
d'affichage change, c'est-à-dire jamais pendant une partie. Le clignotement du pouvoir
se pose alors sur la composition entière plutôt que sur chaque planche, ce qui est de
toute façon plus juste : l'éclipse porte sur toute la poule.

Vérification en deux temps. Sur la composition d'abord : dans la boîte de la bouche,
elle est maintenant **identique au pixel près** à la tête posée sur le ciel seul, 120
pixels de différence avant, zéro après, dans les deux styles.

Puis **sur le jeu lui-même**, parce qu'une composition refaite à la main ne prouve rien
du chemin de rendu réel. On fige une image où la poule vole bec ouvert, on lit le
canevas, on désamorce le bouchon, on refait la même image : la différence est la pique,
et elle est bien là — 18 pixels d'appareil en trait, 3 en pixel. C'est peu, et c'est
exactement ce qu'on voyait : un petit bout de bec noir au coin de la bouche.

Bouton lâché, en chute libre ou en plein saut, la poule n'agite pas les ailes mais
elle ouvre quand même le bec en approchant d'une mouche. Là, **pas de couche du
tout** : le dessin bec ouvert a le même corps, la même aile et les mêmes pattes que
la pose de vol plané — seul le bec change — et on passe simplement d'une image à
l'autre. Il est mis à l'échelle sur le rapport des deux crêtes, 0,532, parce que
c'est un gros plan.

Au sol, la pose de becquée reste entière.

La poule bat **3,25 fois par seconde** : l'avance dans la liste `VOL` est à 13 pour
quatre entrées. Le vol plané suit dans le même rapport.

La jauge de plumes se vide de 0,24 par seconde, soit **4,2 secondes de vol continu**
à jauge pleine, contre 3,2 auparavant.

Il s'en échappe des plumes, mais moins qu'avant : **trois par seconde** en vol tenu, au
lieu de sept. À sept, elles faisaient une traînée continue derrière elle et la perte de
plumes ne se lisait plus comme un événement. Le coup d'aile, lui, garde la sienne : une
plume par battement voulu, puisque c'est le geste qui la paie.

Trois positions d'aile, prises sur trois dessins **faits pour aller ensemble** :
même corps, même queue, même tête, seule l'aile change. Il n'y a donc plus rien à
assembler — pas de corps recousu, pas de fenêtre pour découper l'aile, pas de
greffe. Les dessins sont posés tels quels.

Ils arrivaient sur un blanc chaud avec des traits de vitesse dont le jeu n'a pas
besoin : le fond est reconnu clair et peu coloré, le remplissage part des bords, et
seule la plus grosse composante est gardée — les traits de vitesse restent dehors.
Ils sont ensuite calés sur la **crête**, le plus gros amas de rouge vif du dessin,
seul repère qui ne bouge pas d'une position à l'autre. Chacun calé à son propre
rapport, les échelles tombaient à 1,198, 1,188 et 1,214 : deux pour cent d'écart,
assez pour qu'on voie le corps s'allonger d'une image à l'autre. Les trois partagent
donc **une seule échelle**, la moyenne — 1,1999 — et ne diffèrent plus que par la
position du centre de leur crête.

L'échelle unique ne suffisait pas : à l'intérieur les trois corps se superposaient,
mais le trait du contour variait encore d'un à trois pixels tout autour. Le corps
est donc partagé, par une méthode bien plus courte que celle des anciens dessins,
justement parce que ceux-ci se ressemblent. **Le dessin du milieu sert de corps**, son
aile repliée effacée. Elle est un tracé fermé qui ne coupe pas le contour : c'est
donc une composante d'encre à part, 5 837 pixels quand le contour du corps en pèse
38 392, qu'on isole sans rien lui indiquer. Effacée, le blanc du voisinage comble ;
gardée de côté, elle redevient l'aile de l'image du milieu, posée devant comme les
deux autres. Sans cela elle restait sur le corps commun et venait gêner l'aile
levée, qui passe pourtant au premier plan.

L'aile ne se limite pas à ce qui dépasse du corps : dans le dessin elle passe
**par-dessus**, et cette partie-là manquait — l'aile paraissait rognée à l'endroit
où elle recouvre le corps. Son tracé étant fermé, il suffit de remplir depuis la
partie visible, arrêté par l'encre du dessin, pour récupérer tout son intérieur, y
compris ce qui couvre le corps. Ce tracé n'est cependant pas toujours fermé du côté du corps : laissé libre, le
remplissage s'échappe dans toute la poule et l'image se dédouble. Il est donc borné
à la boîte de la partie visible de l'aile, élargie de soixante-dix pixels — l'aile
ne rentre pas plus loin que cela dans le corps. Elle pèse alors 76 880 pixels en
bas et 37 569 en haut, contre 26 360 et 18 643 quand seule la partie débordante
était prise, et 135 987 et 127 001 quand le remplissage fuyait.

Chaque image ne lui apporte donc que la sienne : ce qui,
chez lui, déborde de ce corps, plus le trait d'aile là où il court dessus, à
condition de tenir au reste de l'aile. On exige en plus que ce trait soit de
l'encre, sans quoi un contour déplacé d'un pixel entrerait aussi. L'aile passe
devant, débordant de trois pixels sous le corps.

Ni couture, ni fenêtre, ni recalage : le corps est le même au pixel près dans les
trois images, et l'aile pèse 26 360 pixels en bas, 18 643 en haut.

Tout ce qui suit — corps assemblé de deux dessins, couture recalée trait par trait,
fenêtres d'aile, traits d'ombre effacés — a été rendu inutile par ces trois
dessins-là. C'est gardé ici parce que la même situation peut se représenter : un
personnage dont les poses ne se correspondent pas.

## Pourquoi pas d'images intermédiaires calculées

La question a été posée d'un effet qui assurerait une continuité parfaite entre
les positions dessinées, sans fondu. Trois pistes ont été mesurées, toutes trois
sur les ailes de la poule :

| Piste | Recouvrement obtenu |
|---|---|
| rotation seule, meilleur centre et meilleur angle | 0,40 |
| translation, rotation et deux échelles, calées sur les moments | 0,44 |
| morphage des silhouettes par distance signée | la forme s'effondre à mi-chemin |

Les deux ailes n'ont ni la même allure ni la même orientation — l'une s'allonge
dans un rapport de 19,6 sur 10,7, l'autre est presque ronde, 15,3 sur 14,7 — et
les trois ailes n'ont **aucun pixel commun** : il n'existe donc même pas de racine
autour de laquelle les faire tourner. Aucune transformation continue ne mène de
l'une à l'autre, et une silhouette moyenne ne ressemble à aucune aile.

Ce qui donne vraiment de la continuité, faute de pouvoir en calculer, c'est d'avoir
plus de positions dessinées : trois au lieu de deux réduit de moitié l'écart d'une
image à la suivante. C'est la voie qui a été prise.

## Les mondes, et l'oiseau de la ferme

Le jeu n'a qu'un monde pour l'instant — **la ferme** — mais il ne le sait plus par
accident. Tout ce qui distingue un monde d'un autre est rassemblé dans une seule table,
`MONDES`, et nulle part ailleurs : ce qu'on y croise, et dans quelle proportion. Un
autre monde n'aura qu'à poser sa propre liste.

Un **oiseau**, dans ce jeu, est un rôle : un obstacle qui traverse le ciel à
contre-sens, qu'on ne peut pas prendre par le dessus, sur lequel rien ne se pose et qui
ne porte pas d'ombre au sol. Chacun apporte son canevas, ses poses, sa cadence de
battement, sa vitesse propre et sa boîte de collision. Le reste du jeu ne demande plus
« est-ce l'aigle ? » mais « est-ce un oiseau ? » — six endroits qui posaient la question
par son nom la posent maintenant par son rôle.

L'oiseau de la ferme est le **corbeau**. L'aigle et le cerf-volant sortent du tirage,
mais rien de ce qui les concerne n'est retiré : planches, vol, ondulation du vent,
boîtes, tout reste là. Ils ne sont simplement pas de ce monde-ci.

### Un monde porte aussi son décor

Les deux plans de fond appartiennent au monde au même titre que la liste des obstacles :
`fond` pour la ligne d'horizon, `plan2` pour le plan intermédiaire, avec ses poids et sa
règle de variation de taille. Le semis, le défilement et le tracé lisent ces tables-là et
non plus les constantes de la ferme. `choisirMonde()` change les tables, oublie le seuil
de sortie — qui se déduit des largeurs — et resème.

Un monde peut n'avoir **aucun** plan intermédiaire : sans garde-fou, le semis tournait
sans fin sur une table vide.

### Choisir son monde

Le panneau des réglages a une troisième section, entre le style et la langue : **le
monde**. Le choix est gardé dans le carnet et rouvre le jeu là où on l'avait laissé ; un
nom inconnu — le carnet d'une version qui connaissait un monde de plus — retombe sur la
ferme au lieu de tout casser. Changer de monde relance une partie neuve : les deux ne
partagent ni le décor ni les obstacles, et les mélanger en pleine course n'aurait aucun
sens.

Un détail écrit en dur a sauté au passage. Les cent soixante-dix premiers mètres ne
lancent que des objets « faciles », le temps d'apprendre à sauter, et cette liste-là était
un couple écrit en clair : `bale` ou `bucket`. La ville lançait donc des ballots de paille
pendant ses cent soixante-dix premiers mètres. Elle se tire maintenant de la liste du
monde, parmi ce qui entre dans le tirage dès le premier mètre.

### La ville : la ligne d'horizon, puis la rue

Le monde **ville** se construit. Son fond est en place — deux silhouettes d'immeubles,
posées et recouvertes exactement comme les massifs de la ferme, même mécanique de chaîne
continue, seuls les dessins changent — ses **cinq obstacles** aussi, et depuis, son plan
intermédiaire : la rue qu'on longe (voir plus bas).

| Objet | Part | Pourquoi |
|---|---|---|
| Banc | 22 % | Il y en a à tous les coins |
| Pigeon | 19 % | L'oiseau des villes |
| Barrière de chantier | 18 % | Une rue barrée, ça se croise |
| Bouche d'incendie | 16 % | Une par pâté de maisons |
| Poubelle | 15 % | Une à chaque coin de rue |
| Journal | 14 % | Porté par le vent |
| Trottinette | 14 % | Laissée en travers du trottoir |
| Cône de chantier | 13 % | Le plus bas de tous |
| Boîte aux lettres | 12 % | Une par quartier |

Mesuré sur vingt parties de quatre mille mètres. Chacun tue, chacun se franchit d'un
simple saut : de 107 unités pour la bouche d'incendie à 132 pour la boîte aux lettres,
quand le saut en monte 321.

Ils flottaient un rien au-dessus du sol. Le creux sous la ligne d'horizon les enfonce
maintenant d'un dixième de leur hauteur — et la **trottinette** et la **boîte aux
lettres** du double : la première n'est posée que sur deux roues, la seconde sur quatre
pieds fins, et une base étroite a besoin d'être plus enfoncée qu'une base large pour se
poser vraiment. La boîte de collision suit le dessin, les hauteurs à franchir ont baissé
d'autant.

### La ferme est beige, la ville est grise

La palette de l'heure appartient au monde, comme le décor et les obstacles. Celle de la
ville n'est pas une autre journée : c'est **la même, décolorée**. Chaque teinte garde
exactement sa **clarté** — le jeu se lit pareil, les dessins à l'encre sombre ressortent
pareil, et l'heure se raconte toujours dans le même ordre, matin, midi, après-midi,
crépuscule — et ne garde que **22 centièmes de sa couleur**.

| | saturation à la ferme | à la ville |
| --- | --- | --- |
| haut du ciel | 22 à 70 | 5 à 15 |
| bas du ciel | 11 à 31 | 2 à 7 |
| les massifs, les immeubles | 10 à 59 | 3 à 13 |
| la terre | 28 à 57 | 6 à 13 |
| le deuxième plan | 6 à 41 | 1 à 9 |

Il reste juste ce qu'il faut de bleu à midi et de chaud l'après-midi pour qu'on sente
l'heure tourner ; le béton fait le reste. Le sol descend en plus de trois centièmes : un
trottoir est plus sombre qu'un champ.

Mesuré sur la scène elle-même — teinte moyenne de l'image, bandeau et boutons exclus, à
quatre moments de la journée : la ferme tient une saturation moyenne de **24,8**, la
ville de **6,0**, soit **un quart** de la couleur de la ferme.

### Ce qui reste de la ferme, et ce qui part

Trois choses ne se transposaient pas, et appartiennent maintenant au monde.

**L'herbe et les cailloux.** Ce sont ceux d'un champ ; un trottoir n'a ni touffes ni
gravier. Le premier plan appartient donc au monde lui aussi — la ville a depuis reçu les
siens, quatre fissures et un papier froissé, décrits plus bas.

**Le bandeau du haut.** Il était crème comme la ferme. Celui de la ville est gris — mais
à la **même clarté**, si bien que le contraste avec la scène ne bouge pas. Mesuré, écart
de clarté entre le bandeau et les vingt lignes de ciel juste dessous, aux quatre moments
de la journée : **−44,2 à la ferme, −43,8 à la ville**. Moins d'un pour cent d'écart, ce
qui est exactement le but : la même lecture, une autre couleur.

**Le recouvrement des silhouettes du fond.** Les massifs de la ferme se recouvrent
largement, et c'est voulu : c'est ce chevauchement qui fait une chaîne de crêtes continue
plutôt qu'un chapelet de buttes. Les immeubles, eux, se **posent bout à bout** en
alternant les deux dessins : un pâté de maisons est une suite de façades, pas un massif
derrière un autre — superposés, on ne lisait plus qu'une bouillie de tours. Il ne reste
qu'une soudure, juste de quoi éviter une fente de ciel entre deux bases.

| | recouvrement moyen | en part de la plus étroite |
| --- | --- | --- |
| la ferme | 468 unités | 42,6 % |
| la ville | **14 unités** | **1,3 %** |

Vérifié aussi qu'aucune fente ne s'ouvre : sur dix minutes de course dans la ville, pas
un trou dans la ligne de crête, pas une silhouette recyclée à vue.

### Trois choses que ces dessins-là avaient en plus

Les cinq obstacles de la ville ne se détourent pas comme ceux de la ferme.

**Une ombre portée.** Un gris clair posé sur le papier. À la clarté où s'arrêtait le fond
de la ferme — 228 — l'ombre passait pour de l'encre et l'objet arrivait avec une flaque
grise sous lui. Le seuil descend à 190 : le papier est à 237 et plus, l'ombre à 198-206,
et l'objet n'a rien entre les deux. Ses parties très claires — les pieds blancs de la
barrière, l'enveloppe de la boîte — sont **enfermées** par le trait d'encre : l'inondation
venue du bord ne les atteint pas, elles restent.

**Des cailloux et des touffes d'herbe** autour d'eux, dont le jeu ne veut pas — il pose sa
propre ombre et son propre sol. On ne garde que la plus grosse tache d'encre : l'objet.
Cinquante-six taches jetées sur la barrière, trente-deux sur la bouche d'incendie.

**Des vides à percer et des réserves à garder**, et les deux font la même taille. Le ciel
doit passer entre les deux lisses de la barrière et entre les lattes du banc ; l'enveloppe
de la boîte doit rester blanche. Ça ne se décide pas à la surface — 5,2 % pour le vide de
la barrière, 2 % pour l'enveloppe — mais à la **couleur** : un vide, c'est le papier qu'on
voit au travers, il en a exactement la teinte ; une réserve dessinée est un blanc, plus
clair et plus froid. Mesuré, distance au papier :

| | distance au papier |
| --- | --- |
| les vrais vides — lattes du banc, lisses de la barrière | 3 à 5 |
| l'enveloppe de la boîte aux lettres | 9 |
| les pieds blancs de la barrière | 36 |
| les reflets de la trottinette et de la borne | 18 à 100 |

Le seuil est posé à 8, entre les vides et l'enveloppe.

Les planches sont enfin ramenées sous 640 pixels. Elles s'affichent autour de 75 pixels
CSS, soit 227 cases de grille : à 640 le dessin reste deux fois et demie plus fin que la
grille — ce qu'il faut pour que le contour tombe au pixel près, comme on vient de
l'apprendre — et le fichier ne porte pas quatre mégaoctets pour rien.

Leurs **fenêtres sont percées**, et c'est ce qui fait la ville. Le fond est repeint en
aplat à la couleur de l'heure : une fenêtre laissée pleine disparaîtrait dans la masse,
percée elle laisse passer le ciel — ce que fait une ville lointaine au crépuscule. 83
fenêtres percées sur la première silhouette, 41 sur la seconde. C'est la règle des trous
dans son sens normal, à l'inverse de la poule et du corbeau, où percer aurait rendu l'une
creuse et l'autre borgne.

La sonde qui mesure la taille des pixels visite maintenant **tous les mondes**, joués ou
non : leurs planches vivent dans le même fichier et partagent la même grille. C'est elle
qui a donné aux deux silhouettes leur taille d'affichage, 530×312 et 649×273.

### Un dessin qui n'est pas posé sur le sol, mais dedans

La ville a reçu de quoi habiller son trottoir : quatre **fissures** et un **papier
froissé**, à la place de l'herbe et des cailloux du champ.

Les quatre fissures ne sont pas des objets posés sur le sol. Chacune est dessinée **avec
le bout de trottoir qu'elle traverse** : une longue ligne de sol, et la fente qui en part.

Chaque détail du sol porte donc un **ancrage** : la hauteur, dans le dessin, du point qui
se pose à la profondeur tirée. Par défaut c'est le bas, et c'est ce que veut une touffe
d'herbe — elle pousse, son pied touche le sol et sa pointe monte au-dessus de la ligne.

**Rien de ce qui habille le trottoir ne passe au-dessus de la ligne**, et c'est l'inverse.
Une fente et un papier sont à plat ; un trottoir s'étend vers nous, pas vers le ciel. Leur
ancrage est donc **zéro — le bord haut du dessin** : ce bord se pose à la profondeur tirée
et tout le reste tombe plus bas.

| dessin | planche | ce qu'on voit |
| --- | --- | --- |
| `ville_sol0` | 336×92 | une étoile de fentes autour de son joint |
| `ville_sol1` | 495×126 | une fente qui remonte, deux qui descendent |
| `ville_sol2` | 660×89 | le joint en haut, deux longues fentes dessous |
| `ville_sol3` | 1025×161 | une seule fente, qui file vers l'horizon |
| `ville_papier` | 226×144 | à plat, jamais dans le ciel |

L'essai précédent les calait par **le joint qu'elles portent**, mesuré sur chaque dessin —
au tiers de la hauteur pour l'une, tout en haut pour une autre, à 95 % du haut pour celle
dont la fente monte. Le joint tombait bien où il fallait, mais chaque dessin remontait
alors de tout ce qu'il a **au-dessus** de son joint : 47 unités pour la fente qui monte, 38
pour le papier. Les fissures partaient dans le ciel.

**Une seule échelle pour les quatre fissures**, 0,31 unité par pixel de dessin, et elle
n'est pas choisie au jugé : le trait de crayon mesure de 5 à 8 pixels selon la planche, et
0,31 le ramène sur les **2 unités de la ligne d'horizon du jeu**. Les cinq dessins gardent
ainsi entre eux les rapports de taille qu'ils ont sur le papier, et leur trait pèse le même
poids d'encre que celui du sol.

### Sur la ligne, ou dans la bande qui est dessous

Premier essai : les fissures collées à la ligne d'horizon, au motif qu'une fente est
*dans* le trottoir et pas ailleurs. C'était le mauvais raisonnement. La bande qui compte
n'est pas la ligne, c'est **le sol qui s'étend en dessous** — c'est là que vivaient les
touffes et les cailloux, et c'est là que doivent vivre les marques qui les remplacent.

Les cinq dessins prennent donc le **même enfoncement que le champ**, celui à trois
paliers : le plus souvent 7 à 20 unités sous la ligne, une fois sur trois 21 à 35, une fois
sur sept 36 à 47, tout devant. Une fissure posée plus bas est une fissure plus proche de
nous, exactement comme une touffe posée plus bas. Et le bout de trottoir que chaque dessin
porte avec lui ne fait plus doublon avec la ligne d'horizon : trente unités plus bas, il se
lit pour ce qu'il est, le joint d'une dalle.

Relevé sur quatre mille détails de chaque monde, où vit l'encre — positif = sous la ligne :

| | haut du dessin | bas du dessin |
| --- | --- | --- |
| la ferme | de **−9,0** à +24,0 (médiane +2,2) | de +7,9 à +45,0 |
| la ville | de **+7,0** à +42,4 (médiane +17,3) | de +35,0 à +82,4 |

Le champ passe au-dessus de la ligne et c'est ce qu'on lui demande : une touffe pousse. La
ville n'y passe jamais — son détail le plus haut s'arrête sept unités sous la ligne.

**Le trottoir reste plat.** L'amplitude du relief était devenue une propriété du monde —
1 pour le champ, 0 pour la rue — d'abord pour une raison qui n'a plus cours : tant que les
planches se calaient *sur* la ligne, une planche droite posée sur une ligne qui ondule s'en
écartait aux deux bouts d'à peu près une largeur de trait, et la marche se voyait. Les
planches n'y sont plus, la raison est tombée, mais le réglage est resté après comparaison
des deux : avec l'ondulation du champ, la rue redevient un pré — c'est la ligne droite qui
fait le béton. L'irrégularité vient maintenant des dessins, qui sont tremblés à la main.

**Vérifié avec un témoin, parce que trois sondes de suite avaient menti.** C'était du temps
où les planches se posaient *sur* la ligne, et il fallait alors prouver que le raccord ne
faisait pas de marche ; la leçon, elle, ne dépend pas de cet état-là. La première
lisait une bande de canevas calculée à partir de `groundY` sans le facteur d'échelle ; la
deuxième cherchait « la rangée la plus chargée en encre » et tombait sur la **barre de vie
du bandeau**, qui traverse aussi tout l'écran ; la troisième divisait par un `dpr` codé en
dur à 3 alors que la page tourne à 2,5 au trait. Les trois annonçaient un décalage de
0,00 unité — c'est-à-dire rien du tout, ce qui était exactement le résultat espéré. C'est
le témoin qui les a démasquées : on refait la mesure avec les ancrages **volontairement
faux de quatre unités**, et si le chiffre ne bouge pas, ce n'est pas la couture qui est
parfaite, c'est la sonde qui est aveugle. Une fois corrigée, la comparaison est visible à
l'œil au zoom : ancrage juste, la ligne du dessin recouvre celle du jeu sans une marche ;
ancrage +4, elle passe quatre unités au-dessus et laisse voir celle du jeu en dessous.

**Le détourage n'est pas celui des obstacles.** Deux natures de dessin, deux recettes :

- les fissures sont du **trait**. Rien n'est plein, tout est enfermé par le fond : on perce
  tout ce que l'inondation venue du bord n'atteint pas, comme pour les fenêtres des
  immeubles. On ne garde pas non plus « la plus grosse tache » — une fissure a des éclats
  détachés, et ce sont eux qui la font vivre. Le seuil de poussière descend à 10 pixels ;
  le retrait tombe à **zéro**, parce qu'un trait de quatre pixels de large ne survivrait
  pas aux deux qu'on enlève ailleurs pour manger le halo de compression d'un aplat.
- le papier est une **surface**. Son intérieur presque blanc est voulu — une feuille claire
  sur un trottoir gris — et on ne perce donc rien.

Dans les deux cas l'encre est **désaturée** comme le reste de la ville : le crayon tire sur
le beige, et ces planches-là ne servent qu'à un monde gris. Même règle que la palette des
heures — on garde la clarté, on ne garde que 22 % du chroma.

**Le recyclage se compte enfin par le bord droit.** Tant qu'un détail faisait quarante
unités, la marge de soixante suffisait ; une fissure de trois cent dix-huit disparaissait
en plein écran. La chaîne se mesure aussi de bord à bord pour replanter, sinon deux
dessins se seraient recouverts. Vérifié sur dix minutes de course dans chaque monde :

| | détails replantés | disparu à vue | recouvrements | plus grand vide |
| --- | --- | --- | --- | --- |
| la ferme | 3 429 | 0 | 0 | 458 unités |
| la ville | 1 032 | 0 | 0 | 491 unités |

Ce dernier chiffre a demandé un réglage. Les écarts de la ville sont plus larges que ceux
du champ — ses marques le sont aussi — mais son vide franc laissait **788 unités de
trottoir nu pour un écran de 800**. Le champ garde son ondulation et ses touffes, son vide
de 458 ne se voit pas ; la rue n'a plus ni herbe, ni caillou, ni relief, et un écran entier
sans une seule marque ne défile plus, il glisse. Le vide franc a donc été raccourci
jusqu'à ce que les deux mondes se tiennent.

Enfin la nature du détail suivant appartient elle aussi au monde : le champ **alterne
strictement** herbe et caillou — tirée au hasard, la nature faisait des plages de trois ou
quatre touffes d'affilée et l'alternance ne se lisait plus — tandis que la rue glisse un
papier **une fois sur cinq** entre ses fissures. Mesuré sur mille détails, le papier sort à
17,6 % et chaque fissure entre 19,9 et 21,1 %.

### La rue qu'on longe

Le plan intermédiaire de la ville — celui qui défile au tiers de la vitesse — était resté
vide. Il a maintenant sept silhouettes : quatre immeubles, un réverbère, une voiture, une
benne. Même mécanique que la campagne, silhouettes pleines dont le jeu ne garde que la
découpe pour les repeindre à la couleur de l'heure.

**Deux feuilles, deux échelles, un seul repère pour les relier.** Les quatre immeubles ont
été tracés sur la même feuille : ils gardent entre eux les hauteurs de leurs dessins, et
c'est ce rapport qui fait une rue plutôt qu'un alignement. Le réverbère, la voiture et la
benne viennent d'une autre feuille, et leur échelle ne se déduit donc pas de la première.
Elle se pose sur le seul repère qui vaille entre les deux : un immeuble de cinq étages fait
une quinzaine de mètres, un lampadaire de rue en fait huit. Les trois gardent ensuite entre
eux les rapports de leur propre feuille.

| | hauteur | poids | part mesurée |
| --- | --- | --- | --- |
| `ville_imm0` … `ville_imm3` | 565, 624, 406, 388 | 9 chacun | 12 à 17 % |
| `ville_lampe` | 333 | 22 | **27 %** |
| `ville_auto` | 147 | 5 | 9 % |
| `ville_benne` | 139 | 3 | 6 % |

Le **lampadaire** est de loin le plus fréquent, et c'est voulu : dans une rue il en passe
un tous les vingt mètres, plus souvent qu'aucune façade en particulier.

Les immeubles dépassent la ligne de crête lointaine, qui plafonne à 640 : c'est ce qui les
met **devant** elle. Et l'écart entre deux silhouettes est devenu une propriété du monde —
la campagne laisse respirer ses arbres (85 à 369 unités), la rue les siennes un peu moins
(95 à 360). Il en reste assez pour que le fond se voie par les interstices ; sans un seul
trou, les immeubles proches le cacheraient tout entier. Mesuré, la part de largeur d'écran
couverte par ce plan : **64 % à la ferme, 67 % à la ville**.

**Les silhouettes sont aplaties à un gris unique.** Le jeu ne lit que leur alpha, donc leur
intérieur n'a aucune raison de transporter le grain du papier ni le bruit du JPEG.

**Les trous sont percés**, comme les fenêtres du fond : l'escalier de secours, les pieds du
château d'eau, la boucle du réverbère. Le plan est peint en aplat ; un vide non percé
disparaîtrait dans la masse. 19 trous sur le grand immeuble, 1 sur le réverbère.

### Un passage par le relief, et le retour à l'aplat

Les quatre immeubles ont porté un temps **leur relief** : quatre autres dessins, avec
fenêtres, corniches, rideau de fer, château d'eau et escalier de secours. Le second plan se
peignant en aplat, il avait fallu tout un mécanisme — la clarté de chaque dessin rangée sur
une rampe, le jeu multipliant cette rampe par une couleur tirée de l'heure, et un plafond
réglé à 1,15 fois la couleur du plan pour que la fenêtre la plus claire reste sous la crête
lointaine aux quatre heures du jour.

C'est revenu à l'aplat : des silhouettes pleines se lisent mieux à cette distance, et un
second plan n'a pas à retenir l'œil. Le dégradé, sa rampe et son plafond mesuré sont partis
avec. Ce qui reste de ce passage, c'est la **dalle** — les immeubles de cette série-là en
portaient une, ceux d'aujourd'hui aussi — et le trottoir qu'elle a fait naître.

### Le second plan recule, le fond avance

Deux réglages en sens contraire, pour creuser la profondeur.

**Le second plan a reculé d'un tiers.** Tout y est réduit dans le même rapport — les
immeubles, mais aussi le réverbère, la voiture et la benne. N'avoir réduit que le bâti
aurait donné un lampadaire aux trois quarts de la hauteur d'un immeuble de trois étages.

| | avant | après |
| --- | --- | --- |
| les quatre immeubles | 807, 891, 580, 554 | **565, 624, 406, 388** |
| réverbère | 475 | **333** |
| voiture, benne | 210, 198 | **147, 139** |

**La ligne de crête lointaine a grandi d'un quart** : 640 → 800, 560 → 700, 494 → 618. Elle
domine maintenant le bâti proche, ce qui donne une grande ville au loin et une rue basse
devant.

**Et elle a été retaillée deux fois plus fine.** Sa source n'a que six cents rangées ;
affichée plus grande, chaque marche d'escalier de son contour se serait vue. Un
agrandissement d'image ne peut rien inventer — mais ici on n'agrandit pas une image, on
**rééchantillonne une forme**. La distance au bord est une grandeur continue, connue en
tout point : on la lit *entre* les pixels de la source, à la maille deux fois plus fine, et
le contour qui en sort est exact au demi-pixel près. Ce n'est pas du flou ajouté, c'est le
même bord décrit deux fois mieux. La pente du seuil suit l'échelle, sans quoi
l'adoucissement du bord vaudrait deux pixels au lieu d'un et la silhouette paraîtrait molle.

| | avant | après |
| --- | --- | --- |
| `ville_fond0` | 1013×596, 22 Ko | **2024×1191, 70 Ko** |
| `ville_fond1` | 1099×462, 20 Ko | **2196×922, 64 Ko** |
| `ville_fond2` | 1082×432, 19 Ko | **2162×862, 61 Ko** |

### Les trois sols, remis dans l'ordre

Trois plans, trois lignes de sol, et elles doivent se ranger du plus lointain — le plus
**haut** à l'écran — au plus proche. C'était faux : la ligne de crête était posée au ras de
l'horizon, donc *sous* le trottoir du second plan. Le sol le plus lointain passait sous le
sol le plus proche, et la profondeur disait le contraire de ce qu'il fallait.

La crête a donc été **remontée de 76 unités**. Une silhouette remontée laisse sous elle une
bande de ciel, entre son pied et l'horizon : on la comble d'un **aplat de la couleur du
fond**, sur toute la largeur, du pied de la crête jusqu'au sol. C'est le sol lointain, et il
n'a rien d'autre à montrer. La bande descend jusqu'à l'horizon même si le trottoir et le sol
la recouvrent ensuite — mieux vaut peindre trente unités de trop que d'en oublier une.

| | pied de la crête | haut du trottoir | pied du mobilier | sol |
| --- | --- | --- | --- | --- |
| la ville | **−73** | **−24** | **−16** | 0 |
| la ferme | +3 | +8 | +16 | 0 |

La ville descend maintenant du plus lointain au plus proche. La ferme, elle, n'a ni
trottoir ni levée : ses trois plans se rejoignent au ras de l'horizon, et c'est ce qu'on
demande à un champ.

### Le trottoir, lu sur les dessins

Les quatre immeubles sont dessinés **posés sur une dalle** : une bande horizontale qui court
sur toute leur largeur, en bas. Chacun apportait donc son bout de trottoir, et le
réverbère, la voiture et la benne se tenaient à côté, plus bas, dans le vide.

La dalle est **mesurée sur les quatre planches** — la bande du bas dont l'encre couvre
toute la largeur — et non choisie : **25,9 / 28,7 / 37,1 / 35,0 unités**, soit **32** en
moyenne. Les quatre ne s'accordent pas au pixel près, mais cinq unités d'écart valent deux
pixels d'écran à cette échelle. Sa couleur ne se mesure pas : les silhouettes étant peintes
en aplat, la dalle est exactement la couleur du second plan.

La bande est peinte **avant** les silhouettes, d'un bord à l'autre : les immeubles posent
leur propre dalle par-dessus, du même ton, et la rue est continue. Ce qui n'a pas de dalle
— réverbère, voiture, benne — monte alors de l'épaisseur du trottoir au lieu de flotter à
côté. Le champ, lui, a un trottoir de zéro.

**Et ce qui se tient sur le trottoir y entre un peu.** Posé pile sur la dalle, un réverbère
flotte : son pied est une coupe nette, rien ne le retient. Les obstacles du premier plan
ont ce creux depuis longtemps ; le second plan en manquait. Il vaut **8 unités** — un quart
de l'épaisseur du trottoir — et c'est le même nombre d'unités pour les trois, non la même
part de leur hauteur : ils se tiennent sur la *même* dalle, et une dalle recouvre le bas de
ce qui s'y plante sans regarder sa taille. La benne l'a reçu comme les deux autres, pour la
même raison.

Le seuil de cette mesure a demandé deux corrections : à 88 % de couverture il avalait aussi
le corps de l'atelier, qui est large et bas ; et il faut partir de la première rangée
pleine et non du bord de la planche, la dernière rangée d'une planche redimensionnée étant
un bord adouci qui ne couvre rien.

### Le banc, la boîte aux lettres et la trottinette, redessinés

Trois nouveaux dessins sur une seule feuille, à la place des précédents. Ce sont des
obstacles et non des silhouettes : ils gardent leurs couleurs. Leurs proportions ont à
peine bougé — le banc passe de 248 à 246 unités de large, la boîte de 136 à 130, la
trottinette de 181 à 180 — et les hauteurs ne changent pas, donc la difficulté non plus.

**Deux choses à séparer dans ces dessins, et les deux se règlent à la couleur.**

*L'ombre portée.* Chaque objet en traîne une, et le jeu pose la sienne. Le seuil ordinaire
ne l'emporte pas : son cœur descend à 205 de clarté, sous le seuil du papier, et elle
**touche** l'objet — elle entre donc dans le même amas et le découpage la garde. On élargit
l'inondation : elle avance aussi dans ce qui est clair et peu saturé, ce qu'est une ombre
grise sur du papier crème, et ce que ne sont ni le bleu de la boîte, ni le bois du banc, ni
le vert de la trottinette. Venant du bord, elle mange l'ombre par l'extérieur et s'arrête
au contour noir.

*Le blanc peint.* Premier essai, on perçait tout vide enfermé par le contour — et
l'enveloppe blanche de la boîte aux lettres a disparu avec les fentes entre les lattes du
banc. Les deux sont du fond enfermé. Deuxième essai, on les a séparés à la couleur : un
vide, c'est le papier ; un blanc peint, c'est du blanc, plus clair et moins chaud. Ça a
marché pour quatre fentes sur six.

**Les deux qui restaient étaient les plus étroites**, entre les lattes du dossier, et la
mesure dit pourquoi. Chaque objet est dessiné avec un **liseré blanc** autour de son
contour noir ; une fente de dix pixels de haut est faite pour moitié de ce liseré, si bien
que sa couleur moyenne est celle du liseré et non du papier.

| | forme | écart au papier | cœur, bord rogné |
| --- | --- | --- | --- |
| fentes larges du banc | 1,4 à 8,3 | 4 à 6 | 3 à 4 |
| **fente 267×10** | **26,7** | **9** | 5 |
| **fente 216×14** | **15,4** | **13** | 10 |
| enveloppe de la boîte | 1,2 | 11 | 9 |

Aucun seuil ne pouvait séparer 9 et 13 de 11. Rogner la tache de son bord pour n'en garder
que le cœur n'y suffisait pas non plus — 5 et 10 contre 9. Ce qui les sépare vraiment,
c'est qu'une fente entre deux lattes parallèles est une **bande** quand une enveloppe est
compacte. On perce donc aussi ce qui est six fois plus long que large. La contrepartie est
connue et assumée : le jour où un objet portera une rayure blanche peinte, il faudra la
nommer.

### La jungle : sa couleur d'abord

Le troisième monde commence par sa palette, avant même que son décor existe. C'est le seul
morceau qui ne dépende d'aucun dessin : le jeu range ses couleurs par **plans** — haut du
ciel, bas du ciel, ligne de crête, second plan, terre — et ces cinq-là se déduisent d'une
image de référence sans qu'aucune planche soit découpée.

Relevée sur le dessin fourni, la jungle est **verte mais très peu saturée** — 13 à 23 —
une jungle de brume et non d'émeraude :

| plan | relevé sur l'image | clarté | saturation |
| --- | --- | --- | --- |
| ciel | `#FAFAF8` | 250 | 2 |
| crête lointaine | `#C1C5B8` | 194 | 13 |
| feuillage moyen | `#B3BAAB` | 182 | 15 |
| feuillage proche | `#A7AF9F` | 171 | 16 |
| terre | `#CAC9B3` | 199 | 23 |

Même méthode que pour la ville, et pour la même raison : ce n'est pas une autre journée,
c'est la même sous d'autres feuilles. **Chaque teinte garde sa clarté** — à trois dixièmes
près, mesuré — si bien que le jeu se lit pareil et que les plans se détachent pareil.

**Le vert s'ajoute à la couleur de l'heure, il ne la remplace pas.** Premier essai : poser
la teinte de référence telle quelle. Les quatre heures sont sorties identiques, puisque
seule leur clarté les distinguait alors — or un champ a un arc de journée (matin chaud,
midi bleu, fin d'après-midi ambrée, crépuscule violet), et une jungle a le même ciel qu'un
champ. On garde donc 60 % de ce qui écarte le champ du gris, greffé sur le vert de
référence.

| | deux heures diffèrent de | vert moyen | vert mini |
| --- | --- | --- | --- |
| le champ | 24,2 | 2,3 | −8,0 |
| l'image de référence | — | 10,3 | — |
| **la jungle** | **18,0** | **12,1** | **+4,0** |

Le « vert » se mesure : de combien le canal vert dépasse la moyenne du rouge et du bleu.
Positif partout, à chaque heure et sur chaque plan.

Le bandeau ne se choisit pas non plus — ce qui compte n'est pas sa couleur mais son
contraste avec le ciel qu'il surmonte. Il subit la même transformation, et l'écart est
vérifié : **+3,4 au champ, +3,7 en ville, +3,6 en jungle** ; le filet à −28,5 / −28,3 /
−28,7.

### La jungle : ses deux plans

Douze dessins sont arrivés, groupés par plan : trois pour « l'arrière-plan du fond tout au
fond », cinq pour « le premier arrière-plan », et quatre sans étiquette. Les quatre sont
des arbres et des palmiers posés sur une touffe d'herbe, exactement comme les cinq du
premier arrière-plan : ils y ont été versés. Onze planches en tout — le douzième dessin
est **la photo d'une carte** montrant une plante déjà fournie en PNG propre, bords
arrondis, cadre blanc et grain d'appareil compris. C'est le PNG qui a été gardé.

**Un seuil pour les douze.** Deux familles très différentes à l'œil — le vert de sauge
pâle du fond, le vert franc du second plan — mais un seul chiffre suffit à les séparer
toutes deux de leur papier :

| | clarté relevée | papier |
| --- | --- | --- |
| les trois massifs du fond | 183 à 194 | 253 à 255 |
| les huit plantes du second plan | 92 à 110 | 253 à 255 |

Le seuil est posé à **224**, à mi-chemin du cas le plus serré : trente unités de marge
sous le papier des massifs, vingt-six au-dessus de leur vert. Les cent trente unités de
marge du second plan viennent en prime.

**Les trous sont percés** — les boucles de lianes de l'arbre, les fenestrations du
monstera, les vides entre deux palmes : sept, neuf et cinq respectivement. Le plan est
repeint en aplat à la couleur de l'heure, un vide non percé disparaîtrait dans la masse.
Aucune poussière n'a été jetée : les douze dessins sont propres.

**Le fond est rééchantillonné, le second plan non.** Les massifs s'affichent à 920, 940 et
1 037 unités de large, c'est-à-dire près de deux mille cinq cents pixels d'écran sur un
téléphone, quand leur dessin n'en a que treize cents : agrandi, l'escalier du contour se
verrait. On
ne peut pas inventer des pixels, mais on peut **rééchantillonner une forme** — la distance
signée au bord est une grandeur continue, connue partout, qu'on relit à une maille plus
fine. Les trois sortent à 2 200 pixels de large, la taille des autres planches de fond.
Les huit plantes, elles, s'affichent à moins de la moitié de leur définition : elles
restent telles quelles.

#### Une canopée n'est pas une chaîne de montagnes

Le fond de la jungle monte de **720 à 900 unités**, quand le champ plafonne à 440 et la
ville à 800 : c'est le fond le plus haut des trois mondes. Il n'est pas loin pour autant :
dans une jungle on ne voit pas loin, et ce qui bouche la vue n'est pas un relief à
l'horizon, c'est le feuillage d'à peine cent mètres plus loin. Les arbres du second plan
passent devant lui et leurs couronnes en dépassent — c'est de là que vient la profondeur,
et non d'un écart de teinte.

La hauteur s'est cherchée en quatre fois. **380–470** d'abord : les images où le hasard ne
donnait pas d'arbre montraient un ciel vide sur les deux tiers de la hauteur. **450–560**
ensuite, ce qui tenait l'horizon d'un bord à l'autre. **560–700**, puis **720–900**, à la
demande. Le second plan a suivi à chaque fois : c'est en montant les deux **ensemble** que
la profondeur tient. Monter le fond seul l'aurait aplatie.

Ils font maintenant 1 183, 1 160 et 1 333 unités de large — plus d'un écran et demi
chacun, autant que les massifs du champ, et il en passe deux par écran au lieu de trois.
Une canopée reste une suite de bouquets, pas une ligne de partage des eaux. Le
chevauchement, lui, n'a pas bougé : de 250 à 410 unités, contre 350 à 644 au champ.

#### Trois étages, et pas une haie

Les huit plantes du second plan sont rangées par taille, et c'est cet étagement qui fait
la forêt. Un rideau d'éléments tous de la même taille se lit comme une clôture, quelle que
soit la richesse des dessins.

| étage | hauteur | ce qu'il y a | poids |
| --- | --- | --- | --- |
| les arbres | 830 à 950 | l'arbre à couronne ronde, le même drapé de lianes, un palmier, deux palmiers | 30 % |
| les plantes | 340 et 375 | les grandes palmes dressées, la touffe en éventail | 29 % |
| le sous-bois | 205 et 230 | le monstera, le buisson large | 38 % |

Les trois étages ont d'abord grandi **ensemble** : ce sont les rapports entre eux qui font
la forêt, pas leurs tailles absolues, et n'agrandir que les arbres donnerait des fougères de
poupée sous des géants.

Puis les deux étages du bas ont **baissé seuls**, en deux fois, quand les arbres n'ont plus
bougé :

| | d'abord | puis | enfin | rapport à un arbre |
| --- | --- | --- | --- | --- |
| les plantes | 570–630 | 485–535 | **340–375** | 0,70 → 0,60 → **0,40** |
| le sous-bois | 295–330 | — | **205–230** | 0,36 → **0,25** |

C'est un réglage d'œil et non de mesure, et la raison est toujours la même : à deux tiers
d'arbre, une plante *pèse* comme un arbre, et la forêt n'a plus que deux étages au lieu de
trois. À quatre dixièmes, l'écart se voit, le fond passe par-dessus, et les arbres
redeviennent ce qui domine.

#### Huit dessins, seize silhouettes

Une forêt dont on reconnaît les arbres n'est pas une forêt. Deux réglages y répondent, et
aucun des deux ne coûte une planche de plus.

**Elles poussent de moitié**, contre un tiers pour les arbres du champ : chaque plante tire
son échelle à la plantation entre 1,00 et 1,50.

**Une fois sur deux, elle est posée à l'envers.** Le miroir joue autour du milieu de la
silhouette, si bien que ni sa largeur, ni son abscisse, ni sa base ne changent — tout ce
que la chaîne a calculé reste vrai. Il ne vaut que pour ce qui n'a ni endroit ni envers,
c'est-à-dire une plante : un tracteur retourné roulerait à reculons et un moulin tournerait
à l'envers, et les deux autres mondes ne le demandent pas.

C'est aussi ce qui reste de la variété en **pixel**, où la taille ne varie pas — une
planche unique ne peut pas suivre une échelle continue sans changer la taille de ses
pixels, et c'est la seule chose du jeu qui n'ait pas le droit de bouger. Un retournement,
lui, ne déplace pas un seul pixel de la grille.

Mesuré sur dix minutes de course dans chaque monde, en comptant les couples *(dessin,
sens)* :

| | dessins | silhouettes vues | à l'envers | échelle |
| --- | --- | --- | --- | --- |
| le champ | 10 | 10 | 0 % | 1,00 à 1,32 |
| la ville | 7 | 7 | 0 % | — |
| **la jungle** | **8** | **16** | **47 %** | **1,00 à 1,50** |
| la jungle, en pixel | 8 | **16** | 51 % | — |

Les huit **poussent**, comme les arbres du champ : chacune tire son échelle à la
plantation, entre un et un tiers de plus. Dans une jungle il n'y a rien qui ait une raison
de garder sa taille — pas de panneau, pas de tracteur, pas de façade. La liste de ce qui
pousse est devenue commune aux trois mondes ; les clés sont uniques d'un monde à l'autre,
une seule suffit.

**Une jungle est dense.** Les plantes se touchent maintenant bord à bord : **zéro** unité
de terre entre deux voisines, quatre-vingt-dix au plus, quand le verger du champ va de 85 à
369. Trois réglages ont été nécessaires. Mesuré sur dix minutes de course dans chaque
monde :

| | écran couvert par le second plan | plus grand trou |
| --- | --- | --- |
| le champ | 64 % | 370 |
| la ville | 68 % | 362 |
| la jungle, 40–230 | 73 % | 235 |
| la jungle, 10–120 | 85 % | 124 |
| **la jungle** | **92 %** | **94** |

Il en reste assez pour que la canopée se voie par les trouées — sans elles, le second plan
la cacherait tout entière et le monde n'aurait plus qu'un plan. Sur ces dix minutes :
aucune silhouette ne disparaît à vue, aucune ne se pose sur sa voisine, et la ligne de
crête ne s'ouvre pas une seule image.

#### La voûte de lianes

Un troisième plan, et le premier du jeu qui **pend au lieu de se poser**. Le sol et les
deux plans de décor sont tous calés sur la ligne d'horizon ; ces guirlandes-là sont calées
sur le **haut du cadre**, et leur bord supérieur passe derrière le bandeau de scores. C'est
ce qui fait la voûte : on ne voit pas d'où elles partent, donc elles partent d'une canopée
qui déborde de l'écran.

Elles appartiennent au **second plan** — même couleur, même parallaxe que les arbres — et
c'est voulu : ce sont les lianes de ces arbres-là, pas d'un plan plus lointain.

**Elles ne se suivent pas bout à bout.** Première version : une chaîne continue, chaque
guirlande recouvrant sa voisine comme le font les massifs de la ligne de crête, sans jamais
laisser passer le ciel. C'était trop — un rideau plein en haut du cadre, où l'on ne
distinguait plus les guirlandes les unes des autres. Elles sont donc semées **à distance**,
comme les arbres : de 240 à 640 unités de ciel entre deux, pour des guirlandes larges de
420 à 500. Il y en a une ou deux en vue, pas cinq, et entre elles le ciel remonte jusqu'au
bandeau — c'est ce vide qui fait qu'on les voit. Sur dix minutes de course, **554
guirlandes replantées, aucune disparue à vue**, et les trois dessins tombent à 32, 33 et
35 %.

**Il n'y avait rien à détourer.** Les trois fichiers arrivent avec un fond *transparent* —
94 à 95 % de leurs pixels sont à alpha zéro — et non sur du papier blanc comme tous les
dessins précédents. Le masque est donc déjà fait : le seuil, l'inondation depuis les bords
et le champ de distance signée n'ont plus rien à décider, et les appliquer serait refaire
moins bien ce que le fichier donne exactement. La première tentative les a quand même
passés par la chaîne habituelle, et le résultat était une planche pleine de 1 024 sur
1 024 : le test de clarté lit un pixel transparent comme du noir, et toute la feuille était
devenue de l'encre. Il ne reste donc qu'à rogner sur l'encre (elles n'occupent que 5 % de
leur feuille) et à jeter la poussière.

Elles descendent **179 unités sous le plafond de vol** — leurs brins les plus longs pendent
dans la zone où la poule vole. C'est voulu, et ça ne coûte rien : le second plan est peint
avant le premier, la poule passe donc *devant* les lianes. Elle vole sous la voûte.

#### Les six obstacles du sous-bois

Ce que la forêt a laissé — un enchevêtrement de racines, un tronc couché, une souche — et
ce qu'une expédition y a abandonné : un sac, un jerrican, une cage vide. Les ballots de paille empruntés au champ sont partis
depuis longtemps ; il ne reste plus rien d'emprunté que les touffes d'herbe et les cailloux
du sol, qui sont à leur place sous les arbres.

| | dessin | boîte | il faut monter de | il tue |
| --- | --- | --- | --- | --- |
| les racines | 369 × 100 | 90 % de la largeur | 63 | oui |
| le tronc couché | 221 × 115 | 93 % | 80 | oui |
| le jerrican | 133 × 125 | 74 % | 84 | oui |
| le sac | 153 × 140 | 88 % | 97 | oui |
| la souche | 201 × 150 | 92 % | 109 | oui |
| la cage | 244 × 180 | 93 % | 135 | oui |

Pour un sommet de saut à 321 : les racines sont ce qu'on enjambe — le plus bas obstacle du
jeu, tous mondes confondus, et de loin le plus large — et la cage ce qui se mérite. La
jungle plafonne à 135 là où le champ demande 183 pour son épouvantail et 184 pour sa
fourche : c'est le monde le plus indulgent des trois au sol, et celui qui a le plus de
choses au ciel.

Trois dessins y sont passés et n'y sont plus : le champignon et le serpent, dessinés puis
redessinés une fois, et la plante carnivore. **Leurs planches ne sont pas restées dans le
fichier** — un dessin remplacé et non complété ne pèse plus que du poids, et les ôter des
deux tables a rendu 1,5 Mo. C'est un outil qui manquait : jusque-là on ne savait
qu'ajouter et remplacer.

**Ce que ces trois feuilles-là avaient de facile.** Leur papier est blanc — 253 à 255 —
quand celui des plantes tirait sur le rose et descendait jusqu'à 227, sous le seuil. Et
aucun de leurs vides enfermés n'est ambigu : ils sont tous à une à cinq unités du papier.

| | vides enfermés | ce que c'est |
| --- | --- | --- |
| la cage | 8, de 1 894 à 5 937 px, écarts 1 à 4 | **les jours entre ses barreaux** — une cage dont on ne voit pas au travers est une caisse |
| le jerrican | 2, de 588 et 879 px, écarts 3 et 4 | les deux fentes de sa **poignée** |
| le sac | 1, de 5 736 px, écart 2 | l'arche de sa **bretelle**, la gourde logée dedans |

Les petits amas qui tombent avec la poussière sont les cailloux dessinés à côté d'eux : le
jeu a les siens, à sa propre échelle.

**Le sac et le jerrican ont été redessinés une fois** — sac bleu au lieu de brun, jerrican
sans ses touffes d'herbe — et rien n'a bougé dans la chaîne : même papier blanc, mêmes vides
au même endroit. Seules leurs **proportions** ont changé, et beaucoup : de 1,46 à 1,06 pour
le jerrican, de 1,48 à 1,09 pour le sac, parce que l'herbe qui les élargissait n'y est plus.
Les largeurs de jeu suivent — 182 → 133 et 207 → 153 — et les hauteurs ne bougent pas, ce
qui laisse ce qu'il faut monter pour les franchir à deux unités près : 84 au lieu de 86, 97
au lieu de 99. La boîte du jerrican ne fait plus que 74 % de sa planche, contre 88 à 93 %
pour les cinq autres : ce sont les cailloux dessinés de part et d'autre du bidon, que la
mesure ne prend pas pour du bidon. Les boîtes ne sont pas écrites à la main — elles sont
mesurées sur chaque dessin au démarrage, en ignorant la frange basse où vivent les
racines, l'herbe et les feuilles.

**Ce qui se perce, et ce qui ne se perce pas.** La règle ordinaire dit qu'une tache de fond
enfermée dont la couleur est celle du papier est un vide. Elle est bonne pour la souche,
dont le pied droit forme une arche : 1 768 pixels à **zéro** d'écart du papier, c'est le
jour sous la racine. Elle est fausse pour deux des cinq, et il a fallu regarder *où*
tombaient les taches pour s'en apercevoir :

| | taches enfermées | ce que c'est |
| --- | --- | --- |
| les racines | 10 taches, de 214 à 2 712 px, écarts 5 à 10 | **les arches entre deux racines** — toutes percées |
| la souche | 1 768 px, écart 0 | le jour sous la racine — **percé** |
| la plante carnivore (retirée depuis) | 8 taches, de 49 à 6 382 px, écarts 3 à 9 | **le reflet du bulbe et les dents** — gardées |
| le serpent (retiré depuis) | 1 238 px, écart 7 | **son œil** — gardé |

L'enchevêtrement de racines demande son propre écart : **14**, quand les autres tiennent
à 8. La raison se lit dans les chiffres : **son papier est plus sombre** —
245, 233, 228 contre 251, 250, 248 — alors que le liseré blanc qui borde l'encre est le
même partout. Une petite arche, faite pour moitié de ce liseré, tombe donc à 10 du papier
là où une grande tombe à 6. À 8, les deux plus petites restaient bouchées : deux taches
roses de sept unités sur un enchevêtrement brun, et ça se voyait.

Le papier du serpent était chaud, le blanc de son œil aussi, et sept unités les séparaient :
la couleur ne pouvait pas trancher. Ni la taille, ni l'allongement non plus. Ce qui sépare,
c'est de savoir ce que le dessin représente, et ça ne se mesure pas — on l'écrit donc
feuille par feuille, comme le seuil du papier ou la taille de la poussière.

**La plante carnivore est retournée**, et c'est la seule. Question de sens plutôt que de
dessin : la poule arrive par la gauche, le serpent la regarde venir, et une gueule ouverte
du côté opposé se lit comme du décor et non comme une menace.

Le rythme de la jungle est celui du champ, et ce n'est pas un hasard — les deux mondes
partagent leur espacement (600 unités garanties, 1 s d'attente) :

| | obstacles par km | sol libre médian | un sur dix sous |
| --- | --- | --- | --- |
| le champ | 11,2 | 611 | 603 |
| la ville | 8,8 | 870 | 862 |
| **la jungle** | **10,9** | **609** | **603** |

Le plus petit écart mesuré y descend à 467 quand le champ tient 600 : la jungle a trois
choses au ciel là où le champ n'en a qu'une, et un obstacle de sol qui suit un vol garde
moins d'air devant lui. C'est la queue de la distribution, pas son corps.

Son **ciel** est à elle aussi : le toucan et le singe qui jette sa noix de coco.

### Le toucan

Même chaîne que le pigeon, et pour la même raison : ses trois poses sont sur une seule
feuille, calées sur son **œil** — le seul fond enfermé de sa tête, donc trouvable sans
rien deviner, et le point qui ne bouge pas quand les ailes battent.

Avec une différence : **les trois ne sont pas de la même taille.** La main dérive en
traversant la feuille. C'est la **joue crème** qui le dit — le plus gros fond enfermé de
chaque pose, une pièce rigide de la tête qui ne dépend ni des ailes ni du pli du cou :

| | joue crème | **taille** | encre |
| --- | --- | --- | --- |
| ailes hautes | 4 336 px | **1,044** | 514 × 463 |
| ailes au milieu | 3 954 px | **0,997** | 479 × 231 |
| ailes basses | 3 669 px | **0,960** | 470 × 360 |

**Huit pour cent** entre la plus grande et la plus petite, et huit pour cent au battement,
ça se voit comme une respiration — l'oiseau enflerait au rythme de ses ailes. Les trois sont
donc ramenées à leur taille moyenne **autour de l'œil**, si bien que le point fixe le reste.

**Et la boîte commune se mesure après la mise à l'échelle, pas avant.** Les boîtes sont
écrites depuis l'œil, qui est justement le centre de l'homothétie : les mettre à l'échelle
revient à multiplier leurs quatre bornes par le facteur de la pose. Prise sur les boîtes
brutes, l'union coupait la pose agrandie de 4 % — **47 pixels d'encre sur le bord gauche de
la troisième planche**, c'est-à-dire la pointe de son bec. Vérifié après correction : zéro
pixel d'encre sur les quatre bords des trois planches.

**Son bec est passé en couleur.** La feuille d'origine lui donnait un bec orange uni ; la
nouvelle lui donne celui d'un toco — vert, orange, rouge et bleu. Le détourage n'en sait
rien et n'a pas à le savoir : il ne sépare que l'encre du papier, et un bec bariolé est de
l'encre comme un bec orange.

Sa taille de jeu se pose sur le **corps**, comme celle des trois autres oiseaux : 65 unités,
à peine plus que le pigeon (62), moins que le corbeau (82). Sa planche, elle, est la plus
grande des quatre — **trois fois son corps**, quand celle du corbeau n'en fait qu'une fois
trois quarts. Un toucan est surtout un bec et une envergure, et se caler sur la planche
l'aurait fait entrer dans le ciel comme un aigle.

**Le bec est coupé à l'œil, et ce n'est pas la mesure qui le décide.** L'intersection des
trois corps remonte jusqu'au milieu du bec — un bec de toucan est épais, il pèse donc dans
le compte des colonnes denses. Mais il ne tue pas : c'est une lame de corne creuse, et une
boîte qui l'aurait avalé aurait tué **23 unités avant l'oiseau**. On garde donc le bord
droit mesuré et on ramène le bord gauche à l'œil.

Il vole plus lentement (140 contre 175 et 165) et bat plus lentement (9 images par seconde
contre 12 et 14) : c'est un gros oiseau au vol lourd, pas un pigeon de ville.

### L'ara, le second oiseau

La jungle est le seul monde à en avoir **deux**. Ils ne se croisent pas — la règle du ciel
n'en laisse passer qu'un à la fois — mais on ne voit pas deux fois le même oiseau en dix
minutes, ce qu'aucun autre monde n'offre. Le toucan et l'ara se partagent le poids qu'avait
le corbeau à lui seul : dix et dix pour dix-neuf. Le ciel n'est ni plus ni moins occupé
qu'ailleurs, il est simplement plus varié.

Même chaîne que le toucan, avec du travail en moins : **les trois aras sont de la même
taille.** C'est la *joue blanche* qui le dit — le plus gros fond enfermé de chaque pose, une
pièce rigide de la tête qui ne dépend ni des ailes ni de la queue.

| | joue blanche | œil | encre |
| --- | --- | --- | --- |
| ailes hautes | 1 831 px | 198 px | 499 × 494 |
| ailes au milieu | 1 836 px | 175 px | 469 × 249 |
| ailes basses | 1 912 px | 198 px | 445 × 365 |

**2,2 %** d'écart sur la racine, quand les trois toucans en accusaient sept et qu'il avait
fallu les remettre à l'échelle. L'ancre reste l'œil — deuxième fond enfermé — et il tombe à
seize pixels au-dessus du centre de la joue dans les trois poses, ce qui vérifie l'un par
l'autre.

Sa boîte est l'intersection du corps épais des trois poses : la tête et le buste, du bec au
milieu du dos. Elle part **huit unités devant l'œil** — un bec d'ara est court et épais, il
fait partie de l'oiseau, là où celui du toucan est une lame de corne creuse qu'on a exclue.
Ni les ailes ni la **queue** n'y sont : une queue d'ara fait la moitié de l'oiseau et n'est
qu'un éventail de plumes. C'est ce qui fait tomber sa part d'encre couverte à 74–86 %, contre
82–97 % au toucan — la différence, c'est exactement la queue.

Il vole plus vite et bat plus vite : **195 contre 140**, treize battements par seconde contre
neuf. Le toucan est lourd, l'ara file.

#### Il a rétréci, puis il est revenu

Il est passé un temps aux **trois quarts** de sa taille : planche de 135 sur 165, corps de
62 unités — exactement celui du pigeon. La raison tenait en une comparaison : sorti à
l'échelle de son dessin, l'ara était le plus gros des deux, planche de 175 sur 213 contre
180 sur 210 au toucan et surtout un corps de 81 unités contre 65, alors que dans la nature
le rapport est inverse — un toco fait quarante-cinq centimètres de plus qu'un ararauna.

**Il est revenu à sa taille.** C'est le dessin qui a le dernier mot : un perroquet est trapu
là où un toucan est surtout un bec et une envergure, et le rapport entre les deux ne se lit
donc pas sur la planche mais sur le corps. Le toucan est le plus **grand**, l'ara le plus
**gros**.

| | toucan | ara |
| --- | --- | --- |
| planche | 180 × 210 | 175 × 209 |
| corps (la boîte) | 65,1 × 41,3 | **88,7 × 47,4** |
| vitesse, battement | 140, 9/s | 195, 13/s |

L'aller-retour n'a rien coûté que du calcul : la fenêtre de vol où il est atteignable se
mesure depuis la **boîte** et non depuis la planche, elle suit donc toute seule — −360 à
−456 avant comme après. La part d'encre couverte non plus ne bouge pas : c'est un rapport,
et l'échelle en change les deux termes du même coup.

### Le singe, et sa noix

Ce n'est pas un oiseau : il ne traverse pas le ciel, **il y est accroché**. Pendu à sa
liane, il défile à la vitesse du décor comme tout ce qui appartient au monde, et c'est la
poule qui vient à lui. Ses quatre poses ne sont donc pas un battement mais une **séquence**,
jouée une fois : il tient la noix, il arme, il lâche, il retombe bras ballant.

#### Il est collé au plafond, et sa liane est celle du dessin

Le dessin la coupe net en haut de la planche. On pose donc ce haut-là **derrière le
bandeau** de scores, et la liane semble descendre d'une canopée qu'on ne voit pas. Rien
n'est ajouté au dessin, rien n'est prolongé — c'est la planche telle qu'elle a été taillée,
et elle se confond avec les guirlandes de lianes qui pendent au même endroit.

Une version intermédiaire le faisait pendre plus bas, à une hauteur tirée comme celle d'un
oiseau, avec une liane prolongée par un trait relevé sur les quatre planches — où elle
passe en haut, de combien elle penche, quelle épaisseur, quelle couleur. Elle marchait ;
elle a été retirée, parce que le dessin suffit.

**Et il reste atteignable, ce qui n'allait pas de soi.** Une première mesure avait conclu
l'inverse : la poule, au plafond de vol, occupe une bande de 58 unités qui s'arrête
73 unités sous le bandeau, et le tronc du singe pend 110 unités sous le haut de sa planche
— *donc* 13 unités trop bas. Ce raisonnement est faux, et c'est une erreur de question
plutôt que de calcul : il demandait « **au plus haut**, se touchent-ils ? » quand il fallait
demander « existe-t-il **une** hauteur où ils se touchent ? ». Au plafond, le corps de la
poule passe entièrement au-dessus du singe ; quelques dizaines d'unités plus bas, il tombe
dedans.

En balayant tout le vol, la réponse est oui, et sur les quatre formes d'écran :

| écran | plafond de vol | il attrape quand elle vole entre |
| --- | --- | --- |
| 390 × 844 | −1 022 | **−896 et −1 008** |
| 820 × 1180 | −597 | −470 et −582 |
| 1440 × 900 | −576 | −450 et −562 |
| 1180 × 700 | −551 | −424 et −536 |

Il faut voler haut sans voler au plafond — un cheveu au-dessous — et le singe attrape.
C'est le seul obstacle du jeu qu'on évite en montant *plus*.

#### La noix, et la seule règle qui compte

La poule ne sait ni freiner, ni s'écarter, ni se baisser. La seule chose qu'elle peut faire
est **monter**, ce qui l'envoie au-devant de ce qui tombe. Une noix qui lui arrive dessus
pendant qu'elle court n'a donc aucune parade — et une mort sans parade n'est pas un
obstacle, c'est une punition.

Première version, un déclic à distance fixe du bord droit. Mesuré image par image : sur une
fenêtre de bureau, **la noix tuait la poule qui courait sans rien faire, dès la première
minute** — elle traversait sa colonne à 92 unités du sol, en plein dans son corps.

Le singe ne lance donc pas quand il arrive quelque part : il lance **quand il faut**. Le
point de lâcher se calcule à chaque image, à partir de la vitesse du moment et de la
hauteur de sa main — la chute est un mouvement uniformément accéléré dont on connaît tout
d'avance, le temps de vol se résout exactement — et il recule quand la course accélère.

#### Elle va maintenant jusqu'au bord bas gauche

La cible a longtemps été à 320, c'est-à-dire **cinquante unités devant la poule**, dont la
boîte s'arrête à 268. La noix n'entrait donc jamais dans sa colonne : elle éclatait avant,
et tout se jouait au-dessus du quart droit de l'écran. C'était sûr, et c'était étriqué.

Elle est maintenant à **34**. La noix fait 42 de large : son bord gauche vient lécher le
bord du cadre. Elle traverse toute la scène en descendant, passe **au-dessus de la poule**
et s'écrase derrière elle, dans le coin bas gauche.

**Ce qui garantit encore la poule qui court.** La règle n'a pas changé ; c'est la façon de
la tenir qui a changé. Avant, la noix n'existait plus quand la colonne de la poule
arrivait. Maintenant elle la traverse, et c'est la **hauteur** qui protège : la chute est
un mouvement uniformément accéléré, elle est lente en haut et rapide en bas, et la colonne
de la poule est franchie dans le **premier tiers** du vol. Mesuré sur quinze vitesses de
520 à 900 et cinq formes d'écran — soixante-quinze cas — voici le plus bas que le bas de la
noix descende entre x = 200 et x = 262 :

| | à 520 u/s | à 900 u/s | la tête de la poule |
| --- | --- | --- | --- |
| téléphone (plafond −1022) | −572 | −430 | −98 |
| bureau (plafond −551) | −393 | **−303** | −98 |

Le pire cas — une fenêtre de bureau à pleine vitesse — laisse **205 unités**, soit plus de
deux hauteurs de sa boîte. **Zéro mort sur les soixante-quinze cas.**

**Et ce que ça fait gagner.** Une noix qui traverse au lieu de disparaître devient un vrai
obstacle pour la poule qui **vole** : entre 300 et 570 selon la vitesse, il faut lui céder
le passage. Cette mort-là a une parade, deux même — monter au-dessus ou redescendre — là où
la mort de la poule au sol n'en avait aucune. Le singe lâche aussi plus tard : sa main part
de x = 300 à 630 selon la vitesse, au lieu de 760. C'est-à-dire **en plein cadre au lieu du
bord droit** : on le voit lancer.

#### Il commence dès qu'il apparaît

La séquence se déclenchait à une abscisse calculée — celle qui, l'armement décompté, mettait
le lâcher au bon endroit — et l'armement durait **0,16 s fixe**. Conséquence mesurée : selon
la vitesse et l'angle tiré, ce déclic tombait entre **470 et 917** sur un téléphone. Au mieux
il armait en entrant ; au pire il restait pendu une demi-seconde en pleine vue, bras
ballant, avant de se décider.

Les deux moments sont donc **séparés**, et aucun des deux n'est un compte à rebours :

| | quand | ce qui le décide |
| --- | --- | --- |
| il arme | quand sa planche entre dans le cadre | le dessin : `VIEW_W + oeilX` |
| il lâche | à l'abscisse que la visée demande | la physique du jet |

L'armement dure ce qu'il reste entre les deux : **de 0,14 à 1,18 s** selon la vitesse et
l'angle. Ce n'est pas un défaut, c'est la même chose qu'un lanceur qui prend son élan plus
longtemps pour lancer plus loin — et ça supprime le temps mort, puisqu'il entre dans le
cadre déjà armé. Vérifié sur 90 jets et deux formes d'écran : le lâcher tombe toujours
**après** son entrée (au plus tôt x = 773, quand il apparaît à 896), donc on le voit
toujours lancer.

Le terme de compensation `vitesse × armement` disparaît de la visée du même coup : il rendait
le déplacement du singe *pendant* son armement, or le lâcher se déclenche maintenant sur sa
position et non sur une durée. Le point de chute, lui, ne bouge pas — re-mesuré sur les 675
jets : zéro mort, 119 unités de garde au pire.

#### Il ne lance plus toujours pareil

Un seul angle et un seul point de chute, et le troisième singe rejouait exactement le
premier : la trajectoire était bonne, mais elle était **une**. Chaque singe tire donc son jet
**en entrant**, deux nombres qui vivent sur lui jusqu'à ce qu'il lâche — un **angle** dans un
cône, et un **point de chute** dans une bande.

**L'angle, et non la vitesse de jet.** C'est le point qui fait tout tenir. À vitesse de jet
fixe, l'angle du départ vaut `atan(vy0 / (vitesse du sol + 150))` : 36 degrés au démarrage de
la course, 25 à pleine vitesse. Le cône se refermait donc tout seul à mesure que le monde
accélérait. En tirant l'**angle** et en en déduisant la vitesse, le cône est le même du
premier mètre au dernier — c'est bien un cône, pas une conséquence de la vitesse du sol.

**Où poser les bornes.** On a relevé, pour onze angles et six points de chute, le plus bas
que la noix descende dans la colonne de la poule qui court, au pire de quinze vitesses et de
trois formes d'écran. La carte est nette, et sa leçon n'est pas celle qu'on attendait :

| point de chute | le plus bas dans sa colonne | |
| --- | --- | --- |
| 20 | −302 à −520 selon l'angle | |
| 50 | −251 à −436 | |
| 80 | −213 à −340 | ← borne retenue |
| 110 | −160 à −260 | la marge tombe sous une hauteur de poule |
| 150 | −80 à −141 | **elle meurt** à tous les angles sous 46° |
| 200 | −42 à −57 | **elle meurt partout** |

C'est le **point de chute** qui commande, presque pas l'angle. La raison est géométrique :
plus la noix vise près de la poule, moins il lui reste de chute *après* sa colonne, donc plus
bas elle y passe. L'angle ne fait que dix pour cent de différence — un jet rasant arrive de
plus loin, mais avec la même géométrie d'arrivée.

Le point de chute reste donc serré, **entre 20 et 80** : c'est le bord bas gauche, comme
demandé. L'angle, lui, s'ouvre en grand — **quarante degrés, de 25 à 65** — puisqu'il ne
coûte presque rien à la garantie. Et c'est bien l'angle qu'on voit :

| angle | lâchée en x | images de vol | éclate en x |
| --- | --- | --- | --- |
| 25° | 521 | 36 | 25 |
| 45° | 509 | 31 | 84 |
| 65° | 334 | 23 | 23 |

Deux cent vingt unités d'écart sur le point de lâcher, et treize images d'écart sur la durée
du vol : d'un singe qui lance à peine entré dans le cadre à un singe qui lance au milieu.

Le cône retenu, re-mesuré entier — neuf jets par vitesse, quinze vitesses, cinq formes
d'écran, **675 jets** : la noix descend au plus bas à −307 sur un téléphone et à −220 sur une
fenêtre de bureau, quand la tête de la poule qui court est à −98. **122 unités de garde au
pire**, une hauteur et demie de sa boîte, et **zéro mort** sur les 675.

#### Le choc, maintenant qu'il se voit

Tant que la noix éclatait à 320, en l'air et au milieu du cadre, neuf grains de poussière
suffisaient. Elle touche terre au coin de l'écran : le choc mérite d'être vu. Trois choses,
toutes empruntées à des effets qui existaient déjà — on ne fabrique pas un vocabulaire pour
une noix :

| | quoi | combien |
| --- | --- | --- |
| poussière | les ronds pâles des appuis de la poule | 12 grains |
| mottes | la giclée de terre de la pierre tombale qui s'enfonce | 12, contre 24 pour la pierre |
| secousse | la même que la mort, en bien plus court | 7, contre 22 à la mort et 6 à un appui |

Deux réglages ont demandé une mesure plutôt qu'un choix.

**La poussière monte au lieu de fuir.** Elle partait avec l'élan de la noix — vitesse
horizontale entre −40 et −190 — ce qui la sortait du cadre par la gauche **en trois
images**, maintenant qu'elle éclate au bord. Elle ne file plus qu'à peine, et de préférence
vers la droite : le nuage reste sur le point de chute, et on a le temps de le voir.

**Les mottes défilent avec le sol.** Celles de la pierre tombale ne le font pas, et elles
ont raison : quand la pierre se plante, la course est finie et le monde ne bouge plus.
Celles de la noix tombent sur un sol qui glisse encore vers la gauche — posées dessus sans
le suivre, elles resteraient plantées en l'air à l'échelle du décor. Le même générateur
sert aux deux, avec un drapeau de plus.

Le claquement, lui, n'a pas changé : sec et très haut de spectre, rien à voir avec le choc
de la poule qui est long et grave. Il ne doit pas se lire comme une mort mais comme un
objet qui tombe à côté.

La noix part de sa main, et cette main est dessinée — inutile de la placer à l'estime :
mesurée sur la planche de la pose armée, elle est à 156 pixels à gauche de l'œil et 23
dessous, soit 79 et 12 unités de jeu.

Un dernier point, honnête : **au-delà de 700 unités par seconde, le lâcher se fait hors du
cadre**, et aucun réglage n'y peut rien. Le monde défile alors de 900 unités par seconde et
la noix met une demi-seconde à tomber du plafond : elle doit partir de plus loin que la
largeur de l'écran. Le singe entre tout entier dans la demi-seconde qui suit, bras encore
tendu et main ouverte, et reste en vue jusqu'à sa sortie — on voit qui a lancé, à défaut de
le voir lancer. Sur un écran de bureau, où le ciel est deux fois moins haut et la chute deux
fois plus courte, tout le lancer est dans le cadre à toutes les vitesses.

#### Un seul du ciel à la fois

Les oiseaux le traversent, le singe y est pendu : ni les uns ni l'autre ne doivent se
croiser, et le jeu n'en lance qu'un à la fois — la règle qui existait pour les oiseaux
s'étend au singe. Il reste en vue bien plus longtemps qu'eux, lui : il défile à la vitesse
du sol quand un oiseau vient à contresens. C'est voulu — on le voit venir, armer et lancer.

Sa noix ne compte ni dans l'espacement des obstacles ni dans la règle du ciel : un singe et
sa noix sont un seul événement, comme un pigeon et sa fiente.

Sur vingt parties de 4 000 m : toucan 13,1 %, singe 7,4 %, noix 7,4 % — un singe, une noix,
toujours.


### La poule descend, et le sol s'épaissit

Deux réglages qui vont ensemble, et qui valent pour les deux mondes.

**Le plan de la poule est passé de 14 à 30 unités sous la ligne d'horizon.** C'est un
décalage de *rendu* : le premier plan est translaté d'un bloc au moment de le dessiner —
la poule, ses ombres, ses particules, les obstacles, les mouches et les oiseaux — et pas
une seule boîte de collision ne bouge. La preuve est dans les mesures qui n'ont pas changé
d'une unité : le ballot demande toujours 56 unités pour être franchi, la fourche 184,
l'épouvantail 183.

Elle y gagne au passage un peu d'air sous le bandeau : sur 50 relevés — deux styles, cinq
écrans, toutes les poses de vol et de saut — la plus petite marge entre le haut de sa tête
et le bas du bandeau est de **14,3 pixels**.

**Les détails du sol formaient trois rangées.** L'enfoncement se tirait par paliers — le
plus souvent 7 à 20 unités sous la ligne, une fois sur trois 21 à 35, une fois sur sept 36
à 47 — et le résultat se voyait pour ce qu'il était : trois rangées, toutes serrées contre
l'horizon. Un sol n'a pas de rangées. Le tirage est maintenant **uniforme sur toute la
bande**, et cette bande descend deux fois plus bas : de 7 à 90 unités.

Relevé sur quatre mille détails de chaque monde, où vit l'encre (positif = sous la ligne) :

| | haut du dessin | bas du dessin |
| --- | --- | --- |
| la ferme | de −12,3 à +66,3 (médiane +30,5) | de +10,4 à +86,3 |
| la ville | de +8,6 à +83,4 (médiane +45,7) | de +46,6 à +133,4 |

La bande passe ainsi **de part et d'autre du plan de la poule**, qui est à 30 : il y a des
touffes derrière elle et des touffes devant, et c'est ce qui donne au sol son épaisseur.
Le champ garde ses touffes qui dépassent au-dessus de la ligne — l'herbe pousse — et la
ville reste entièrement dessous, comme il se doit pour une fente dans un trottoir.

### Une barrique et un épouvantail pour la ferme

Les deux premiers obstacles neufs de ce monde-là depuis longtemps. La barrique monte à
**155 unités** — 120 à franchir — et l'épouvantail à **235**, soit 183 à franchir : à une
unité près, c'est la fourche qu'il égale, et les deux restent loin des 321 du saut. Les
neuf obstacles de la ferme tuent et se franchissent tous d'un seul saut.

| | part mesurée |
| --- | --- |
| ballot | 23 % |
| corbeau | 17 % |
| barrière, seau | 13 et 12 % |
| pneu, **barrique** | 9 % chacun |
| pile de ballots | 7 % |
| fourche | 4 % |
| **épouvantail** | 3 % |
| brouette | 2 % |

**La règle de la bande a montré sa limite.** Elle avait été faite pour les fentes du
dossier du banc, qui pèsent mille pixels ; lâchée sans plancher, elle a percé trois **éclats
de lumière** sur les cerclages de la barrique — 45 à 119 pixels, longs et minces comme une
fente mais qui sont du métal qui brille. Une fente entre deux lattes est une ouverture :
elle a une taille. La règle ne s'applique donc plus qu'au-dessus de 500 pixels, ce qui laisse
les fentes du banc (1015 et 1339) et écarte les éclats.

### La fiente du pigeon

Un pigeon sur trois en lâche une, et elle tombe. Elle n'est pas envoyée par le semeur
d'obstacles : c'est l'oiseau qui la fait, à un moment de sa traversée où il est bien en vue
— ni à peine entré, ni déjà sorti — et une seule par oiseau. Elle ne compte donc ni dans
l'espacement des obstacles ni dans la règle du ciel : un pigeon et sa fiente sont un seul
événement. Mesuré sur 295 pigeons : **33 % en lâchent une**, jamais plus de deux à l'écran.

**En l'air elle tue, posée elle ne tue plus.** Une chute qui vient d'en haut doit se voir
arriver, et c'est le cas — il lui faut une bonne seconde pour traverser le ciel, et sa boîte
est rentrée d'un quart pour pardonner le frôlement. Mais une trace sur le trottoir n'a
aucune raison d'être mortelle : la poule doit pouvoir marcher dessus. Elle s'efface alors
en deux secondes, en défilant avec le sol.

**Une boîte vide ne suffisait pas.** Premier essai, la fiente posée gardait une boîte de
largeur et de hauteur nulles — et elle tuait encore. Le test de collision demande seulement
que les bords se croisent, et un bord de largeur nulle se croise très bien dès qu'il tombe
dans la boîte de la poule. C'est la mesure qui l'a dit, pas le raisonnement. Elle est
maintenant écartée explicitement de la boucle : savoir si quelque chose blesse est une
autre question que savoir quelle forme il a.

#### Elle est dessinée, depuis

Les deux états étaient tracés **en code** — une larme cerclée d'encre en vol, trois ellipses
au sol — parce qu'un dessin de quinze unités n'a pas besoin d'une planche. Ce sont maintenant
deux planches, et elles disent chacune plus que le tracé ne pouvait : la goutte est
**étirée**, avec trois traits de vitesse au-dessus d'elle et deux gouttelettes qui la
suivent ; la tache est une **éclaboussure à huit branches**, avec ses éclats détachés. Ni
l'une ni l'autre ne se décrivent en trois courbes de Bézier.

**Leur détourage est l'inverse de tous les autres.** Partout ailleurs le fond est ce qui est
clair et l'objet ce qui est sombre. Ici l'objet est **blanc** — c'est une fiente — posé sur
un papier crème à peine plus sombre : neuf unités de clarté les séparent, aucun seuil ne les
séparera jamais. Ce qui les sépare est le **trait noir** du contour. On seuille donc très
haut, ce qui met le papier *et* l'intérieur du même côté, puis on inonde depuis les quatre
bords : l'inondation couvre le papier et **bute sur le trait**. Ce qu'elle n'atteint pas est
la fiente, intérieur compris. Aucun trou n'est percé — une fiente n'en a pas, et
l'enfermement est justement ce qui la définit ici.

**Les traits de vitesse restent sur celle qui tombe et disparaissent de celle qui est
posée.** Ils disent exactement ce que fait la première ; sur une tache immobile qui reste
deux secondes à l'écran en pâlissant, ils se liraient comme un défaut. On les reconnaît sans
les nommer : ce sont les amas entièrement **au-dessus** du plus gros.

**Ce qui tue, c'est la goutte, pas ses traits de vitesse.** La planche en vol les porte en
plus d'elle, et la goutte n'occupe que la tranche 0,225 à 0,845 de sa hauteur — mesurée sur
la planche, pas estimée. La boîte de collision est rendue à cette tranche-là ; sans quoi elle
aurait tué quatorze unités trop tôt. Et la fiente se pose quand le **bas de la goutte** touche
terre, pas quand le milieu de sa planche l'atteint : sinon elle s'enfonçait de sept unités
dans le trottoir avant de devenir une tache.

Les deux photos font 1 254 rangées et s'affichent à une soixantaine d'unités : elles sont
**ramenées à 320 et 220 rangées** — encore le double de ce que l'écran demande — ce qui fait
tomber les 342 Ko de départ à 117, et moyenne au passage le grain du JPEG.

Un dernier détail de méthode : la tache au sol ne se posait dans **aucun état visité** par la
sonde qui mesure les tailles d'affichage — il faut un pigeon, de la chance et du temps — de
sorte qu'elle sortait absente du fichier des tailles et que le mode pixel n'avait pas de
planche à lui donner. Les deux états sont maintenant posés à la main dans la promenade.

### Une poubelle, un cône, et le jour où il a fallu la nommer

Deux obstacles de plus pour la rue, sur une même feuille. La poubelle monte à **180
unités** — 151 à franchir — et le cône à **118**, soit 99 à franchir : c'est le plus bas du
jeu, celui sur lequel on apprend à sauter. Les deux entrent dès le premier mètre.

Le cône est exactement l'objet à rayure blanche peinte qu'on attendait. Ses bandes sont à
**quatre** unités du papier — plus près que ne l'étaient les vraies fentes du banc — et
aucun des critères trouvés jusque-là ne les en distingue :

| | écart au papier | allongement | traversée de son objet |
| --- | --- | --- | --- |
| bandes du cône *(peintes)* | **4** | 1,1 et 1,5 | 63 et 66 % |
| fentes du banc *(vraies)* | 4 à 13 | 1,4 à 26,7 | 19 à **71 %** |

Une fente du banc traverse *plus* de son objet qu'une bande du cône ne traverse le sien : le
critère qui semblait le plus structurel — « une bande peinte va d'un bord à l'autre » — dit
le contraire de la vérité. Ce qui sépare vraiment, c'est de savoir ce que le dessin
représente, et ça ne se mesure pas.

On l'écrit donc, au lieu de continuer à chercher : chaque feuille porte **une taille au-delà
de laquelle une tache n'est plus un vide**. C'est du même ordre que le seuil du papier ou la
taille de la poussière, qui appartiennent déjà à chaque feuille depuis le début.

| feuille | plafond | ce qu'il sépare |
| --- | --- | --- |
| banc, boîte, trottinette | 8000 px | son plus grand vide vrai en fait 5049 |
| poubelle, cône | 2000 px | vides ≤ 637, bandes du cône 7523 et 12284 |

**Et la chaîne était trop courte.** Une silhouette vit jusqu'à ce que son bord gauche
franchisse le seuil de sortie, calculé sur la plus large du monde : −1543 pour la ville,
dont les immeubles font jusqu'à 1108 unités de large. Semée depuis −400 comme avant, la rue
n'avait que **trois** silhouettes pour couvrir tout cet intervalle : quand la plus à gauche
repartait, il arrivait que les deux autres soient déjà sorties par la gauche elles aussi,
et la replanteuse butait alors sur son garde-fou — elle reposait la silhouette au bord
droit de l'écran en laissant derrière elle un trou de 800 unités, une rue vide. **22 % des
replantations.** La chaîne part maintenant du seuil de sortie lui-même, et se sème un écran
plus loin sur la droite : elle garde un nombre fixe de silhouettes, chaque replantation lui
reprend à gauche ce qu'elle lui rend à droite, et comme ni la largeur ni l'écart tirés ne
sont les mêmes, sa longueur dérive au hasard — l'écran d'avance encaisse la dérive.

**Et surtout, c'est le NOMBRE de silhouettes qu'il faut fixer, pas jusqu'où on sème.** La
chaîne garde jusqu'à la fin de la partie le nombre qu'on lui donne au départ : chaque
replantation lui reprend à gauche ce qu'elle lui rend à droite. Semée « jusqu'à telle
abscisse », ce nombre était tiré au hasard avec les premières largeurs — quatre si le sort
avait donné des immeubles, et ces quatre-là ne couvraient plus rien le jour où ils
devenaient des lampadaires de 80 unités de large. Le trou revenait. Le compte se calcule
donc sur le **pire cas** : assez de silhouettes pour tenir de bout en bout même si toutes
étaient la plus étroite du monde, collées à l'écart minimal. Quand elles sont larges, les
dernières attendent loin à droite, ce qui ne coûte rien.

| | chaîne | garde-fou utilisé | plus grand trou | écart maximal demandé |
| --- | --- | --- | --- | --- |
| semée depuis −400 | 3 | 22 % des replantations | 799 | 220 |
| semée depuis le seuil | 5 | jamais… puis 4 % | 753 | 220 |
| comptée sur le pire cas, la ville | 15 | **jamais** | **360** | 360 |
| comptée sur le pire cas, la ferme | 10 | **jamais** | **367** | 369 |

Le plus grand trou vaut désormais exactement l'écart maximal du monde : il n'y a plus
d'autre trou que ceux qu'on a demandés.

### La rue paraissait plus chargée, et le compte disait le contraire

Impression à l'usage : trop d'obstacles en ville. Mesuré sur douze cents obstacles par
monde, c'était **faux au sens strict** — les deux mondes étaient réglés à l'identique :

| | obstacles par km | sol libre entre deux (médiane) | au minimum |
| --- | --- | --- | --- |
| la ferme | 11,1 | 611 | 600 |
| la ville, avant | 11,4 | 614 | 600 |

Mais l'impression avait raison d'une façon que le compte ne dit pas : **les obstacles de la
ville sont hauts et étroits** — borne, boîte aux lettres, trottinette — là où ceux du champ
sont larges et bas. Ils se lisent comme des murs et non comme des choses posées. On a donc
donné plus d'air à la rue pour de bon, et l'espacement est devenu une propriété du monde,
comme le reste.

Deux termes montent ensemble, parce qu'ils ne commandent pas au même moment : **l'espace
garanti** derrière le précédent (600 → 860 unités), qui décide quand on va vite, et
**l'attente** en secondes (×1,28), qui décide quand on va doucement. N'en relever qu'un
aurait desserré le début de partie sans rien changer à la fin, ou l'inverse.

| la ville, après | 8,7 | **869** | **862** |
| --- | --- | --- | --- |

La ferme n'a pas bougé d'une unité.

### La ligne de crête, refaite à pleine résolution

Une **troisième silhouette** est venue s'ajouter aux deux premières, et les trois ont été
retaillées entières. Elles avaient été ramenées à 640 pixels, la taille qu'on donne
d'habitude aux planches de fond ; c'était trop peu. Elles s'affichent à plus de 530 unités
de large, soit 1300 pixels d'écran sur un téléphone à trois pixels par point : agrandies
de deux fois, ça se voyait. Le mode pixel ne s'en apercevait pas — il réagrandit de toute
façon avant de voter — mais le mode trait, si.

Rien n'empêchait de les garder entières : le jeu ne lit que leur **alpha**, il les repeint
en aplat à la couleur de l'heure. Leur intérieur est donc devenu un gris unique, et le
résultat est que les trois planches, deux fois plus fines qu'avant, **pèsent moins** que
les deux d'avant — 61 Ko contre 108 : ce que transportaient les anciennes, c'était le grain
du papier, que personne ne verra jamais.

| | avant | après |
| --- | --- | --- |
| `ville_fond0` | 530 px, 50 Ko | **1013 px, 22 Ko** |
| `ville_fond1` | 649 px, 58 Ko | **1099 px, 20 Ko** |
| `ville_fond2` | — | **1082 px, 19 Ko** |

Les fenêtres restent percées : 83, 41 et 88.

### L'ombre qui était dessinée mais qu'on ne voyait pas

Signalé : la bouche d'incendie n'a pas d'ombre. Le code en dessinait pourtant une, comme
pour tous les obstacles posés au sol. Ce qui manquait, c'est qu'elle se **voie** : l'ombre
est peinte *avant* l'objet, et l'objet la recouvre sur toute sa propre largeur.

On l'a donc mesurée telle qu'elle arrive à l'écran, et non telle qu'elle est appelée : deux
images de la même scène, l'une avec `ombres`, l'autre sans, et on compte les pixels qui
diffèrent. Zéro pixel, pas d'ombre.

| | avant | après |
| --- | --- | --- |
| brouette | 10 002 | 8 312 |
| banc | 9 668 | 9 576 |
| barrière de chantier | 11 314 | 5 981 |
| trottinette | 4 762 | 4 887 |
| ballot | 4 347 | 4 923 |
| fourche | 2 359 | 2 285 |
| seau | 1 043 | 1 394 |
| **bouche d'incendie** | **69** | **1 134** |

Le coupable était le placement. L'ombre était calée par une **remontée tenue à la main** —
13 unités pour les objets massifs, 8 pour le seau et la fourche, 3 pour la barrière — et
une remontée fixe ne veut rien dire quand les ombres n'ont pas la même hauteur. Celle d'un
gros objet est haute et dépassait sous lui ; celle d'un petit est plate et restait tout
entière **dans** son dessin. La bouche d'incendie, la plus petite et la seule dont le pied
soit aussi large que le corps, n'en montrait plus rien.

Deux contraintes remplacent la table, et elles se posent d'elles-mêmes sur n'importe quelle
taille :

- **le bas** de l'ombre passe 5 unités sous la base du dessin — c'est ce liseré qui se voit,
  et il est le même pour tous, du plus gros au plus petit ;
- **le haut** ne remonte jamais au-dessus de la ligne de sol, sans quoi la barrière, qui
  n'est enfoncée que de deux, verrait la sienne se détacher derrière elle en plein ciel.

C'est cette seconde contrainte qui aplatit l'ombre des objets peu enfoncés — la barrière
perd la moitié de la sienne, et c'est correct : elle en avait trop, pas assez enfoncée pour
la porter. Vérifié dans les deux styles, les douze obstacles ont maintenant une ombre
visible.

### Les obstacles de la ville, plus gros et plus bas

Les cinq ont pris **12 %**, et la trottinette **30**. Posée de biais sur ses deux roues,
elle occupe moins de place à taille égale que le banc ou la barrière, et elle passait pour
un jouet à côté d'eux. Leur creux sous la ligne d'horizon a grandi aussi : de six
centièmes de leur hauteur pour les cinq, de treize pour le **banc** et la **trottinette**,
les deux qui restaient assis trop haut.

Ce que ça change vraiment, c'est la hauteur à franchir — la hauteur *moins* le creux — et
elle ne va pas dans le même sens pour tous :

| | avant | après |
| --- | --- | --- |
| Banc | 116 | **110** |
| Bouche d'incendie | 107 | **113** |
| Trottinette | 113 | **127** |
| Barrière | 125 | **131** |
| Boîte aux lettres | 132 | **138** |

Le saut, lui, monte à 321. Les cinq tuent toujours, les cinq se franchissent toujours d'un
seul saut.

### Un journal dans le vent

Une feuille de papier dans le vent, ce n'est pas un oiseau : ça ne va pas quelque part.
**Trois mouvements se superposent, et c'est leur désaccord qui fait le vent** — trois
périodes qui ne retombent jamais ensemble, donc une trajectoire qui ne se répète pas.

**La bourrasque.** Il ne dérive pas à vitesse constante : le vent le pousse, mollit, le
reprend. Mesuré sur une traversée, sa vitesse horizontale va de **121 à 546 unités par
seconde** — il stalle presque, puis il file plus vite que le décor.

**La portance.** Il monte et redescend en larges courbes : 168 unités d'amplitude sur une
traversée de 3,3 secondes. Deux souffles, l'un lent et ample — le vol plané — l'autre bref
et court — le tremblement de la feuille.

**La vrille.** C'est elle qui dit « papier » plutôt que « pierre », et elle fait deux
choses à la fois. Le journal **s'incline** — de −28° à +17°, son balancement propre plus la
pente de sa trajectoire : nez en bas quand il tombe, nez en l'air quand il remonte. Et il
**gauchit**, sa largeur respirant entre elle-même et **86 %** d'elle-même, juste de quoi
suggérer que la feuille n'est pas plate.

Ce gauchissement-là était d'abord un tour complet : le journal passait par la tranche, se
réduisait à un fil, puis reparaissait retourné. C'était juste, physiquement, et c'était
trop — à cette échelle on ne lisait plus un journal, on lisait une carte qui tourne. Il ne
se retourne donc plus, et l'écrasement reste discret.

Vérifié qu'aucune traversée n'en répète une autre : sur dix journaux tirés au hasard, leurs
courbes de hauteur diffèrent de 187 unités en moyenne, et de 19 pour les deux plus proches.

**L'altitude est écrite en position, pas intégrée d'une vitesse.** C'est la correction qui
comptait. Intégrer une vitesse en sinus ne revient pas au point de départ : sur une
traversée de trois secondes, la période lente n'a pas le temps de se boucler, et le journal
dérivait jusqu'à 468 unités dans un sens — mesuré, il finissait **322 unités sous la ligne
d'horizon**, un journal qui vole sous le trottoir. Écrite en position, son altitude est
bornée par construction, et la vitesse verticale dont on a besoin pour l'incliner devient
la **dérivée exacte** de cette position : elle ne peut plus la contredire.

**Sa bande d'entrée se calcule, elle non plus ne peut pas être écrite en dur.** Le bandeau
du haut descend d'autant plus bas, *en unités de monde*, que l'écran est court : 123 unités
sur un téléphone, 190 sur une fenêtre de bureau couchée. Calé sur une bande fixe, le
journal passait derrière lui.

### Le journal devient un obstacle

Il était du décor. Il tue maintenant, et le passage a demandé trois choses.

**Un seul test pour ce qui vole.** Trois endroits du jeu posaient la même question — qui
n'a pas d'ombre, sur quoi une mouche ne se pose pas, quel espace garantir derrière le
dernier obstacle — et chacun l'écrivait à sa manière en citant le cerf-volant par son nom.
Le journal aurait été un quatrième nom à ajouter aux trois. Il y a une seule question, il
n'y a plus qu'un seul test : `enVol`.

**Une boîte de collision qui ne peut pas épouser la planche.** Le journal tourne de trente
degrés et sa largeur respire jusqu'à 86 % : une boîte calée sur le dessin mordrait le ciel
dès qu'il s'incline. Elle est donc prise au cœur, et ce qu'elle vaut est mesuré et non
deviné — on dessine le journal seul sur une toile vide à vingt-quatre instants du cycle et
on compte. Elle couvre **96 % d'encre en moyenne, 91 % au pire**, et jusqu'à 48 % du dessin
lui échappe : c'est le bon sens de l'erreur, on est parfois frôlé sans mourir, jamais tué
par du vide.

**Un plancher, et c'est une question de justice.** La poule ne sait pas se baisser : tout
ce qui passe à hauteur de course est un obstacle qu'elle ne peut ni franchir ni éviter. Les
oiseaux ont toujours eu ce plancher — ils n'entrent jamais plus bas que 190 — et le journal
en avait d'autant plus besoin qu'il dérive au hasard : on ne peut pas demander d'anticiper
une trajectoire qu'on ne devine pas. Mesuré sur trois cents envois avant correction, il
descendait à **54 unités du trottoir**. Il en est maintenant à 200 au moins.

Sur un écran court la place manque pour tout loger — le ciel d'une fenêtre de bureau
couchée ne fait que 475 unités. C'est alors **l'amplitude qui cède, pas les gardes** : le
journal y flotte moins, mais il ne passe ni derrière le bandeau ni à hauteur de course.

| écran | le plus bas (plancher −200) | le plus haut | bas du bandeau |
| --- | --- | --- | --- |
| 390×844 | −230 | −961 | −1137 |
| 360×640 | −228 | −659 | −828 |
| 430×932 | −246 | −972 | −1145 |
| 820×420 | −208 | −488 | −656 |

Il suit enfin la règle du cerf-volant : jamais deux à la fois, jamais deux d'affilée. Il
dérive lentement et reste longtemps en vue — deux de suite, c'est le même obstacle deux
fois. Sa largeur est passée de 96 à **150 unités**, à peu près celle de la poule.

### Le pigeon de la ville, et pourquoi sa chaîne est plus courte

Le ciel de la ville revient au **pigeon** ; le corbeau reste l'oiseau de la ferme. Même
poids (19), même distance d'entrée (170 m), seul le dessin change.

Sa préparation a demandé beaucoup moins de travail que celle du corbeau, et pour une raison
qui compte : **ses trois poses sont sur la même feuille**. Le corbeau venait de trois
fichiers séparés, et il fallait donc estimer l'échelle de chaque pose sur des repères
indépendants — le bec, l'œil, le corps — puis vérifier que les trois s'accordaient. Ici il
n'y a rien à estimer : la main qui a dessiné les trois les a dessinées à la même taille. Le
seul travail était de les **découper sans perdre cette taille**.

D'où la règle du découpage : la boîte d'encre de chaque pose est mesurée *par rapport à son
œil*, on prend l'union des trois, et les trois sont taillées avec cette même boîte. Les
planches sortent identiques au pixel près et calées sur l'œil — l'oiseau ne saute pas d'une
image à l'autre, seules ses ailes bougent. L'œil, parce que c'est le seul fond **enfermé**
de chaque pose, donc trouvable sans rien deviner, et parce que c'est le point de la tête
qui ne bouge pas.

Les trois yeux font **684, 684 et 653 pixels**. C'est une vérification et non une
hypothèse : trois yeux de la même taille, c'est trois poses à la même échelle.

**L'échelle de jeu se pose sur le corps, pas sur la planche.** Le corps du pigeon fait 62
unités de long, contre 82 au corbeau et 102 à l'aigle : c'est le plus petit des trois, et de
loin. Son envergure ailes hautes est pourtant plus ample que celle du corbeau, si bien que
sa planche (136×161) reste plus haute que la sienne (132×143) alors que son corps ne fait
que les trois quarts. C'est le corps qui commande, jamais la planche.

Sa boîte de collision n'est pas écrite à la main : c'est l'**intersection** du corps épais
de ses trois poses. Ce que les trois ont en commun est exactement ce qui ne bouge pas, et
c'est la seule part de l'oiseau qu'une boîte fixe puisse suivre honnêtement. Mesuré, ce
qu'elle couvre d'encre sur chaque pose :

| | ailes hautes | milieu | ailes basses |
| --- | --- | --- | --- |
| aigle | 74 % | 83 % | 82 % |
| corbeau | 83 % | 88 % | 77 % |
| **pigeon** | **96 %** | **96 %** | 77 % |

**Un piège d'essai au passage.** Le premier contrôle disait « le pigeon ne tue pas ». Il
était faux : il posait l'oiseau à un endroit choisi au jugé, et l'ancre du pigeon n'est pas
au même endroit dans sa planche que celle du corbeau — la boîte ne touchait tout simplement
pas. Le contrôle balaie maintenant tout le voisinage de la poule et cherche un recouvrement
réel au lieu de le supposer. Les trois oiseaux tuent.

### Le corbeau, mis à l'échelle sur trois repères

Trois dessins, un seul canevas, comme l'aigle. Mais l'échelle de chaque pose n'est pas
devinée : elle est lue sur trois repères indépendants, et c'est leur accord qui la
valide.

| pose | longueur du bec | épaisseur du bec | √ aire de l'œil | retenue |
| --- | --- | --- | --- | --- |
| ailes hautes | 1,100 | 1,115 | 1,094 | **1,103** |
| ailes tendues | 1 | 1 | 1 | **1** |
| ailes basses | 1,248 | 1,236 | 1,265 | **1,250** |

Trois mesures qui ne se parlent pas, d'accord à un centième près : les dessins sont bien
le même oiseau à trois tailles.

Le bec ne se relève pas si facilement. C'est la seule matière grise du dessin —
`rgb(88,88,88)`, entre le noir du corps à 40 et le papier à 246 — mais entre l'encre et
le papier le lissage passe par **tous** les gris, et le liseré du contour entier répond
au test. On ouvre donc le masque d'un rayon proportionnel à la taille du dessin — le
liseré fait deux ou trois pixels, le bec en fait des dizaines — et on garde la plus
grosse tache qui survit. Les serres, grises elles aussi mais fines, tombent avec le
liseré. La bande mangée par l'ouverture est ensuite rendue, pour que la mesure soit
celle du dessin et non celle du noyau.

Le point d'ancrage est le **centre de l'œil**, point fixe de la tête. Une fois les trois
poses mises à l'échelle et calées dessus, les trois pointes de bec tombent à moins de
deux pixels et demi les unes des autres, sur huit cent soixante-treize de large.

### Le corps, c'est ce qui ne bouge pas

La boîte de collision ne doit contenir que le corps, jamais l'envergure. Relevée sur la
seule pose du milieu — « ce qui est épais », par opposition aux ailes qui sont minces —
elle contenait encore la racine de l'aile, qui remonte dans le dos : mesurée en jeu, la
boîte flottait **huit unités trop haut**, au-dessus du dos plutôt que sur le corps.

Le vrai corps, c'est **ce qui ne bouge pas quand les ailes battent** : l'intersection
des trois poses, une fois calées sur le même canevas. Elle donne la tête, le bec, le
tronc, la queue et les serres, sans une plume d'aile. On en garde la partie épaisse et
la boîte se centre dessus.

### Plus petit, et il bat plus vite

Monté à la taille de l'aigle, le corbeau pesait autant que lui à l'écran — or c'est un
corbeau, pas un rapace. Tout a été **réduit d'un cinquième**, et du même facteur : la
planche, l'ancre, la boîte. Rien ne se décale, et les planches pixel ont été refaites au
nouveau grain (193 colonnes pour 64,4 pixels CSS, soit un pixel d'art par pixel d'écran).

| | aigle | corbeau, premier montage | corbeau |
| --- | --- | --- | --- |
| planche | 319 × 171 | 165 × 178 | **132 × 143** |
| corps mesuré | — | 110 × 32 | **88 × 26** |
| boîte de collision | 102 × 48 | 102 × 40 | **82 × 32** |

Le battement, lui, **accélère** : un petit oiseau bat plus vite qu'un grand. Quatre
images par cycle à douze images par seconde, soit **trois battements complets par
seconde** contre 1,9 auparavant. Compté sur le vrai dessin, en espionnant les planches
posées pendant deux secondes de jeu : 24 changements d'image, exactement les trois
battements attendus. Pour comparer, la poule en fait 3,25 et l'aigle 1,9.

### Un poids plus fort pour la même présence

Le corbeau est d'abord sorti au poids exact de l'aigle, 16 sur cent. Et il paraissait
plus rare. Mesuré sur cinq courses de dix minutes, il ne l'était pas : il était **lancé
un peu plus souvent** que l'aigle — 9,2 oiseaux par minute contre 8,8 — puisque le
cerf-volant avait quitté le chapeau et que sa part s'était redistribuée.

Ce qui avait baissé, c'est le **temps de présence** : un oiseau à l'écran 13,3 % du temps
contre 15,3 % pour l'aigle d'avant. La raison est mécanique. Le corbeau est plus petit,
donc il dégage le cadre plus tôt ; la règle qui interdit deux oiseaux à la fois le remet
plus vite dans le chapeau, et on le relance sans l'avoir vu davantage. Plus de départs,
moins de ciel occupé.

C'est la présence qui se remarque, pas le compte des départs. Son poids passe donc à
**19** :

| | lancés par minute | un oiseau à l'écran |
| --- | --- | --- |
| aigle d'avant (16, avec le cerf-volant) | 8,8 | **15,3 %** du temps |
| corbeau à 16 | 9,2 | 13,3 % |
| corbeau à 19 | 10,9 | **15,8 %** |

Moyennes de cinq courses de dix minutes chacune : une seule course bouge d'un point et
demi d'une fois sur l'autre, et le poids se serait choisi sur du bruit. Vérifié au
passage, sur vingt parties de quatre mille mètres : 17,4 % de ce que la ferme lance,
aucun aigle, aucun cerf-volant, jamais deux oiseaux à l'écran en dix minutes de course.

## L'aigle, mis de côté

*Il ne vole plus dans la ferme — c'est le corbeau qui y tourne. Tout ce qui suit reste
vrai et reste dans le fichier : il attend son monde.*

Trois dessins, **posés tels quels**, affichés l'un à la suite de l'autre. Pas de
corps commun ici : les trois dessins partagent déjà corps, tête et queue, et une
composition n'apporterait rien qu'un endroit de plus où quelque chose peut se voir.

Ils arrivaient sur un blanc chaud avec des traits de vitesse dont le jeu n'a pas
besoin : le fond est reconnu clair et peu coloré, le remplissage part des bords, et
seule la plus grosse composante est gardée — les traits de vitesse restent dehors.
Ils sont retournés comme le reste et calés sur la **tache blanche de la tête**, seul
repère commun sûr : mise à l'échelle 0,985, 1,000 et 0,994, moins de deux pour cent
d'écart entre les trois.

Une quatrième position s'est ajoutée entre les ailes levées et l'horizontale, pour
que la descente ne se fasse plus en un seul pas. `EAGLE_BAT` suit la longueur de la
liste — de 5,7 à 7,6 — pour que la cadence ne bouge pas.

L'ordre n'est pas donné, il est mesuré : le dessin dont le sommet est le plus haut
est celui aux ailes levées — rangée 21, contre 262 et 263 pour les deux autres — et
parmi ceux-là, celui qui descend le plus bas est celui aux ailes basses, 606 contre
581. Le cycle les parcourt dans cet ordre, et `EAGLE_BAT` suit la longueur de la
liste pour que la cadence ne bouge pas : 1,9 battement par seconde.

## Les trois plans

Le décor défile sur trois épaisseurs, à trois vitesses, ce qui donne la
profondeur :

| Plan | Contenu | Vitesse |
|---|---|---|
| Premier | Sol, obstacles à sauter, herbe et cailloux | pleine |
| Deuxième | Arbres, sapin, cyprès, tracteur, moulin, grange, panneaux | un tiers |
| Au loin | L'éolienne de pompage, posée sur la crête | un dixième |
| Fond | Collines rondes | un dixième |

Trois valeurs étagent la profondeur : la plus claire pour les collines du fond,
une plus foncée pour les arbres du deuxième plan, et l'encre des dessins de
devant. Une quatrième s'en déduit — le tiers du chemin entre les deux premières —
pour ce qui se tient *sur* la crête sans lui appartenir. La ligne d'horizon prend la teinte des arbres — elle marque le fond du
champ, elle n'y appartient pas.

Ce sont des aplats opaques : rien ne se voit au travers. Ils suivent quand même
l'heure du jour — chaque dessin est reposé puis rempli en `source-in` dans un
calque à part, ce qui n'en garde que la silhouette et lui donne la couleur du
moment. La teinte est arrondie par paliers et sert de clé de cache : sur une
journée entière elle ne prend qu'une trentaine de valeurs, soit une repeinte
par seconde environ au lieu de dix-huit par image.

### Tout l'arrière-plan a grossi, et le deuxième plan deux fois

Les silhouettes du fond ont d'abord été **agrandies d'un facteur 1,4**, arbres, tracteur,
moulin, panneaux, collines et massifs compris. Puis le **deuxième plan seul** a repris
1,35 par-dessus, les massifs restant où ils étaient. Soit **1,89 depuis le départ** pour
les arbres et le moulin — c'est une campagne vue de plus près, pas une campagne plus
lointaine.

| | au départ | ×1,4 | et le deuxième plan ×1,35 |
| --- | --- | --- | --- |
| plus haut massif | 484 | **678** | 678 |
| moulin | 328 | 459 | **620** |
| chêne | 278 | 389 | **525** |
| panneau flèche | 78 | 109 | **147** |

Les **écarts** ont suivi les mêmes facteurs à chaque fois — 45 → 85 et 150 → 284 entre
deux silhouettes du deuxième plan, 250 → 350 de chevauchement entre deux massifs. Sans
cela, la campagne n'aurait pas été la même en plus grand mais la même en plus serré : des
arbres à taille double collés les uns aux autres, et une ligne de crête où les sommets se
succèdent deux fois trop vite. Les planches pixel ont été refaites au nouveau grain à
chaque fois — vérifié sur les dix-huit silhouettes, chacune a le nombre de colonnes que
sa taille d'affichage demande, à un pixel près sur une seule d'entre elles (arrondi).

Ce grossissement a réveillé une valeur écrite en dur. Une silhouette est recyclée quand
son bord **gauche** passe un seuil de sortie ; il faut donc que ce seuil soit plus loin
que la plus large des silhouettes, sinon on en voit une disparaître en plein écran. Les
seuils valaient 600 et 1 100 quand le massif le plus large en faisait déjà 987 : la marge
tenait à treize unités, et elle serait tombée du mauvais côté. Ils se **calculent**
maintenant sur les tables de hauteurs, une fois les planches chargées, et ils ont suivi
tout seuls au deuxième agrandissement : 640 puis 836 pour le deuxième plan, 1 572 pour
les massifs. Vérifié sur dix minutes de
course, image par image : aucun recyclage à vue, et aucun trou dans la ligne de crête.

Les massifs du fond forment une chaîne continue : chacun est placé à partir du
bord **droit** du précédent, moins un chevauchement, ce qui garantit le
recouvrement quelle que soit la silhouette tirée. Ce chevauchement est plafonné à
45 % de la largeur du nouveau venu — au-delà, un massif étroit placé derrière un
large n'avancerait plus du tout et la chaîne se figerait. Les arbres, eux, sont
placés à partir du bord gauche de leur voisin plus un écart : ils doivent
respirer.

Chaque arbre tire son propre coefficient de taille à la plantation, entre 1 et
1,32 : la valeur inscrite dans la table est un minimum, pas une taille. Le bâti et
les panneaux n'y sont pas soumis.

Le tirage du deuxième plan est pondéré, pour que la campagne ressemble à une
campagne : environ deux tiers d'arbres, un cinquième de panneaux, et un tracteur
ou un moulin de loin en loin.

| Silhouette | Fréquence |
|---|---|
| Arbres (5 dessins) | 66 % |
| Panneaux (3 dessins) | 22 % |
| Tracteur | 6 % |
| Moulin | 6 % |

### Le champ n'a plus de montagnes

Le fond du champ tenait sur deux familles : quatre **massifs à arêtes**, de 412 à 678
unités, et quatre **collines rondes**, de 146 à 221. C'était l'écart entre les deux qui
faisait le relief — et c'était une chaîne alpine derrière une ferme.

Les quatre massifs sont retirés, planches comprises : le fichier perd 400 Ko. Il ne reste
que les collines, et le relief vient maintenant d'ailleurs — de leur **taille, tirée à la
plantation**, comme un arbre du deuxième plan. Deux exemplaires du même dessin ne font plus
le même volume, et la crête monte et descend au lieu d'onduler à hauteur constante.

Ce n'est pas la perte de hauteur qu'on pourrait croire. On perd le sommet, on garde la
gamme — et on la garde **continue**, là où huit dessins ne donnaient que huit hauteurs :

| | avant | après |
| --- | --- | --- |
| dessins sur la crête | 8 | 4 |
| hauteurs possibles | 8, fixes | continues |
| gamme mesurée sur 58 km | 146 à 678 | **150 à 440** (médiane 254) |
| silhouettes distinctes vues | 8 | **39** |

**C'est la largeur qui plafonne la pousse, pas la hauteur.** Ces dessins-là sont très
larges pour ce qu'ils sont hauts — 867 à 1 236 unités de large pour 146 à 221 de haut, ce
sont des houles et non des buttes. Une colline au double fait donc déjà deux mille cinq
cents unités, soit **plus de trois écrans**. Au-delà, la crête n'aurait plus qu'une
silhouette à l'écran à la fois et ne varierait plus du tout. Le coefficient est donc arrêté
au double, et pas plus.

**En pixel, la taille ne varie pas** — la règle vaut ici comme pour les arbres : une
planche unique ne peut pas suivre une échelle continue sans changer la taille de ses
pixels, et c'est la seule chose du jeu qui n'ait pas le droit de bouger. Ce qui varie la
crête en pixel, c'est le **miroir** : quatre dessins, huit silhouettes, et pas un pixel
déplacé sur la grille. Vérifié en mesurant, pour les seize planches du champ, la largeur
d'affichage en pixels CSS divisée par la largeur de planche — ce quotient *est* la taille
d'un pixel d'art. En pixel, mille échelles tirées donnent toutes 1,00, et le grain va de
**0,33177 à 0,33415** pour un `PX_JEU` de 0,33333 : zéro planche hors grille, l'éolienne et
la grange comprises.

**Et la chaîne a dû être resemée.** Elle était semée « depuis −900 jusqu'à passer
VIEW_W + 1600 », ce qui tenait tant que le seuil de sortie valait −1 067 et que toutes les
silhouettes se ressemblaient. Depuis que les collines tirent leur taille, ce seuil est
descendu à −2 552 : la chaîne partait donc **mille six cents unités après son propre point
de recyclage**, et elle gardait ce retard toute la partie — chaque replantation lui reprend
à gauche exactement ce qu'elle lui rend à droite, le nombre ne bouge plus. Le garde-fou
reposait alors la colline au bord droit du cadre en laissant un trou derrière elle : **1 821
images** de ciel ouvert jusqu'à l'horizon sur dix minutes, la pire béante sur 188 unités.
Elle se sème maintenant comme le deuxième plan — sur un **nombre** calculé au pire cas
(toutes à la plus étroite, à leur plus petite taille, au chevauchement maximal), et depuis
le seuil de sortie. Zéro trou sur dix minutes, dans les trois mondes.

### L'éolienne, et pourquoi elle a sa propre bande

Une éolienne de pompage se tient au loin sur les collines. Elle n'est **ni sur la crête ni
au deuxième plan** : c'est une troisième bande, à la parallaxe de la crête — elle en fait
partie — mais **semée** et non chaînée. Ces objets-là ne se recouvrent pas, ils se croisent
de loin en loin.

Elle existe parce que la crête ne pouvait pas la porter. Mise dans la chaîne des collines,
l'éolienne se faisait **avaler** : la chaîne place chaque silhouette à partir du bord droit
de la plus avancée, en la reculant de son chevauchement, et une colline de mille unités
recule de quatre cents — c'est-à-dire qu'elle recouvre entièrement une éolienne de cent
soixante de large plantée juste avant.

**Et elle ne peut pas être de la couleur des collines.** Première version, peinte au ton de
la crête comme tout ce qui s'y trouve : elle disparaissait purement et simplement. Un objet
de la même couleur que le fond sur lequel il se détache n'a pas de contour, et une éolienne
de 260 unités plantée devant une colline qui en fait 300 n'existe plus — ce n'était pas un
cas rare, les collines vont jusqu'à 442.

Sa teinte ne se choisit donc pas, elle se **déduit de sa profondeur** : elle est sur la
crête, donc devant elle, et derrière le deuxième plan. On prend le tiers du chemin qui va de
l'une à l'autre. Assez pour qu'elle se lise sur n'importe quelle colline, assez loin du
deuxième plan pour qu'on ne la confonde pas avec un arbre du bord de route.

**Combien souvent.** L'écart se compte en unités de crête, et la crête ne va qu'au dixième
de la course : deux mille unités de fond valent vingt mille unités de terrain, soit une
bonne demi-minute à pleine vitesse. Posé entre 1 800 et 3 600, il laisse une éolienne à
l'écran **32,1 % du temps**, mesuré sur 58 km — assez pour que le champ en ait une, trop peu
pour qu'on croie à une ligne électrique.

Un défaut de tirage est tombé avec elle. Le tireur de clés interdit de sortir deux fois de
suite le même dessin ; sur une table qui n'en contient **qu'un**, cette règle n'a pas de
réponse et il rendait `undefined`. De là une largeur `NaN` qui contaminait toute la chaîne :
l'éolienne, seule de sa bande, partait à l'abscisse `NaN` dès le deuxième tirage et ne se
repeignait plus jamais. Une seule clé, c'est forcément celle-là.

### La grange

Elle est plus **basse** que les arbres — 330 contre 480 à 570 — et de loin la plus
**large** : son dessin fait une fois et demie sa hauteur, ce qui lui donne 520 unités,
presque les deux tiers de l'écran. C'est voulu, et c'est ce qui la distingue de tout le
reste du plan. Un chêne est un trait vertical ; une grange est une masse horizontale, et
c'est le seul objet du champ qui pose une longue horizontale derrière la course. Le moulin
domine par le haut, la grange par le côté. Au poids du tracteur et du moulin — quatre sur
cent — elle est passée **91 fois sur 58 km**, soit une fois et demie par kilomètre.

## Perspective

Le sol n'est pas vu de face : la ligne d'horizon est le fond du champ, et ce qui
est proche du spectateur se pose plus bas. Les appuis s'étagent donc, du plus
lointain au plus proche :

| Élément | Appui sous la ligne |
|---|---|
| Collines du fond, éolienne | 2 |
| Arbres, tracteur, panneaux, moulin | 4 |
| Herbe et cailloux | 7 à 47, tiré au hasard |
| Poule, aigles, mouches, particules | 14 |
| Obstacles à sauter | 19 |

Le sol porte deux sortes de détail, touffes d'herbe et cailloux, qui **se suivent
en alternance** : chaque nouveau venu prend la nature contraire de celui derrière
lequel il se pose. Tirée au hasard, la nature formait des plages de trois ou
quatre touffes d'affilée et l'alternance ne se lisait plus ; imposée, elle tient
sur 40 000 pas de simulation sans jamais deux voisins de même nature.

Ni les unes ni les autres ne sont sur la même rangée : chacune tire son propre
enfoncement, une sur trois descend nettement plus bas, et une sur huit se pose
tout devant, bien plus près du spectateur que les obstacles à sauter. Alignées, elles
faisaient une frise ; dispersées, elles donnent au sol de l'épaisseur.

L'écart entre deux détails est tiré lui aussi, et pas uniformément : le plus
souvent moyen, une fois sur cinq très serré parce que l'herbe pousse en bouquets
et que les cailloux traînent par deux, de loin en loin un vide franc. Un détail
sorti à gauche repart **derrière le dernier de la chaîne**, pas à une distance
quelconque du bord droit — sinon l'écart tiré ne voudrait rien dire et deux
dessins pourraient se retrouver l'un sur l'autre. Dix-sept détails à 112 unités
d'écart moyen couvrent près de trois largeurs d'écran : la fin de la chaîne
n'apparaît jamais au bord droit, et il en reste sept à l'écran comme avec
l'ancien semis régulier.

Les aigles et les mouches sont repris de la même façon, avec un autre repère : le
bec jaune pour l'aigle, l'œil rouge pour la mouche — présents et entiers dans
toutes les poses. Leurs traits de vitesse peints sont retirés : le jeu a les siens,
et un trait dans le sprite suivrait la bête au lieu de rester derrière elle. C'est
eux qui débordaient du cadre de deux cents unités.

Les dessins fournis regardent à droite ; l'aigle et la mouche traversent l'écran à
contre-sens et regardent à gauche dans le jeu. Ils sont donc **retournés** avant
tout le reste. Sans cela le calage par le bec posait le corps du mauvais côté de sa
boîte de collision — l'oiseau volait à côté de sa boîte au lieu d'être dedans.

Le cadre de l'aigle s'élargit vers la droite et un peu en haut et en bas ; son point
d'ancrage ne suit que la marge haute, si bien qu'il reste exactement où sa boîte
l'attend. Celui de la mouche s'élargit **symétriquement** : elle est dessinée
centrée sur sa position, une marge inégale la décalerait à l'écran.

Les sept obstacles et l'herbe sont repris de la même façon. Ces dessins-là portent déjà leur couche alpha
sur 256 niveaux — il n'y a rien à détourer, seulement à séparer les objets posés
côte à côte sur une même planche, ce que font les colonnes vides entre eux.

La planche d'herbe, elle, est arrivée aplatie sur un damier de transparence : deux
blancs très proches qu'un remplissage depuis les bords traverse mal. Le fond y est
reconnu à ce qu'il est clair et sans couleur — l'herbe est verte et son trait sombre
— puis la couverture est reconstruite depuis la forme, comme partout ailleurs.
Déduite de la clarté, elle laissait un liseré blanc sur chaque brin.

Pour tous, **la hauteur de jeu ne bouge pas** — c'est elle qui pilote la difficulté
— et la largeur suit le rapport du nouveau dessin. Les écarts sont de l'ordre du
pour cent. Les boîtes de collision étant mesurées sur les dessins au démarrage,
elles changent avec eux : une seule a bougé de plus d'une unité, celle de la botte,
de deux unités en largeur. Elles ont été redessinées par-dessus les sept obstacles
pour vérifier qu'aucune ne mord sur le socle d'herbe.

Le seau est arrivé en JPEG sur du blanc : ni couche alpha, ni fond dégradé. Son
corps est gris clair et sa flaque presque blanche — un seuil de clarté les
mangerait. On se fie donc au trait : remplissage arrêté par l'encre seule, fermée
au préalable. Sa boîte reste écrite à la main, mais elle n'est plus devinée : les
colonnes hautes du dessin donnent le corps du seau, la flaque et les gouttes étant
basses et plates. Sur le dessin d'origine, la mesure retombait à 30,1 % – 85,4 % de la
largeur, contre 30,1 % – 87,3 % pour la valeur réglée à l'œil qu'elle remplaçait. Le
seau a été redessiné deux fois depuis ; sur le dessin actuel elle donne 29,1 % – 86,2 %.

Cette règle des colonnes hautes a été recoupée par une autre, indépendante : le corps
du seau, ce sont les colonnes qui contiennent beaucoup de matière — le seau est haut,
la flaque est plate. Elle donne 29,2 % – 85,5 %, à un dixième de pour cent près la
même chose. Le seau étant penché, on pouvait craindre que le bas de son ouverture
passe sous la coupure des 55 % ; les deux mesures d'accord montrent que non.

### Les six obstacles redessinés

Six des sept obstacles au sol — la botte, les deux bottes, le seau, le pneu, la
fourche et la brouette — ont été refaits sur des dessins plus nets. Seule la
barrière garde le sien, faute de nouveau dessin.

Le détourage est celui du seau, devenu la méthode commune : est fond ce qui est à la
fois **très clair et gris**, inondé depuis le bord ; ce qui touche le bord du scan est
écarté ; la couleur est étalée vers l'extérieur puis la couverture reconstruite sur
une carte de distance, l'iso-niveau rentré de cinq unités pour supprimer l'auréole
blanche. Une planche portait deux objets côte à côte — la botte et le pneu : les
composantes les plus grosses servent de noyaux et chaque touffe d'herbe, chaque
caillou rejoint le noyau dont il est le plus proche.

### Les trous à jour

Un remplissage qui part du bord n'atteint pas le fond que le trait **enferme** : le
triangle du cadre de la brouette, l'espace entre les dents de la fourche, celui entre
les deux lisses de la barrière restaient pleins, et le décor ne se voyait pas au
travers. Mais toute zone claire enfermée n'est pas un trou — le corps du seau est peint
en blanc et doit rester.

Deux mesures les séparent, et aucune ne suffit seule.

La **couleur** d'abord : un trou, c'est la page elle-même. On mesure l'écart quadratique
moyen de la zone à la couleur de la page, prise dans un coin. Les vrais trous tombent
entre 1,85 et 3,83 ; le blanc peint, qui porte toujours un peu d'ombre, entre 5,16 et
8,32. Le seuil est posé dans l'écart, à 4,5.

La **taille** ensuite : les reflets qui courent le long des tubes de la brouette sont eux
aussi du blanc presque pur, et la couleur seule les perçait — le cadre se mettait à
grésiller. Ils font 25 pixels quand le triangle du cadre en fait 6 283 : un
demi-millième de la planche les sépare sans ambiguïté. Avec les deux règles, il se perce
exactement un trou dans la brouette, trois dans la fourche, un dans la barrière, et rien
ailleurs.

Deux nombres pilotent la place d'un obstacle : sa hauteur de jeu et son **enfoncement**,
c'est-à-dire de combien il est planté sous la ligne de sol. Ni l'un ni l'autre ne se lit
directement dans un nouveau dessin, qui ne cadre pas l'objet comme l'ancien. Ils sont
donc **reportés** : on repère dans chaque dessin la dernière rangée encore bien fournie
— en dessous il ne reste que l'herbe, les cailloux et l'ombre — ce qui donne d'un côté
la hauteur propre de l'objet, de l'autre l'épaisseur du socle. La hauteur de jeu est
choisie pour que l'objet garde exactement la taille qu'il avait à l'écran, et
l'enfoncement est celui d'avant, remesuré sur les anciens dessins : 13 à 16 unités pour
les objets massifs, 22 pour la brouette, 10 pour la fourche.

La vérification est la bonne : la hauteur minimale pour franchir chaque obstacle est
**inchangée** pour cinq d'entre eux et bouge d'une unité pour la botte. Les dessins ont
changé, le jeu non.

Trois d'entre eux — les deux bottes, le seau et la fourche — ont ensuite été refaits une
seconde fois, sur des dessins encore un peu différents. Le même report a été rejoué tel
quel, et cette fois la hauteur de franchissement des sept obstacles ne bouge **pas d'une
unité**. La méthode se répète donc sans réglage.

Le cerf-volant a suivi, avec une différence : le nouveau dessin le montre dans le sens
où il vole, queue à gauche, si bien que le retournement qu'il fallait faire à
l'affichage disparaît. La coupure entre queue et losange n'est plus supposée à la moitié
de la largeur, elle est relevée sur le dessin — 49,0 % — et la boîte de collision est le
losange mesuré, non plus une fraction devinée.

La barrière a fini par avoir son dessin elle aussi, et les sept obstacles sont
maintenant de la même main. Le report la place à 240 × 115 : sa hauteur de
franchissement ne bouge pas d'une unité non plus, alors que le dessin n'a rien à voir
avec le précédent. Elle a été refaite deux fois, sur deux dessins de largeurs
différentes ; les deux fois le report a donné la même hauteur de franchissement au
chiffre près, en ajustant la largeur — 282 pour l'un, 240 pour l'autre.

Les deux bottes ont été grossies de huit pour cent sur demande. C'est le seul endroit où
le jeu bouge volontairement : il faut désormais monter à 92 unités pour les franchir au
lieu de 84.

Aucun n'est agrandi : les dessins sont réduits de 3,5 à 8,9 fois à l'écran. Le fichier
passe de 10,6 à 13,2 Mo.

Il ne reste du jeu d'origine que la plume du compteur de vol. Elle a longtemps servi
deux fois : c'est elle qui tombait aussi de la poule à chaque coup d'aile et par gerbes
de quinze quand elle meurt — ces plumes-là n'étaient au départ qu'une ellipse blanche
cernée d'encre.

Les plumes qui tombent ont maintenant leur propre dessin, plus net, et un cinquième plus
grand. La taille ne se règle pas sur le cadre : la plume est posée **en diagonale** et
n'occupe pas la même part de son cadre d'un dessin à l'autre. On mesure donc sa
**longueur** — la plus grande distance entre deux points de matière, prise sur un
échantillon du contour. Elle valait 23,6 unités à l'écran, elle en vaut 28,3.

Le dessin fourni est énorme au regard de son usage : 646 pixels de côté pour une plume
affichée à 22 unités, soit trente fois trop. Il est ramené à 256, ce qui laisse encore
onze fois la taille d'affichage et le fait tomber de 488 à 80 Ko. Le compteur de vol, lui,
garde son dessin d'origine.

Les cinq cailloux sont découpés d'un même dessin et mis à l'échelle d'un seul
coup, ce qui garde leurs tailles relatives : du bloc de 42 unités au gravier de
13. Chacun est découpé avec les gravillons qui le posent au sol — ce sont autant
de petites composantes séparées, rattachées au bloc le plus proche — et sans ceux
du caillou voisin, qui traversent parfois la même boîte. Les objets
posés au sol, la poule comprise, portent une ombre — un aplat d'encre très dilué,
sans contour. Celle de la poule reste au sol pendant qu'elle monte, en
rétrécissant et en pâlissant, mais ne disparaît jamais tout à fait : c'est le seul
repère qui dise où elle va retomber. Toutes remontent au-dessus de l'appui du dessin :
posées pile dessus, elles débordaient trop bas et l'objet semblait flotter au-dessus de
la sienne. La pose KO a la sienne, plus large et plus basse : calée sur la ligne
d'horizon comme celle de la pose debout, elle passait entièrement sous le ventre de la
poule à plat et ne se voyait plus.

Celles des obstacles remontent **plus** que celle de la poule. C'est qu'elles partent du
bas du dessin, alors que l'objet est planté sous la ligne de sol : le bas du dessin est
donc bien plus bas que l'endroit où l'objet touche terre, et l'écart vaut l'enfoncement,
deux à vingt-deux unités selon l'objet.

Une remontée unique ne peut donc pas convenir à tous, et chacun a la sienne. Treize pour
les objets massifs — les ballots, le pneu, la brouette. Huit pour le seau et la fourche,
moins enfoncés, dont l'ombre remonterait sinon dans leurs pieds. Trois pour la barrière,
enfoncée de deux seulement, dont l'ombre passerait au-dessus de la ligne de sol et se
détacherait derrière elle.

| | enfoncement | remontée | l'ombre finit à |
|---|---|---|---|
| ballot, ballots, pneu, brouette | 13 à 22 | 13 | 5 à 14 sous la ligne |
| seau | 11 | 8 | 8 |
| fourche | 6 | 8 | 3 |
| barrière | 2 | 3 | 4 |

Le rayon, lui, est le même pour tous : **46 % de la largeur**. Le seau l'avait déjà,
mais rapporté à son corps seul et non à son cadre — son dessin porte la flaque, qui
s'étale bien au-delà de lui et n'a pas à compter dans son empreinte.

Le reste est un décalage de rendu et rien d'autre. Le premier plan est translaté d'un
bloc au moment de le dessiner plutôt que dessin par dessin : ainsi rien ne peut
se désaligner, et aucune boîte de collision ne bouge — le jeu se joue exactement
comme avant.

## Cadrage

Le terrain est dessiné en hauteur : 800 unités de large pour 1250 au minimum de
haut. Sur un écran plus court que ce rapport, le jeu se centre entre deux bandes
plutôt que de laisser le sol sortir de l'écran ; sur un téléphone couché, il
demande de redresser l'appareil, où l'image serait réduite à une bande étroite.

## La finesse des dessins

Deux pertes distinctes, à ne pas confondre.

**La première est la résolution du dessin d'origine.** Les sprites livrés avec le
jeu ne gardaient que 262 pixels de hauteur de poule là où le dessin d'origine en
compte 544 : plus de la moitié avait été jetée avant d'en faire un sprite, et
aucun agrandissement ne la rend. La pose pattes écartées et la pose pattes croisées
sont donc reprises depuis les dessins eux-mêmes. Le trait y retrouve sa finesse :
1,33 % de la hauteur de la poule contre 1,52 % auparavant, pour 1,29 % dans
l'original.

Elles sont reposées dans le **cadre exact** du sprite qu'elles remplacent — tout le
calage du jeu (`FOOT_POSE`, `ANCH_X`, `ANCH_Y`, `SW`, `SH`) est écrit en fractions
de ce cadre. L'alignement se fait sur la hauteur du corps et sur la rangée des
pattes, pas sur la boîte entière : les ailes et la crête ne tombent pas au même
endroit d'une génération de dessin à l'autre.

Les deux dessins partagent le même corps — au-dessus de la rangée 436 leur alpha ne
diffère que de deux unités sur 255, et l'écart explose juste en dessous, là où les
pattes se séparent. La greffe des pattes croisées sur le corps des pattes écartées
est donc refaite à cette couture : les deux images du cycle ont un corps identique
au pixel près, écart mesuré nul.

Les **neuf** poses de poule sont reprises ainsi, arrêt compris. Le vol à
mi-battement ne sert plus depuis que le corps du vol est commun ; son dessin est
sorti du fichier.

Le cadre des sprites a dû être élargi : il coupait les pattes tendues des poses de
vol à gauche, les pattes repliées du saut en bas, le bec du gobage à droite. La
marge est mesurée sur les dessins eux-mêmes, pas choisie. Rien ne bouge à l'écran
pour autant — ce qui compte au rendu, ce sont les rapports `SW`/`SH`, `FOOT_Y`/`SH`
et `HEN_H`/`SH`. On élargit donc le cadre **et** on remonte `HEN_H` dans le même
rapport, ce qui laisse `sc()` inchangé ; les repères de calage se décalent de la
marge haute et gauche. Vérifié : plus un pixel ne touche le bord du cadre.

Et l'échelle ne réduit plus : chaque dessin est posé entre 1,01 et 1,42 fois sa
taille native, jamais en dessous. C'est le gobage qui commande — c'est lui dont le
dessin est le plus grand par rapport à son cadre. Les poses de vol ne se calent que
sur la crête — leurs pattes ne touchent rien ; les poses au sol reprennent en plus
la rangée du bas, pour que les pattes tombent exactement où `FOOT_POSE` les attend.
Le calage est vérifié pose par pose : la crête retombe à moins d'un pixel de sa
place, et le bas du dessin à moins de deux.

Le dessin du gobage porte une miette brune près du bec. Elle est retirée : le jeu
dessine sa propre mouche, et une miette peinte dans le sprite l'aurait suivie
partout. Elle est reconnue à sa couleur, pas à sa taille — les traits de vitesse
sont de la même finesse et doivent rester.

La pose du saut se cale sur la crête, comme celles de vol : le recalage par le bas
du dessin ne joue que quand la poule touche terre, et elle est en l'air. Ses traits
d'élan et son sol pointillé sont coupés — le jeu a sa propre poussière, et une
ligne de sol peinte dans le sprite serait montée avec elle.

La miette brune du dessin du gobage est retirée : le jeu dessine sa propre mouche,
et une miette peinte dans le sprite l'aurait suivie partout, bec fermé compris.
Elle est reconnue à sa couleur et non à sa taille — les traits de vitesse sont de
la même finesse et doivent rester.

**La seconde perte était le bord.** Vingt-quatre des dessins du jeu n'avaient que
**deux valeurs d'alpha**, zéro ou
plein : leur silhouette était un escalier, sans un seul pixel de transition. C'est
de là que venait le manque de finesse, bien plus que de la taille — la mesure
montrait qu'aucun dessin n'était agrandi à l'écran sur téléphone ni sur tablette.

Le bord leur est rendu par la géométrie et non par un flou : distance signée au
contour, calculée exactement, lissée juste ce qu'il faut pour arrondir les marches,
puis alpha continu sur environ un pixel de sortie. La couleur est étalée vers
l'extérieur avant, sans quoi le dégradé tirerait vers le vide et cernerait le
dessin d'un liseré clair. Pour une forme pleine ce n'est pas de l'interpolation :
la distance décrit le contour au sous-pixel, et le redessiner plus grand est exact.

Le seau est le seul dessin arrivé en JPEG, sans couche alpha : son détourage se
fait au remplissage depuis les bords, et il barrait ce remplissage avec l'encre du
trait. Or le trait de la flaque s'interrompt là où l'eau touche le seau : le
remplissage s'y engouffrait et la flaque perdait sa couleur, réduite à son contour.
On ne se fie donc plus au trait mais au fond — est fond ce qui est à la fois très
clair **et** gris. L'eau est bleue (saturation 20 à 40) et le seau, gris, est trop
sombre (luminance 222) : ni l'un ni l'autre ne passe le test, et une interruption du
trait ne laisse plus rien fuir. Deux conséquences à corriger ensuite : la bande
sombre que le scan laisse sur ses bords devient de la matière, écartée en jetant
toute composante qui touche le bord de la feuille — le dessin, lui, flotte au
milieu ; et la frontière tombe au pied du dégradé d'anticrénelage, là où le blanc
commence à peine à foncer, ce qui cernait la silhouette d'une auréole blanche. On
rentre l'iso-niveau de l'alpha de cinq unités pour la ramener au milieu du trait,
valeur calée sur le découpage précédent, qu'elle retrouve à un pixel près.

Le facteur d'agrandissement n'est pas choisi, il est mesuré : on prend l'écran le
plus exigeant visé — grand format en 2× — on demande trente pour cent de marge, et
le rapport à la taille native donne le facteur.

| Famille | Facteur mesuré | Appliqué |
|---|---|---|
| Poules, obstacles, aigles, mouches, herbe | 1,42 à 1,53 | 1,5 |
| Arbres, sapin, cyprès, moulin | 3,1 à 3,7 | 3 |
| Tracteur, panneaux | 1,5 à 1,9 | 2 |
| Massifs et collines du fond | 7,5 à 10,4 | 4 |

Les massifs étaient de loin les plus grossiers : ils couvrent le ciel avec 340
pixels de large. Leur reprise ne coûte pourtant presque rien, parce que `source-in`
remplace entièrement leur couleur : on peut donc les mettre à plat et ne garder
que la silhouette, qui se compresse à presque rien.

Deux économies gardent le fichier tenable. La couleur est agrandie **au plus proche
voisin**, et seuls les pixels tombant sur une frontière reprennent la valeur lissée
— sinon tout le dessin devient un dégradé et ne se compresse plus. Et les teintes
sont arrondies au multiple de quatre, un pas d'un et demi pour cent : invisible, et
le fichier y perd un cinquième.

Le fichier passe de 1,5 à 4,2 Mo. Il s'ouvre depuis le disque en un demi-seconde et
tient ses 60 images par seconde.

## Le fichier

Tout est dans `index.html`, sprites compris — ils sont encodés en base64 dans la
constante `B64`, ce qui explique la taille du fichier et la ligne interminable
en tête de script. Aucune dépendance, aucun outil de construction.

### La police

**Fredoka**, ronde et grasse, dans l'esprit des dessins. Elle est **embarquée** dans le
fichier comme le reste : le jeu ne demande toujours rien au réseau.

C'est la coupe latine variable servie par Google Fonts, **réduite aux 136 caractères que
le jeu peut afficher** — la liste est relevée sur le fichier lui-même, plus les lettres
accentuées et la flèche du clavier. 29,7 Ko deviennent 21,4.

Deux détails valent d'être notés :

- Son axe de graisse s'arrête à **700**, alors que le jeu demande jusqu'à 900. La face est
donc *déclarée* jusqu'à 900, ce qui fait que le navigateur s'y arrête au lieu d'ajouter un
faux gras par-dessus. Vérifié : 700, 800 et 900 rendent exactement le même dessin.
- Le canvas ne connaît que le **nom** de la police. Si elle n'est pas chargée quand il
écrit, il écrit dans la police de secours et n'y revient jamais tout seul. Le démarrage
attend donc `document.fonts.ready`, avec un garde-fou d'une seconde et demie.

Les chasses négatives ont sauté : Fredoka a des lettres larges et une espace étroite, et
le moindre resserrement collait « QUI » à « VOLE » dans le titre.

Elle est sous **SIL Open Font License 1.1** — Copyright 2016 The Fredoka Project Authors.
La mention de droit d'auteur est conservée dans la table de noms du fichier embarqué.

Les repères du code, dans l'ordre :

| Section | Contenu |
|---|---|
| Constantes | Dimensions des sprites, boîtes de collision, points d'ancrage |
| Profondeur | Vitesses des trois plans et tailles du décor de fond |
| Lumière du jour | Palettes horaires et interpolation du ciel |
| Carnet | Record, totaux et préférences en `localStorage` |
| Son | Bruitages synthétisés en WebAudio, aucun fichier audio |
| Vue | `resize()`, échelle, cadrage entre bandes |
| État | Machine à trois états, gel de la partie |
| Entrées | Appuis, comptage des doigts, mémoire du saut |
| Obstacles | Tirage, espacement, montée en difficulté |
| Particules | Poussière, plumes, traits de vitesse, pop du gobage |
| Rendu | Trois plans, ombres portées, sprites, puis HUD calé sur le terrain |

## Deux langues

Le jeu se lit en **français ou en anglais**, et le choix vit dans les réglages, sous le
choix du style. Au premier lancement il suit la langue du navigateur : le français pour
qui parle français, l'anglais pour tout le monde d'autre. C'est ce qui laisse le moins
de monde devant une langue qu'il ne lit pas.

Les phrases ne sont pas cherchées dans le HTML. Chaque élément porte **sa clé** en
`data-t` — `data-ta` pour un `aria-label`, `data-talt` pour un `alt` — et changer de
langue revient à parcourir ces clés une fois. Rien n'est reconstruit : ce sont les mêmes
éléments, seul leur texte change. Traduire une phrase de plus, c'est ajouter une ligne à
la table, pas retrouver où elle est écrite.

Le canevas, lui, ne stocke rien : il appelle `T()` **au moment de dessiner**. Ses textes
changent donc de langue sans qu'on ait à redessiner ou à invalider quoi que ce soit.

Deux détails qui ne vont pas de soi :

- **Les nombres passent par la phrase, pas l'inverse.** `%1 mouches en tout · %2 parties`
  contre `%1 flies in all · %2 games` : un bout de phrase collé à un nombre ne se traduit
  pas, parce que l'ordre des mots change d'une langue à l'autre.
- **Les trois phrases du panneau de fin dépendent de deux choses** — la partie qui vient
  de finir et la langue. Elles vivent donc dans leur propre fonction, qu'on peut rejouer
  quand la seconde change sans rejouer la première.

Quatre textes restent identiques dans les deux langues, et c'est voulu : *Start*,
*Game Over*, *Pixel*, et les deux langues nommées dans leur propre langue. Le voile de
chargement, lui, est traduit **avant tout le reste** : c'est le premier texte à l'écran
et il y reste le temps de décoder quatorze mégaoctets d'images.

`fontePixel()` est rejoué après chaque bascule : les corps sont en `clamp()` et les
phrases n'ont pas la même longueur d'une langue à l'autre, donc la grille de fonte qui
convient à un texte peut changer avec lui. Mesuré en anglais, le pixel apparent tient
entre 0,26 et 0,34 comme en français.

La vérification ne porte pas sur la table mais sur **ce qui est réellement affiché** :
on relève tout le texte du document dans les deux langues, couches ouvertes, et on
cherche ce qui n'a pas bougé. Restent les quatre textes voulus et les nombres.

## L'écran d'accueil

L'accueil n'est pas une page posée sur le jeu : le décor tourne derrière, la poule
piétine sur place et le ciel dérive au même rythme qu'en course. Ce qui s'y ajoute se
cale donc sur le **terrain** plutôt que sur la fenêtre.

L'écran se lit du haut vers le bas en trois temps :

| Bande | Contenu |
|---|---|
| Barre du haut | Le carnet : record, mouches gobées, parties jouées |
| Ciel | Le titre et sa phrase |
| Terre | Le bouton *Start*, seul |

Le **carnet** tient la barre du haut, comme le tableau de bord d'une borne d'arcade :
trois colonnes séparées d'un filet, chacune une icône, son intitulé en petites
capitales et son nombre en gros. La mouche y prend **sa propre largeur** : le trophée
et l'étoile sont carrés, elle est deux fois plus large que haute, et à largeur
commune elle paraissait deux fois plus petite qu'eux. Réglée à `9vw` contre `5.6vw`,
elle retrouve leur poids. Le trait du trophée et de l'étoile descend en regard à
`1.2` unité dans une boîte de 26, soit un pixel à l'écran : à `2` il pesait deux
fois plus lourd que celui du dessin de la mouche posé entre eux. Les zéros de la première partie s'affichent tels
quels — dans un tableau ils se lisent comme un score de départ, là où un « Record 0 »
isolé aurait eu l'air d'une panne.

Le **titre** se cale en haut du ciel plutôt qu'en son milieu : centré verticalement il
flottait bas et laissait un grand vide au-dessus. Deux paquets de traits rouges
l'encadrent, comme les traits de vitesse d'une case de bande dessinée. Sa phrase est
bornée à `15.5em` pour tomber sur des lignes courtes au lieu de longues.

Ses deux lignes étaient serrées à un interligne de **0,86**, ce qui les faisait lire
comme un bloc ; à **1,0** elles respirent et « qui vole » se détache de « la poule »,
ce qui est le sens du titre. La phrase, elle, s'écarte du titre en plus de l'écart
commun de la bande : collée dessous, elle en avait l'air d'une troisième ligne.

### Une phrase, pas un mode d'emploi

Il y avait, en bas, trois consignes : appui court, appui maintenu, gober les mouches.
Elles ont disparu. Un jeu qui tient dans deux gestes n'a pas besoin d'une notice — on
appuie, on voit ce qui se passe. Ce qui ne se devine pas, en revanche, c'est que les
mouches **rendent des plumes** : sans ça on les gobe pour le score sans comprendre
qu'on rachète du vol. Cette seule chose a rejoint la phrase du haut, en une ligne :
« Gober des mouches lui en rend. »

Le **bouton** dit *Start*, en rouge plein et écriture blanche : exactement le bouton
*Recommencer* du panneau de fin. Les deux boutons du jeu se ressemblent donc, et c'est
la seule chose rouge et pleine de l'accueil. Il a perdu deux choses en chemin. Un liseré
pointillé rentré de six pixels, comme un ticket, qui n'avait plus de fond clair pour le
porter une fois le bouton rempli. Et la petite plume posée devant le mot : sur un bouton
qui ne porte plus qu'un mot de cinq lettres, elle ne nommait rien que le mot ne dise
déjà.

Deux réglages tiennent à des voisins encombrants :

- la bande basse vaut **au moins** la hauteur de la bande de terre (`min-height`), et
  déborde au-dessus de la ligne d'horizon si l'écran est court — mieux vaut mordre un
  peu sur le décor que serrer les lignes ;
- le bouton de son occupe le coin bas-gauche. En dessous de 720 px de large, la bande
  basse se réserve 66 px de marge pour ne pas passer **sous sa pastille**. La mesure
  est faite sur les boîtes, sur cinq gabarits : on compare celle du bouton à celles du
  son et des réglages, plutôt que de juger à l'œil sur une capture.


### Toutes les poses à la même taille

Quatre tailles de pose sont écrites à la main — les deux chocs, le rebond et la poule
K.-O. — quand toutes les autres descendent d'un facteur commun. Elles avaient donc
dérivé.

La mesure ne peut pas porter sur la boîte : une poule couchée est forcément plus large
et plus basse qu'une poule debout. Elle porte sur la **crête**, la seule tache de
couleur franche présente dans toutes les poses et dont la taille ne dépend pas de la
posture. C'est une aire, donc elle varie comme le carré de la taille ; la racine du
rapport donne l'échelle.

| Pose | Avant | Après |
| --- | --- | --- |
| course, saut, vol | 1,000 à 1,013 | inchangé |
| choc en course | 0,974 | 1,006 |
| choc en vol | 0,969 | 1,006 |
| rebond | 1,031 | 0,997 |
| **K.-O. au sol** | **0,961** | **1,009** |

Sept pour cent d'écart entre la plus petite et la plus grande, et la K.-O. la plus
petite de toutes — celle qu'on voit le plus longtemps, immobile, juste après avoir vu
courir la poule. L'écart tient maintenant dans **1,3 %**.

Deux réserves. Les tailles sont des entiers, donc la correction se fait par pas d'un
pour cent environ : la K.-O. tombe à 1,009 et non à 1,000 pile. Et la crête d'une
poule couchée est vue légèrement de biais, ce qui rabote son aire ; une part des 4 %
mesurés venait peut-être de là, auquel cas la correction est très légèrement
généreuse. Les poses de vol restent à 1,013, mais cela vient du dessin d'origine et
non d'une constante — on n'y touche pas.

Les quatre poses du relevage, arrivées ensuite, sont dimensionnées par la même mesure
et dès l'origine : voir [Quatre dessins pour se relever](#quatre-dessins-pour-se-relever).

## La chute

Deux dessins, pas quatre :

| Instant | Pose |
|---|---|
| 0 s | Le choc |
| 0,16 s | La poule KO, qui tombe |
| ~0,45 s | Le sol : poussière, secousse |
| ~1,2 s | Le panneau de fin |

Tant qu'il lui reste une vie, la chute est la même mais elle ne mène pas au panneau : la
poule se relève et la course repart. Au dernier choc, en revanche, elle ne se relève
pas — un nuage l'emporte et une pierre tombale se plante à sa place.

### Le nuage et la pierre

| Instant | Ce qui se passe |
|---|---|
| ~0,45 s | Le sol : poussière, secousse, étoiles |
| ~1,00 s | Le nuage. La poule disparaît, la pierre pousse dedans |
| ~1,10 s | La pierre s'enfonce : la terre gicle |
| ~1,20 s | Le nuage se disperse, la pierre est plantée |
| ~2,55 s | Le panneau de fin |

L'explosion n'est pas un effet de plus : **c'est elle qui autorise la substitution.**
Sans elle, la poule se changerait en pierre sous les yeux du joueur, ce qui se lirait
comme un défaut d'affichage. Le nuage a donc un dixième de seconde d'avance sur la
pierre, le temps d'être à son plus épais.

Le nuage est fait de la même matière que la poussière des appuis — des ronds pâles sans
contour — mais lancés en **deux couronnes**, une dense et lente qui fait le corps, une
plus large et plus vive qui l'ébrèche. Une seule couronne donnait un rond trop régulier.

Deux détails de peinture le sauvent. Il est peint **après** la poule et la pierre, alors
que la poussière ordinaire est peinte avant les obstacles : dessous, il aurait laissé
voir la pierre apparaître par-dessus lui. Et ses ronds sont peints **en un seul tracé** :
peints un à un, leurs transparences s'additionnent aux recouvrements et le nuage tourne
au pâté brun ; en une seule silhouette il garde une teinte unie, et ce sont ses bosses
qui le disent.

**La pierre ne se pose pas, elle s'enfonce.** Vingt-quatre mottes brunes et cailloux gris
partent de son pied en éventail, retombent et s'éteignent au sol — ils ne rebondissent
pas. Les teintes sont relevées sur le dessin lui-même, la butte de terre et les cailloux
du décor, pour que la giclée ait l'air d'en venir. Ils sont peints par-dessus la pierre,
donc ils passent devant son pied.

Le panneau de fin arrive bien plus tard qu'avant — **2,10 s** après la pose au sol au
lieu de 0,75. La pierre est plantée vers 0,75 s : elle reste donc seule à l'écran une
bonne seconde, le temps qu'on la lise, avant que le panneau vienne la coiffer.

## La vie de rattrapage

La poule a **une vie** en réserve. Au premier choc elle tombe, reste sonnée une
demi-seconde, se relève et la course reprend là où elle s'était arrêtée. Au choc
suivant, c'est fini.

| Instant | Ce qui se passe |
|---|---|
| 0 s | Le choc, la culbute, et le cœur qui s'échappe |
| ~0,45 s | Le sol : poussière, secousse, étoiles |
| ~1,30 s | Elle rouvre les yeux : les étoiles s'éteignent |
| ~1,62 s | Elle se lève, en trois images |
| ~1,95 s | Debout. La course repart, la poule clignote |
| ~2,95 s | Le répit s'achève, les obstacles peuvent de nouveau la toucher |

La pose K.-O. — à plat, les deux pattes en l'air, la ronde d'étoiles — tient **0,85 s**
avant que le relevage commence. C'est elle qui dit le coup ; une demi-seconde passait
trop vite pour qu'on la voie.

**Rien n'est enregistré au premier choc.** Ni le record, ni les mouches gobées, ni la
partie jouée : `die()` sort avant d'y toucher. Une partie reste une partie, quel que
soit le nombre de chutes.

**Le monde reste figé pendant tout ce temps** — c'est déjà le cas de la chute, et ça le
reste du relevage. La distance, la vitesse et les obstacles ne bougent pas : perdre une
vie coûte le temps de se relever, pas la partie.

### Quatre dessins pour se relever

L'ordre, à partir de la pose K.-O. — à plat, pattes en l'air, étoiles :

1. **allongée, une patte levée**, les yeux ouverts : elle revient à elle
2. **sur les genoux**, ramassée sur elle-même
3. **courbée**, elle se lève
4. **debout**, prête à repartir

Chacune est posée à la largeur qui ramène sa **crête** à celle de la pose de course —
la même règle que les poses de choc, mesurée de la même façon.

| Pose | Crête sur la planche (420 de large) | Largeur posée | Durée |
| --- | --- | --- | --- |
| 1 · allongée, patte levée | 4 818 px | 113,0 | 0,32 s |
| 2 · sur les genoux | 5 154 px | 109,3 | 0,12 s |
| 3 · courbée, elle se lève | 5 902 px | 102,1 | 0,10 s |
| 4 · debout | 7 001 px | 93,8 | 0,10 s |

La première tient bien plus longtemps que les trois autres : c'est celle où elle rouvre
les yeux, et c'est elle qui raconte le coup. Les trois suivantes sont le geste de se
lever, qui doit être vif — une poule qui se relève au ralenti n'a pas l'air sonnée,
elle a l'air molle.

Les quatre ont été raccourcies **d'un cinquième d'un bloc**, proportions gardées : 0,64
seconde au lieu de 0,80. La demi-seconde et des poussières où elle reste K.-O. avant de
bouger, elle, ne bouge pas — c'est le temps du coup, pas celui du geste.

Les deux poses debout ressortent 2,7 % et 7,1 % plus courtes que la poule qui court :
c'est la posture, elles sont voûtées, ce n'est pas l'échelle.

Chaque pose est calée par le **milieu de son corps**, pas par le milieu de sa planche :
le premier dessin porte sa spirale d'étourdissement loin sur la droite, et calé sur son
cadre le corps aurait sauté d'une image à l'autre. La mesure est faite sur la planche
finie — la plus grosse tache d'encre est la poule, tout le reste est décor.

Le détourage est celui des autres dessins, avec la **règle des trous retournée**. Le
corps de la poule est blanc, donc « fond » au sens du test de clarté, et enfermé par son
propre contour : percé, il la rendrait creuse. Mais il y a bien un trou à ouvrir, le
**vide entre les pattes**, fermé en bas par les doigts qui se touchent — laissé plein,
la poule debout arrive avec une plaque blanche sous le ventre, qui se voit sur le ciel
comme sur la terre.

Ce qui sépare les deux, mesuré sur les quatre dessins, c'est la place :

| Tache de fond enfermée | Bas, en % de la hauteur d'encre |
| --- | --- |
| le corps (toujours la plus grosse) | — |
| les blancs de l'œil | 45 % à 78 % |
| les vides entre les pattes | 84 % à 98 % |

On perce donc toute tache enfermée qui n'est pas la plus grosse et dont le bas passe le
**quatre-vingt-unième centième**, le milieu des deux populations. Vingt-huit trous
percés sur les quatre dessins, aucun œil crevé, aucun corps vidé.

La couleur, elle, ne sépare rien : les pointillés du sol sont tracés à la même encre
que la poule — clarté moyenne 51 à 107 contre 60 à 68 pour le dessin. Il reste donc un
pointillé soudé à un doigt de patte, que ni le tri par taches ni un seuil de clarté ne
peut attraper. À la taille où le jeu pose la planche il fait moins d'un pixel d'art, et
il tombe pile là où le jeu peint sa propre ombre : vérifié à l'écran, dans les deux
styles, on ne le voit pas.

Ces dessins portent aussi une ligne de sol en pointillés dont le jeu ne veut pas — il
pose sa propre ombre. Les pointillés sont les seules taches d'encre à la fois **plates**
(moins d'un tiers de haut que de large) et **minces** (moins de quinze pixels) ; les
traits de mouvement et la spirale, eux, sont hauts ou ronds. Ils partent avec ce tri,
aucun trait de mouvement avec eux.

### Les cœurs à ramasser

On peut en trouver en vol, jusqu'à **cinq vies** en poche. Le plafond n'est pas une
contrainte de place — le HUD n'affiche qu'un cœur et un nombre — mais de tension : avec
dix vies en réserve il n'y a plus de partie.

Ils ne se comptent pas en secondes mais en **mètres**. Le jeu accélère de 500 à 900 : un
rendez-vous au chronomètre se rapprocherait à mesure que la course va plus vite, et deux
cœurs finiraient par se suivre. En mètres, l'écart est le même du début à la fin.

Le premier n'arrive pas avant quinze cents mètres, les suivants **entre 2 800 et 4 400
mètres** après le précédent — une bonne minute de course à pleine vitesse. L'écart tiré
au hasard sur seize cents mètres interdit de les attendre ; son plancher interdit qu'ils
se suivent.

Ces chiffres ont doublé : à un cœur tous les 1 765 mètres, on en croisait deux ou trois
par partie et la vie de rattrapage n'avait plus rien de rare. Mesuré sur vingt parties de
six mille mètres, sans obstacle, avant et après :

| | avant | après |
| --- | --- | --- |
| cœurs par partie | 3,4 — un tous les 1 765 m | 1,9 — un tous les 3 243 m |
| premier cœur | de 703 à 1 257 m | de 1 606 à 2 599 m |
| écart entre deux | de 1 206 à 2 099 m | de 2 810 à 4 267 m, moyenne 3 182 |

Sur une vraie partie, qui dépasse rarement trois mille mètres, cela fait **zéro ou un
cœur** — c'est le prix de la rareté.

Le cœur arrive seul, franchement en l'air, sans dérive : il faut le voir venir et
décider d'aller le chercher, exactement comme la mouche dorée, en plus rare encore. Il
bat lentement, comme un cœur. Pas de halo autour : le rouge sur le ciel se voit tout
seul, et le halo est déjà le langage de la dorée.

Au plafond de vies, le rendez-vous est **consommé sans rien poser** : personne ne fait
de réserve en attendant d'avoir la place.

### Une hauteur tirée dans tout le ciel

Le cœur naissait entre 200 et 450 unités au-dessus du sol, la mouche dorée entre 230 et
490 : deux bandes de 250 unités, toujours au même endroit, dans le bas du ciel. On savait
d'avance où regarder, et **rien n'obligeait jamais à monter** les chercher — dans un jeu
qui s'appelle *la poule qui vole*, c'est un aveu.

Les deux tirent maintenant leur hauteur par la même fonction, uniformément entre le
dessus des obstacles et un cheveu sous le plafond :

```
hauteurLibre() = -210 + hasard × (flyCeil + 60 + 210)
```

Le plancher est calé au-dessus de la **fourche**, le plus haut des obstacles au sol
(183 unités). Plus bas, un cœur pourrait naître dans un tas de foin et y rester : il
dérive à la vitesse du décor, la position relative ne change jamais. La mouche, elle,
sait déjà remonter au-dessus d'un obstacle — c'est une règle qu'elle avait déjà.

Vérifié sur dix mille tirages : dix tranches égales entre 949 et 1 057 apparitions, la
loi est plate. Et sur le jeu réel, les cœurs naissent de -211 à -960, les dorées de -223
à -938 — tout le ciel jouable, du dessus des obstacles au plafond.

Les **mouches ordinaires**, elles, se semaient jusqu'à `skyH`, c'est-à-dire jusqu'au bord
de l'écran. Depuis que le plafond de vol s'arrête sous le bandeau, les plus hautes
étaient à la fois cachées par lui et hors d'atteinte. Elles s'arrêtent maintenant où la
poule s'arrête.

### Deux parties ne commencent plus pareil

Trois réglages du départ ne se tiraient au sort **jamais** : le premier obstacle à 1,1 s,
la première nuée de mouches à 3 s, la première dorée à 20,9 s — à la seconde près, à
chaque partie. On finissait par les connaître par cœur.

Ils se tirent maintenant comme tous les suivants : l'obstacle entre 1,0 et 1,9 s (le
plancher garde de quoi le voir venir), la nuée entre 1,2 et 3,8 s, la dorée entre 14 et
34 s — plus tôt que les 38 à 60 s de croisière, mais jamais deux fois au même moment.

Mesuré sur quarante départs :

| | étendue | valeurs différentes |
| --- | --- | --- |
| premier obstacle | 57 à 107 m | 25 sur 40 |
| première mouche | 72 à 214 m, hauteur -962 à -64 | 38 et 40 sur 40 |
| première dorée | 1 003 à 2 933 m, hauteur -961 à -223 | 40 et 40 sur 40 |
| premier cœur | 1 528 à 2 566 m, hauteur -958 à -213 | 40 et 39 sur 40 |

Le premier obstacle ne prend que 25 valeurs sur 40 parce que les mètres sont arrondis,
pas parce qu'il se répète : sa fenêtre fait 50 mètres de large.

### Le répit, et pourquoi il est nécessaire

Le monde étant resté figé, **l'obstacle qu'elle vient de percuter est toujours sur
elle** au moment où elle se relève. Sans répit elle mourrait dans la seconde. Il dure
**une petite seconde** et il se voit : elle bat entre plein et effacé huit fois par
seconde. Elle ne disparaît jamais tout à fait, contrairement au clignotement d'arcade :
c'est en se relevant qu'on a le plus besoin de savoir où elle est.

Une seconde, est-ce assez ? Mesuré en jeu, à la vitesse la plus lente — celle du début
de partie, la pire — sur les sept obstacles de sol, l'objet posé sur la poule au moment
du relevage :

| Obstacle | Largeur | Dégagé après | Marge |
| --- | --- | --- | --- |
| barrière | 240 | 0,48 s | 0,52 s |
| brouette | 237 | 0,47 s | 0,53 s |
| pneu | 215 | 0,43 s | 0,57 s |
| ballot rond | 194 | 0,40 s | 0,60 s |
| ballot | 173 | 0,37 s | 0,63 s |
| seau | 154 | jamais touchée | 1,00 s |
| fourche | 132 | 0,27 s | 0,73 s |

Le pire cas garde une demi-seconde de marge, et dans aucun des sept elle ne remeurt.
La mesure se fait en jeu et non au crayon : la poule rattrape sa place en sens inverse
pendant que l'objet s'en va, ce qui retarde un peu le dégagement.

Ce répit ne compte pas les traversées d'obstacle du carnet de trophées. Ce n'est pas un
exploit de passer au travers de celui qui vient de vous mettre à terre.

### Ce qu'elle récupère, et ce qu'elle perd

Elle repart avec **au moins 35 % de plumes**. Un choc en vol la laisse souvent à zéro,
et sans ce plancher elle se relèverait sans rien pour voler, donc pour rien. La chaîne
de mouches, elle, est bel et bien cassée : on ne gobe pas en étant à terre.

Elle ne se rend pas non plus à sa place de course. Le choc l'a reculée d'une
cinquantaine d'unités, et elle rattrape ce retard **une fois le monde reparti**, en
courant plus vite que le décor. Ramenée de force pendant le relevage, elle glissait sur
le sol sans lever une patte.

### Le cœur, et son nombre

**Un** cœur, et le nombre à côté — `♥ ×1`, `♥ ×3`. Un cœur par vie tenait tant qu'il n'y
en avait qu'une ; maintenant qu'on peut en ramasser, une file de cinq cœurs prendrait
toute la largeur de la colonne pour dire ce qu'un « ×3 » dit en deux caractères.

À zéro, le cœur reste — **vide**, et sans rien à côté. La forme dit qu'il en manque une,
et il n'y a plus rien à compter. Il ne disparaît pas : c'est justement à ce moment-là
qu'il faut le voir, puisque le prochain choc sera le dernier.

Il vit sur la **seconde ligne du bandeau**, celle que partage la barre de pouvoir avec
son étoile — cœur à gauche sous la plume, étoile et barre à sa suite. Le cœur est
**centré sur la plume**, pas calé sur son bord gauche : la plume est penchée et son
dessin est plus large que son trait, un alignement à gauche le laissait de travers sous
elle. Et la barre de pouvoir démarre après le nombre de vies, jamais dessus : à trois
vies, le « ×3 » mordait sur l'étoile.

Le nombre se cale sur le **milieu d'encre du cœur**, pas sur la ligne de la rangée.
Mesuré sur la photo du bandeau : le cœur retombe 0,86 px sous la ligne — sa pointe tire
son encre vers le bas — et le nombre 0,74 px au-dessus, la ligne de base « milieu »
n'étant qu'une approximation. Un pixel et demi d'écart sur un chiffre haut de neuf : ça
se voit. Les deux écarts suivent la taille, la correction est donc une fraction de `u`
comme le reste, et le décalage mesuré retombe à **0,00 px**.

La couronne, elle, tombait juste : 0,12 px de la ligne visée, et de 0,2 à 0,4 px du
milieu du nombre qu'elle accompagne.

L'épaisseur de son trait est **donnée, pas déduite de sa taille**. Elle doit valoir celle
de sa voisine, et celle-là se mesure : la plume du HUD, posée à 21,4 px CSS de haut, a un
trait dont la médiane fait **0,83 px** — soit 0,039 fois sa hauteur. Déduite de la
hauteur du cœur, comme au départ, la ligne faisait deux fois et demie celle de la plume.
La mesure se fait à six fois la taille réelle puis se divise : à la taille réelle le
trait fait un pixel et la médiane ne sait plus rien dire.

### Le cœur qui s'échappe

La vie se dépense **à l'instant du choc**, et c'est le seul moment où l'on ne regarde
sûrement pas le coin de l'écran : le compteur se viderait sans témoin. Un cœur — le
même dessin que celui du HUD, c'est bien celui-là qu'elle vient de perdre — monte donc
au-dessus d'elle et s'évapore, là où l'œil est déjà.

Il monte de 46 unités par seconde, ondule doucement, grossit d'un tiers et s'efface sur
1,3 seconde. Son trait fait 1,55 unité, c'est-à-dire exactement celui des dessins du
monde — la valeur que `STROKE` déclare déjà. Il est peint **après** la poule : c'est lui qu'on doit suivre à cet
instant-là. Comme le monde est figé pendant la culbute, il monte sur un décor immobile,
ce qui le rend d'autant plus lisible.

Il ne paraît qu'au choc qui **coûte une vie**. Au choc suivant il n'y a plus de cœur à
perdre, et le panneau de fin arrive de toute façon une seconde plus tard.

### Le panneau de fin

La fin de partie était une fenêtre au premier plan, posée au milieu de l'écran par-dessus
un flou : la poule morte disparaissait derrière au moment même où elle finissait de
tomber. C'est maintenant un **panneau** posé dans la moitié haute de l'écran. Ni flou,
ni voile : le bas du terrain, là où la poule s'écrase, reste entièrement découvert, et
la pierre tombale y reste plantée aussi longtemps qu'on veut.

Il **annonce la fin de la manche** : un grand *Game Over* rouge, la **pierre tombale**
plantée sur son bord haut — celle-ci porte le portrait encadré de la poule — puis le
décompte, le record couronné, les totaux et le bouton.

La pierre a remplacé la poule K.-O. et sa ronde d'étoiles. Elle le devait : sur le
terrain la poule a déjà disparu dans le nuage, le panneau ne pouvait pas la remontrer.
Son canevas épouse la planche — plus haut que large — là où la poule tenait dans un
canevas plus large qu'elle, pour loger sa ronde. La largeur d'affichage est donc plus
courte de moitié, et la hauteur y gagne : la pierre monte à 1,13 fois `--ko` contre 0,98
pour la poule. Mesuré sur six tailles d'écran : elle dépasse du panneau de 34 à 47 px,
ne sort jamais de l'écran, ne touche pas le bouton du son et laisse 15 à 24 px au-dessus
du *Game Over*.

Rien ne tourne plus dessus : le canevas n'est donc redessiné qu'à l'ouverture du panneau
et aux changements de style, au lieu d'être repeint soixante fois par seconde. Le panneau se borne à la largeur du **cadre de jeu** et non à celle de la
fenêtre, plus large sur un bureau — `resize()` publie cette largeur en variable CSS,
comme il publiait déjà la hauteur de la bande de terre.

### Un panneau qui n'est pas un rectangle

Son bord est **festonné**, une suite de bosses rondes comme un nuage de bande dessinée.
Le tracé est calculé, pas dessiné : on échantillonne le périmètre d'un rectangle rentré
du rayon des bosses, à pas constant, et **chaque pas devient un arc qui bombe vers
l'extérieur**.

Ce rectangle a lui-même les coins arrondis, et c'est ce qui fait la rondeur d'ensemble :
sans cela la silhouette reste carrée, les bosses ne font que border un angle droit. Le
rayon du coin vaut trois dixièmes du plus petit côté. Sur les quarts de tour la corde
entre deux points est plus courte que le pas, l'arc y bombe donc un peu plus — ce qui
arrondit encore, sans avoir à traiter les angles à part.

Deux chemins concentriques, l'extérieur beige et l'intérieur crème, donnent la bande
claire qui fait le tour. Ils partagent **le même nombre de bosses** : avec un compte
propre à chacun, leurs bosses se déphasent et la bande change de largeur tout du long.

Le fond est **régénéré à la taille exacte du panneau**, à l'affichage et à chaque
`resize()`. Une image étirée aurait des bosses ovales d'un côté et rondes de l'autre.
Le compte de bosses se prend sur le périmètre réellement parcouru, coins arrondis
compris : sur celui du rectangle vif, elles sortaient toutes un peu trop petites.

Le bouton est en bas, là où le contour se recourbe : à pleine largeur ses bouts venaient
toucher la bosse du coin. Il n'en occupe que 62 %, ce qui le dégage et le rapproche des
deux pastilles au-dessus. Il est **rouge plein, écriture blanche** — c'est le seul aplat
de couleur vive du panneau, et il attire l'œil là où il faut appuyer. À l'appui il passe
à un rouge plus sombre, et non à l'inversion des autres boutons du jeu : il n'y a plus de
blanc à inverser.

La poule KO est **dessinée** à cheval sur le bord haut, pas posée : c'est un canvas à
part, où tourne la même ronde d'étoiles que sur le terrain, avec le même code et à la
même vitesse. Elle était d'abord entourée d'étoiles fixes en SVG — jolies mais mortes,
et sans le tourbillon qui va avec.

Pour cela `star()` et `drawStars()` prennent leur contexte en argument au lieu d'écrire
dans celui du terrain. C'est la seule chose qu'il a fallu changer au code du jeu ; le
reste est identique, épaisseurs de trait comprises, qui suivent l'échelle. Le canvas fait
une fois et demie la largeur de la poule : la ronde déborde d'elle des deux côtés.

Le panneau se **centre dans l'écran**, mais c'est le bloc entier — poule comprise —
qu'on veut centré : il descend donc de la moitié de ce que la poule dépasse en haut.
Elle déborde de 46 % de sa hauteur, et sa hauteur vaut 0,72 fois sa largeur ; la moitié
du débord fait donc 0,166 fois la largeur de la poule, une seule variable CSS pour les
deux règles. La couronne du record et
la flèche du bouton sont deux petits tracés SVG écrits à la main.

Les pastilles ne portent **que des nombres** : c'est la ligne au-dessus qui dit de quoi
il s'agit, et c'est elle qui annonce le record battu.

Aussi longtemps qu'on veut, littéralement : **seul le bouton relance**. Un appui n'importe
où le faisait avant, et c'était le premier réflexe du joueur — celui qui tenait le vol une
seconde plus tôt. On ne voyait jamais la chute finir. La barre d'espace non plus ne
relance plus.

Le décompte ne s'écrit pas, il se **montre** : la mouche du jeu tient lieu d'unité, comme
au compteur en haut de l'écran. Elle et son nombre occupent une pastille pleine ; le
record en occupe une autre, ambre, avec sa couronne. Les deux se serrent sur leur
contenu — à pleine largeur, celle du décompte faisait une barre là où l'autre était une
pastille.

**Aucune ombre nulle part**, et des aplats plutôt que des cernés : les pastilles n'ont pas
de contour, elles se détachent par leur fond. Seul le bouton en garde un, d'un pixel.

Le panneau descend de treize pour cent de la hauteur au lieu de neuf : plus haut, son
coin mordait sur la ligne du record que le HUD écrit en haut à droite. Vérifié sur sept
formats, du 360 × 640 au 1800 × 1700 : rien ne déborde, rien ne chevauche le bouton du
son, et le panneau tient entre 13 et 50 % de la hauteur — la moitié haute, partout.

Le choc a trois versions, choisies selon d'où elle vient. De face, en course, elle
est encore sur ses pattes ; de face en vol, elle file à l'horizontale. La version
est figée au moment du coup — la lire à chaque image l'aurait fait basculer au
premier dixième de seconde, quand le contrecoup décolle la poule du sol.

La troisième est **le rebond**, quand elle retombe sur le dessus d'un objet au lieu
de le percuter de face : ses pattes mordent la face supérieure, elle repart en
l'air et vers l'avant, et va s'écraser au-delà. Le dessin porte son propre éclat de
choc, et c'est par lui que la pose est calée : l'éclat tombe pile sur le point où
elle a tapé. La pose ne couvre que la montée et s'arrête au sommet — la laisser
courir jusqu'à la retombée aurait promené l'éclat loin de l'impact. La pose KO
prend le relais pour la descente.

Le coup de face, lui, la renvoie en arrière : l'élan s'éteint vite — c'est un
contrecoup, pas un vol — et elle finit une cinquantaine d'unités derrière le point
d'impact, dégagée de l'objet au lieu d'y rester encastrée. Les deux tiers du recul
se font dans le premier dixième de seconde.

L'élan vers l'avant du rebond n'est pas une constante : il se calcule sur l'objet lui-même,
pour qu'un ballot large soit franchi comme un seau étroit. Le vol dure un peu plus
longtemps que le temps demandé au calcul, ce qui laisse la marge — vérifié sur les
quatre obstacles au sol, elle se pose chaque fois entièrement au-delà. Un coup de
face ne rebondit pas, et l'aigle non plus : en plein ciel il n'y a pas de dessus à
toucher.

C'est ce rebond qui a rendu nécessaire de remettre la poule à sa place d'origine à
chaque partie. Elle n'y bougeait pas — c'est le monde qui défile — mais elle
avance pendant le rebond, et la partie suivante la retrouvait décalée.

Ensuite, une seule image jusqu'au bout : la poule KO, à plat, pattes en l'air.
Elle tombe avec des traits de vitesse — les mêmes que pendant la panique, la mort
n'a pas son propre vocabulaire — puis reste au sol, le temps du nuage. Les poses de chute tête la
première, d'assise et de bascule ont été retirées : elles décomposaient un
mouvement que le choc et la chute racontent déjà.

Les quatre dessins sont découpés à 440 px de large, avec un alpha continu sur huit
bits : les bords ne sont plus en escalier, ce qui se voyait. Le grain du papier est
toujours ramené aux teintes dominantes, mais à huit unités d'écart au lieu de
vingt, ce qui laisse vivre l'ombrage intérieur au lieu de l'aplatir.

Certains de ces contours ne sont pas fermés — des traits s'interrompent — et le
corps est d'un blanc à zéro unité du fond : un remplissage venu des bords s'y
engouffrait et vidait la poule, il ne restait que le trait. L'encre est donc
**fermée** avant le remplissage, dilatée puis érodée du même rayon, ce qui jette un
pont sur toute brèche plus étroite que deux rayons sans épaissir le trait ailleurs.
Le rayon est le plus petit qui remplisse le corps, trouvé par balayage : au-delà,
les ponts soudent aussi les arcs de mouvement au corps et laissent des pâtés blancs
dans les angles rentrés.

Le dessin KO portait ses propres étoiles et son tourbillon ; ils ont été retirés
au découpage pour laisser tourner ceux du jeu, qui sont animés. Le découpage ne
supprime pas seulement leurs traits : il efface aussi le halo pâle qui les
entourait, en dilatant la marque de quelques pixels dans le fond — sans quoi il
serait resté leur fantôme.

La ronde d'étoiles se dimensionne sur la pose qu'elle couronne ; écrite en dur,
elle débordait sur l'obstacle. Ses cinq étoiles ne sont pas interchangeables :
deux d'entre elles filent plus haut que la ronde et sont un peu plus grosses.
Toutes sur la même ellipse et à la même taille, la ronde se lisait comme un
engrenage ; dépareillées, elle tournoie. Le profil est fixé par rang et non tiré
au hasard : il tourne avec la ronde, si bien que la variété se voit sans que rien
ne clignote. Leur contour est plus fin que le trait des dessins — à cette taille,
l'encre pleine mangeait le jaune.

Les tailles ne sont pas choisies, elles sont mesurées. La crête est le seul aplat
rouge visible en entier dans les trois dessins — l'éclat jaune du choc recouvre
une partie du barbillon — et chaque pose est mise à l'échelle pour que l'aire de
sa crête, ramenée aux unités du jeu, égale celle de la pose de course. La tête
garde donc la même taille d'une pose à l'autre, à un pour cent près.

## Collisions

Les boîtes des obstacles ne sont pas écrites à la main : elles sont mesurées sur
les dessins au démarrage. Plusieurs illustrations posent l'objet sur une touffe
d'herbe ou un talus bien plus large que lui — la fourche n'occupe que le tiers
central de son dessin — et une boîte calée sur le cadre du dessin faisait mourir
la poule à bonne distance des dents. La mesure ignore donc la frange basse, où vit
ce socle, pour ne retenir que la largeur de l'objet.

Le seau garde une boîte écrite à la main : sa flaque n'est pas un socle mince,
elle s'étale de part et d'autre sur toute la hauteur du bas du dessin, et la
mesure automatique la prendrait pour l'objet.

Les boîtes tiennent compte du décalage de perspective du premier plan, sinon
elles flottaient cinq unités au-dessus des objets. Au premier contact, le bec de
la poule mord de 22 unités sur le dessin de l'obstacle : la collision arrive après
le contact visible, jamais avant.

Les valeurs de calage vertical des poses (`FOOT_POSE`, `CHOCS_DROP`, `KO_DROP`,
`ANCH_X`/`ANCH_Y`) sont réglées à l'œil sur les dessins : les modifier décale la
poule par rapport au sol. `FOOT_POSE` donne, pour chaque pose, la rangée du bas
du dessin ; le rendu s'en sert pour poser les pattes sur le sol quelle que soit la
pose, ce qui autorise des dessins dont les pattes ne tombent pas toutes à la même
hauteur.

## Deux styles dans un seul fichier

Le jeu porte **deux jeux de dessins** : le trait d'origine et sa conversion en pixel
art. Le bouton d'engrenage, posé à côté du bouton de son dans la bande de terre,
ouvre une feuille où l'on choisit — deux vignettes montrant la même poule dessinée des
deux façons, parce que montrer la différence vaut mieux que la nommer. Le choix est
gardé dans la sauvegarde et survit au rechargement.

Ça coûte peu : les planches en pixel pèsent **392 Ko** contre 13 Mo pour les
originales. Les deux tiennent dans le même fichier sans discussion.

### Une seule grille pour tout le jeu

Convertir chaque dessin à une largeur fixe — 64 pixels pour la poule, 64 pour la
montagne — donnerait des pixels **gros comme une maison** sur la montagne et
minuscules sur la mouche : cinquante-neuf grilles différentes, et un décor qui jure
avec le personnage. Le pixel vaut donc **0,40 pixel CSS**, le même partout ; chaque
dessin est converti à sa taille d'affichage divisée par cette valeur. La poule fait
192 pixels de large, la mouche 60, la montagne 1299.

Le pixel vaut **un tiers de pixel CSS**, le même partout — et « partout » veut dire
tout : les planches, le décor, les aigles, les jauges tracées au vecteur, les
particules, le texte des compteurs. Tout passe par le même tampon, donc tout a la même
définition. La poule fait 230 pixels de large, et la planche du ballot 253 colonnes
pour exactement 253 pixels d'écran — **rien n'est rééchantillonné**.

Un tiers de pixel CSS, c'est fin : à peu près le pixel de l'écran sur un téléphone
moderne. Ce n'est pas un gros bloc de pixel art, c'est une **définition commune**. Le
grain vient de la palette réduite à quatorze teintes et du niveau de détail des
planches, pas de la taille du bloc.

Un essai à **trois pixels d'écran par pixel d'art** a été fait, et mesuré : la grille
était parfaite — la plus courte plage de couleur valait 3 partout, et 100 % des
longueurs étaient des multiples de 3, contre 1 px et 11 à 35 % avant. Mais le bloc
devenait gros et le détail partait avec. On a gardé la finesse.

#### La table des tailles est en pixels CSS, pas en unités de monde

Le piège s'est refermé une fois, en ajoutant les quatre poses du relevage. Les tailles
d'affichage qui commandent la conversion (`tailles.json`) ne sont pas relevées en
unités de monde mais en **pixels CSS sur un écran de référence** de 390 de large, où
une unité de monde vaut 0,4875 pixel CSS. Inscrites en unités de monde, les quatre
planches sortaient à 339, 328, 306 et 281 colonnes là où il en fallait 165, 160, 149 et
137 : **deux fois trop fines**, donc hors de la grille commune.

La vérification tient en une ligne et vaut pour n'importe quelle planche : le nombre de
colonnes doit égaler la largeur posée × 0,4875 ÷ 0,333. Après correction, les quatre
nouvelles poses tombent à 0,2 % près, exactement comme la pose de course.

Au passage, quatre planches anciennes étaient restées calées sur des tailles périmées —
la poule K.-O., les deux chocs et le rebond, dont les constantes avaient changé lors de
la mise à l'échelle des poses sans que la table suive. Elles sont refaites à la bonne
taille.

#### Les boutons y passent aussi

Trois choses restaient hors du tampon, donc hors de la grille : l'ombre portée du
bouton de vol, et les deux pastilles rondes du son et des réglages.

L'ombre du bouton de vol était un **flou** — un `drop-shadow` qui ne connaît aucune
grille et bave sur une dizaine de pixels d'art. En pixel elle disparaît : la planche
porte déjà son propre relief.

Les deux pastilles étaient des **cercles CSS avec une icône SVG** : un bord lissé et un
dessin vectoriel. En pixel, leur dessin entier — disque, contour, icône — est peint
dans un canevas à la finesse du jeu, son alpha est coupé net pour qu'aucun bord ne
soit en dégradé, et le tout est posé en fond ; le SVG s'efface et le clic ne change
pas de place. C'est le même principe que le panneau de fin et que le texte des
compteurs : **ce qui doit se voir en pixels est peint en pixels**, jamais lissé puis
pixelisé.

### Pourquoi un tiers, et pas un chiffre rond

La scène est peinte dans un tampon large de `largeur / PX_JEU`, puis posée sur une toile
large de `largeur × dpr`. Si ces deux nombres sont égaux, la pose est un report pixel
pour pixel : rien n'est agrandi, rien n'est réduit, rien n'est perdu. **La finesse de la
grille n'est donc pas libre : elle vaut l'inverse du plafond de résolution.**

Le jeu a essayé 0,30, une fois le plafond laissé à 2,5 : le tampon faisait un tiers de
plus que la toile, le lissage étant coupé le navigateur **jetait** ce qui ne rentrait
pas, et comme ce qu'il jette dépend de la position, les dessins **grouillaient en
défilant**. Mesuré sur le ballot de paille : 281 colonnes de planche pour 211 pixels
d'écran, soit un quart de jetées. Rien de tout cela ne se voit sur une capture immobile.

Le plafond du mode pixel vaut donc maintenant **exactement `1 / PX_JEU`**, quelle que
soit la grille choisie : le report est exact par construction, et changer de finesse ne
peut plus réintroduire le défaut. Vérifié à 0,40 : tampon et toile à 975 × 2110 tous les
deux, 211 colonnes de planche pour 211 pixels d'écran, zéro jetée.

Le plafond dépend du style, et ce n'est pas un caprice. Le trait dessine des planches
pleine résolution avec lissage, bien plus coûteuses au pixel : monter son plafond à 3
lui coûtait un tiers de sa cadence, mesuré, pour un gain nul — il n'a aucune grille à
respecter. Il garde donc 2,5. `resize()` est rejoué à chaque bascule de style.

Des trois finesses essayées, **0,40 est aussi la plus stable en mouvement** : en recalant
deux images d'un nombre entier de pixels d'écran, 31 % des pixels du ballot bougent
encore, contre 47 % à 0,30 comme à un tiers.

Il reste un résidu, inhérent et présent à n'importe quelle grille : une planche posée à
une position qui n'est pas ronde est rééchantillonnée avec une phase qui glisse. C'est
la douceur ordinaire d'un sprite en mouvement, sans commune mesure avec des colonnes qui
disparaissent. Le supprimer demanderait de caler chaque plan sur un nombre entier de
pixels du tampon, ce qui rendrait le défilement saccadé par paliers.

C'est d'ailleurs par là que la bonne finesse a été trouvée. La poule assommée était
dessinée bien plus finement que le reste — non par choix, mais parce que sa planche
était taillée pour le panneau de fin et employée au sol, quatre fois trop grande.
Ce défaut était le bon résultat : c'est cette finesse-là, ramenée au seuil où elle
tient en mouvement, qui vaut maintenant pour tout le jeu.

Cette taille d'affichage est **mesurée, pas devinée** : `drawImage` est emballé le
temps d'une partie et relève, pour chaque dessin, la taille à laquelle il est posé. La
mesure se fait **à l'écran**, matrice courante appliquée : le terrain dessine en unités
de monde et le HUD en pixels CSS, deux échelles qu'un relevé naïf mélange — et qui
donnaient des grilles fausses d'un facteur deux.

### Vérifier la grille au lieu de la supposer

Fabriquer les planches sur une grille commune ne suffit pas : ce qui compte est la
taille **apparente** du pixel, largeur affichée divisée par largeur de planche. Une
seconde sonde la relève dessin par dessin, sur une partie entière. Elle a trouvé trois
dérives qu'aucune lecture du code n'aurait données :

| Dessin | Avant | Cause |
|---|---|---|
| La mouche du monde | **0,36** au lieu de 0,85 | Le même dessin sert de mouche et d'icône ; la planche était taillée pour l'icône, deux fois et demie plus grande |
| La poule K.-O. au sol | **0,27** | Même chose : la planche était taillée pour le panneau de fin |
| La queue du cerf-volant | 0,72 | Ses tranches se chevauchent d'un pixel du dessin, mais d'**une unité de monde** à l'écran — invisible sur un dessin de 1389 pixels, criant sur une planche de 163 |

Les deux premiers sont réparés en **dédoublant la planche** : `fly_ico` et `ko_carte`
n'existent que dans la version pixel ; en mode trait, les deux clés pointent sur le
dessin d'origine, sans un octet de plus. Le troisième en exprimant le chevauchement
en pixels du dessin plutôt qu'en unités de monde — `Math.max(1, o.w/nw)`, ce qui laisse
le mode trait rigoureusement inchangé.

Après réparation, **tous les dessins** tiennent la grille exactement, à l'unité de
mesure près.

Les cinq espèces d'arbres du second plan ont demandé un choix. Leur échelle est tirée
au hasard entre 1 et 1,32 à chaque exemplaire, et une planche unique ne peut pas suivre
une échelle continue : c'était le seul dessin du jeu hors grille, à ±13 %. En mode
pixel, cette variation de hauteur est donc **figée**. Les espèces, l'écart entre elles
et la parallaxe suffisent à varier la ligne d'horizon ; le mode au trait garde sa
variation.

Un piège en passant : les tailles d'affichage relevées pour ces arbres étaient fausses.
Le relevé prend le minimum sur une partie, mais un arbre est redessiné des centaines de
fois alors qu'il n'y en a qu'une poignée à l'écran : le minimum portait sur six tirages,
pas six cents, et tombait 19 % au-dessus de la vraie taille de base. Une fois l'échelle
figée, la taille est déterministe et se relève sans ambiguïté.

### La taille des pixels, mesurée sur le jeu et non tenue à la main

Chaque planche pixel est fabriquée à sa **taille d'affichage divisée par PX_JEU** :
c'est ce qui fait qu'un pixel d'art vaut la même chose partout. Cette taille
d'affichage vivait dans un fichier tenu à la main, `tailles.json`, et chaque fois qu'un
dessin grossissait il fallait penser à l'y reporter. Une fois sur deux ça tenait.

Elle se **mesure** maintenant. Une sonde espionne tous les appels à `drawImage` pendant
qu'on promène le jeu dans tous ses états — menu, chaque obstacle, chaque silhouette de
fond posée une par une, les oiseaux sur un cycle d'ailes entier, la poule qui court,
saute, vole, gobe et panique, la chute, le K.-O., le relevage, la pierre tombale, le
panneau de fin — et retient pour chaque planche la **plus grande** taille à laquelle
elle est posée, ramenée en pixels CSS sur l'écran de référence.

Trois précautions, apprises en la construisant :

- **En mode pixel seulement.** C'est le seul style qui se sert de ces planches. Au
  trait, les arbres tirent en plus une échelle au hasard jusqu'à un tiers de plus :
  mesurer là-dedans fabriquait des planches d'arbre un tiers trop fines, pour une
  variation qui n'existe pas en pixel. La page s'ouvrant au trait, on efface aussi ce
  qui a été relevé avant la bascule.
- **Le décor est posé teinté**, c'est-à-dire non pas la planche mais une copie
  coloriée, que la table des clés ne connaît pas. Le temps de la mesure, la teinture
  devient transparente.
- **Une planche posée en tranches** — la queue du cerf-volant — ou déformée n'a pas de
  taille lisible sur un seul appel. On la reconnaît à son rapport largeur/hauteur, qui
  ne colle plus à celui de la planche, et on garde alors la valeur du fichier.

La règle d'écriture est le **maximum** : on ne remplace la valeur du fichier que si la
mesure est plus grande. Une planche plus fine que son usage ne gêne pas — elle a juste
plus de détail que l'écran n'en montre ; plus grossière, ça se voit. Deux pièces du
bandeau, la plume et la coupe, sont taillées pour un écran plus large que celui de
référence et mesurent donc 6 et 11 % de moins ici : elles gardent leur valeur.

Le passage en revue a trouvé, au-delà des agrandissements voulus, que la **pierre
tombale** était posée 7 % plus grande que ce que le fichier croyait — sa planche était
donc 7 % trop grossière depuis toujours.

Et un vrai défaut de jeu, celui-là : les arbres tirent leur échelle **à la plantation**,
et seulement au trait. Ceux qui étaient déjà plantés gardaient leur coefficient au
passage d'un style à l'autre — jusqu'à un tiers de trop pour leur planche — et ce
jusqu'à la partie suivante. La bascule les retire maintenant.

Après quoi, sur les 72 planches, une seule s'écarte de la grille : `fly_ico`, la mouche
du panneau de fin, taillée exprès pour les 76 pixels qu'il lui donne sur grand écran.

### Le dessin doit avoir plus de pixels que la grille

Toutes les planches étaient à la bonne taille, au bon grain, à bord net — et l'arrière-
plan avait quand même **des pixels plus gros que la poule**. Il a fallu descendre dans la
conversion pour comprendre.

Elle vote sur les pixels **entiers** du dessin : chaque case de la grille regarde la boîte
de pixels source qu'elle recouvre, et décide. Tant que le dessin est plusieurs fois plus
fin que la grille, chaque case décide sur beaucoup de pixels et le contour tombe au pixel
de grille près. Mais quand le dessin est aussi grossier que la grille, **plusieurs cases
voisines retombent sur le même pixel source** : elles décident pareil, et la marche du
contour n'est plus celle de la grille mais celle du dessin.

Le rapport dessin/grille le dit d'un chiffre :

| | dessin | grille | rapport |
| --- | --- | --- | --- |
| la poule | 920 | 230 | **4,0** |
| le corbeau | 873 | 193 | 4,5 |
| le ballot | 605 | 291 | 2,1 |
| le chêne | 966 | 689 | 1,4 |
| le massif | 1 452 | **2 021** | **0,72** |
| la ville | 1 099 | 1 948 | **0,56** |

Les massifs et la ville sont **agrandis**, pas réduits : leur dessin a moins de pixels
que la grille n'en demande. Mesuré sur le flanc d'un massif, la marche du contour faisait
deux pixels de grille là où celle de la poule en fait un. C'est exactement ce que l'œil
appelle des pixels plus gros, et les agrandissements successifs du décor l'avaient
aggravé.

La correction tient en cinq lignes : **on agrandit d'abord le dessin, avec le lissage du
navigateur, jusqu'à deux fois la grille**, et le vote suit sans changer d'une ligne. Rien
n'est inventé — le bord des planches est anticrêné, sa position est connue au sous-pixel
près, et l'agrandissement lissé ne fait que la rendre lisible case par case.

Mesuré sur la marche moyenne du contour, la poule valant 1 :

| | avant | après |
| --- | --- | --- |
| le massif | 1,05 | **0,94** |
| le grand massif | 0,82 | **0,72** |
| la colline | 0,72 | **0,65** |
| le moulin | 0,78 | **0,74** |
| la poule | 1,00 | 1,00 (inchangée) |

Et le nombre de marches lisibles sur un même contour monte de 10 %, ce qui est le vrai
signe : le bord a récupéré du détail au lieu de le recopier par blocs. La table pixel
grossit de 29 Ko.

### Les obstacles ont pris 15 %### Les obstacles ont pris 15 %

La ferme est vue d'un peu plus près, décor compris : les sept obstacles suivent, et le
creux sous la ligne d'horizon avec eux — sinon les gros objets flottent et les petits
s'enterrent. Les boîtes de collision se lisent en fractions du dessin, elles suivent
sans qu'on y touche.

| | hauteur minimale pour franchir |
| --- | --- |
| ballot | −46 → **−56** |
| seau | −48 → **−58** |
| pneu | −81 → **−96** |
| pile de ballots | −92 → **−109** |
| brouette | −93 → **−110** |
| barrière | −94 → **−111** |
| fourche | −158 → **−184** |

Le saut monte à 321 unités et le bas de la boîte de la poule dix de plus : tout reste
franchissable d'un simple saut, avec 137 unités de marge sur la fourche.

La sonde qui relève ces hauteurs a dû être réparée au passage. Elle posait l'objet à une
abscisse écrite en dur, `hen.x+55` : les boîtes ne se recouvrent que si l'objet est assez
large, et le seau agrandi passait désormais à côté de la poule sans jamais la toucher.
Le test rendait alors zéro, ce qui se lit comme « infranchissable » alors que ça veut
dire « jamais rencontré ». Elle cherche maintenant d'abord l'abscisse où les deux boîtes
se recouvrent vraiment au sol, puis elle monte.

Deux précautions dans la conversion : la **palette est relevée** sur chaque dessin,
doublons fusionnés — il restait trois rouges de crête à deux unités d'écart — et le
**trait d'encre est prioritaire** au vote de bloc. Une moyenne noie une ligne d'un
pixel dans le blanc qui l'entoure, et la poule reviendrait en tache sans contour.

### Quatorze teintes, et une couleur qui ne se fond jamais dans un gris

Les deux réglages de la palette sont liés, et c'est ce qui rend le premier trompeur :
**monter le nombre de teintes ne sert à rien si la fusion les avale ensuite**. La
conversion a longtemps tourné à cinq teintes avec une fusion à 78 unités, ce qui est
énorme — ce seuil n'existait que pour réunir trois rouges de crête à *deux* unités
d'écart. Tout ressortait donc en aplats : la paille était un seul jaune, le pneu un seul
gris, le moyeu de la brouette un rond plat.

C'est maintenant **quatorze teintes, fondues en deçà de 22**. Cinq, huit, dix et
quatorze ont été convertis côte à côte sur six dessins, et c'est quatorze qui a été
retenu : le manche de la brouette y retrouve son bois, la paille son grain, le pneu le
relief de ses crampons, le seau la bande grise de son intérieur.

C'est un parti pris assumé, et il a un prix : plus le nombre de teintes monte, plus le
dessin s'éloigne de l'aplat franc du pixel art pour se rapprocher d'une photo réduite.
La paille grésille un peu. La nuance a été jugée plus importante que la rigueur de la
trame — c'est un choix de goût, et il se change en deux nombres.

Les planches pèsent **410 Ko**. Le nombre de teintes y compte moins que la finesse de
la grille : les silhouettes du décor n'ont qu'une seule couleur quoi qu'il arrive.

### Une couleur ne se fond jamais dans un gris

Le seau versait une flaque **grise**. La fusion des quasi-doublons se faisait sur la
distance en RVB seule, et un bleu pâle est *géométriquement* proche d'un gris clair sans
avoir rien à voir avec lui : l'eau, `rgb(210,230,242)` et 43 000 pixels, tombait à
**23 unités** du blanc du seau et se faisait absorber par lui. Elle ne concourait même
pas pour une place dans la palette. Dans l'autre sens, un gris neutre s'était fait
absorber par le vert de l'herbe, ce qui n'a pas plus de sens.

La correction est une interdiction, et une seule : **on ne fond pas une teinte colorée
avec une teinte neutre**. La frontière est l'écart entre le canal le plus fort et le plus
faible ; en deçà de 18, on appelle ça un gris. Tout le reste fusionne exactement comme
avant — les trois rouges de crête, les deux jaunes de bec, les nuances de gris entre
elles.

C'est volontairement la règle la plus étroite qui répare le défaut. Deux plus ambitieuses
ont été essayées et jetées, mesure à l'appui : peser la couleur plus lourd que la clarté
dans la distance, et classer les candidates par fréquence *pondérée par la saturation*.
Les deux réparaient l'eau et cassaient le reste — le ballot de paille ressortait avec
cinq jaunes et sans encre, l'herbe avec cinq verts et sans blanc.

### Et une couleur ne disparaît pas non plus faute de place

La règle du dessus interdit qu'une couleur se **fonde** dans un gris. Il en manquait une
seconde : qu'elle disparaisse **faute de place**, ce qui revient au même une fois les
pixels ramenés à la teinte la plus proche.

Le portrait de la pierre tombale l'a montré. Son bec orange, `rgb(245,148,5)`, ne pèse
que **170 pixels sur 122 000** — un dessin presque entièrement gris — et il arrivait au
vingt-septième rang de fréquence, bien après les quatorze places disponibles. Les pixels
tombaient alors sur la teinte la plus proche de la palette : le brun du cadre en bois, à
**112 unités**. Le bec ressortait brun-gris. Le défaut n'existait qu'en mode pixel ; la
planche au trait a toujours eu son bec orange.

Une couleur obtient donc une place supplémentaire — trois au maximum par dessin — à deux
conditions : peser au moins **huit dix-millièmes** du dessin, et voir la teinte qui la
recueillerait à plus de **quatre fois la distance de fusion**, soit 88 unités.

Le seuil n'est pas choisi, il est mesuré. Sur les soixante-six dessins, une seule couleur
assez lourde tombe au-delà de 88 unités de sa remplaçante : ce bec. La suivante est à 75,
et il s'agit partout de **nuances d'ombre** — un orange plus sombre, un rouge plus sombre
— que la règle n'a aucune raison de séparer. À deux fois la distance de fusion, elle
touchait trente-trois planches sur soixante-six ; à quatre fois, une seule.

### Ce que la bascule doit reprendre

Tout ce qui **dérive** des dessins, et pas seulement les dessins :

| Ce qui repart | Pourquoi |
|---|---|
| La table inverse dessin → nom | Le calage au sol se lit par nom |
| Les calques de teinte du décor | Ils sont peints à partir d'un dessin précis |
| Les boîtes de collision | Elles sont **relevées sur le dessin**, pas écrites |
| La poule du panneau de fin | Elle est en cache dans son propre canevas |
| `imageSmoothingEnabled` | Sur les trois contextes, sinon les planches sont lissées |
| Le ciel | En pixel il passe en dix-huit bandes franches : un dégradé continu derrière un décor en pixels trahit le montage |

Les boîtes de collision bougent donc un peu en pixel : de 2 à 7 unités sur les côtés,
**toujours vers l'intérieur**. Le contour à basse résolution tombe un pixel plus tôt,
si bien que le mode pixel est marginalement plus indulgent, jamais plus dur.

### Ce qui est tracé en code, et la typographie

Les planches converties ne suffisent pas : la ronde d'étoiles du K.-O., la jauge de
plumes, la poussière, les traits de vitesse et le texte du HUD sont **tracés en code**,
pas dessinés. Restés lisses au milieu des pixels, ce sont eux qui trahissent un décor
pixelisé.

La réponse est un **tampon**. En mode pixel, la scène entière est dessinée dans un
canevas à la grille du jeu — un pixel de tampon pour un pixel d'art — puis agrandie
d'un bloc. Tout ce qui passe par le canevas tombe alors sur la même grille, sans qu'il
faille reprendre un seul tracé. Le reste de `draw()` raisonne en pixels CSS : il a
suffi de changer le facteur de la matrice, densité d'écran en trait, grille du jeu en
pixel. La poule du panneau de fin, qui a son propre canevas, suit la même règle.

Pour le **texte du document**, un tampon ne sert à rien : il faut une fonte. C'est une
vraie fonte — un fichier woff2 avec ses glyphes, sa table de correspondance et de vrais
contours, pas une image. Fredoka y est simplement ramenée sur une grille : chaque
caractère est rastérisé dans un canevas, puis le **contour réel** des pixels allumés est
suivi arête par arête et chaîné en boucles. Empiler des rectangles aurait été plus
simple, mais deux rectangles qui se touchent sans se recouvrir laissent une rayure
claire à chaque jointure : bien visible sur un grand titre, et c'est ce qu'a montré le
premier essai. Les trous sortent naturellement dans le sens contraire des pleins, ce
que le remplissage non-nul attend.

### Une grille de fonte ne suffit pas non plus

Le pixel apparent d'un texte vaut **taille du texte / grille de la fonte**. Avec une
grille unique, mesure faite : de 0,38 pixel CSS sur les petites capitales à **3,42** sur
le titre — sept fois et demie d'écart, et huit fois la finesse des dessins sur le titre.
Une fonte à pixels ne peut pas avoir un pixel constant si les corps varient.

Il y a donc une **échelle de grilles** — 20, 27, 35, 46, 61, 80, 106, 140, 185 — et
`fontePixel()` donne à chaque texte celle qui le rapproche le plus de `PX_JEU`. Le
choix est refait à chaque redimensionnement : les corps sont en `clamp()`, ils changent
avec la fenêtre. Les graisses légères ne sont fabriquées que pour les petits corps —
au-delà, tout est en 800 ou 900.

Résultat mesuré sur les textes du document, à quatre gabarits : le pixel apparent tient
entre **0,34 et 0,45** pour une cible de 0,40, soit 14 % d'écart au pire. L'échelle est
refaite à chaque changement de finesse : les grilles valent `taille / PX_JEU`.
Dix-sept faces, **126 Ko**. Elles ne servent qu'en mode pixel et qu'au document : le
texte du canevas passe déjà par le tampon.

### Le panneau de fin, qui restait lisse

Le contour festonné du panneau de *Game Over* est le seul dessin de la page qui ne soit
ni une planche ni un tracé du canevas : c'est un SVG posé en fond de bloc. Le navigateur
le rastérise à la **résolution de l'écran**, pas à la grille du jeu — si bien qu'en mode
pixel il était la seule chose de cet écran à garder des bords parfaitement nets, juste
à côté d'une poule assommée en escalier.

Le même chemin est maintenant peint dans un **canevas à la grille** — un pixel d'image
pour `PX_JEU` pixel CSS, exactement comme la poule posée dessus — puis agrandi en dur par
`image-rendering`. Même géométrie, même nombre de bosses ; seule la trame change.
Mesuré : cinq teintes distinctes sur une ligne qui traverse le bord, contre le dégradé
continu d'avant.

En le vérifiant, un second écart est apparu sur le même écran : la planche pixel de
l'icône de mouche avait été taillée sur la mouche du HUD, large de 39,7 pixels CSS,
alors que le panneau de fin la pose à 76 sur grand écran. Son pixel d'art y valait
**0,56** au lieu de la grille du jeu — c'était le seul élément visiblement plus grossier que le
reste. Elle est refaite sur la plus grande de ses trois utilisations ; les deux autres
la réduisent, ce qui ne coûte rien.

Reste vectoriel : les icônes SVG du carnet.

## L'icône, et le jeu ajouté à l'écran d'accueil

`icone.png` : une **petite scène du jeu** plutôt qu'un sujet découpé. La poule en vol,
bec ouvert, une mouche juste devant, et derrière elle des montagnes, une colline, deux
arbres et la bande de terre. Rien n'est redessiné : ce sont les dessins du jeu, teintés
comme il les teinte, dans les couleurs du matin.

Deux autres pistes ont été essayées et abandonnées. Une **scène entière** avec le décor
complet, trop chargée. Un **gros plan de la tête** en pixel art, bec ouvert et mouche
devant, qui tenait mieux à soixante pixels mais ne montrait plus de quoi parle le jeu.
C'est celle-ci qui reste, **sans pixel** : les dessins d'origine, au trait, lissés.

La poule occupe **64 % de la largeur** du carré. Elle en occupait la moitié, et à
soixante pixels — la seule taille qui compte sur un écran d'accueil — elle devenait une
tache. Au-delà de 64 % ses pattes viennent buter sur le coin arrondi du système ; c'est
la limite, mesurée sous le vrai masque et non estimée.

La mouche n'a pas bougé de sa place pour autant : elle est posée depuis le **bout du
bec**, dans le repère tourné de la poule, et non à une position absolue. L'écart entre
le bec et elle vaut 2,4 % du carré, avant comme après. Une poule plus grande, mais pas
plus près de sa proie.

Trois choses commandent la composition :

- Le décor est **étagé en trois teintes** de plus en plus soutenues : montagne, colline,
  arbres. Sans cet écart les silhouettes se confondent et il ne reste qu'une tache.
- La mouche n'est pas posée à l'œil. Le bout du bec est repéré en fractions du dessin,
  puis **suivi dans le repère tourné** de la poule inclinée de treize degrés ; la mouche
  se pose devant, décollée d'un écart fixe.
- **Le système arrondit lui-même les angles**, en superellipse et non en cercle, et
  **compose la transparence sur du noir**. Le carré est donc plein jusqu'aux bords, le
  sujet tenu à l'écart des quatre coins, et le fond opaque. La vérification se fait sous
  le vrai masque, à 180, 120, 87 et 60 pixels.

L'icône est **embarquée en base64** dans la page, comme tout le reste : le jeu ne
demande rien au réseau, pas même pour son icône. Une version 180 pour l'écran
d'accueil, une version 48 pour l'onglet.

Ajouté à l'écran d'accueil, le jeu s'ouvre **en plein écran**, sans la barre de
Safari, sous le nom court *La poule*. Le terrain se cale déjà sur `env(safe-area-inset-*)`,
il n'y avait rien à reprendre pour ça.

## Les outils du téléphone

Sur iPhone, deux ou trois appuis rapides au même endroit réveillent la loupe du
système : le mot sous le doigt se surligne et la barre *Copier / Rechercher* se pose
par-dessus la partie. Un appui long ouvre le menu contextuel, un pincement zoome la
page. Rien de tout cela n'a de sens ici — aucun texte du jeu n'est fait pour être lu
par un outil du système.

Le blindage tient en deux parties :

- **En CSS**, `user-select`, `-webkit-touch-callout` et `-webkit-user-drag` sont
  coupés sur `*` et non sur le seul `body`. La règle porte bien sur tous les
  éléments : la feuille de style du navigateur remet la sélection sur certains
  d'entre eux, boutons compris, et une règle posée sur `body` seul les laisse passer.
- **En JavaScript**, `selectstart`, `dragstart` et les trois `gesture*` de Safari
  sont annulés. Le CSS ne suffit pas pour eux, et Safari ignore `user-scalable=no`
  depuis iOS 10 — le pincement ne se coupe que par `gesturestart`.
- **Le geste tactile lui-même** est annulé sur `touchstart` et `touchmove`. C'est le
  seul moyen d'arrêter le **double appui suivi d'un glissement**, qui promène une
  loupe sur l'écran : Safari le décide sur les événements tactiles, et annuler le
  `pointerdown` ne l'en empêche pas. Les boutons sont épargnés — annuler leur
  `touchstart` supprimerait le clic qui les actionne. Le reste du jeu ne passe pas
  par le clic mais par les événements pointeur, qui continuent d'être émis.

`touch-action:none` porte aussi sur `*`. En théorie la valeur posée sur `body`
suffit, l'effet se calculant sur toute la chaîne des ancêtres ; en pratique les
versions de Safari ne s'accordent pas là-dessus, et la règle ne coûte rien.

Le menu contextuel n'est bloqué que dans le jeu, pas sur la page entière : ailleurs,
le clic droit reste celui du navigateur.

Vérifié en mesurant ce dont la loupe dépend, faute de pouvoir la faire apparaître
dans Chromium : aucun élément de la page ne se déclare sélectionnable, le triple-clic
sur le titre, sur une consigne, sur un nombre du carnet et sur le mot du bouton de
saut ne sélectionne rien, et les six événements partent bien annulés.

Couper des gestes du système sur un jeu qui se joue au doigt demandait de vérifier
qu'on ne coupe pas le jeu avec : une partie entière est rejouée au tactile —
lancement, appui maintenu jusqu'au vol, pastille de saut, bouton de son, bouton
*Recommencer* — et le double appui glissé ne laisse derrière lui ni sélection, ni
zoom, ni décalage de la page.

Un dernier cas échappe à la page : si la loupe persiste, c'est le **zoom
d'accessibilité** d'iOS (*Réglages › Accessibilité › Zoom*), qui vit au-dessus du
navigateur. Aucun site ne peut le désactiver.

## Sauvegarde

Les trois records — le score, les mouches, la distance —, le nombre total de
mouches, le nombre de parties, les trophées gagnés et la préférence de son sont
conservés sous la clé `poule.v3`. Les trophées y sont une simple liste de clés :
une sauvegarde plus ancienne, ou abîmée, repart d'une liste vide plutôt que d'une
erreur.

Le record a changé deux fois de nature : des mètres, puis des mouches, maintenant un
score. Chaque fois le nombre gardé n'a plus le même ordre de grandeur, et un carnet
de la version précédente afficherait un record intenable ou ridicule. Chaque fois on
change donc de clé, et on ne reprend de l'ancien que ce qui garde un sens.

Ici, ce qui garde un sens est plus large qu'au passage précédent : les totaux, le
son, la langue, le style, les trophées, **et l'ancien record de mouches** — qui n'était
pas un score, mais qui est exactement ce que la nouvelle ligne « mouches » compte.
Seul le score repart de zéro, faute de pouvoir être reconstitué : personne ne sait
sur quelle distance ces mouches-là avaient été gobées. Si `localStorage` est indisponible
(navigation privée, cadre cloisonné), le jeu tourne sans mémoire plutôt que de
s'arrêter.
