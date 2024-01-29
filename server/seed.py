#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from models import Product

# Local imports
from app import app
from models import db

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        print("Creating product")

        product1 = Product(
            name="shirt",
            description="70s floral shirt",
            price=9,
            image_url="https://img1.shopcider.com/product/1690024871000-82YaD4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
            imageAlt="striped 70s shirt",
        )

        products = [product1]

        db.session.add_all(products)
        db.session.commit()

        print("Seeding done!")
