import React from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";



const ExpenseList = ({ expenses }) => {
  // Group expenses by category and calculate totals

  const expensesByCategory = useMemo(() => {
    const grouped = {};  // Move this OUTSIDE the forEach loop

    expenses.forEach((expense) => {
      const category = expense.category;

      // If this category doesn't exist yet, create it
      if (!grouped[category]) {
        grouped[category] = {
          expenses: [],
          total: 0
        };
      }

      // Add this expense to the category
      grouped[category].expenses.push(expense);
      // Add the amount to the category total
      grouped[category].total += Number(expense.amount) || 0;
    });

    return grouped;
  }, [expenses]);

  // Now the early return comes AFTER the hook
  if (expenses.length === 0) {
    return <p className="no-expenses-message">No expenses yet 😴...</p>;
  }

  return (
    <>
      <ul className="space-y-3 mt-4">
        {Object.entries(expensesByCategory).map(([category, { expenses: categoryExpenses, total }]) => {
          // Limit to 5 expenses for display
          const displayedExpenses = categoryExpenses.slice(0, 5);
          const hasMore = categoryExpenses.length > 5;
          const totalCount = categoryExpenses.length;

          return (
            <div key={category} className="expense-category-container">
              <h3 className="category-header">
                {category} - Total: ₦{total.toFixed(2)} ({totalCount} {totalCount === 1 ? 'expense' : 'expenses'})
              </h3>
              {displayedExpenses.map((expense) => (
                <li
                  key={expense.id}
                  className="expense-item"
                >
                  <span className="expense-title">{expense.title}</span>
                  <span className="expense-amount">₦{expense.amount}</span>
                  <span className="expense-date">{expense.date}</span>
                </li>
              ))}
              {hasMore && (
                <Link 
                  to={`/category/${encodeURIComponent(category)}`}
                  className="show-more-button"
                >
                  Show More ({categoryExpenses.length - 5} more {categoryExpenses.length - 5 === 1 ? 'expense' : 'expenses'})
                </Link>
              )}
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default ExpenseList;