#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import jsonify, make_response, session, request
from flask_restful import Resource
import os
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from helpers import validate_not_blank, validate_type
from os import environ
from dotenv import load_dotenv
from models import Item, Category, Order, OrderDetail, ItemCategory, User

# Builds app, set attributes
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'app.db')}"
)
load_dotenv()
app.secret_key = environ.get("SECRET_KEY")


@app.route("/")
def index():
    return "<h1>Retro Relics</h1>"


# AUTHENTICATION


# @app.before_request
# def check_if_logged_in():
#     open_access_list = [
#         "signup",
#         "login",
#         "check_session",
#         "about",
#         "shop",
#         "cart",
#         "social",
#         "home",
#     ]

#     if (request.endpoint) not in open_access_list and (not session.get("user_id")):
#         return {"error": "401 Unauthorized"}, 401

# TEST

# SIGNUP


class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        firstname = request_json.get("firstname")
        lastname = request_json.get("lastname")
        email = request_json.get("email")
        address = request_json.get("address")
        city = request_json.get("city")
        state = request_json.get("state")
        zip = request_json.get("zip")
        password = request_json.get("password")
        user = User(
            firstname=firstname,
            lastname=lastname,
            email=email,
            address=address,
            city=city,
            state=state,
            zip=zip,
        )
        # the setter will encrypt this
        try:
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            user_id = user.id
            session["user_id"] = user_id
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()  # Rollback the changes if an error occurs
            return {"error": str(e)}, 422
        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")

# CHECK SESSION


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        return {}, 401


api.add_resource(CheckSession, "/check_session", endpoint="check_session")

# LOGIN


class Login(Resource):
    def post(self):
        request_json = request.get_json()
        email = request_json.get("email")
        password = request_json.get("password")
        user = User.query.filter(User.email == email).first()
        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200
        return {"error": "401 Unauthorized"}, 401


api.add_resource(Login, "/login", endpoint="login")

# LOGOUT


class Logout(Resource):
    def delete(self):
        session.clear()
        return {}, 204


api.add_resource(Logout, "/logout", endpoint="logout")

# ITEMS


class Items(Resource):
    def get(self):
        try:
            items = [item.to_dict() for item in Item.query.all()]
            items = [
                item.to_dict(convert_price_to_dollars=True) for item in Item.query.all()
            ]
            return make_response({"items": items}, 200)
        except Exception as error:
            return make_response({"error": str(error)}, 500)

    def post(self):
        item_data = request.get_json()
        try:
            required_fields = [
                "name",
                "description",
                "price",
                "image_url",
                "imageAlt",
            ]
            if not all(field in item_data for field in required_fields):
                return make_response({"error": "Missing required fields"}, 400)

            # Convert price to cents
            new_item_price = int(float(item_data["price"]) * 100)
            new_item = Item(
                name=item_data["name"],
                description=item_data["description"],
                price=new_item_price,
                image_url=item_data["image_url"],
                imageAlt=item_data["imageAlt"],
            )
            db.session.add(new_item)
            db.session.commit()
            return make_response({"new_item": new_item.to_dict()}, 201)
        except ValueError:
            return make_response(
                {"error": "Item creation failed due to a database error."}, 400
            )
        except Exception as error:
            return make_response({"error": str(error)}, 500)


api.add_resource(Items, "/items")

# ITEMS BY ID


class ItemsById(Resource):
    def get(self, id):
        item = Item.query.get(id)
        if item:
            return make_response(item.to_dict(convert_price_to_dollars=True), 200)
        else:
            return make_response({"error": "Item not found"}, 404)

    def patch(self, id):
        item = Item.query.get(id)
        if item:
            data = request.get_json()
            try:
                for attr in data:
                    setattr(item, attr, data[attr])
                db.session.commit()
                return make_response(item.to_dict(), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Item not found"}, 404)

    def delete(self, id):
        try:
            item = Item.query.get(id)
            if item:
                db.session.delete(item)
                db.session.commit()
                return jsonify({}), 204
            else:
                return make_response({"error": "Item not found"}), 404
        except Exception as error:
            return make_response({"error": str(error)}), 500


api.add_resource(ItemsById, "/items/<int:id>")

# USERS


class Users(Resource):
    def get(self):
        return make_response([user.to_dict() for user in User.query.all()], 200)

    def post(self):
        user_data = request.get_json()
        try:
            new_user = User(
                email=user_data["email"],
                firstname=user_data.get("firstname", ""),
                lastname=user_data.get("lastname", ""),
                address=user_data.get("address", ""),
                city=user_data.get("city", ""),
                state=user_data.get("state", ""),
                zip=user_data.get("zip", ""),
            )
            new_user.password = user_data["password"]
            db.session.add(new_user)
            db.session.commit()
            return make_response({"message": "User created successfully"}, 201)
        except ValueError as e:
            db.session.rollback()
            if "UNIQUE constraint failed" in str(e):
                return make_response({"error": "Email already exists."}, 409)
            else:
                return make_response({"error": "Database integrity error."}, 500)
        except Exception as error:
            db.session.rollback()
            return make_response({"error": "User creation failed: " + str(error)}, 500)

    def delete(self):
        try:
            data = request.get_json()
            if not all(key in data for key in ("email", "password")):
                return make_response({"error": "Email and password are required"}, 400)
            email = data["email"]
            password = data["password"]
            user = User.query.filter_by(email=email).first()
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
            if not all(key in data for key in ("email", "password", "newPassword")):
                return make_response({"error": "Required fields are missing"}, 400)
            email = data["email"]
            password = data["password"]
            new_password = data["newPassword"]

            user = User.query.filter_by(email=email).first()
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


def get_or_create_category(category_name):
    category = (
        db.session.query(Category).filter_by(name=category_name).first()
    )  # first row is more effcient than all() as it only takes one in memory.Filters one where the anem matches.
    if category is None:
        category = Category(name=category_name)
        db.session.add(category)
        db.session.commit()
    return category


# ITEM CATEGORIES


class ItemCategories(Resource):
    def get(self):
        item_categories = ItemCategory.query.all()
        return make_response(
            [item_category.to_dict() for item_category in item_categories], 200
        )

    def post(self):
        data = request.get_json()
        item_id = data.get("item_id")
        category_id = data.get("category_id")

        try:
            validate_type(item_id, "item_id", int)
            validate_type(category_id, "category_id", int)

            new_item_category = ItemCategory(item_id=item_id, category_id=category_id)
            db.session.add(new_item_category)
            db.session.commit()
            return make_response({"message": "ItemCategory created successfully"}, 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        except Exception as e:
            db.session.rollback()
            return make_response(
                {"error": "Failed to create product category: " + str(e)}, 500
            )


api.add_resource(ItemCategories, "/item_categories")

# LOGIN


# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         if not all(key in data for key in ("username", "password")):
#             return make_response({"error": "Username and password are required"}, 400)
#         username = data["username"]
#         password = data["password"]
#         user = User.query.filter_by(username=username).first()
#         if user and user.authenticate(password):
#             return make_response(
#                 {"message": "Login successful", "user_id": user.id}, 200
#             )
#         else:
#             return make_response({"error": "Invalid credentials"}, 401)


# api.add_resource(Login, "/login")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
