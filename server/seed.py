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
        "name": "70s Striped Shirt",
        "image_url": "https://img1.shopcider.com/product/1690024871000-82YaD4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Striped 70s shirt",
        "description": "The grooviest striped shirt; you'll feel like Donna in That 70's show!",
        "category_name": "Clothing",
    },
    {
        "name": "Corduroy Skirt",
        "image_url": "https://www.lulus.com/images/product/xlarge/4471890_913762.jpg?w=743&hdpi=1",
        "imageAlt": "Brown corduroy mini skirt",
        "description": "The cutest little skirt that goes with anything.",
        "category_name": "Clothing",
    },
    {
        "name": "Brown Knee-High Boots",
        "image_url": "https://marcfisherfootwear.com/cdn/shop/files/102b49ecd20a771ffb5c7b6793341649ebbc83c4_5000x.jpg?v=1687960331",
        "imageAlt": "Brown knee-high boots",
        "description": "Perfect for Fall (or any season, really), these boots will go with any outfit.",
        "category_name": "Clothing",
    },
    {
        "name": "Brass Candlestick Holders",
        "image_url": "https://m.media-amazon.com/images/I/61FW5ipX1dL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        "imageAlt": "Brass candlestick holders",
        "description": "This set of three candlestick holders will add elegance to any room.",
        "category_name": "Housewares",
    },
    {
        "name": "Record Table",
        "image_url": "https://ashleyfurniture.scene7.com/is/image/AshleyFurniture/A600061638_1?$AFHS-PDP-Zoomed$",
        "imageAlt": "Wooden record table",
        "description": "Tap into mid-century aesthetics with this vinyl record display stand.",
        "category_name": "Housewares",
    },
    {
        "name": "90's Leather Jacket",
        "image_url": "https://img1.shopcider.com/product/1658232685000-7zRZim.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Brown leather jacket",
        "description": "Oversized and perfectly worn-in, this jacket would go perfectly with skirts, dresses, or jeans.",
        "category_name": "Clothing",
    },
    {
        "name": "Flower Power Sweater",
        "image_url": "https://img1.shopcider.com/product/1699332844000-cXJRyb.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Bright green sweater with embroidered flowers",
        "description": "The cutest sweater ever, this would look adorable over a sundress!",
        "category_name": "Clothing",
    },
    {
        "name": "Tamagotchi",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/86237773_010_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960",
        "imageAlt": "Vintage Tamagotchi toy",
        "description": "The OG ‘90s kid fave- get it while you can!",
        "category_name": "Misc",
    },
    {
        "name": "Yellow Storage Locker",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/87332730_072_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960",
        "imageAlt": "Yellow storage locker",
        "description": "School is officially back in session with this adorable storage locker!",
        "category_name": "Housewares",
    },
    {
        "name": "Off-Shoulder Knitted Top",
        "image_url": "https://img1.shopcider.com/product/1701174829000-fbT7Dx.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Off-shoulder knitted top",
        "description": "Perfect for date night, or any night, really!",
        "category_name": "Clothing",
    },
    {
        "name": "Geometric Knitted Mini Dress",
        "image_url": "https://img1.shopcider.com/product/1698320876000-H6YnXt.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Geometric knitted mini dress",
        "description": "Get ready to dance the night away in this adorable dress!",
        "category_name": "Clothing",
    },
    {
        "name": "High Neck Floral Shirt",
        "image_url": "https://img1.shopcider.com/product/1700708878000-ChKDRd.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "High-neck floral shirt",
        "description": "An amazing layering piece, this can be paired with anything.",
        "category_name": "Clothing",
    },
    {
        "name": "Gold Ornate Mirror",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/88281936_070_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Gold ornate mirror",
        "description": "An elegant, vintage wall mirror featuring an arched silhouette with and intricately carved wood frame that infuses your space your space with effortless charm.",
        "category_name": "Housewares",
    },
    {
        "name": "Macrame Tulip Wall Set",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/87015673_066_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Macrame tulip wall set",
        "description": "Transform your space into a whimsical garden scene with this set of macrame wall hangings featuring four multi-colored tulips and one itty bitty bee.",
        "category_name": "Housewares",
    },
    {
        "name": "Denim High-Waisted Jeans",
        "image_url": "https://img1.shopcider.com/product/1701413461000-JZG6Cc.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Denim high-waisted jeans",
        "description": "The grooviest jeans ever! Wear these with platform sandals for the ultimate 70's look.",
        "category_name": "Clothing",
    },
    {
        "name": "Beaded Mushroom Throw Pillow",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/88129374_066_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Beaded mushroom throw pillow",
        "description": "Create a whimsical feel in your space with this shaped throw pillow featuring a mushroom silhouette with beaded detailing allover.",
        "category_name": "Housewares",
    },
    {
        "name": "V-Neck Geometric Sweater Vest",
        "image_url": "https://img1.shopcider.com/product/1700291745000-xWEMcN.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "V-neck geometric sweater vest",
        "description": "Wear with jeans or over a dress for a retro look.",
        "category_name": "Clothing",
    },
    {
        "name": "Wicker Vanity and Stool Set",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/83009050_111_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Wicker vanity and stool set",
        "description": "Vintage-inspired details and inviting materials combine to create this standout vanity two-piece set, including a table and stool that fit together just right.",
        "category_name": "Housewares",
    },
    {
        "name": "Off-the-Shoulder Mesh Tee",
        "image_url": "https://img1.shopcider.com/product/1654773632000-7tCkEc.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Long-sleeved mesh tee",
        "description": "Unique and edgy, pair with your favorite denim cutoffs or low-rise trousers for a fun look!",
        "category_name": "Clothing",
    },
    {
        "name": "Denim Maxi Skirt",
        "image_url": "https://img1.shopcider.com/product/1670931447000-3baAF4.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Denim maxi skirt",
        "description": "Wear with a tank top and loafers for an edgy look.",
        "category_name": "Clothing",
    },
    {
        "name": "Mystery Date Board Game",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/88731831_066_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Mystery Date board game",
        "description": "A board game full of surprises, get ready before your date arrives at the door.",
        "category_name": "Misc",
    },
    {
        "name": "Sun & Moon Knit Top",
        "image_url": "https://img1.shopcider.com/product/1689422647000-cNRrDz.jpg?x-oss-process=image/resize,w_1050,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Sun and moon knit top",
        "description": "Super soft and lovely with a maxi skirt and sandals.",
        "category_name": "Clothing",
    },
    {
        "name": "Kit-Cat Classic Clock",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/83916148_001_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Kit-Cat classic clock",
        "description": "The original! Complete any space (and keep track of the time).",
        "category_name": "Housewares",
    },
    {
        "name": "Patent Leather Loafers",
        "image_url": "https://img1.shopcider.com/product/1696951964000-K4a2wb.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Patent leather loafers",
        "description": "Timeless and versatile, these loafers will go with any outfit.",
        "category_name": "Clothing",
    },
    {
        "name": "Lava Lamp",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/85885739_040_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Lava lamp",
        "description": "Create a groovy scene in your space with this lava lamp featuring a sleek silhouette with vibrant globs of lava.",
        "category_name": "Misc",
    },
    {
        "name": "Heart-Shaped Purse",
        "image_url": "https://img1.shopcider.com/product/1701519515000-MXcjcW.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Heart-shaped purse",
        "description": "Adorable and perfect for any night out!",
        "category_name": "Clothing",
    },
    {
        "name": "Sun Tufted Rug",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/87005906_029_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Sun tufted rug",
        "description": "The coziest addition to any space, this tufted rug features a geometric sun motif allover the top in muted shades that infuse your room with warm and inviting appeal.",
        "category_name": "Housewares",
    },
    {
        "name": "Silver Star Earrings",
        "image_url": "https://img1.shopcider.com/product/1690872256000-nB2en2.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Silver star earrings",
        "description": "Lovely with an off-the-shoulder top or dress!",
        "category_name": "Clothing",
    },
    {
        "name": "Cotton Seed Stitch Throw Blanket",
        "image_url": "https://images.urbndata.com/is/image/UrbanOutfitters/88129572_080_e?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=360",
        "imageAlt": "Cotton seed stitch throw blanket",
        "description": "Medium-weight throw blanket with seed stitched detailing allover with ditsy florals allover the top with a vibrant blue panel at the reverse.",
        "category_name": "Housewares",
    },
    {
        "name": "Floral Bucket Hat",
        "image_url": "https://img1.shopcider.com/product/1691376176000-r3PstX.jpg?x-oss-process=image/resize,w_350,m_lfit/quality,Q_80/interlace,1",
        "imageAlt": "Floral bucket hat",
        "description": "Adorable and perfect with jeans or a dress!",
        "category_name": "Clothing",
    },
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
                _password_hash=bcrypt.generate_password_hash(fake.password()).decode(
                    "utf-8"
                ),
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
            image_url=item_data["image_url"],
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
