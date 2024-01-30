#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from config import app, db
from models import Item, Category, Order, OrderDetail, ItemCategory, User
from flask_bcrypt import Bcrypt
from helpers import dollar_to_cents

# Local imports
from app import app
from models import db

if __name__ == "__main__":
    bcrypt = Bcrypt(app)
    fake = Faker()
    with app.app_context():
        print("Deleting data...")
        Category.query.delete()
        Item.query.delete()
        Order.query.delete()
        OrderDetail.query.delete()
        ItemCategory.query.delete()
        User.query.delete()

        print("Starting seed...")

        print("Creating items...")
        item1 = Item(
            name="shirt",
            description="70s floral shirt",
            price=9,
            image_url="https://img1.shopcider.com/product/1690024871000-82YaD4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
            imageAlt="striped 70s shirt",
        )

        items = [item1]

        print("Creating users...")

        users = []

        print("Creating categories...")

        categories = []

        print("Creating orders...")

        orders = []

        print("Creating order details...")

        order_details = []

        print("Creating item categories...")

        item_categories = []

        db.session.add_all(items)
        db.session.add_all(users)
        db.session.add_all(categories)
        db.session.add_all(orders)
        db.session.add_all(order_details)
        db.session.add_all(item_categories)
        db.session.commit()

        print("Seeding done!")
