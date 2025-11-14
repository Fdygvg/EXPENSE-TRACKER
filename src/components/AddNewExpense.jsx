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
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Add New Expense</h2>
        {/* CATEGORY */}
        <label>
          Category: <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
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
            style={styles.input}
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
            style={styles.input}
          />
        </label>

        {/* DATE */}
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
        </label>

        {/* BUTTONS */}
        <div style={styles.buttonRow}>
          <button type="submit" style={styles.addBtn}>
            Add
          </button>
          <button type="button" onClick={closeForm} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewExpense;

const styles = {
  form: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  addBtn: {
    flex: 1,
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    flex: 1,
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
