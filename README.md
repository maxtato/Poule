# La Poule qui vole

Un jeu de course infinie tenant dans un seul fichier HTML. La poule court, saute,
et vole tant qu'il lui reste des plumes. Ouvre `index.html` : rien à installer,
rien à télécharger, aucun réseau.

## Jouer

| Geste | Effet |
|---|---|
| Appui bref | Petit saut |
| Appui plus long | Saut plus haut, jusqu'au saut entier |
| Appui maintenu | Le saut entier, **puis** le vol tant qu'il reste des plumes |
| `Espace`, `↑`, `W` | Idem au clavier |
| `M` | Couper ou remettre le son |

Le saut part toujours à pleine impulsion et se **coupe net au relâchement** : la
hauteur suit donc la durée de l'appui, sans qu'il faille attendre de savoir combien
de temps le doigt va rester. Passé le moment où la pesanteur a ramené la vitesse
sous le plancher — un peu plus d'un dixième de seconde — relâcher ne change plus
rien et le saut est entier.

| Appui | Hauteur |
|---|---|
| relâché aussitôt | 140 |
| 0,04 s | 209 |
| 0,08 s | 251 |
| 0,12 s et au-delà | 309, le saut entier |

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

Un aigle traverse le ciel à contre-sens, à hauteur constante : il tire sa hauteur
à la naissance, n'importe où entre le ras du sol et le plafond de vol, et la tient
jusqu'au bord de l'écran. Il a un temps ondulé sur une sinusoïde ; la vague est
retirée. Vérifié sur 73 aigles suivis chacun sur 900 pas : pas une unité d'écart
de hauteur, boîte de collision comprise.

Les autres obstacles sont au sol et arrivent d'autant plus vite que la course
dure.

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
opaque. Les ailes n'ont que deux ou trois positions dessinées ; la traînée
comble l'écart entre elles et le battement cesse de sauter d'une position à
l'autre. C'est elle, depuis, qui tient lieu de position intermédiaire au vol de la
poule. Les mouches battent quatorze fois par seconde : le recouvrement y dure
moins de trente millisecondes, assez pour lisser le battement sans jamais
laisser voir deux mouches.

## Le vol

Même principe qu'à la course, mais il a fallu construire le corps avant de pouvoir
le partager. Les trois dessins de vol sont trois poules entières, l'aile fondue
dans le corps : un remplissage parti de l'aile et arrêté par l'encre déborde dans
tout l'oiseau, l'aile n'est donc pas découpable.

Elle se contourne. **`fly_up` a l'aile levée, donc un ventre net ; `fly_down` a
l'aile baissée, donc un dos et une queue nets.** Le corps sans aile s'assemble des
deux : le haut de `fly_down`, le bas de `fly_up`, cousus à la rangée 346 — celle
où les deux dessins s'accordent le mieux, soixante-sept pixels de désaccord contre
plus de deux cents cent rangées plus bas. La racine de l'aile baissée, un trait qui
traîne au-dessus de la couture, est reprise à `fly_up` dans une fenêtre mesurée sur
elle : 227 pixels d'encre présents chez l'un et absents chez l'autre.

La couture laissait une marche dans le contour : quatorze pixels aux fesses, neuf
sous les barbillons — les deux dessins n'ont pas exactement la même largeur de
corps à cette hauteur. Le bas est donc **étiré** vers le haut, rangée par rangée :
le bord gauche est ramené sur celui du haut, le bord droit aussi, la correction
s'effaçant sur quarante rangées. Entre les deux bords c'est du blanc plat, où un
étirement de cinq pour cent ne se voit pas. Marche restante : zéro de chaque côté.

Chaque aile est alors ce qui, dans son dessin, dépasse de ce corps — plus le trait
de l'aile là où il court **sur** le corps, reconnu à ce que le dessin et le corps
assemblé n'y disent pas la même chose. Cette seconde partie ne se distingue pas,
par la seule couleur, du contour propre au dessin : les deux diffèrent du corps et
ils se touchent. On la borne donc par la position, sur des bornes prises du cœur de
l'aile — ce qui d'elle déborde du corps, mesuré à x 309-541 pour l'aile haute et
x 329-648 pour la basse. Sans cette borne, l'aile basse emportait les pattes du
dessin dont elle vient, et l'aile haute le contour de sa propre croupe.

L'aile se pose **devant** le corps, non derrière : posée derrière, le corps lui
mangeait tout ce qui rentre dedans et elle paraissait coupée net au niveau du dos
ou du ventre, alors que le dessin la montre passant par-dessus.

Résultat mesuré : les deux images de vol diffèrent de 67 980 pixels, et ces 67 980
sont **exactement** les deux ailes — pas un pixel de différence hors d'elles.

Le battement n'a plus que deux positions au lieu de trois. Le dessin à mi-course ne
peut plus y figurer : à mi-battement l'aile est ramenée en arrière, exactement là
où est la queue, et un corps commun lui donne une queue, qui la masquerait. La
traînée fait le passage entre le bas et le haut. La liste ayant deux entrées au
lieu de quatre, l'avance a été divisée par deux : le battement garde ses 2,75
cycles par seconde.

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
basses et plates. La mesure retombe à 30,1 % – 85,4 % de la largeur, contre
30,1 % – 87,3 % pour la valeur réglée à l'œil qu'elle remplace.

Il ne reste du jeu d'origine que la plume du compteur de vol — et elle sert
maintenant deux fois : c'est elle aussi qui tombe de la poule à chaque coup d'aile
et par gerbes de quinze quand elle meurt. Ces plumes-là étaient une ellipse blanche
cernée d'encre. Le dessin porte la plume en diagonale dans son cadre, si bien qu'un
cadre de 18 unités lui donne une longueur de 16 — celle exacte de la tache qu'elle
remplace. La mesure est faite en posant les deux côte à côte, agrandies quatre
fois.

Les cinq cailloux sont découpés d'un même dessin et mis à l'échelle d'un seul
coup, ce qui garde leurs tailles relatives : du bloc de 42 unités au gravier de
13. Chacun est découpé avec les gravillons qui le posent au sol — ce sont autant
de petites composantes séparées, rattachées au bloc le plus proche — et sans ceux
du caillou voisin, qui traversent parfois la même boîte. Les objets
posés au sol, la poule comprise, portent une ombre — un aplat d'encre très dilué,
sans contour. Celle de la poule reste au sol pendant qu'elle monte, en
rétrécissant et en pâlissant, mais ne disparaît jamais tout à fait : c'est le seul
repère qui dise où elle va retomber. Toutes remontent de trois unités au-dessus de
l'appui du dessin : posées pile dessus, elles débordaient trop bas et l'objet
semblait flotter au-dessus de la sienne. La pose KO a la sienne, plus large et plus
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
n'a pas son propre vocabulaire — puis reste au sol. Les poses de chute tête la
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

## Sauvegarde

Le record, le nombre total de mouches, le nombre de parties et la préférence de
son sont conservés sous la clé `poule.v2`. Le passage de `poule.v1` est
automatique, mais le record ancien n'est pas repris : il était compté en mètres,
et un record de 228 serait resté hors d'atteinte en mouches. Les totaux et la
préférence de son, eux, suivent. Si `localStorage` est indisponible
(navigation privée, cadre cloisonné), le jeu tourne sans mémoire plutôt que de
s'arrêter.
