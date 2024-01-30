# Import necessary modules from SQLAlchemy and SerializerMixin for serialization.
import re

from config import bcrypt, db
from sqlalchemy import MetaData, null
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from helpers import (
    dollar_to_cents,
    validate_not_blank,
    validate_positive_number,
    validate_type,
)
from sqlalchemy.ext.hybrid import hybrid_property

# Product Model
# This class represents the products that we're selling.


class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)
    imageAlt = db.Column(db.String)

    # Relationships

    item_categories = db.relationship(
        "ItemCategory", back_populates="item", cascade="all, delete-orphan"
    )
    categories = association_proxy("item_categories", "category")

    # Serializations

    serialize_rules = ("-item_categories",)

    # Validations

    @validates("name", "description", "image_url", "imageAlt")
    def validate_not_blank(self, key, value):
        return validate_not_blank(value, key)

    @validates("price")
    def validate_price(self, key, price):
        price_in_cents = validate_positive_number(dollar_to_cents(price), key)
        return price_in_cents

    def to_dict(self, convert_price_to_dollars=False):
        data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price / 100 if convert_price_to_dollars else self.price,
            "image_url": self.image_url,
            "imageAlt": self.imageAlt,
        }
        return data

    def __repr__(self):
        return f"<Product {self.name}>"


# Category Model
# This class represents the categories (housewares, clothing, misc) of products that we're selling.


class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    # Relationships

    item_categories = db.relationship(
        "ItemCategory", back_populates="category", cascade="all, delete-orphan"
    )
    items = association_proxy("item_categories", "item")

    # Serializations

    serialize_rules = ("-item_categories",)

    # Validations

    @validates("name")
    def validate_name(self, key, name):
        return validate_not_blank(name, key)

    def __repr__(self):
        return f"<Category {self.name}>"


# ItemCategory Model
# This class represents the relationship between products and categories.
# This is a many to many relationship between products and categories.


class ItemCategory(db.Model, SerializerMixin):
    __tablename__ = "item_categories"

    id = db.Column(db.Integer, primary_key=True)

    # ForeignKeys

    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    # Relationships

    item = db.relationship("Item", back_populates="item_categories")
    category = db.relationship("Category", back_populates="item_categories")

    # Serializations

    serialize_rules = ("-item.item_categories", "-category.item_categories")

    # Validations

    @validates("item_id", "category_id")
    def validate_ids(self, key, value):
        value = validate_type(value, key, int)
        if value is None:
            raise ValueError(f"{key} must not be null.")
        return value

    def __repr__(self):
        return f"<ItemCategory Item: {self.product_id}, Category: {self.category_id}>"


# User Model
# This class represents the users of our site; they can buy products.


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255), nullable=True)
    lastname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)
    address = db.Column((db.Text), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(255), nullable=False)

    # Relationships

    orders = db.relationship("Order", back_populates="user")

    # Serializations

    serialize_rules = ("-orders",)

    # Validations
    # every field needs to be required/have validation

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("email")
    def validate_email(self, key, email):
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email address.")
        return email


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
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)

    # Relationships

    order = db.relationship("Order", back_populates="order_details")
    item = db.relationship("Item")

    # Serializations

    serialize_rules = (
        "-order",
        "-item",
    )
