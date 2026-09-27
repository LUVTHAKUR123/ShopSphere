# ShopSphere — E-Commerce Website

Stack: Next.js + TypeScript + Bootstrap (frontend), Node.js + Express + TypeScript (backend), PostgreSQL (database).

## Folder Structure
```
shopsphere/
  backend/     -> Express + TypeScript API
  frontend/    -> Next.js + TypeScript + Bootstrap UI
```

## 1. Database Setup
1. Install PostgreSQL and create a database:
   ```
   createdb shopsphere
   ```
2. Run the schema (creates tables + sample products):
   ```
   psql -U postgres -d shopsphere -f backend/src/db/schema.sql
   ```

## 2. Backend Setup
```
cd backend
npm install
cp .env.example .env      # then edit DATABASE_URL / JWT_SECRET if needed
npm run dev                # starts on http://localhost:5000
```

## 3. Frontend Setup
```
cd frontend
npm install
cp .env.local.example .env.local
npm run dev                # starts on http://localhost:3000
```

## 4. Making Yourself an Admin
After signing up normally through the Sign Up page, run this in psql to promote your account:
```sql
UPDATE users SET is_admin = true WHERE email = 'your@email.com';
```
Then log out and log back in — the "Admin" link will appear in the navbar.

## Pages Included
- `/products` — Product listing
- `/products/[id]` — Product detail
- `/cart` — Cart (add/update/remove, requires login)
- `/signin`, `/signup` — Auth
- `/profile` — User profile
- `/admin` — Minimal admin panel (add/edit/delete products, admin-only)

## API Endpoints (backend)
- `POST /api/auth/signup`, `POST /api/auth/signin`, `GET /api/auth/profile`
- `GET /api/products`, `GET /api/products/:id`
- `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` (admin only)
- `GET /api/cart`, `POST /api/cart`, `PUT /api/cart/:id`, `DELETE /api/cart/:id` (logged in)

## Notes for your 3-day timeline
- Day 1: Get backend + DB running, test endpoints with Postman/Thunder Client.
- Day 2: Connect frontend pages one by one (listing → detail → cart → auth).
- Day 3: Wire up admin panel, polish styling, test full flow, prepare demo/screenshots.
