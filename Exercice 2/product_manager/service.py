from typing import List, Optional
from product_manager.models import Product
from product_manager.repository import IProductReader, IProductWriter
from product_manager.validator import ProductValidator

class ProductService:
    def __init__(
        self,
        creator: ProductCreator,
        retriever: ProductRetriever,
        updater: ProductUpdater,
        deleter: ProductDeleter
    ):
        self.creator = creator
        self.retriever = retriever
        self.updater = updater
        self.deleter = deleter


class ProductRetriever:
    def __init__(self, reader: IProductReader):
        self.reader = reader

    def get(self, product_id: int) -> Optional[Product]:
        return self.reader.get_by_id(product_id)

    def get_by_category(self, category: str) -> List[Product]:
        return self.reader.get_by_category(category)
    
    def get_by_price(self, min_price: float, max_price: float) -> List[Product]:
        return self.reader.get_by_price(min_price, max_price)

    def get_all(self) -> List[Product]:
        return self.reader.get_all()
        
class ProductCreator:
    def __init__(self, writer: IProductWriter, validator: ProductValidator):
        self.writer = writer
        self.validator = validator

    def create(self, name: str, description: str, price: float, category: str) -> Product:
        product = Product(name=name, description=description, price=price, category=category)
        self.validator.validate(product)
        return self.writer.add(product)

class ProductUpdater:
    def __init__(self, reader: IProductReader, writer: IProductWriter, validator: ProductValidator):
        self.reader = reader
        self.writer = writer
        self.validator = validator

    def update(self, product_id: int, name: str, description: str, price: float, category: str) -> Product:
        product = self.reader.get_by_id(product_id)
        if not product:
            raise ValueError("Produit non trouvé.")

        product.name = name
        product.description = description
        product.price = price
        product.category = category
        self.validator.validate(product)
        self.writer.update(product)
        return product

class ProductDeleter:
    def __init__(self, writer: IProductWriter):
        self.writer = writer

    def delete(self, product_id: int) -> bool:
        return self.writer.delete(product_id)