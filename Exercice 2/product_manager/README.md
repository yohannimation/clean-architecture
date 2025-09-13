# Application des principes SOLID de la Clean Architecture
## Violations SOLID initiales

Lors de l'analyse initiale du projet, plusieurs violations des principes SOLID ont été identifiées :

### SRP (Single Responsibility Principle) :

La classe ***ProductService*** gérait simultanément la création, la lecture, la mise à jour, la suppression et la validation des produits.

Cette multiplicité de responsabilités rendait le code difficile à maintenir et à tester.

### OCP (Open/Closed Principle) :

La validation était intégrée directement dans ***ProductService***, ce qui empêchait l’ajout de nouvelles règles de validation sans modifier le code existant.

### ISP (Interface Segregation Principle) :

***ProductRepository*** combinait toutes les opérations CRUD dans un seule repository, forçant les classes clientes à dépendre de méthodes qu’elles n’utilisaient pas forcément. De plus, aucune interface n'était implémenté, ce qui rendait l'implémentation d'un nouveau repository complexe (SQL, MongoDB, ...).

### DIP (Dependency Inversion Principle) :

***ProductService*** dépendait directement de l’implémentation concrète ***ProductRepository*** au lieu d’utiliser une abstraction.

### LSP (Liskov Substitution Principle) :

La hiérarchie initiale ne permettait pas de substituer facilement un repository par une autre implémentation sans risque d’altérer le comportement du service.

## Modifications apportées pour respecter les principes SOLID

### SRP (Single Responsibility Principle)

Décomposition de **ProductService** en classes spécialisées :

- ***ProductCreator*** : création de produits
- ***ProductRetriever*** : lecture de produits
- ***ProductUpdater*** : mise à jour de produits
- ***ProductDeleter*** : suppression de produits
- ***ProductService*** ne fait plus que coordonner ces classes sans contenir de logique métier.

### OCP (Open/Closed Principle)

La validation a été déplacée dans la classe ***ProductValidator*** avec des règles séparées (***NameNotEmptyRule***, ***PositivePriceRule***).

Il est désormais possible d’ajouter de nouvelles règles de validation sans modifier les classes existantes.

### ISP (Interface Segregation Principle)

Création de deux interfaces distinctes :

- ***IProductReader*** : lecture (get_by_id, get_by_category, get_by_price, get_all)
- ***IProductWriter*** : écriture (add, update, delete)

Les repositories concrets (***ProductReadRepository*** et ***ProductWriteRepository***) implémentent uniquement les méthodes nécessaires, respectant ainsi ISP.

### DIP (Dependency Inversion Principle)

Les classes CRUD (***ProductCreator***, ***ProductRetriever***, ***ProductUpdater***, ***ProductDeleter***) dépendent désormais des interfaces ***IProductReader*** et ***IProductWriter*** au lieu de l’implémentation concrète.

Cela permet de substituer facilement le repository par une autre implémentation (ex. base SQL, API externe, mocks pour tests).

### LSP (Liskov Substitution Principle)

Les interfaces et la séparation des repositories permettent de substituer un repository par un autre sans altérer le comportement attendu par le service.

## Implémentation de la nouvelle fonctionnalité “filtre par catégorie et prix”

### Filtre par catégorie :

Ajout de la méthode ```get_by_category(category: str) -> List[Product]``` dans ***IProductReader*** et ***ProductReadRepository***.

***ProductRetriever*** fournit une méthode correspondante pour exposer cette fonctionnalité au service.

### Filtre par prix :

Ajout de la méthode ```get_by_price(min_price: float, max_price: float) -> List[Product]``` dans ***IProductReader*** et ***ProductReadRepository***.

***ProductRetriever*** fournit également une méthode ***get_by_price*** pour exposer cette fonctionnalité.

### Respect des principes SOLID :

- SRP : la logique de filtrage reste dans ProductRetriever / repository, et le service ne fait que coordonner.
- OCP : ajout de nouvelles règles de filtrage n’affecte pas les classes existantes.
- ISP : la lecture est séparée de l’écriture, donc les filtres ne sont ajoutés qu’aux classes de lecture.
- DIP : le service et ProductRetriever dépendent uniquement des interfaces, pas de l’implémentation concrète.