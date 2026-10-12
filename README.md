# 🛍️ ShopSphere — Full-Stack E-Commerce Website

ShopSphere is a full-stack e-commerce web application built with Next.js, TypeScript, Bootstrap, Node.js, Express.js, and PostgreSQL. It provides product browsing, shopping cart management, wishlist functionality, user authentication, and an admin panel for product management.

## ✨ Features

- 🔐 **User Authentication** — Sign up, sign in, JWT authentication, and Remember Me functionality.
- 🛒 **Shopping Cart** — Add products, update quantities, and remove items.
- ❤️ **Wishlist** — Save and remove favorite products.
- 📦 **Product Management** — Browse products and view detailed product information.
- 🗂️ **Category Filtering** — Browse products by category.
- 🔎 **Product Search** — Find products using the search functionality.
- 👤 **User Profile** — View account information.
- 🛠️ **Admin Panel** — Add, edit, and delete products with admin authorization.
- 🖼️ **Image Uploads** — Upload and display product images.
- 📱 **Responsive UI** — Bootstrap-based interface for desktop and mobile devices.
- 🔔 **Toast Notifications** — Display feedback for user actions.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React.js | User interface |
| TypeScript | Type-safe development |
| Bootstrap | Responsive UI and styling |
| Node.js | Backend runtime |
| Express.js | REST API |
| PostgreSQL | Relational database |
| Sequelize ORM | Database models and relationships |
| JWT | Authentication |
| Multer | File uploads |
| Axios | API communication |
| Git & GitHub | Version control |
| Vercel | Frontend deployment |

## 📁 Project Structure

```text
ShopSphere/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── styles/
│   ├── package.json
│   └── .env.local.example
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

*Note: The structure above is illustrative. Adjust file and directory names to match your repository.*

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)
- npm

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ShopSphere
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Configure the Database

Create a PostgreSQL database using your preferred PostgreSQL client.

```sql
CREATE DATABASE shopshere;
```

Use the database name expected by your backend configuration. If your project uses a different name, update the command accordingly.

Ensure the required tables and columns exist before starting the application. Use your existing Sequelize models, migrations, or verified SQL schema.

### 3. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example` and configure the required variables.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopshere
DB_USER=postgres
DB_PASSWORD=your_database_password
JWT_SECRET=your_secure_jwt_secret
```

Use the exact environment variable names required by your backend code.

Start the backend:

```bash
npm run dev
```

The local backend should be available at:

```text
http://localhost:5000
```

### 4. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env.local` and configure the backend API URL.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Make sure this variable matches the configuration used in your API client.

Start the frontend:

```bash
npm run dev
```

Open the application at:

**http://localhost:3000**

## 🔗 API Endpoints

The following endpoints summarize the main API functionality. Confirm the actual routes in your backend before relying on this list.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a user |
| POST | `/api/auth/signin` | Sign in |
| GET | `/api/auth/profile` | Get authenticated profile |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/products` | Create a product (admin) |
| PUT | `/api/products/:id` | Update a product (admin) |
| DELETE | `/api/products/:id` | Delete a product (admin) |
| GET | `/api/categories` | Get categories |
| GET | `/api/cart` | Get the user's cart |
| POST | `/api/cart` | Add an item to the cart |
| PUT | `/api/cart/:id` | Update a cart item |
| DELETE | `/api/cart/:id` | Remove a cart item |
| GET | `/api/wishlist` | Get wishlist items |
| POST | `/api/wishlist` | Add a wishlist item |
| DELETE | `/api/wishlist/:id` | Remove a wishlist item |

## 🗄️ Database Models

The application uses PostgreSQL and Sequelize to manage relational data.

- **User:** Account details, password hash, and admin role.
- **Product:** Name, description, price, stock, image data, and timestamps.
- **Category:** Product category information.
- **Cart:** User shopping cart and associated items.
- **Wishlist:** Products saved by users.

Product images are stored in PostgreSQL using binary data fields in the configured implementation.

## 🚀 Deployment

The frontend can be deployed on Vercel, while the backend and PostgreSQL database must be accessible through suitable hosting services.

For production deployment:

1. Deploy the backend and configure the production database.
2. Set the production environment variables.
3. Configure CORS for the deployed frontend domain.
4. Add the production backend URL to Vercel environment variables.
5. Test authentication, product loading, cart, wishlist, and admin operations.

## 🔒 Security

- Never commit `.env` or `.env.local` files.
- Keep database credentials and JWT secrets private.
- Store password hashes instead of plaintext passwords.
- Validate authentication and admin privileges on the backend.
- Use HTTPS and secure production configuration.

## 🧪 Testing

Test the following workflows before deployment:

- User registration and sign-in.
- Product listing and category filtering.
- Product details and search.
- Cart and wishlist operations.
- Product image uploads.
- Admin product management.
- Protected API endpoints.
- Responsive layouts on desktop and mobile.
- Production API and database connectivity.

## 📸 Screenshots

Add screenshots of your actual application here.

```text
docs/
├── home.png
├── products.png
├── product-details.png
├── cart.png
├── wishlist.png
├── signin.png
└── admin.png
```

Once these images exist in your repository, display them in this section using Markdown image links.

## 👨‍💻 Author

**Luv Thakur**

- GitHub: [Your GitHub Profile](YOUR_GITHUB_PROFILE_URL)

## 📄 License

This project is available for educational and portfolio purposes. Add a `LICENSE` file if you intend to distribute it under a specific open-source license.
