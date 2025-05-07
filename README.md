# 🎥 MyTube

[![Vercel](https://vercel.com/button)](https://vercel.com)

**MyTube** is a modern YouTube-inspired web application built with **React**, **TypeScript**, and **Tailwind CSS**. It provides a seamless user experience for browsing videos, managing subscriptions, and exploring categories.

> 🚀 **Live Demo:** [MyTube on Vercel](https://my-tube-omega-lime.vercel.app/)

---

## ✨ Features

- ✅ **Responsive Design** – Optimized for all screen sizes
- 🧭 **Dynamic Sidebar** – Expandable sections for categories, playlists, and subscriptions
- 🎞 **Video Grid** – Thumbnails, GIF previews, and metadata
- 🔍 **Search Functionality** – Text or **voice input** powered by the Web Speech API
- 🔔 **Subscriptions Management** – View and navigate to subscribed channels
- 🎵 **Playlists** – Access and manage your favorite playlists
- 🔥 **Explore Section** – Discover trending, music, sports, and more
- 🌙 **Dark Mode Ready** – Easily switchable or extendable to dark mode

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** React Context API
- **Utilities:** `clsx`, `tailwind-merge`
- **APIs:** Web Speech API (for voice search)
- **Hosting:** Vercel

---

## 📁 Project Structure

```bash
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx        # Dynamic sidebar UI
│   │   ├── PageHeader.tsx     # Header with text + voice search
│   ├── context/
│   │   └── SidebarContext.tsx # Sidebar state management
│   ├── data/
│   │   ├── home.ts            # Static video & category data
│   │   └── sideBar.ts         # Sidebar data (subscriptions, playlists)
│   ├── hooks/
│   │   └── useScreenSize.ts   # Custom hook for screen size detection
│   ├── utils/
│   │   └── format.ts          # Helper functions (duration, views, time)
```

## 💻 Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/mytube.git
cd mytube
```

2. **Install dependencies:**:

```bash
    Copy
    Edit
    npm install
    # or
    yarn install
```

3. **Start the development server:**

```bash
    Copy
    Edit
    npm run dev
    # or
    yarn dev
```

4. **Open your browser and visit: http://localhost:5173**

## 🧪 Testing

This project currently does **not** include automated tests.  
You can add tests using **Jest** or **React Testing Library**.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgments

- Inspired by **YouTube's UI/UX**
- Built with ❤️ using **React**, **TypeScript**, and **Tailwind CSS**
- Contributions are welcome!  
  Feel free to **open issues** or **submit pull requests** 😊
