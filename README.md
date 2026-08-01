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

Un bouton rond en bas de l'écran donne la même chose : appui court pour sauter,
maintenu pour voler. Sa face est un dessin, pas un cercle CSS — l'ombre passe donc
par un filtre et non par `box-shadow`, pour qu'elle épouse le disque au lieu d'en
cerner le carré. Le disque est un aplat sans contour à lui : c'est cette ombre
d'encre qui lui donne son bord et le décolle du sol. Elle disparaît à l'appui, le
bouton descend de trois pixels — il s'enfonce. Il se pose dans la bande de terre sous le sol, là où le pouce
tombe déjà et où il ne cache rien du terrain, et n'apparaît qu'en course. L'appui
n'importe où sur l'écran continue de marcher — le bouton ne fait que le rendre
visible.

La jauge de plumes se vide en vol et se remplit au sol. Gober une mouche rend
deux plumes. Gober plusieurs mouches sans laisser retomber la chaîne monte un
combo : plus elle est longue, plus l'éclat au gobage est fourni et plus le
bruitage monte. Le combo ne paie rien d'autre — c'est le compte de mouches qui
fait le score, et une chaîne rapporte simplement plus de mouches en moins de
temps.

Un aigle traverse le ciel à contre-sens. Les autres obstacles sont au sol et
arrivent d'autant plus vite que la course dure.

## Le score

Le score est le nombre de mouches gobées. Les mètres ne comptent plus : ils
restent la mesure du temps passé — ce sont eux qui accélèrent la course, tirent
les obstacles et font tourner l'heure du jour — mais on ne joue plus à courir
loin, on joue à manger.

Le grand chiffre en haut à droite n'a pas d'unité écrite : le dessin de la
mouche, posé juste avant, en tient lieu. Le record sert de cible : une jauge
montre ce qu'il reste à gober et bascule au rouge dès qu'il tombe. Un palier
toutes les dix mouches déclenche le bandeau.

Le petit compteur de mouches qui vivait sous la jauge de plumes a disparu : il
répétait le grand chiffre. Il ne reste à gauche que le combo, qui n'apparaît qu'à
partir de deux mouches enchaînées.

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
| Premier | Sol, obstacles à sauter, herbe et cailloux | pleine |
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
| Herbe et cailloux | 3 à 36, tiré au hasard |
| Poule, aigles, mouches, particules | 14 |
| Obstacles à sauter | 19 |

Le sol porte deux sortes de détail, touffes d'herbe et cailloux, qui **se suivent
en alternance** : chaque nouveau venu prend la nature contraire de celui derrière
lequel il se pose. Tirée au hasard, la nature formait des plages de trois ou
quatre touffes d'affilée et l'alternance ne se lisait plus ; imposée, elle tient
sur 40 000 pas de simulation sans jamais deux voisins de même nature.

Ni les unes ni les autres ne sont sur la même rangée : chacune tire son propre
enfoncement, une sur trois descend nettement plus bas, et une sur huit se pose
tout devant, plus près du spectateur que les obstacles à sauter. Alignées, elles
faisaient une frise ; dispersées, elles donnent au sol de l'épaisseur.

L'écart entre deux détails est tiré lui aussi, et pas uniformément : le plus
souvent moyen, une fois sur cinq très serré parce que l'herbe pousse en bouquets
et que les cailloux traînent par deux, de loin en loin un vide franc. Un détail
sorti à gauche repart **derrière le dernier de la chaîne**, pas à une distance
quelconque du bord droit — sinon l'écart tiré ne voudrait rien dire et deux
dessins pourraient se retrouver l'un sur l'autre. Seize détails à 112 unités
d'écart moyen couvrent deux largeurs et demie d'écran : la fin de la chaîne
n'apparaît jamais au bord droit, et il en reste sept à l'écran comme avec
l'ancien semis régulier.

Les cinq cailloux sont découpés d'un même dessin et mis à l'échelle d'un seul
coup, ce qui garde leurs tailles relatives : du bloc de 42 unités au gravier de
13. Chacun est découpé avec les gravillons qui le posent au sol — ce sont autant
de petites composantes séparées, rattachées au bloc le plus proche — et sans ceux
du caillou voisin, qui traversent parfois la même boîte. Les objets
posés au sol, la poule comprise, portent une ombre — un aplat d'encre très dilué,
sans contour. Celle de la poule reste au sol pendant qu'elle monte, en
rétrécissant et en pâlissant, mais ne disparaît jamais tout à fait : c'est le seul
repère qui dise où elle va retomber. La pose KO a la sienne, plus large et plus
basse : calée sur la ligne d'horizon comme celle de la pose debout, elle passait
entièrement sous le ventre de la poule à plat et ne se voyait plus.

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

Deux dessins, pas quatre :

| Instant | Pose |
|---|---|
| 0 s | Le choc |
| 0,16 s | La poule KO, qui tombe |
| ~0,45 s | Le sol : poussière, secousse |
| ~1,2 s | L'écran de fin |

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

L'élan vers l'avant n'est pas une constante : il se calcule sur l'objet lui-même,
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
n'a pas son propre vocabulaire — puis reste au sol. Les poses de chute tête la
première, d'assise et de bascule ont été retirées : elles décomposaient un
mouvement que le choc et la chute racontent déjà.

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

## Sauvegarde

Le record, le nombre total de mouches, le nombre de parties et la préférence de
son sont conservés sous la clé `poule.v2`. Le passage de `poule.v1` est
automatique, mais le record ancien n'est pas repris : il était compté en mètres,
et un record de 228 serait resté hors d'atteinte en mouches. Les totaux et la
préférence de son, eux, suivent. Si `localStorage` est indisponible
(navigation privée, cadre cloisonné), le jeu tourne sans mémoire plutôt que de
s'arrêter.
