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
from app import app, get_or_create_category
from models import db

bcrypt = Bcrypt(app)

items_data = [
    {
        "name": "70s striped shirt",
        "imageSrc": "https://img1.shopcider.com/product/1690024871000-82YaD4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Striped 70s shirt",
        "description": "The grooviest striped shirt; you'll feel like Donna in That 70's show!",
        "category_name": "Clothing",
    },
    # {
    #     "name": "Horologe Elegance Alpine",
    #     "imageSrc": "img/horologe_elegance_alpine.png",
    #     "imageAlt": "The Horologe Elegance Alpine watch blends tradition with alpine scenery.",
    #     "category_name": "Elite",
    # },
    # {
    #     "name": "Pastoral Reflection",
    #     "imageSrc": "img/pastoral_reflection.png",
    #     "imageAlt": "The Pastoral Reflection watch, where time meets the tranquility of nature.",
    #     "category_name": "Genesis",
    # },
    # {
    #     "name": "Urban Allegory",
    #     "imageSrc": "img/urban_allegory.png",
    #     "imageAlt": "Urban Allegory, a watch that embodies the spirit of the metropolis.",
    #     "category_name": "Elite",
    # },
    # {
    #     "name": "Haute Society",
    #     "imageSrc": "img/haute_society.png",
    #     "imageAlt": "Haute Society, the watch that epitomizes the zenith of luxury.",
    #     "category_name": "Genesis",
    # },
    # {
    #     "name": "Alpine Precision",
    #     "imageSrc": "img/alpine_precision.png",
    #     "imageAlt": "Alpine Precision, a watch that defines accuracy and Swiss elegance.",
    #     "category_name": "Elite",
    # },
    # {
    #     "name": "Alpine Enforcer",
    #     "imageSrc": "img/alpine_enforcer.png",
    #     "imageAlt": "The Alpine Enforcer watch, robustness and precision in one piece.",
    #     "category_name": ["Genesis", "Elite"],
    # },
    # {
    #     "name": "Urban Reflection",
    #     "imageSrc": "img/urban_reflection.png",
    #     "imageAlt": "Urban Reflection, the essence of city life on your wrist.",
    #     "category_name": ["Genesis", "Elite"],
    # },
    # {
    #     "name": "Velocity Visionary",
    #     "imageSrc": "img/velocity_visionary.png",
    #     "imageAlt": "Velocity Visionary, where speed and vision meet sophistication.",
    #     "category_name": ["Genesis", "Elite"],
    # },
]

fake = Faker()
bcrypt = Bcrypt(app)


def create_fake_orders(num_orders=5):
    for _ in range(num_orders):
        user_id = rc(User.query.all()).id
        order = Order(user_id=user_id)
        db.session.add(order)

    try:
        db.session.commit()
        print(f"Added {num_orders} fake orders.")
    except Exception as e:
        print(f"Error adding orders: {e}")


def create_fake_order_details(num_details=10):
    items = Item.query.all()
    if not items:
        print("No items available to create order details.")
        return

    for _ in range(num_details):
        order_id = rc(Order.query.all()).id
        item_id = rc(items).id

        order_detail = OrderDetail(order_id=order_id, item_id=item_id)
        db.session.add(order_detail)

    try:
        db.session.commit()
        print(f"Added {num_details} fake order details.")
    except Exception as e:
        print(f"Error adding order details: {e}")


def create_fake_users(num_users=2):
    for _ in range(num_users):
        try:
            firstname = fake.first_name()
            lastname = fake.last_name()
            email = fake.email()

            existing_user = User.query.filter((User.email == email)).first()
            if existing_user:
                continue

            user = User(
                firstname=firstname,
                lastname=lastname,
                email=email,
                address=fake.address(),
                city=fake.city(),
                state=fake.state(),
                zip=fake.zipcode(),
                password=bcrypt.generate_password_hash(fake.password()).decode("utf-8"),
            )

            db.session.add(user)
            db.session.commit()
            print(f"Added user: {firstname}")

        except Exception as e:
            print(f"Error adding user {firstname}: {e}")
            db.session.rollback()


def add_item_to_categories(item, category_names):
    for name in category_names:
        category = get_or_create_category(name)
        item_category = ItemCategory(item=item, category=category)
        db.session.add(item_category)


def create_fake_items():
    for item_data in items_data:
        item_name = item_data["name"].strip()
        if not item_name:
            item_name = fake.unique.company()

        existing_item = Item.query.filter_by(name=item_name).first()
        if existing_item:
            print(f"Item '{existing_item.name}' already exists. Skipping.")
            continue

        item = Item(
            name=item_name,
            price=fake.random_int(min=30, max=1500),
            image_url=f"/{item_data['imageSrc']}",
            imageAlt=item_data["imageAlt"],
            description=item_data["description"],
        )

        category_names = (
            item_data["category_name"]
            if isinstance(item_data["category_name"], list)
            else [item_data["category_name"]]
        )
        add_item_to_categories(item, category_names)

        db.session.add(item)

    try:
        db.session.commit()
        print("Items added successfully")
    except ValueError as error:
        print(f"Failed to add items. Error: {error}")


if __name__ == "__main__":
    bcrypt = Bcrypt(app)
    fake = Faker()
    with app.app_context():
        db.create_all()
        create_fake_users()
        create_fake_orders()
        create_fake_items()
        create_fake_order_details()
        print("Database seeded successfully!")

        # print("Deleting data...")
        # Category.query.delete()
        # Item.query.delete()
        # Order.query.delete()
        # OrderDetail.query.delete()
        # ItemCategory.query.delete()
        # User.query.delete()

        # print("Starting seed...")

        # print("Creating items...")
        # item1 = Item(
        #     name="shirt",
        #     description="70s floral shirt",
        #     price=9,
        #     image_url="https://img1.shopcider.com/product/1690024871000-82YaD4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        #     imageAlt="striped 70s shirt",
        # )

        # items = [item1]

        # print("Creating users...")

        # users = []

        # print("Creating categories...")

        # categories = []

        # print("Creating orders...")

        # orders = []

        # print("Creating order details...")

        # order_details = []

        # print("Creating item categories...")

        # item_categories = []

        # db.session.add_all(items)
        # db.session.add_all(users)
        # db.session.add_all(categories)
        # db.session.add_all(orders)
        # db.session.add_all(order_details)
        # db.session.add_all(item_categories)
        # db.session.commit()

        # print("Seeding done!")
