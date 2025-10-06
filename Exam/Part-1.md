# Q1. Rôle de l’architecte

L’architecte logiciel ne se limite pas à écrire du code : il conçoit la structure globale d’un système pour assurer sa scalabilité, sa maintenabilité et sa robustesse. Il prend des décisions qui auront un impact à long terme sur la qualité et l’évolution du projet.

Exemples concrets de décisions d’architecture :

- Choix d’une architecture modulaire (ex : microservices vs monolithe)
    - Influence la maintenabilité car les modules peuvent évoluer indépendamment sans affecter l’ensemble du système.
- Définition des interfaces et abstractions entre composants
    - Permet de changer l’implémentation d’un module sans impacter les autres, facilitant les évolutions et les tests.

# Q2. Principes SOLID

## S — Single Responsibility Principle (SRP)

- Définition : Une classe ne doit avoir qu’une seule raison de changer.
- Violation :
```
class User:
    def save_to_db(self): pass
    def send_email(self): pass
```
- Refactorisation :
```
class User: pass
class UserRepository:
    def save(user): pass
class EmailService:
    def send(user): pass
```

## O — Open/Closed Principle (OCP)

- Définition : Les entités doivent être ouvertes à l’extension mais fermées à la modification.
- Violation :
```
class Discount:
    def apply(order, type):
        if type == "VIP": return order * 0.8
        if type == "Regular": return order * 0.9
```
- Refactorisation :
```
class Discount: 
    def apply(order): pass
class VIPDiscount(Discount):
    def apply(order): return order * 0.8
class RegularDiscount(Discount):
    def apply(order): return order * 0.9
```
## L — Liskov Substitution Principle (LSP)

- Définition : Une sous-classe doit pouvoir remplacer sa super-classe sans changer le comportement attendu.
- Violation :
```
class Bird: 
    def fly(): pass
class Penguin(Bird):
    def fly(): raise Exception("Cannot fly")
```
- Refactorisation :
```
class Bird: pass
class FlyingBird(Bird):
    def fly(): pass
class Penguin(Bird): pass
```

## I — Interface Segregation Principle (ISP)

- Définition : Les clients ne doivent pas être forcés de dépendre d’interfaces qu’ils n’utilisent pas.
- Violation :
```
class WorkerInterface:
    def work(): pass
    def eat(): pass
class Robot(WorkerInterface):
    def eat(): raise Exception("Robot does not eat")
```
- Refactorisation :
```
class Workable:
    def work(): pass
class Eatable:
    def eat(): pass
class Human(Workable, Eatable): pass
class Robot(Workable): pass
```

## D — Dependency Inversion Principle (DIP)

- Définition : Les modules haut niveau ne doivent pas dépendre de modules bas niveau ; les deux doivent dépendre d’abstractions.
- Violation :
```
class MySQLDatabase:
    def save(data): pass
class UserService:
    def __init__(self):
        self.db = MySQLDatabase()
```
- Refactorisation :
```
class DatabaseInterface:
    def save(data): pass
class MySQLDatabase(DatabaseInterface):
    def save(data): pass
class UserService:
    def __init__(self, db: DatabaseInterface):
        self.db = db
```

# Q3. Principes de composants

Cohésion

- REP (Reuse/Release Equivalence Principle) → un module doit correspondre à une unité de réutilisation → utile pour créer des librairies réutilisables.
- CCP (Common Closure Principle) → les classes qui changent pour les mêmes raisons doivent être regroupées → évite des modifications dispersées.
- CRP (Common Reuse Principle) → les classes d’un module doivent être utilisées ensemble → empêche de forcer l’import de classes inutiles.

Couplage

- ADP (Acyclic Dependencies Principle) → empêche les cycles entre modules → utile dans microservices pour éviter des dépendances circulaires.
- SDP (Stable Dependencies Principle) → un module instable ne doit dépendre que de modules stables → garantit stabilité de l’architecture.
- SAP (Stable Abstractions Principle) → un module stable doit être abstrait → permet de l’étendre sans le modifier.

# Q4. Règles de dépendance

Dans la Clean Architecture, les dépendances doivent pointer vers l’intérieur : les couches externes dépendent des couches internes, jamais l’inverse.

- Les détails (frameworks, BD, UI) dépendent des abstractions (entités, cas d’usage) pour éviter que les changements techniques impactent la logique métier.
- Cela garantit l’indépendance de la logique métier et facilite la testabilité et la maintenabilité.

# Q5. Tests et Clean Architecture

Stratégie de tests par couche :

- Entités → tests unitaires purs : vérifier règles métier, sans dépendances externes.
- Cas d’usage → tests unitaires avec mocks : vérifier que les interactions entre entités et adaptateurs sont correctes.
- Adaptateurs (DB, API) → tests d’intégration : vérifier la connexion avec systèmes externes.
- Framework/UI → tests fonctionnels ou end-to-end : tester les scénarios utilisateurs complets.

Limiter les tests fragiles :

- Tester les abstractions, pas les implémentations concrètes.
- Utiliser des mocks/fakes pour les dépendances externes.
- Maintenir une couche claire de séparation des responsabilités (Clean Architecture) pour que les changements techniques ne cassent pas les tests métier.