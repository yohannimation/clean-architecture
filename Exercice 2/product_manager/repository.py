from abc import ABC, abstractmethod
from typing import List, Optional
from product_manager.models import Product

class IProductReader(ABC):
    @abstractmethod
    def get_by_id(self, product_id: int) -> Optional[Product]: ...

    @abstractmethod
    def get_by_category(self, category: str) -> List[Product]: ...

    @abstractmethod
    def get_by_price(self, min_price: float, max_price: float) -> List[Product]: ...

    @abstractmethod
    def get_all(self) -> List[Product]: ...

class IProductWriter(ABC):
    @abstractmethod
    def add(self, product: Product) -> Product: ...
    
    @abstractmethod
    def update(self, product: Product) -> bool: ...
    
    @abstractmethod
    def delete(self, product_id: int) -> bool: ...


class ProductReadRepository(IProductReader):
    def __init__(self, products: dict[int, Product]):
        self._products = products

    def get_by_id(self, product_id: int) -> Optional[Product]:
        return self._products.get(product_id)

    def get_by_category(self, category: str) -> List[Product]:
        return [product for product in self._products.values() if product.category == category]

    def get_by_price(self, min_price: float, max_price: float) -> List[Product]:
        return [p for p in self._products.values() if min_price <= p.price <= max_price]

    def get_all(self) -> List[Product]:
        return list(self._products.values())


class ProductWriteRepository(IProductWriter):
    def __init__(self, products: dict[int, Product], next_id: int = 1):
        self._products = products
        self._next_id = next_id

    def add(self, product: Product) -> Product:
        product.id = self._next_id
        self._products[self._next_id] = product
        self._next_id += 1
        return product

    def update(self, product: Product) -> bool:
        if product.id in self._products:
            self._products[product.id] = product
            return True
        return False

    def delete(self, product_id: int) -> bool:
        if product_id in self._products:
            del self._products[product_id]
            return True
        return False
