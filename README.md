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

## Les trois plans

Le décor défile sur trois épaisseurs, à trois vitesses, ce qui donne la
profondeur :

| Plan | Contenu | Vitesse |
|---|---|---|
| Premier | Sol, obstacles à sauter, touffes d'herbe | pleine |
| Deuxième | Arbres, sapin, cyprès, tracteur, moulin, panneaux | un tiers |
| Fond | Massifs montagneux et collines | un dixième |

Le fond et le deuxième plan partagent une seule et même tonalité : ce ne sont pas
les valeurs qui les séparent, c'est leur vitesse. Ce qui se recouvre se fond donc
en une seule masse, et les plans ne se lisent qu'en mouvement — c'est le parti
pris.

Ce sont des aplats opaques : rien ne se voit au travers. Ils suivent quand même
l'heure du jour — chaque dessin est reposé puis rempli en `source-in` dans un
calque à part, ce qui n'en garde que la silhouette et lui donne la couleur du
moment. La teinte est arrondie par paliers et sert de clé de cache : sur une
journée entière elle ne prend qu'une trentaine de valeurs, soit une repeinte
par seconde environ au lieu de dix-huit par image.

## Perspective

Le sol n'est pas vu de face : la ligne d'horizon est le fond du champ, et ce qui
est proche du spectateur se pose plus bas. Les appuis s'étagent donc, du plus
lointain au plus proche :

| Élément | Appui sous la ligne |
|---|---|
| Massifs et collines du fond | 2 |
| Arbres, tracteur, panneaux, moulin | 4 |
| Touffes d'herbe | 8 |
| Poule, aigles, mouches, particules | 14 |
| Obstacles à sauter | 19 |

C'est un décalage de rendu et rien d'autre. Le premier plan est translaté d'un
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
| Particules | Poussière, plumes, sueur, étiquettes de gain |
| Rendu | Décor, sprites, puis HUD calé sur le terrain |

Les valeurs de calage vertical des poses (`FOOT_POSE`, `DIVE_DROP`, `HURT_DROP`,
`ANCH_X`/`ANCH_Y`) sont réglées à l'œil sur les dessins : les modifier décale la
poule par rapport au sol.

## Sauvegarde

Le record, le nombre total de mouches, le nombre de parties et la préférence de
son sont conservés sous la clé `poule.v1`. Si `localStorage` est indisponible
(navigation privée, cadre cloisonné), le jeu tourne sans mémoire plutôt que de
s'arrêter.
