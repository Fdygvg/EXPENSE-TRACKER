import React from "react";

const ExpenseList = ({ expenses }) => {
  if (expenses.length === 0) {
    return <p>No expenses yet 😴...</p>;
  }
  
 const style = {
  color: "red",
  border: "2px red solid",
  margin: "10px"
    
  }
  return (
      <ul className="space-y-3 mt-4">
        {expenses.map((expense) => (
    <div style={style}>

          <li
            key={expense.id}
            className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            <span className="font-medium">{expense.title}</span>
            <span className="font-semibold">{expense.amount}</span>
            <span>{expense.category}</span>
          </li>
          </div>
        ))}
      </ul>
  );
};

export default ExpenseList;


