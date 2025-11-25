 

```` 
# FitTrack

**FitTrack** is a modern fitness tracking web application built with **Next.js**. It allows users to log workouts, track progress, and manage their fitness routines. The app includes authentication and protected routes for a personalized experience.

**Live Demo:** [FitTrack Live](https://fit-track-six-beta.vercel.app)

---

## **Features** ✅

- 🔒 **User Authentication:** Secure login and registration using NextAuth.js.  
- 📊 **Dashboard:** Personalized dashboard showing workout stats and progress.  
- 🏋️ **Workout Management:** Add, view, and manage workouts easily.  
- 📄 **Workout Details:** Detailed view for each workout, including date, type, and duration.  
- 👤 **Profile Management:** Edit and update your user profile.  
- 🚫 **Protected Routes:** Only logged-in users can access dashboards, workouts, and profiles.  
- 📱 **Responsive Design:** Mobile-friendly and works on all devices.  
- 🎨 **Modern UI:** Built with Tailwind CSS for a clean and attractive interface.  

---

## **Setup & Installation**

### **1. Clone the repository**
```bash
git clone https://github.com/yourusername/fittrack.git
cd fittrack
````

### **2. Install dependencies**

```bash
npm install
# or
yarn install
```

### **3. Set up environment variables**

Create a `.env.local` file in the root directory and add the following:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### **4. Run the development server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### **5. Build for production**

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## **Route Summary**

| Route            | Method   | Description                                   | Protected |
| ---------------- | -------- | --------------------------------------------- | --------- |
| `/`              | GET      | Landing page                                  | No        |
| `/login`         | GET/POST | User login page                               | No        |
| `/register`      | GET/POST | User registration page                        | No        |
| `/dashboard`     | GET      | User dashboard (overview of workouts & stats) | Yes       |
| `/workouts`      | GET      | List all workouts                             | Yes       |
| `/workouts/[id]` | GET      | View single workout details                   | Yes       |
| `/workouts/add`  | GET/POST | Add a new workout                             | Yes       |
| `/profile`       | GET/POST | View & edit user profile                      | Yes       |

---

## **Technologies Used**

* Next.js (App Router)
* NextAuth.js (Authentication)
* MongoDB (Database)
* Tailwind CSS (Styling)
* React Icons

---

## **Future Improvements**

* 📸 Add photo uploads for workouts
* 🌍 Enable GPS tracking for runs or cycling
* 🔔 Push notifications for workout reminders
* 🔍 Advanced filtering and search for workouts

---

 

```

---
 
