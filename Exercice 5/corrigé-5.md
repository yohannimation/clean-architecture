# Stratégies de Déploiement — Application Clean Architecture (Catalogue de Produits)

## Impact de la Clean Architecture sur le déploiement

La **Clean Architecture** sépare le domaine (Entités, Use Cases) des détails d'infrastructure (BD, UI, adaptateurs). Cela a plusieurs conséquences:

* **Facilite le packaging et la portabilité** : le coeur (domaine) est indépendant; il peut être réutilisé dans différents environnements (HTTP API, CLI, batch) sans modification.
* **Découplage des responsabilités** : chaque couche peut être testée et déployée séparément si on choisit une architecture distribuée.
* **Contraintes** : l’inversion de dépendance introduit des interfaces; lors du déploiement, il faut fournir les adaptateurs concrets (repo, bus, etc.). La composition doit être correctement gérée (ex: composition root).

**Avantage clef** : le domaine sans dépendance infrastructurelle réduit le risque de régression liée à un changement d'infra lors du déploiement.

---

## Options de déploiement

### 1) Monolithe

* **Description** : Une seule unité déployable contenant l'API, les adaptateurs et éventuellement l'UI.
* **Comment déployer** : build (container), push image, run (single replica ou multiple replicas derrière un load balancer).
* **Avantages** : simple, facile à tester localement, faible overhead opérationnel.
* **Inconvénients** : scalabilité moins fine, cycle de déploiement pour toute l'app si petit changement.
* **Pour le mini-projet** : recommandé pour commencer (faible complexité). La Clean Architecture garde le code propre même dans un monolithe.

### 2) Microservices

* **Description** : Séparer le catalogue en services (ex: service `catalog`, service `inventory`, service `pricing`).
* **Comment déployer** : chaque service packagé en image/container, déployé indépendamment (K8s, ECS).
* **Avantages** : scalabilité par service, déploiements indépendants.
* **Inconvénients** : complexité (réseau, transactions distribuées, observabilité), coût opérationnel.
* **Pour le mini-projet** : overkill en phase d'apprentissage; pertinent si le catalogue doit croître fortement ou si différentes équipes possèdent des domaines.

### 3) Serverless

* **Description** : Déployer use cases en tant que fonctions (AWS Lambda, Azure Functions).
* **Comment déployer** : packager chaque handler, gérer infra (API Gateway, VPC, RDS).
* **Avantages** : coût lié à l'usage, montée en charge automatique.
* **Inconvénients** : cold starts, limites d'exécution, complexité pour tests d'intégration, gestion d'état et connexion BD.
* **Pour le mini-projet** : intéressant pour prototypes ou endpoints peu sollicités; nécessite adapter l'initialisation des adaptateurs (connexion BD réutilisable).

---

## Conteneurs et orchestration

* **Rôle de Docker** : isoler l'environnement d'exécution, garantir la reproductibilité des builds et faciliter CI/CD. Build d'une image unique pour l'app monolithe ou images distinctes pour chaque service.
* **Rôle de Kubernetes** : orchestrer réplicas, services, santé (readiness/liveness), configuration (ConfigMaps, Secrets), auto-scaling. Permet de gérer la résilience et la montée en charge.
* **Conseil** : démarrer avec Docker Compose pour le développement et tests d'intégration; migrer vers K8s quand besoin de productionnaliser (haute disponibilité, observabilité).

---

## CI/CD — pipeline recommandé

Étapes clés d'une chaîne CI/CD :

1. **Build** : lint, format, compilation (si nécessaire), packaging (image build).
2. **Unit Tests** : exécution des tests unitaires; rapport de couverture.
3. **Integration Tests** : tests d'intégration (InMemory + DB réelle via Testcontainers ou base de test), exécution dans environnements éphémères.
4. **Security Scans** : SAST, dépendancy scanning.
5. **Image Push** : push vers registry (ECR, GCR, Docker Hub) avec tag (commit SHA, version semver).
6. **Deploy to Staging** : déployer automatiquement en staging; exécuter smoke tests.
7. **Approval & Deploy to Prod** : déploiement automatique ou manuel selon politique; blue/green ou rolling updates pour disponibilité.
8. **Observability** : health checks, logs centralisés, traces (OpenTelemetry), métriques (Prometheus).

**Tests automatisés** : exécuter unitaires + integration dans CI; si tests DB lourds existent, les réserver à pipelines nightly ou exécutés via runners puissants.

---

## Bonnes pratiques spécifiques à la Clean Architecture

* **Composition Root** : centraliser l'assemblage des adaptateurs et du domaine; idéalement injecté via configuration ou conteneurs DI au démarrage.
* **Contracts et Migrations** : conserver des interfaces stables; versionner les schémas DB et les contrats API.
* **Testabilité** : tirer parti des ports pour `stub`/`mock`er facilement; intégrer des tests end-to-end (E2E) pour valider la chaîne complète.
* **Observabilité** : instrumenter les use cases (durée, erreurs) pour diagnostiquer problèmes en production.

---

## Conclusion

Pour ce mini-projet, je recommande :

1. **Départ en monolithe containerisé** (Docker + Docker Compose).
2. **Pipelines CI** exécutant unitaires et intégration (InMemory + DB test).
3. Passer à **Kubernetes** et découpage en microservices si le domaine grandit et que les besoins de scalabilité/indépendance d'équipe l'exigent.

Cette approche tire parti de la Clean Architecture : le domaine reste portable, les adaptateurs peuvent être remplacés sans toucher la logique métier, et le déploiement évolue avec les besoins.

*Document prêt à être exporté en PDF depuis l'éditeur si nécessaire.*
