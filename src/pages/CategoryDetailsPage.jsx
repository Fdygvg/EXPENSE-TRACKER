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
    <section style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px", color: "#007bff", textDecoration: "none" }}>
        ⬅ Back
      </Link>
      <h2 style={{ marginBottom: "10px" }}>
        Viewing all expenses for: {categoryName}
      </h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Total: ${total.toFixed(2)} ({categoryExpenses.length} {categoryExpenses.length === 1 ? 'expense' : 'expenses'})
      </p>

      {categoryExpenses.length === 0 ? (
        <p>No expenses found for this category.</p>
      ) : (
        <ul className="space-y-3">
          {categoryExpenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span className="font-medium">{expense.title}</span>
                <span style={{ fontSize: "14px", color: "#666" }}>{expense.date}</span>
              </div>
              <span className="font-semibold" style={{ fontSize: "18px" }}>
                ${expense.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoryDetailsPage;
