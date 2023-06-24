import React, { useState } from 'react';
import './App.css';

const tiers = [
  { name: 'Tier 1', amount: 10000, interest: 0.05 },
  { name: 'Tier 2', amount: 20000, interest: 0.1 },
  { name: 'Tier 3', amount: 30000, interest: 0.2 },
];

const App = () => {
  const [students, setStudents] = useState(Array(12).fill(null));
  const [totalSavings, setTotalSavings] = useState(0);
  const [savingsByMember, setSavingsByMember] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (students.length >= 12) {
      alert('Maximum number of students reached!');
      return;
    }
    const name = e.target.name.value;
    const tier = parseInt(e.target.tier.value);
    const amount = parseInt(e.target.amount.value);

    const student = { name, tier, amount };
    const updatedStudents = [...students, student];

    setStudents(updatedStudents);

    const updatedSavingsByMember = [...savingsByMember];
    if (updatedSavingsByMember[tier]) {
      updatedSavingsByMember[tier] += amount;
    } else {
      updatedSavingsByMember[tier] = amount;
    }
    setSavingsByMember(updatedSavingsByMember);

    setTotalSavings(totalSavings + amount);
  };

  const handleWithdrawal = (student) => {
    const updatedStudents = students.filter((s) => s !== student);
    setStudents(updatedStudents);

    const updatedSavingsByMember = [...savingsByMember];
    updatedSavingsByMember[student.tier] -= student.amount;
    setSavingsByMember(updatedSavingsByMember);

    setTotalSavings(totalSavings - student.amount);
  };

  return (
    <div className="App">
      <h1>Savings Group</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
        <label htmlFor="tier">Tier:</label>
        <select id="tier" required>
          {tiers.map((tier, index) => (
            <option key={index} value={index}>
              {tier.name}
            </option>
          ))}
        </select>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" required min="0" />
        <button type="submit" disabled={students.length >= 12}>
          Join
        </button>
      </form>

      <div className="savings">
        <h2>Total Savings (₦): {totalSavings}</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tier</th>
              <th>Amount (₦)</th>
              <th>Interest (₦)</th>
              <th>Total Withdrawal(₦)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const { name, tier, amount } = student;
              const { interest } = tiers[tier];
              const interestEarned = amount * interest;
              const totalWithdrawal = amount + interestEarned;

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{tiers[tier].name}</td>
                  <td>{amount}</td>
                  <td>{interestEarned}</td>
                  <td>{totalWithdrawal}</td>
                  <td>
                    <button onClick={() => handleWithdrawal(student)}>
                      Withdraw
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="total-savings">
        <h2>Total Savings by Student</h2>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Total Savings (₦)</th>
            </tr>
          </thead>
          <tbody>
            {savingsByMember.map((savings, index) => (
              <tr key={index}>
                <td>{tiers[index].name}</td>
                <td>{savings ? savings : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;