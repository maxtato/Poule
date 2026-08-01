# La Poule qui vole

Un jeu de course infinie tenant dans un seul fichier HTML. La poule court, saute,
et vole tant qu'il lui reste des plumes. Ouvre `index.html` : rien à installer,
rien à télécharger, aucun réseau.

## Jouer

| Geste | Effet |
|---|---|
| Appui court | Sauter |
| Appui maintenu | Battre des ailes tant qu'il reste des plumes |
| `Espace`, `↑`, `W` | Idem au clavier |
| `M` | Couper ou remettre le son |

La jauge de plumes se vide en vol et se remplit au sol. Gober une mouche rend
deux plumes. Gober plusieurs mouches sans laisser retomber la chaîne monte un
combo : la première rapporte 4 m, la huitième 32 m, soit environ 144 m pour une
nuée entière. C'est ce qui rend le vol rentable et pas seulement risqué.

Un aigle traverse le ciel à contre-sens. Les autres obstacles sont au sol et
arrivent d'autant plus vite que la course dure.

## La course

Deux poses en boucle : pattes écartées, pattes croisées. La pose croisée n'est pas
le dessin d'origine : seules ses jambes en ont été reprises, greffées sur le corps
de la pose pattes serrées. Les deux corps sont donc identiques au pixel près, et
seules les jambes bougent d'une image à l'autre. La pose pattes serrées
servait de passage entre les deux, mais elle est aussi la pose d'arrêt, et la
garder dans la boucle donnait une foulée qui marque le pas. Le corps rebondit deux
fois par cycle, soit un rebond par appui et non un par image.

Le cycle se déduit de la liste `COURSE` : y remettre `"idle"` entre les deux
extrêmes suffit à revenir à quatre images, le rebond et la traînée suivent.

La pose qu'on vient de quitter s'attarde derrière l'actuelle et s'efface sur un
tiers de l'image : les pattes gardent une traînée, ce qui donne l'illusion d'une
pose intermédiaire qui n'a jamais été dessinée — c'est elle qui tient lieu de
passage entre les deux extrêmes. La traînée passe **avant**,
l'actuelle par-dessus et opaque — un fondu croisé classique aurait rendu la poule
elle-même translucide pendant l'échange.

## Les trois plans

Le décor défile sur trois épaisseurs, à trois vitesses, ce qui donne la
profondeur :

| Plan | Contenu | Vitesse |
|---|---|---|
| Premier | Sol, obstacles à sauter, touffes d'herbe | pleine |
| Deuxième | Arbres, sapin, cyprès, tracteur, moulin, panneaux | un tiers |
| Fond | Massifs montagneux et collines | un dixième |

Trois valeurs étagent la profondeur : la plus claire pour les massifs du fond,
une plus foncée pour les arbres du deuxième plan, et l'encre des dessins de
devant. La ligne d'horizon prend la teinte des arbres — elle marque le fond du
champ, elle n'y appartient pas.

Ce sont des aplats opaques : rien ne se voit au travers. Ils suivent quand même
l'heure du jour — chaque dessin est reposé puis rempli en `source-in` dans un
calque à part, ce qui n'en garde que la silhouette et lui donne la couleur du
moment. La teinte est arrondie par paliers et sert de clé de cache : sur une
journée entière elle ne prend qu'une trentaine de valeurs, soit une repeinte
par seconde environ au lieu de dix-huit par image.

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

## Perspective

Le sol n'est pas vu de face : la ligne d'horizon est le fond du champ, et ce qui
est proche du spectateur se pose plus bas. Les appuis s'étagent donc, du plus
lointain au plus proche :

| Élément | Appui sous la ligne |
|---|---|
| Massifs et collines du fond | 2 |
| Arbres, tracteur, panneaux, moulin | 4 |
| Touffes d'herbe | 3 à 26, tiré au hasard |
| Poule, aigles, mouches, particules | 14 |
| Obstacles à sauter | 19 |

Les touffes ne sont pas toutes sur la même rangée : chacune tire son propre
enfoncement, et une sur trois descend nettement plus bas. Alignées, elles
faisaient une frise ; dispersées, elles donnent au sol de l'épaisseur. Les objets
posés au sol, la poule comprise, portent une ombre — un aplat d'encre très dilué,
sans contour. Celle de la poule reste au sol pendant qu'elle monte, en
rétrécissant et en pâlissant, mais ne disparaît jamais tout à fait : c'est le seul
repère qui dise où elle va retomber.

Le reste est un décalage de rendu et rien d'autre. Le premier plan est translaté d'un
bloc au moment de le dessiner plutôt que dessin par dessin : ainsi rien ne peut
se désaligner, et aucune boîte de collision ne bouge — le jeu se joue exactement
comme avant.

## Cadrage

Le terrain est dessiné en hauteur : 800 unités de large pour 1250 au minimum de
haut. Sur un écran plus court que ce rapport, le jeu se centre entre deux bandes
plutôt que de laisser le sol sortir de l'écran ; sur un téléphone couché, il
demande de redresser l'appareil, où l'image serait réduite à une bande étroite.

## Le fichier

Tout est dans `index.html`, sprites compris — ils sont encodés en base64 dans la
constante `B64`, ce qui explique la taille du fichier et la ligne interminable
en tête de script. Aucune dépendance, aucun outil de construction.

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

## La chute

Quatre poses s'enchaînent quand la poule est touchée :

| Instant | Pose |
|---|---|
| 0 s | Le choc, encore portée par l'élan |
| 0,15 s | La chute, tête la première |
| 0,30 s | Assise sur les fesses, dès que le sol est touché |
| 1,17 s | La bascule en arrière |
| 1,77 s | L'écran de fin |

Le temps d'arrêt assise vaut la moitié de l'effet : sans lui on passerait du choc
au dos sans voir la pose du milieu, et à une demi-seconde la bascule suivait encore
la chute de trop près pour qu'on les distingue.

Le dessin de la dernière pose portait ses propres étoiles et son tourbillon ; ils
ont été retirés au découpage pour laisser tourner ceux du jeu, qui sont animés.
Ils ne tournent que sur cette pose-là.

La bascule elle-même est une rotation de 1,3 radian — trois quarts d'angle droit —
autour des fesses, en un quart de seconde, avec un peu de poussière et une
secousse. C'est l'inclinaison à laquelle la silhouette allongée se superpose le
mieux à la silhouette assise : tête en haut, pattes vers l'avant. Plus à plat le
raccord saute, plus redressée elle se tient debout sur sa croupe.

L'angle est **positif** : la tête est à gauche du pivot, et sur un canevas dont
l'axe vertical descend, c'est un angle positif qui la lève. Au signe opposé elle
commençait la tête enfoncée dans le sol et la croupe en l'air — un plongeon, pas
une chute à la renverse. Les étoiles suivent la tête pendant la rotation, sinon
elles l'attendent toutes seules à l'arrivée.

Deux règles tiennent la cohérence entre les poses. Toutes se posent à la même
échelle `sc()`, si bien que la tête garde la même taille debout, assise ou sur le
dos — vérifié en mesurant la crête et le barbillon, les deux repères rouges : 7 %
d'écart au plus, le reste tenant à l'angle de vue. Et `HURT_FESSES` / `DOS_FESSES`
situent le point d'appui dans chaque dessin : c'est lui qui reste immobile pendant
la bascule, la tête partant en arrière autour de lui.

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

Les valeurs de calage vertical des poses (`FOOT_POSE`, `DIVE_DROP`, `HURT_DROP`,
`ANCH_X`/`ANCH_Y`) sont réglées à l'œil sur les dessins : les modifier décale la
poule par rapport au sol. `FOOT_POSE` donne, pour chaque pose, la rangée du bas
du dessin ; le rendu s'en sert pour poser les pattes sur le sol quelle que soit la
pose, ce qui autorise des dessins dont les pattes ne tombent pas toutes à la même
hauteur.

## Sauvegarde

Le record, le nombre total de mouches, le nombre de parties et la préférence de
son sont conservés sous la clé `poule.v1`. Si `localStorage` est indisponible
(navigation privée, cadre cloisonné), le jeu tourne sans mémoire plutôt que de
s'arrêter.
