import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import useSavedExpenses from "../components/hooks/useSavedExpenses";

const CategoryDetailsPage = () => {
  const { categoryId } = useParams(); // grabs the category name from URL
  const [expenses] = useSavedExpenses();

  // Decode the category name from URL and filter expenses
  const categoryName = decodeURIComponent(categoryId);
  const categoryExpenses = useMemo(() => {
    return expenses.filter(expense => expense.category === categoryName);
  }, [expenses, categoryName]);

  // Calculate total for this category
  const total = useMemo(() => {
    return categoryExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  }, [categoryExpenses]);

  return (
    <section className="category-details-container">
      <Link to="/" className="category-details-back-link">
        ⬅ Back
      </Link>
      <h2 className="category-details-header">
        Viewing all expenses for: {categoryName}
      </h2>
      <p className="category-details-summary">
        Total: ₦{total.toFixed(2)} ({categoryExpenses.length} {categoryExpenses.length === 1 ? 'expense' : 'expenses'})
      </p>

      {categoryExpenses.length === 0 ? (
        <p className="category-details-no-expenses">No expenses found for this category.</p>
      ) : (
        <ul className="space-y-3">
          {categoryExpenses.map((expense) => (
            <li
              key={expense.id}
              className="category-details-expense-item"
            >
              <div className="category-details-expense-info">
                <span className="category-details-expense-title">{expense.title}</span>
                <span className="category-details-expense-date">{expense.date}</span>
              </div>
              <span className="category-details-expense-amount">
                ₦{expense.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoryDetailsPage;
