import React, { createContext, useState, useEffect, useContext } from 'react';

import { UserContext } from './userContext';



export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [budgetChanged, setBudgetChanged] = useState(false);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    if (user) {
      fetch(`http://10.0.2.2:3000/api/budgets/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setBudgets(data);
        })
        .catch((error) => {
          console.error('Error fetching budget summaries:', error);
          Alert.alert('Error', 'Failed to fetch budget summaries');
        });
    }
  }, [user, budgetChanged]);

  return (
    <BudgetContext.Provider value={{ budgets, setBudgets, setBudgetChanged }}>
      {children}
    </BudgetContext.Provider>
  );
};
