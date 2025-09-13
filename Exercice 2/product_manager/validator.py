from abc import ABC, abstractmethod
from product_manager.models import Product

class ProductValidator:
    def __init__(self, rules: list[ProductRule]):
        self.rules = rules

    def validate(self, product: Product):
        for rule in self.rules:
            rule.validate(product)


class ProductRule(ABC):
    @abstractmethod
    def validate(self, product: Product):
        pass

class NameNotEmptyRule(ProductRule):
    def validate(self, product: Product):
        if not product.name:
            raise ValueError("Le nom du produit est requis.")

class PositivePriceRule(ProductRule):
    def validate(self, product: Product):
        if product.price is None or product.price <= 0:
            raise ValueError("Le prix doit être positif.")
