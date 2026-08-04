# La Poule qui vole — version pixel art

Un essai. Le jeu de la racine, intact, avec **toutes ses images converties en pixel
art** : la poule, ses onze poses, les sept obstacles, l'aigle, le cerf-volant, les
mouches, les plumes, l'herbe, les cailloux, les arbres, les montagnes, les collines
et la pastille de saut. Cinquante-neuf planches.

Ouvre `pixel/index.html`. Le jeu de la racine ne bouge pas : les deux vivent côte à
côte, et celui-ci peut être jeté sans rien casser.

## Une seule grille pour tout le jeu

C'est le point qui fait tout tenir. Convertir chaque dessin à une largeur fixe —
64 pixels pour la poule, 64 pour la montagne — donnerait des pixels **gros comme une
maison** sur la montagne et minuscules sur la mouche : cinquante-neuf grilles
différentes, et un décor qui jure avec le personnage.

Le pixel du jeu vaut donc **1,22 pixel CSS**, le même partout. Chaque dessin est
converti à sa taille d'affichage divisée par cette valeur. La poule fait 63 pixels
de large, la mouche 20, la montagne 394.

Cette taille d'affichage est **mesurée, pas devinée** : `drawImage` est emballé le
temps d'une partie et relève, pour chaque dessin, la plus grande taille à laquelle il
est posé. La mesure se fait **à l'écran**, matrice courante appliquée, et non dans les
unités locales : le terrain dessine en unités de monde et le HUD en pixels CSS, deux
échelles qu'un relevé naïf mélange. Les quelques dessins qu'une partie ne montre pas —
la poule assommée, les poses de choc — tirent leur taille de leurs constantes.

Deux d'entre eux servent à deux tailles : la poule K.-O. au sol puis, plus grande, sur
le panneau de fin ; la mouche dans le HUD, sur le panneau et dans le carnet de
l'accueil. C'est la plus grande qui commande la grille, sinon le panneau agrandit une
planche faite pour le sol et la poule y devient un tas de gros carrés.

## Deux précautions dans la conversion

**La palette est relevée sur le dessin**, pas choisie. On compte les couleurs les plus
fréquentes, puis on fusionne les quasi-doublons — il y avait trois rouges de crête à
deux unités d'écart et deux jaunes de bec. Il reste cinq teintes par dessin : le blanc
cassé, l'encre, le rouge, le jaune, un gris. Les silhouettes du décor n'en gardent
qu'une, ce qui est correct : elles sont recolorées à l'exécution selon l'heure du jour.

**Le trait d'encre est prioritaire au vote de bloc.** Une moyenne noie une ligne d'un
pixel dans le blanc qui l'entoure, et la poule reviendrait en tache blanche sans
contour. L'encre l'emporte dès qu'elle occupe une petite part du bloc — le contour
reste continu jusqu'à 32 pixels de large.

## Ce qui change dans le code

Quatre retouches, pas une de plus :

| Retouche | Pourquoi |
|---|---|
| `imageSmoothingEnabled = false` | Sur les trois contextes : le terrain, le calque de teinte du décor, la poule du panneau de fin. Sans ça le navigateur lisse les planches à l'agrandissement et il ne reste rien du travail. |
| `image-rendering: pixelated` | Même chose pour les dessins posés par le document : la pastille de saut et les icônes. |
| Le ciel en **bandes franches** | Un dégradé continu derrière un décor en pixels trahit tout de suite le montage. Dix-huit bandes sur la même rampe de couleur. |
| `mixCss()` | `heure()` rend ses couleurs en `rgb()` et non en `#rrggbb` ; `mixHex` ne sait pas les relire, et le ciel sortait noir. |

Le reste — le jeu, les collisions, les sons, la sauvegarde — est le fichier de la
racine, mot pour mot.

## Ce que ça coûte, ce que ça rapporte

Les planches passent de **13,19 Mo à 0,08 Mo**. Le fichier entier tombe de 14 Mo à
**228 Ko**, la police pesant maintenant plus lourd que toutes les images réunies.

Une seule boîte de collision bouge : celle du ballot de paille, mesurée sur son dessin,
se resserre de 5,8 unités de chaque côté — le contour à basse résolution tombe un pixel
plus tôt. Les treize autres sont identiques à l'unité. Le reste des suites — partie
complète, panneau de fin, accueil sur cinq gabarits — passe sans écart.

## Ce qui n'est pas converti

Honnêtement, il reste du travail avant que ce soit un vrai jeu en pixel art :

- **La typographie.** Fredoka est une police vectorielle ; un jeu en pixels demande une
  fonte à chasse fixe dessinée sur la même grille.
- **Ce qui est tracé en code** : la ronde d'étoiles du K.-O., la jauge de plumes, la
  poussière, les traits de vitesse, le contour festonné du panneau de fin. Tout ça
  reste vectoriel et lisse.
- **Les icônes SVG** du carnet et le liseré pointillé du bouton *Jouer*.

## Refaire les planches

Les scripts vivent hors du dépôt (bac à sable de la session) : `tailles.js` relève les
tailles d'affichage, `pixelise.js` fabrique les planches, `pixjeu.py` applique les
quatre retouches de code. La finesse de la grille tient dans un seul nombre, l'argument
de `pixelise.js` : `1.22` donne la grille fine, `2.5` une poule de 31 pixels, franchement
plus rustique.
