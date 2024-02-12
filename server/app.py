#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import jsonify, make_response, session, request, render_template
from flask_restful import Resource
import requests
import os
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from helpers import validate_not_blank, validate_type

from models import Item, Category, Order, OrderDetail, ItemCategory, User


# Define the endpoint for chat completions
@app.route("/api/chat-completions", methods=["POST"])
def chat_completions():
    data = request.get_json()
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {app.api_key}",
    }
    response = requests.post(app.api_url, json=data, headers=headers)
    return jsonify(response.json())


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
        try:
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
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            user_id = user.id
            session["user_id"] = user_id
            return user.to_dict(), 201
        except ValueError as e:
            db.session.rollback()  # Rollback the changes if an error occurs
            return {"error": e.__str__()}, 422
        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/api/signup", endpoint="signup")

# CHECK SESSION


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        return {}, 401


api.add_resource(CheckSession, "/api/check_session", endpoint="check_session")

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


api.add_resource(Login, "/api/login", endpoint="login")

# LOGOUT


class Logout(Resource):
    def delete(self):
        session.clear()
        return {}, 204


api.add_resource(Logout, "/api/logout", endpoint="logout")

# USERS


class Users(Resource):

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
                session.clear()
                return make_response({"message": "User deleted successfully"}, 200)
            else:
                return make_response({"error": "Invalid credentials"}, 401)
        except Exception as error:
            return make_response({"error": str(error)}, 500)


api.add_resource(Users, "/api/users")


class UsersById(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)

        data = request.get_json()

        # Check if the user id matches the current user id
        if user.id == session["user_id"]:
            try:
                # Update user profile
                setattr(user, "firstname", data["firstname"])
                setattr(user, "lastname", data["lastname"])
                # setattr(user, "email", data["email"])
                setattr(user, "address", data["address"])
                setattr(user, "city", data["city"])
                setattr(user, "state", data["state"])
                setattr(user, "zip", data["zip"])

                db.session.commit()

                return user.to_dict(), 202
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Unauthorized access"}, 403)


api.add_resource(UsersById, "/api/users/<int:id>")

# ORDERS


class Orders(Resource):
    def get(self):
        try:
            # Fetch orders along with related order details and item names
            orders_with_details_and_items = (
                db.session.query(Order, OrderDetail, Item)
                .join(OrderDetail, Order.id == OrderDetail.order_id)
                .join(Item, OrderDetail.item_id == Item.id)
                .filter(Order.user_id == session.get("user_id"))
                .distinct(Order.id, OrderDetail.item_id, Item.id)
                .all()
            )

            # Create a response containing order_id, created_at, item_id, and item_name
            response_data = []
            processed_orders = set()

            for order, _, item in orders_with_details_and_items:
                order_id = order.id

                if order_id not in processed_orders:
                    response_data.append(
                        {
                            "order_id": order_id,
                            "created_at": order.created_at,
                            "order_details": [],
                        }
                    )

                    processed_orders.add(order_id)

                # Add item information to the order_details
                order_details = next(
                    (
                        details
                        for details in response_data
                        if details["order_id"] == order_id
                    ),
                    None,
                )

                if order_details:
                    order_details["order_details"].append(
                        {
                            "item_id": item.id,
                            "item_name": item.name,
                            "item_price": item.price,
                            "item_description": item.description,
                            "item_image": item.image_url,
                        }
                    )

            return make_response(response_data, 200)
        except Exception as error:
            return make_response({"error": str(error)}, 500)

    def post(self):
        order_data = request.get_json()
        try:
            new_order = Order(user_id=session["user_id"])
            db.session.add(new_order)
            db.session.flush()
            items = []
            for detail in order_data.get("order_details", []):
                order_detail = OrderDetail(
                    order_id=new_order.id,
                    item_id=detail["item_id"],
                )
                db.session.add(order_detail)
                item = Item.query.get(detail["item_id"])
                if item.inStock:
                    item.inStock = False
                    db.session.add(item)
                else:
                    raise Exception(f"{item.name} not in stock.")
            db.session.commit()
            return make_response(
                {
                    "order": new_order.to_dict(),
                    "items": [item.to_dict() for item in items],
                },
                201,
            )
        except Exception as e:
            db.session.rollback()
            return make_response({"error": "Order creation failed: " + str(e)}, 500)


api.add_resource(Orders, "/api/orders")

# ORDER DETAILS


class OrderDetails(Resource):
    def get(self):
        try:
            order_details = OrderDetail.query.all()
            return make_response([detail.to_dict() for detail in order_details], 200)
        except Exception as error:
            return make_response({"error": str(error)}, 500)


api.add_resource(OrderDetails, "/api/order_details")


def get_or_create_category(category_name):
    category = db.session.query(Category).filter_by(name=category_name).first()
    if category is None:
        category = Category(name=category_name)
        db.session.add(category)
        db.session.commit()
    return category


# ITEM CATEGORIES


@app.route("/api/items_with_categories", methods=["GET"])
def get_items_with_categories():
    try:
        items_with_categories = []
        items = Item.query.all()
        for item in items:
            categories = [category.name for category in item.categories]
            item_with_categories = {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "price": item.price,
                "image_url": item.image_url,
                "inStock": item.inStock,
                "categories": categories,
            }
            items_with_categories.append(item_with_categories)
        return jsonify(items_with_categories), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Render front-end
@app.route("/")
def index():
    return render_template("index.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
