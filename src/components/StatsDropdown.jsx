import React, { useMemo, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const StatsDropdown = ({ expenses }) => {
  const [dropdown, setDropdown] = useState(false);

  const { totalToday, totalThisMonth, totalThisYear } = useMemo(() => {
    const today = new Date();

    const parseDate = (value) => {
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    const totals = { totalToday: 0, totalThisMonth: 0, totalThisYear: 0 };

    expenses.forEach((expense) => {
      const expenseDate = parseDate(expense.date);
      if (!expenseDate) return;

      const amount = Number(expense.amount) || 0;

      const isSameYear = expenseDate.getFullYear() === today.getFullYear();
      if (!isSameYear) return;

      totals.totalThisYear += amount;

      const isSameMonth =
        expenseDate.getMonth() === today.getMonth() && isSameYear;
      if (isSameMonth) {
        totals.totalThisMonth += amount;

        const isSameDay = expenseDate.getDate() === today.getDate();
        if (isSameDay) {
          totals.totalToday += amount;
        }
      }
    });

    return totals;
  }, [expenses]);

  return (
    <>
      <button style={styles.toggleButton} onClick={() => setDropdown((prev) => !prev)}>
        Show Stats
        <FaArrowDown />
      </button>
      {dropdown && (
        <div style={styles.panel}>
          <p>Total spent today: ${totalToday.toFixed(2)}</p>
          <p>Total spent this month: ${totalThisMonth.toFixed(2)}</p>
          <p>Total spent this year: ${totalThisYear.toFixed(2)}</p>
        </div>
      )}
    </>
  );
};

const styles = {
  toggleButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.25rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    backgroundColor: "#2563eb",
    color: "white",
  },
  panel: {
    marginTop: "0.75rem",
    padding: "1rem",
    textAlign: "left",
    borderRadius: "0.75rem",
    backgroundColor: "#f1f5f9",
    lineHeight: 1.5,
  },
};

export default StatsDropdown;
