# C1. Modélisation

## Diagram

graph TD
    A[Interfaces / API] --> B[Use Cases / Services]
    B --> C[Repositories / Infra]
    C --> D[Stockage / FileSystem]

    subgraph Interfaces / API
        A1[productController]
        A2[mediaController]
    end

    subgraph Use Cases / Services
        B1[ProductUseCases]
        B2[MediaUseCases]
    end

    subgraph Repositories / Infra
        C1[ProductRepository (Map)]
        C2[MediaRepository (List)]
        C3[LocalFileStorage]
    end

    subgraph Stockage / FS
        D1[uploads/]
    end

Flux typique pour DAM → PIM :

- Upload fichier via mediaController.
- Use case linkMediaToProduct extrait EAN et SKU du nom du fichier.
- Cherche le produit correspondant via ProductRepository.
- Associe le média au produit dans MediaRepository (lié par EAN/SKU).
- Données stockées dans le repository mémoire (ou futur DB).

## Entités métier principales

| Entité   | Description                             | Champs principaux                              |
|----------|-----------------------------------------|------------------------------------------------|
| Product  | Représente un produit dans le PIM       | `ean`, `sku`, `name`, `type`, `attributes`     |
| Typology | Définition de la typologie d'un produit | `name`, `fields` (attributs dynamique)         |
| Media    | Média associé à un produit              | `filename`, `productEAN`, `productSKU`, `type` |

## Circulation des données PIM ↔ DAM

- Le DAM dépend des identifiants produits (EAN/SKU) pour lier un média.
- Le PIM reste indépendant du DAM.
- L’association se fait dans le use case du DAM, pas dans le PIM.

`Client upload → mediaController → mediaUseCases.linkMediaToProduct() → mediaRepository.save() et association au ProductRepository via EAN/SKU`

# C2. Justification des choix

## Application des principes DIP et OCP

- DIP (Dependency Inversion Principle) :
    - Les Use Cases dépendent d’interfaces/abstractions (productRepository, mediaRepository) plutôt que des implémentations concrètes.
    - Le DAM ne connaît pas la structure interne du PIM, juste l’interface findByEAN.
- OCP (Open/Closed Principle) :
    - Ajout de nouveaux formats de média : on peut créer un nouveau MediaType ou un nouveau parseur sans modifier le code existant.
    - Ajout de nouveaux types de produit : la typologie est dynamique (fields) → pas besoin de toucher les use cases.

## Éviter les cycles de dépendance (ADP)

- Le PIM ne dépend pas du DAM.
- Le DAM peut interroger le PIM via l’interface productRepository (abstraction).
- Pas de cycles, respect de l’Acyclic Dependency Principle.

## Parties testables avec des mocks

| Partie               | Comment tester                                                           |
| -------------------- | ------------------------------------------------------------------------ |
| MediaUseCases        | Mock `productRepository` pour simuler l’existence d’un produit           |
| ProductUseCases      | Mock `mediaRepository` si on veut tester l’association des médias        |
| Validation typologie | Mock typologies pour vérifier que les attributs dynamiques sont corrects |
| Controllers          | Mock use cases pour tester endpoints sans toucher aux données physiques  |

# C3. Découpage en composants

## Proposition de découpage

| Module       | Responsabilité                              | Contenu                                                                            |
| ------------ | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| **PIM**      | Gestion produits et typologies              | `ProductController`, `ProductUseCases`, `ProductRepository`                        |
| **DAM**      | Gestion médias et association produit-média | `MediaController`, `MediaUseCases`, `MediaRepository`, `LocalFileStorage`          |
| **MDM Core** | Règles communes et validations              | Validation typologies, gestion des IDs uniques (EAN/SKU), règles métiers partagées |

## Justification via principes de cohésion et couplage

- Cohésion :
    - REP : chaque module a un seul but (PIM → produits, DAM → médias)
    - CRP/CCP : les fonctionnalités sont regroupées selon leur responsabilité
- Couplage :
    - ADP : PIM ↛ DAM, DAM → PIM via interface productRepository (pas de cycles)
    - SDP/SAP : utilisation d’abstractions pour limiter les dépendances et permettre l’évolution