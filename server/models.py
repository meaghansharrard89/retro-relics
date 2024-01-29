# Import necessary modules from SQLAlchemy and SerializerMixin for serialization.
import re

# from config import bcrypt, db
from config import bcrypt, db
from sqlalchemy import MetaData, null
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

# metadata = MetaData(
#     naming_convention={
#         "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     }
# )

# Product Model
# This class represents the products that we're selling.


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)
    imageAlt = db.Column(db.String)

    # Relationships

    product_categories = db.relationship(
        "ProductCategory", back_populates="product", cascade="all, delete-orphan"
    )
    categories = association_proxy("product_categories", "category")

    # Serializations

    serialize_rules = ("-product_categories",)

    # Validations

    def __repr__(self):
        return f"<Product {self.name}>"


# Category Model
# This class represents the categories (houseware, clothing, other) of products that we're selling.


class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    # Relationships

    product_categories = db.relationship(
        "ProductCategory", back_populates="category", cascade="all, delete-orphan"
    )
    products = association_proxy("product_categories", "product")

    # Serializations

    serialize_rules = ("-product_categories",)

    # Validations

    def __repr__(self):
        return f"<Category {self.name}>"


# ProductCategory Model
# This class represents the relationship between products and categories.
# This is a many to many relationship between products and categories.


class ProductCategory(db.Model, SerializerMixin):
    __tablename__ = "product_categories"

    id = db.Column(db.Integer, primary_key=True)

    # ForeignKeys

    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    # Relationships

    product = db.relationship("Product", back_populates="product_categories")
    category = db.relationship("Category", back_populates="product_categories")

    # Serializations

    serialize_rules = ("-product", "-category")

    # Validations

    def __repr__(self):
        return f"<ProductCategory Product: {self.product_id}, Category: {self.category_id}>"


# User Model
# This class represents the users of our site; they can buy products.


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=True)
    last_name = db.Column(db.String(255), nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)
    shipping_address = db.Column((db.Text), nullable=False)
    shipping_city = db.Column(db.String(255), nullable=False)
    shipping_state = db.Column(db.String(255), nullable=False)
    shipping_zip = db.Column(db.String(255), nullable=False)

    # Relationships

    orders = db.relationship("Order", back_populates="user")

    # Serializations

    serialize_rules = ("-orders",)

    # Validations


# Order Model
# Represents an order made by a user. An order can contain multiple products.


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationships

    order_details = db.relationship("OrderDetail", back_populates="order")
    user = db.relationship("User", back_populates="orders")


# OrderDetail Model
# Links orders to products and includes the quantity of each product in an order.


class OrderDetail(db.Model, SerializerMixin):
    __tablename__ = "order_details"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)

    # Relationships

    order = db.relationship("Order", back_populates="order_details")
    product = db.relationship("Product")

    # Serializations

    serialize_rules = (
        "-order",
        "-product",
    )
