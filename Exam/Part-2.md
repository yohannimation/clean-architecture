# C1. Modélisation

## Diagram

            ┌─────────────────────────────┐
            │        Framework/Drivers     │
            │ (Express, Multer, REST API) │
            └─────────────┬──────────────┘
                          │
        ┌─────────────────┴──────────────────┐
        │               Controllers/Routes    │
        │ - pimRoutes.js                     │
        │ - damRoutes.js                     │
        └─────────────┬──────────────┬───────┘
                      │              │
          ┌───────────┘              └───────────┐
          │                                     │
  ┌───────▼─────────┐                 ┌─────────▼─────────┐
  │   Use Cases /    │                 │    Use Cases /     │
  │   Interactors    │                 │    Interactors     │
  │ - CreateProduct  │                 │ - UploadMedia      │
  │ - UpdateProduct  │                 │ - LinkMediaToProduct│
  │ - DeleteProduct  │                 └─────────┬─────────┘
  └─────────┬────────┘                           │
            │                                    │
      ┌─────▼───────────┐                 ┌─────▼───────────┐
      │   Entities       │                 │   Entities       │
      │ - Product        │                 │ - Media          │
      │ - Typology       │                 │ - FormatMedia    │
      │ - FormDefinition │                 │ - LienProduitMedia│
      └─────┬───────────┘                 └─────────────────┘
            │
            │
      ┌─────▼───────────┐
      │ Repositories     │
      │ - ProductRepo    │
      │ - MediaRepo      │
      └─────────────────┘


## Entités métier principales

- Product : représente un produit avec EAN, SKU, nom, typologie, attributs dynamiques.
- Typology : définit les champs dynamiques par type de produit (ex. textile → taille, couleur).
- FormDefinition : génère dynamiquement le formulaire d’un produit selon sa typologie.
- Media : représente un média (photo, vidéo, PDF) associé à un produit via EAN/SKU.
- LienProduitMedia : relation entre un média et un produit.

## Circulation des données PIM ↔ DAM

- Création d’un produit dans le PIM via `POST /api/pim/products`.
- Upload d’un fichier dans le DAM via `POST /api/dam/upload`.
- Orchestrateur MDM Core : lit le nom du fichier (`EAN12345_SKU56789_front.png`), parse EAN/SKU et lie le média au produit via `ProductRepository` et `MediaRepository`.
- Produit et média peuvent ensuite être récupérés via leurs endpoints (`GET /api/pim/products/:ean/:sku`, `GET /api/dam/medias/:ean/:sku`).

# C2. Justification des choix

## Application des principes DIP et OCP

- DIP (Dependency Inversion Principle) : Les Use Cases (`CreateProduct`, `UploadMedia`) dépendent d’interfaces abstraites (ProductRepository, MediaRepository), pas des implémentations concrètes.

- OCP (Open/Closed Principle) :
    - Nouveaux types de produits → créer un nouvel objet `Typology` avec ses champs dynamiques.
    - Nouveaux formats de médias → aucune modification nécessaire dans le code existant (Multer accepte dynamiquement les fichiers).

## Éviter les cycles de dépendance (ADP)

- DAM ne dépend jamais directement de PIM.
- Liaison produit–média gérée via MDM Core (MdmOrchestrator) qui connaît les interfaces (IProductService, IMediaLinkService).

## Parties testables avec des mocks

- Tests unitaires des Use Cases PIM : mock de ProductRepository pour simuler la persistance.
- Tests unitaires DAM : mock de MediaRepository et ProductRepository pour tester l’association média–produit sans toucher aux fichiers physiques.

# C3. Découpage en composants

## Proposition de découpage

| Module       | Responsabilité principale                                                     | Cohésion/Couplage                                                        |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **PIM**      | Gestion produits et typologies, formulaires dynamiques                        | Haute cohésion (REP, CCP), faible couplage (ADP respecté via interfaces) |
| **DAM**      | Gestion des médias et association automatique produit–média                   | Haute cohésion, utilise MDM Core pour éviter dépendance directe au PIM   |
| **MDM Core** | Orchestration et règles communes (liaison produit–média, suppression cascade) | Centrale pour éviter couplage direct PIM↔DAM, respecte DIP et OCP        |


## Justification via principes de cohésion et couplage

- Cohésion : chaque module a une responsabilité unique (PIM → produits, DAM → médias, MDM Core → orchestration), regroupant les éléments qui changent pour la même raison et pouvant être réutilisés indépendamment.
- Couplage : les modules sont faiblement couplés grâce aux interfaces et à MDM Core (pas de dépendance directe PIM↔DAM), respectant DIP et évitant les cycles.