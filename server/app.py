#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import jsonify, make_response, request
from flask_restful import Resource
import os

# Local imports
from config import app, db, api
from helpers import validate_not_blank, validate_type
from dotenv import load_dotenv
from models import Product, Category, Order, OrderDetail, ProductCategory, User

# Builds app, set attributes
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'app.db')}"
)
load_dotenv()
app.secret_key = os.environ.get("SECRET_KEY")


@app.route("/")
def index():
    return "<h1>Retro Relics</h1>"


# PRODUCTS


class Products(Resource):
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

    def get(self):
        try:
            products = [product.to_dict() for product in Product.query.all()]
            products = [
                product.to_dict(convert_price_to_dollars=True)
                for product in Product.query.all()
            ]
            return make_response({"products": products}, 200)
        except Exception as error:
            return make_response({"error": str(error)}, 500)

    def post(self):
        product_data = request.get_json()
        try:
            required_fields = [
                "name",
                "description",
                "price",
                "image_url",
                "imageAlt",
            ]
            if not all(field in product_data for field in required_fields):
                return make_response({"error": "Missing required fields"}, 400)

            # Convert price to cents
            new_product_price = int(float(product_data["price"]) * 100)
            new_product = Product(
                name=product_data["name"],
                description=product_data["description"],
                price=new_product_price,
                item_quantity=product_data["item_quantity"],
                image_url=product_data["image_url"],
                imageAlt=product_data["imageAlt"],
            )
            db.session.add(new_product)
            db.session.commit()
            return make_response({"new_product": new_product.to_dict()}, 201)
        except ValueError:
            return make_response(
                {"error": "Item creation failed due to a database error."}, 400
            )
        except Exception as error:
            return make_response({"error": str(error)}, 500)


api.add_resource(Products, "/products")

# PRODUCTS BY ID


class ProductsById(Resource):
    def get(self, id):
        product = Product.query.get(id)
        if product:
            return make_response(product.to_dict(convert_price_to_dollars=True), 200)
        else:
            return make_response({"error": "Item not found"}, 404)

    def patch(self, id):
        product = Product.query.get(id)
        if product:
            data = request.get_json()
            try:
                for attr in data:
                    setattr(product, attr, data[attr])
                db.session.commit()
                return make_response(product.to_dict(), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Product not found"}, 404)

    def delete(self, id):
        try:
            product = Product.query.get(id)
            if product:
                db.session.delete(product)
                db.session.commit()
                return jsonify({}), 204
            else:
                return make_response({"error": "Product not found"}), 404
        except Exception as error:
            return make_response({"error": str(error)}), 500


api.add_resource(ProductsById, "/products/<int:id>")

# USERS


class Users(Resource):
    def get(self):
        return make_response([user.to_dict() for user in User.query.all()], 200)

    def post(self):
        user_data = request.get_json()
        try:
            new_user = User(
                username=user_data["username"],
                email=user_data["email"],
                first_name=user_data.get("first_name", ""),
                last_name=user_data.get("last_name", ""),
                shipping_address=user_data.get("shipping_address", ""),
                shipping_city=user_data.get("shipping_city", ""),
                shipping_state=user_data.get("shipping_state", ""),
                shipping_zip=user_data.get("shipping_zip", ""),
            )
            new_user.password = user_data["password"]
            db.session.add(new_user)
            db.session.commit()

            return make_response({"message": "User created successfully"}, 201)
        except ValueError as e:
            db.session.rollback()
            if "UNIQUE constraint failed" in str(e):
                return make_response(
                    {"error": "Username or email already exists."}, 409
                )
            else:
                return make_response({"error": "Database integrity error."}, 500)

        except Exception as error:
            db.session.rollback()
            return make_response({"error": "User creation failed: " + str(error)}, 500)

    def delete(self):
        try:
            data = request.get_json()
            if not all(key in data for key in ("username", "password")):
                return make_response(
                    {"error": "Username and password are required"}, 400
                )
            username = data["username"]
            password = data["password"]
            user = User.query.filter_by(username=username).first()
            if user and user.authenticate(password):
                user_to_delete = user
                db.session.delete(user_to_delete)
                db.session.commit()
                return make_response({"message": "User deleted successfully"}, 200)
            else:
                return make_response({"error": "Invalid credentials"}, 401)
        except Exception as error:
            return make_response({"error": str(error)}, 500)

    def patch(self):
        data = request.get_json()
        try:
            if not all(key in data for key in ("username", "password", "newPassword")):
                return make_response({"error": "Required fields are missing"}, 400)
            username = data["username"]
            password = data["password"]
            new_password = data["newPassword"]

            user = User.query.filter_by(username=username).first()
            if user and user.authenticate(password):
                user.password = new_password
                db.session.commit()
                return make_response({"message": "Password updated successfully"}, 200)
            else:
                return make_response({"error": "Invalid credentials"}, 401)
        except Exception as error:
            return make_response({"error": str(error)}, 500)


api.add_resource(Users, "/users")

# ORDERS


class Orders(Resource):
    def get(self):
        try:
            orders = Order.query.all()
            return make_response([order.to_dict() for order in orders], 200)
        except Exception as error:
            return make_response({"error": str(error)}, 500)

    def post(self):
        order_data = request.get_json()
        try:
            new_order = Order(user_id=order_data["user_id"])
            db.session.add(new_order)
            db.session.flush()
            for detail in order_data["order_details"]:
                order_detail = OrderDetail(
                    order_id=new_order.id,
                    product_id=detail["product_id"],
                    quantity=detail["quantity"],
                )
                db.session.add(order_detail)
            db.session.commit()
            return make_response({"message": "Order created successfully"}, 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": "Order creation failed: " + str(e)}, 500)


api.add_resource(Orders, "/orders")

# ORDER DETAILS


class OrderDetails(Resource):
    def get(self):
        try:
            order_details = OrderDetail.query.all()
            return make_response([detail.to_dict() for detail in order_details], 200)
        except Exception as error:
            return make_response({"error": str(error)}, 500)


api.add_resource(OrderDetails, "/order_details")

# CATEGORIES


class Categories(Resource):
    def get(self):
        Categories = Category.query.all()
        return make_response([category.to_dict() for category in Categories], 200)

    def post(self):
        category_data = request.get_json()
        name = category_data.get("name")
        try:
            validate_not_blank(name, "name")
            new_category = Category(name=name)
            db.session.add(new_category)
            db.session.commit()
            return make_response({"message": "Category created successfully"}, 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": "Failed to create category: " + str(e)}, 500)


api.add_resource(Categories, "/categories")

# PRODUCT CATEGORIES


class ProductCategories(Resource):
    def get(self):
        product_categories = ProductCategory.query.all()
        return make_response(
            [product_category.to_dict() for product_category in product_categories], 200
        )

    def post(self):
        data = request.get_json()
        product_id = data.get("product_id")
        category_id = data.get("category_id")

        try:
            validate_type(product_id, "product_id", int)
            validate_type(category_id, "category_id", int)

            new_product_category = ProductCategory(
                product_id=product_id, category_id=category_id
            )
            db.session.add(new_product_category)
            db.session.commit()
            return make_response(
                {"message": "ProductCategory created successfully"}, 201
            )
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        except Exception as e:
            db.session.rollback()
            return make_response(
                {"error": "Failed to create product category: " + str(e)}, 500
            )


api.add_resource(ProductCategories, "/product_categories")

# LOGIN


class Login(Resource):
    def post(self):
        data = request.get_json()
        if not all(key in data for key in ("username", "password")):
            return make_response({"error": "Username and password are required"}, 400)
        username = data["username"]
        password = data["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            return make_response(
                {"message": "Login successful", "user_id": user.id}, 200
            )
        else:
            return make_response({"error": "Invalid credentials"}, 401)


api.add_resource(Login, "/login")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
