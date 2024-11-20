# Personal Budgeting App

A **React + TypeScript** application powered by **Vite**, designed for managing personal budgets. The app provides comprehensive CRUD operations for users, budgets, expenses, and expense categories. Authentication is handled via **CSRF tokens**, with a backend implemented in **Go**.

---

## 🚀 Features

- **CRUD Operations**:
  - User management
  - Budgets: Create, update, delete, and view budgets
  - Expenses: Add, update, view, and delete expenses
  - Expense Categories: Categorize and manage expense categories
- **User Authentication**:
  - Secure login and signup using CSRF tokens
- **Modern Frontend**:
  - Built with React and TypeScript for scalability and type safety
  - Vite for a fast and optimized development experience

---

## 🔮 Planned Enhancements

- **Budget Summary**:
  - A detailed summary for each budget, including visualizations.
- **Data Visualization**:
  - Integration of a **pie chart** to provide an intuitive overview of budget distributions and spending.

---

## 🛠️ Tech Stack

### Frontend

- **React**: Declarative UI components
- **TypeScript**: Strong typing for better code reliability
- **Vite**: Lightning-fast build tool

### Backend

- **Go**: Backend server handling authentication and data operations
- **CSRF Tokens**: Secure user authentication mechanism

---

## 📂 File Structure

The project is organized for maintainability and scalability:

```plaintext
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific modules (e.g., budgets, expenses)
├── hooks/            # Custom React hooks
├── pages/            # Page-level components for routing
├── services/         # API interaction and backend integration
├── styles/           # Global and shared styles
├── utils/            # Shared utility functions
```
