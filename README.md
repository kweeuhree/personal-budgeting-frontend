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

## ▶️ Usage

---

## 🔮 Planned Enhancements

- **Budget Summary**:
  - A detailed summary for each budget, including visualizations.

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
