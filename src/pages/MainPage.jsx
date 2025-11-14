import React, { useState } from "react";
import AddNewExpense from "../components/AddNewExpense";
import ExpenseList from "../components/ExpenseList";
import StatsDropdown from "../components/StatsDropdown";
import useSavedExpenses from "../components/hooks/useSavedExpenses";
import '../index.css'

const MainPage = () => {
  const [showAddForm, setShowAddForm] = useState(false); // Controls visibility of the form
  const [expenses, setExpenses] = useSavedExpenses();

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return (
    <>
        <h1 className="title">Expense Tracker</h1>
      <section className="main-container">
        {/* ADD NEW EXPENSE BUTTON */}

        {!showAddForm && (
          <button className="add-expense-button" onClick={() => setShowAddForm(true)}>
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

      <section className="expense-list-container">
        <ExpenseList expenses={expenses} />
      </section>


      </section>

    </>
  );
};

export default MainPage;
