import React, { useState } from "react";
import AddNewExpense from "../components/AddNewExpense";
import ExpenseList from "../components/ExpenseList";
import StatsDropdown from "../components/StatsDropdown";
import useSavedExpenses from "../components/hooks/useSavedExpenses";

const MainPage = () => {
  const [showAddForm, setShowAddForm] = useState(false); // Controls visibility of the form
  const [expenses, setExpenses] = useSavedExpenses();

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Expense Tracker 💰</h1>
      <section style={styles.container}>
        {/* ADD NEW EXPENSE BUTTON */}

        {!showAddForm && (
          <button style={styles.addButton} onClick={() => setShowAddForm(true)}>
            + Add New Expense
          </button>
        )}

        {/* FORM APPEARS WHEN BUTTON IS CLICKED */}

        {showAddForm && (
          <AddNewExpense
            onAddExpense={handleAddExpense}
            closeForm={() => setShowAddForm(false)}
          />
        )}

        {/* STATS DROPDOWN */}

        <StatsDropdown  expenses={expenses}/>

      <section className="p-6">
        <ExpenseList expenses={expenses} />
      </section>


      </section>

    </>
  );
};

export default MainPage;
// =================== STYLE OBJECT =====================

const styles = {
  container: {
    width: "90%",
    maxWidth: "600px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  addButton: {
    padding: "15px",
    background: "#007bff",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "8px",
  },
};
