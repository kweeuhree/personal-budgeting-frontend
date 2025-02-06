# Personal Budgeting App

A **React + TypeScript** application powered by **Vite**, designed for managing personal budgets. The app provides comprehensive CRUD operations for users, budgets, expenses, and expense categories. Authentication is handled via **CSRF tokens**, with a backend implemented in **Go**.

The repository containing the backend of the application can be found here: [Go backend repository](https://personal-budgeting-backend.onrender.com/)

## 🚀 Screenshots

<p align="center">
<img src="https://github.com/kweeuhree/personal-budgeting-frontend/blob/master/src/assets/budget.png?raw=true" alt="Budget Page" width="600" />
<img src="https://github.com/kweeuhree/personal-budgeting-frontend/blob/master/src/assets/expenses.png?raw=true" alt="Expenses Page" width="600" />
</p>

## 🚀 Features

- **CRUD Operations**:
  - User management
  - Budget: Create, update, delete, and view budget
  - Expenses: Add, view, and delete expenses
  - Expense Categories: Categorize and manage expense categories
- **User Authentication**:
  - Secure login and signup using CSRF tokens and hashed passwords
- **Modern Frontend**:
  - Built with React and TypeScript for scalability and type safety
  - Vite for a fast and optimized development experience
  - ApexCharts and Tailwind for better user experience

---

## 🖥️ Run the Program

- Install Node and npm locally;
- Clone or fork this repository;
- In the project folder, run the following command:

```bash
 npm run dev
```

---

## ▶️ Usage

- Sign up with your credentials or login with test credentials:
  Email: nika@gmail.com
  Password: qwerty12345

- Await for the remote server to spin up (may take for up to 60 seconds);
- Navigate to 'Create expense+' to create an expense;
- Navigate to 'View expenses' to view all expenses;
- Navigate to 'View categories' to view categories or create a new category;
- Navigate to 'Profile' to reset the budget.

---

## 🔮 Planned Enhancements

- **Budget Summary**:
  - A detailed summary for each budget, including visualizations.
  - Comprehensive unit and integration tests

---

## 😃 Features I am excited about

- **Custom tooltips with Tailwind and vanilla JavaScript**
Accessibility is important, and this project features responsive tooltips for better user experience.
<p align="center">
<img src="https://github.com/kweeuhree/personal-budgeting-frontend/blob/master/src/assets/tooltip.png?raw=true" alt="Custom tooltip picture" width="200" />
</p>

- **Custom confirm window with focus trap**
Default confirm window is underwhelming, and this project features custom confirm windows that trap focus to satisfy accessibility requirements.
<p align="center">
<img src="https://github.com/kweeuhree/personal-budgeting-frontend/blob/master/src/assets/confirm.png?raw=true" alt="Custom confirm dialog" width="400" />
</p>

- **ResponsiveTable component**
  Responsive table component standardizes how Categories and Expenses are displayed. The Responsive table component will display both tables in the same fashion and simply gets injected with relevant information.

- **User authorization with CSRF tokens**
  Security is vital when finances are concerned. CSRF tokens ensure integrity of user data.

---

## 🛠️ Tech Stack

### Frontend

- **React**: Declarative UI components
- **TypeScript**: Strong typing for better code reliability
- **Vite**: Lightning-fast build tool

### Backend

- **Go**: Backend server handling authentication and data operationsGH_PAT
- **MySQL Solution**: MySQL instance is hosted on Aiven Cloud
- **CSRF Tokens**: Secure user authentication mechanism

---

## 📂 File Structure

The project is organized for maintainability and scalability:

```plaintext
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── layouts/          # Different page layouts for authorized and unauthorized access
├── pages/            # Page-level components for routing
├── store/            # State management with Redux and API interaction
├── styles/           # Global and shared styles
├── types/            # Type declarations
├── utils/            # Shared utility functions
```

## 🧪 Testing

A unit test for unit conversion is provided.
