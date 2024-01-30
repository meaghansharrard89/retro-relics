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
        "name": "70's Striped Shirt",
        "imageSrc": "https://img1.shopcider.com/product/1690024871000-82YaD4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Striped 70s shirt",
        "description": "The grooviest striped shirt; you'll feel like Donna in That 70's show!",
        "category_name": "Clothing",
    },
    {
        "name": "Corduroy Skirt",
        "imageSrc": "https://www.lulus.com/images/product/xlarge/4471890_913762.jpg?w=743&hdpi=1",
        "imageAlt": "Brown corduroy mini skirt",
        "description": "The cutest little skirt that goes with anything."
        "category_name": "Clothing",
    },
    {
        "name": "Brown Knee-High Boots",
        "imageSrc": "https://marcfisherfootwear.com/cdn/shop/files/102b49ecd20a771ffb5c7b6793341649ebbc83c4_5000x.jpg?v=1687960331",
        "imageAlt": "Brown knee-high boots",
        "description": "Perfect for Fall (or any season, really), these boots will go with any outfit."
        "category_name": "Clothing",
    },
    {
        "name": "Brass Candlestick Holders",
        "imageSrc": "https://m.media-amazon.com/images/I/61FW5ipX1dL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        "imageAlt": "Brass candlestick holders",
        "description": "This set of three candlestick holders will add elegance to any room.",
        "category_name": "Housewares",
    },
    {
        "name": "Record Table",
        "imageSrc": "https://ashleyfurniture.scene7.com/is/image/AshleyFurniture/A600061638_1?$AFHS-PDP-Zoomed$",
        "imageAlt": "Wooden record table",
        "description": "Tap into mid-century aesthetics with this vinyl record display stand.",
        "category_name": "Housewares",
    },
    {
        "name": "90's Leather Jacket",
        "imageSrc": "https://img1.shopcider.com/product/1658232685000-7zRZim.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Brown leather jacket",
        "description": "Oversized and perfectly worn-in, this jacket would go perfectly with skirts, dresses, or jeans."
        "category_name": "Clothing",
    },
    {
        "name": "Flower Power Sweater",
        "imageSrc": "https://img1.shopcider.com/product/1699332844000-cXJRyb.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Bright green sweater with embroidered flowers",
        "description": "The cutest sweater ever, this would look adorable over a sundress!"
        "category_name": "Clothing",
    },
    {
        "name": "Tamagotchi",
        "imageSrc": "https://images.urbndata.com/is/image/UrbanOutfitters/86237773_010_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960",
        "imageAlt": "Vintage Tamagotchi toy",
        "description": "The OG ‘90s kid fave- get it while you can!"
        "category_name": "Misc",
    },
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
