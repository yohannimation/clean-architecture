# Installation

```bash
# Clone the repository
git clone <repository>

# Install dependencies
npm install

# Run the app locally
npm run start
```

# Main routes

Base URL : `http://localhost:3000/api`

- [POST]   `/auth/login`                 → génère un JWT

- [POST]   `/pim/products`               → créer un produit
- [GET]    `/pim/products`               → récupérer tous les produits
- [GET]    `/pim/products/:ean/:sku`     → récupérer un produit spécifique
- [PUT]    `/pim/products/:ean/:sku`     → mettre à jour un produit
- [DELETE] `/pim/products/:ean/:sku`     → supprimer un produit

- [POST]   `/dam/upload`                 → uploader un fichier média
- [GET]    `/dam/medias`                 → récupérer tous les médias
- [DELETE] `/dam/medias/:filename`       → supprimer un média

## Authentification

Le système utilise JWT (JSON Web Token) pour authentifier les utilisateurs.

### Connexion

- Endpoint : [POST] `/auth/login`
- Body (JSON) :
```
{
  "username": "admin",
  "password": "admin123"
}
```

### Exemple d’utilisation du token

Pour accéder à toutes les routes protégées par le middleware, ajoutez le token dans le header :
```
Authorization: Bearer <JWT_TOKEN>
```

## PIM (Product Information Management)

### Créer un produit

- Endpoint : [POST] `/pim/products`
- Body (JSON) :
```
{
  "ean": "12345",
  "sku": "56789",
  "name": "Chemise Rouge",
  "typology": {
    "name": "textile",
    "dynamicFields": ["size","color"]
  },
  "attributes": {
    "size": "M",
    "color": "red",
    "price": 20
  }
}
```

### Récupérer tous les produits

- Endpoint : [GET] `/pim/products`

### Récupérer un produit spécifique

- Endpoint : [GET] `/pim/products/:ean/:sku`
- Exemple : [GET] `/pim/products/12345/56789`

### Mettre à jour un produit

- Endpoint : [PUT] `/pim/products/:ean/:sku`
- Body (JSON) :
```
{
  "name": "Chemise Rouge XL",
  "attributes": {
    "size": "L",
    "price": 25
  }
}
```

### Supprimer un produit

- Endpoint : [DELETE] `/pim/products/:ean/:sku`
- Exemple : `DELETE /pim/products/12345/56789`

## DAM (Digital Asset Management)

### Uploader un média

- Endpoint : [POST] `/dam/upload`
- Body : Form-data, key `file`, type `File`

 > Le nom du fichier doit contenir EAN et SKU : `EAN<ean>_SKU<sku>_<suffix>.ext`

Exemple : `EAN12345_SKU56789_front.png`



### Lister tous les médias

- Endpoint : [GET] `/dam/medias`

c) Supprimer un média

- Endpoint : [DELETE] `/dam/medias/:filename`
- Exemple : DELETE `/dam/medias/EAN12345_SKU56789_front.png`

## Tests

Lancer tous les tests :
```
npm test
```

Tests disponibles :

- PIM : création, mise à jour, suppression de produit
- DAM : upload et liaison automatique d’un média
- Auth : connexion, génération de token et vérification de routes protégées