# 📝 Notes App

A modern, full-stack Notes Management Application built with **Next.js 15** (App Router), **MongoDB**, **Mongoose**, and **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)

## ✨ Features

- ✅ **Create** notes with title and content
- ✅ **Read** all notes with formatted timestamps
- ✅ **Update** existing notes seamlessly
- ✅ **Delete** notes with confirmation
- ✅ **Responsive** design for all devices
- ✅ **Modern UI** with smooth animations

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS |
| Backend | Next.js API Routes (RESTful) |
| Database | MongoDB with Mongoose ODM |
| Deployment | Vercel (recommended) |

## 📁 Project Structure

```
notes-app/
├── app/
│   ├── api/notes/          # REST API endpoints
│   │   ├── route.js        # GET all, POST new
│   │   └── [id]/route.js   # GET one, PUT, DELETE
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout + SEO
│   └── page.js             # Main page with CRUD logic
├── components/
│   ├── NoteForm.jsx        # Create/Edit form
│   ├── NoteCard.jsx        # Single note display
│   └── NoteList.jsx        # Notes grid container
├── lib/
│   └── mongodb.js          # Database connection (cached)
├── models/
│   └── Note.js             # Mongoose schema
└── package.json
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
# 1. Clone & install
git clone <your-repo-url>
cd notes-app
npm install

# 2. Create .env
echo "MONGODB_URI=mongodb://localhost:27017/notes-app" > .env

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Fetch all notes |
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes/:id` | Fetch single note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

## 🌐 Vercel Deployment Guide

### Step 1: Set Up MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. **Database Access** → Add a database user with password
4. **Network Access** → Add `0.0.0.0/0` to allow all IPs
5. **Connect** → Get your connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notes-app
   ```

### Step 2: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: Notes App"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/notes-app.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your `notes-app` repository
4. **Configure Environment Variables:**
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/notes-app` |

5. Click **"Deploy"**

### Step 4: Verify Deployment

- Your app will be live at `https://your-project.vercel.app`
- Test all CRUD operations
- Check Vercel logs if any issues

### Environment Variables on Vercel

> ⚠️ **Important**: Never commit `.env` to git!

To update environment variables after deployment:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Edit variables and redeploy

---

## 🎯 Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **App Router** | Latest Next.js standard with better layouts & server components |
| **Mongoose** | Schema validation, middleware support, familiar API |
| **Cached DB Connection** | Prevents connection exhaustion in serverless environment |
| **Tailwind CSS** | Utility-first, rapid development, consistent design |

## 📝 License

MIT License - feel free to use for learning or interviews!

---

Built with ❤️ using Next.js, MongoDB & Tailwind CSS
