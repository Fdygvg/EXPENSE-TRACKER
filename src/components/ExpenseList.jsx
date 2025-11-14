import React from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowDown91 } from "react-icons/fa6";



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
    return <p>No expenses yet 😴...</p>;
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
            <div key={category} style={style.div}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {category} - Total: ${total.toFixed(2)} ({totalCount} {totalCount === 1 ? 'expense' : 'expenses'}) <FaArrowDown91 />
              </h3>
              {displayedExpenses.map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <span className="font-medium">{expense.title}</span>
                  <span className="font-semibold">${expense.amount}</span>
                  <span>{expense.date}</span>
                </li>
              ))}
              {hasMore && (
                <Link 
                  to={`/category/${encodeURIComponent(category)}`}
                  style={style.showMoreButton}
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

// =================== STYLE OBJECT =====================

const style = {
  div: {
    color: "red",
    border: "2px red solid",
    margin: "10px",
    padding: "15px"
  },
  showMoreButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 16px",
    background: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  }
};