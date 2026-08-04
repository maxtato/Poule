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

Un aigle traverse le ciel à contre-sens, à hauteur constante : il tire sa hauteur
à la naissance, n'importe où entre le ras du sol et le plafond de vol, et la tient
jusqu'au bord de l'écran. Il a un temps ondulé sur une sinusoïde ; la vague est
retirée. Vérifié sur 73 aigles suivis chacun sur 900 pas : pas une unité d'écart
de hauteur, boîte de collision comprise.

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
| Ballot de paille | 27 % | C'est *l'*objet du champ |
| Seau | 14 % | Il en traîne toujours un |
| Aigle | 14 % | Le ciel en a toujours un qui tourne |
| Barrière | 12 % | Une par clôture |
| Pneu | 10 % | Quelques-uns, pour tenir les bâches |
| Pile de ballots | 9 % | Plus rare qu'un ballot seul |
| Fourche | 5 % | On n'en croise pas dix |
| Cerf-volant | 5 % | C'est un événement |
| Brouette | 3 % | Une seule pour toute la ferme |

Chaque objet entre dans le tirage à partir d'une certaine distance — le début de la
course reste volontairement pauvre, le temps d'apprendre à sauter. Mesuré sur une heure
de jeu simulée, 3 990 obstacles : les parts tombent à un dixième de point des poids.

### Deux règles d'espacement pour le ciel

Deux oiseaux côte à côte ne se lisent plus comme deux obstacles mais comme un mur.

**L'aigle** : on n'en lance pas un tant que le précédent n'a pas quitté l'écran par la
gauche, plus une marge. Il vole à contre-sens, donc il traverse vite et l'attente est
courte — il garde 14 % du tirage malgré la règle.

**Le cerf-volant** : jamais deux d'affilée, et jamais un second tant que le premier est
en vue. Lui fuit dans le **même sens** que la poule et reste longtemps à l'écran ; deux
de suite, c'est le même obstacle deux fois.

Les deux règles ne rejettent pas le tirage pour le refaire : l'objet interdit est
**retiré du chapeau** avant de tirer, et son poids est redistribué sur les autres. Une
heure de jeu simulée, image par image : pas une seule image avec deux aigles à l'écran,
pas une avec deux cerfs-volants, pas un cerf-volant suivi d'un cerf-volant.

## La mouche dorée

De loin en loin, une mouche **dorée** traverse le ciel, seule, à hauteur de vol
franche et sans dérive : on doit la voir venir et décider d'aller la chercher. Une
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

Le score est le nombre de mouches gobées. Les mètres ne comptent plus : ils
restent la mesure du temps passé — ce sont eux qui accélèrent la course, tirent
les obstacles et font tourner l'heure du jour — mais on ne joue plus à courir
loin, on joue à manger.

Le grand chiffre en haut à droite n'a pas d'unité écrite : le dessin de la
mouche, posé juste avant, en tient lieu — la pose **ailes écartées**, qui se lit bien
mieux à cette taille que l'autre, dont les ailes se confondent avec le corps. Le
record sert de cible : une jauge
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

## L'aigle

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

## La chute

Deux dessins, pas quatre :

| Instant | Pose |
|---|---|
| 0 s | Le choc |
| 0,16 s | La poule KO, qui tombe |
| ~0,45 s | Le sol : poussière, secousse |
| ~1,2 s | Le panneau de fin |

### Le panneau de fin

La fin de partie était une fenêtre au premier plan, posée au milieu de l'écran par-dessus
un flou : la poule morte disparaissait derrière au moment même où elle finissait de
tomber. C'est maintenant un **panneau** posé dans la moitié haute de l'écran. Ni flou,
ni voile : le bas du terrain, là où la poule s'écrase, reste entièrement découvert, et
elle y reste en plan, étoiles comprises, aussi longtemps qu'on veut.

Il **annonce la fin de la manche** : un grand *Game Over* rouge, la poule KO assise sur
son bord haut avec ses étoiles, puis le décompte, le record couronné, les totaux et le
bouton. Le panneau se borne à la largeur du **cadre de jeu** et non à celle de la
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
avec le personnage. Le pixel vaut donc **0,30 pixel CSS**, le même partout ; chaque
dessin est converti à sa taille d'affichage divisée par cette valeur. La poule fait
256 pixels de large, la mouche 80, la montagne 1732.

Il y a un seuil, et il vaut la peine d'être connu, parce que **0,30 passe dessous**.
La scène est peinte dans un tampon large de `largeur / PX_JEU`, puis posée sur une
toile large de `largeur × dpr`, où `dpr` est **plafonné à 2,5**. À 0,40 ces deux nombres
sont égaux : `1 / 0,40 = 2,5`. Le tampon faisait exactement la taille de la toile, la
pose était un report pixel pour pixel, rien n'était ni agrandi ni réduit. Ce n'était pas
un hasard, c'était la raison du choix.

À 0,30 le tampon fait **un tiers de plus** que la toile, et le lissage étant coupé, le
navigateur **jette** ce qui ne rentre pas : mesuré sur le ballot de paille, 281 colonnes
de planche pour 211 pixels d'écran, soit **un quart de jetées**. Et ce qu'il jette dépend
de la position : en recalant deux images d'un nombre entier de pixels d'écran, il reste
47 % des pixels du ballot qui ont bougé quand même, contre 35 % à 0,40. C'est ce qui fait
grouiller un dessin en mouvement. Sur une capture immobile, rien ne se voit.

Deux façons d'avoir des pixels plus fins **sans** ce défaut, si le grouillement gêne :
relever le plafond de `dpr` à 3 et poser `PX_JEU` à un tiers, le report redevient exact
et le pixel reste plus fin qu'à 0,40 ; ou revenir à 0,40.

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

Deux précautions dans la conversion : la **palette est relevée** sur chaque dessin,
doublons fusionnés — il restait trois rouges de crête à deux unités d'écart — et le
**trait d'encre est prioritaire** au vote de bloc. Une moyenne noie une ligne d'un
pixel dans le blanc qui l'entoure, et la poule reviendrait en tache sans contour.

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

Il y a donc une **échelle de grilles** — 27, 35, 47, 61, 81, 107, 141, 187, 247 — et
`fontePixel()` donne à chaque texte celle qui le rapproche le plus de `PX_JEU`. Le
choix est refait à chaque redimensionnement : les corps sont en `clamp()`, ils changent
avec la fenêtre. Les graisses légères ne sont fabriquées que pour les petits corps —
au-delà, tout est en 800 ou 900.

Résultat mesuré sur les textes du document, à quatre gabarits : le pixel apparent tient
entre **0,26 et 0,34** pour une cible de 0,30, soit 14 % d'écart au pire. L'échelle est
refaite à chaque changement de finesse : les grilles valent `taille / PX_JEU`, elles ont
donc toutes grandi d'un tiers en passant de 0,40 à 0,30. Dix-sept faces, **146 Ko**. Elles ne servent qu'en mode pixel et qu'au document : le
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

Le record, le nombre total de mouches, le nombre de parties et la préférence de
son sont conservés sous la clé `poule.v2`. Le passage de `poule.v1` est
automatique, mais le record ancien n'est pas repris : il était compté en mètres,
et un record de 228 serait resté hors d'atteinte en mouches. Les totaux et la
préférence de son, eux, suivent. Si `localStorage` est indisponible
(navigation privée, cadre cloisonné), le jeu tourne sans mémoire plutôt que de
s'arrêter.
