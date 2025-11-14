import { useState, useEffect } from "react";

const STORAGE_KEY = "expense-tracker-expenses";

const useSavedExpenses = () => {
  // Initialize state - try to load from localStorage first
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem(STORAGE_KEY);
      // If we have saved expenses, parse them (they're stored as JSON string)
      if (savedExpenses) {
        return JSON.parse(savedExpenses);
      }
    } catch (error) {
      // If something goes wrong (corrupted data, etc.), just start fresh
      console.error("Error loading expenses from localStorage:", error);
    }
    // If nothing saved, start with empty array
    return [];
  });

  // Save to localStorage whenever expenses change
  useEffect(() => {
    try {
      // Convert expenses array to JSON string and save it
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      // If saving fails (maybe localStorage is full), log the error
      console.error("Error saving expenses to localStorage:", error);
    }
  }, [expenses]); // Run this effect whenever expenses changes

  // Return expenses and a function to update them
  return [expenses, setExpenses];
};

export default useSavedExpenses;

