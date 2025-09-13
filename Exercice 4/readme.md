# Module de Gestion de Livres — Clean Architecture (Node.js)

Ce projet met en pratique les principes de la **Clean Architecture** en construisant un module simple de gestion de livres.  
L'application sépare clairement les responsabilités entre domain (métier), use cases (application), et infrastructure (adaptateurs + frontend).

## Fonctionnalités

- Ajouter un livre (titre, auteur, ISBN)
- Lister tous les livres
- Afficher les détails d’un livre via son identifiant
- Interface console (via `BookConsolePresenter`)
- Interface web simple (HTML/CSS/JS + `BookDomPresenter`)

## Structure du projet

```
.
├── src
│ ├── domain # Entités + contrats (ports)
│ ├── application # Use cases
│ └── infrastructure # Adapters + serveur
│ ├── adapters
│ │ ├── controllers
│ │ ├── presenters
│ │ └── repositories
│ └── main
│
├── frontend # Interface graphique
│ ├── index.html
│ ├── styles.css
│ └── app.js
│
└── server.js # Point d'entrée serveur (Express)
```

## Comment exécuter l’application

### 1. Installer les dépendances

```npm install```

### 2. Lancer le serveur

```node server.js```

### 3. Accéder au frontend

Ouvrez votre navigateur et rendez-vous sur :
[http://localhost:3000](http://localhost:3000)

## Défis rencontrés

- Respect de la Clean Architecture.
    La tentation est grande de "mélanger" les couches (ex : faire du console.log dans un Use Case).

- Connexion entre backend et frontend.
    Il fallait faire en sorte que le frontend (DOM) utilise la même logique que la console.

## Bénéfices des choix réalisés

- Séparation claire des responsabilités
    - Entité Book = modèle pur, sans dépendance technique.
    - Use Cases = logique métier claire, testable indépendamment.
    - Adapters = uniquement responsables de l’infrastructure (console, DOM, repository).
- Testabilité accrue
    - Les Use Cases peuvent être testés en isolant le repository et le presenter (via mocks).
    - Pas besoin de lancer le serveur pour tester la logique métier.
- Évolutivité
    - Aujourd’hui : repository en mémoire (InMemoryBookRepositoryAdapter).
    - Demain : repository MongoDB ou SQL → il suffit de créer un nouvel adapter.
    - Idem pour l’UI (console, web, API REST, mobile).
- Respect de la Clean Architecture
    - L’application illustre concrètement l’idée d’indépendance des frameworks : le métier ne dépend pas de Node, Express, ni du DOM.