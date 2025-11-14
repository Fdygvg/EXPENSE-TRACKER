import React, { useState } from "react";

const AddNewExpense = ({ closeForm, onAddExpense }) => {
  const [category, setCategory] = useState("Shopping");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const handleSubmit = (e) => {
    e.preventDefault();
setTitle((prev)=> prev + " ");
      if (!title.trim() || !amount.trim()) {
        alert("Please fill out all fields!");
        return;
      };

    const newExpense = {
      id: Date.now(),
      category,
      title,
      amount: parseFloat(amount),
      date,
    };

      if (onAddExpense) onAddExpense(newExpense);

    setTitle("");
    setAmount("");
    closeForm();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="expense-form">
        <h2>Add New Expense</h2>
        {/* CATEGORY */}
        <label>
          Category: <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="expense-form-input"
          >
            <option value="Shopping">Shopping</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Expense Title:
          <input
            type="text"
            placeholder="e.g. Movie ticket"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="expense-form-input"
          />
        </label>

        {/* AMOUNT */}
        <label>
          Amount:
          <input
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="expense-form-input"
          />
        </label>

        {/* DATE */}
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="expense-form-input"
          />
        </label>

        {/* BUTTONS */}
        <div className="expense-form-buttons">
          <button type="submit" className="expense-form-add-button">
            Add
          </button>
          <button type="button" onClick={closeForm} className="expense-form-cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewExpense;
