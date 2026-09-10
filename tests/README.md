# Vérifier les premières parties et la progression

Les tests utilisent uniquement Node.js, sans installation supplémentaire. Depuis la racine du dépôt :

```sh
node tests/progression.cjs
node tests/onboarding.cjs
```

Ils exécutent les fonctions du jeu dans un environnement simulé et vérifient les cumuls après une défaite, les reprises au checkpoint, la conservation des records au rechargement, les six mondes, l'aide de première partie, son accès depuis les réglages, le clavier et les rappels contextuels.

Pour vérifier l'interface, ouvrir `index.html` : essayer une première partie, consulter les trophées, puis ouvrir « Comment jouer » depuis les réglages. Vérifier les deux langues et le défilement sur un petit écran. Ces tests ne remplacent pas un essai prolongé de l'équilibrage des six terrains.
