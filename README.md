<p align="center">
  <a href="https://imgbb.com/">
    <img src="https://i.ibb.co/NNf3Fvf/Retro-Revival.png" alt="Retro-Revival" border="0">
  </a>
</p>

# Retro Revival

## Description

_Retro Revival_ is an exciting online thrift reselling platform seamlessly blending the charm of yesteryears with the convenience of modern technology. This innovative project, built with a dynamic combination of React and Python, takes thrift shopping to a whole new level. Embrace the nostalgia as you explore a curated collection of timeless housewares and clothing, each item carefully selected to evoke a sense of vintage allure. Plus, experience our interactive chatbot feature guiding you through your thrift shopping journey, providing personalized recommendations and answering any queries you may have along the way. Additionally, enjoy a visually captivating experience with our embedded Instagram feed, where you can immerse yourself in the latest trends, behind-the-scenes glimpses, and customer favorites. Retro Revival is not just a platform; it's a nostalgic adventure waiting to be explored.

## Key Features

1. **Browse and Discover:**
   Immerse yourself in a treasure trove of retro finds. From classic housewares to fashion-forward clothing, Retro Revival offers a diverse array of items that breathe new life into forgotten gems.

2. **Add to Cart and Purchase:**
   Easily build your collection by adding items to your cart with just a click. The streamlined and user-friendly interface ensures a hassle-free shopping experience, allowing you to rediscover and secure your favorite pieces effortlessly.

3. **Secure Checkout:**
   With a secure and intuitive checkout process, Retro Revival ensures that your transactions are not only smooth but also protected. Shop confidently as you bring the past into the present with just a few clicks.

4. **User Profiles:**
   Tailor your Retro Revival experience by creating and customizing your user profile. Easily manage your personal information, track orders, and stay updated on your purchase history. Your profile is your gateway to a personalized thrift-shopping journey.

5. **Instagram Integration:**
   Stay connected with the Retro Revival community by seamlessly integrating with our Instagram feed. Follow us for a daily dose of vintage inspiration, behind-the-scenes glimpses, and updates on the latest additions to our collection.

## Project Details

<h3><b>Client</b></h3>

Contains the following components:

Contains the following pages:

<h3><p>Server</p></h3>

Contains the following models: Item, Category, ItemCategory, User, Order, OrderDetails.

<p align="center">
  <a href="https://ibb.co/Gp7bf9q">
    <img src="https://i.ibb.co/kBKWVJt/DBDiagram.png" alt="DBDiagram" border="0">
  </a>
</p>

## Using this Program

To begin this program, you'll use the following commands:

<ul>
<li>pipenv install && pipenv shell</li>
<li>cd server</li>
<li>flask db init</li>
<li>flask db migrate -m "implement relationships"</li>
<li>flask db upgrade head</li>
<li>python seed.py</li>
<li>python app.py</li>
</ul>

Open up an additional terminal and use the following commands:

<ul>
<li>cd client</li>
<li>npm start</li>
</ul>

<h3><p>Home</p></h3>

Takes the user to the homepage.

<h3><p>About</p></h3>

Contains information about the thrift reseller shop.

<h3><p>Shop</p></h3>

Allows the user to peruse available items and add to shopping cart.

<h3><p>Social</p></h3>

Contains an embedded instagram for the shop that the user can look through.

<h3><p>Cart</p></h3>

Contains all of the items the user added while shopping. Items can be added to the cart without having to log in.

In order to purchase the items, the user will need to log in with an existing account or create a new account.

Once logged in, the user can enter in their billing details to complete the order. The "Profile" and "Logout" tab appear once the user is logged in.

<h3><p>Profile</p></h3>

Contains the user's profile information, which can be edited and will persist in the database. This page will also contain all previous orders the user has made.

<h3><p>Logout</p></h3>

Logs the user out of their session and takes them back to the homepage.

<h3><p>Chat</p></h3>
