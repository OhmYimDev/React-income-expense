import Transaction from './components/transaction';
import './App.css';
import FormComponent from './components/form';
import { useEffect, useState } from 'react';
import DataContext from './data/Datacontext';
import ReportComponent from './components/ReportComponent';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  const designTitle = { color: 'red',   textAlign: 'center', fontSize: '1.5rem', }
  const initData = []
  const [items, setItems] = useState(initData)
  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem,...prevItem]
    })
  }

  useEffect(() => {
    const amounts = items.map(item => item.amount);
    const income = amounts.filter(e => e > 0).reduce((total, e) => total += e, 0)
    const expense = (amounts.filter(e => e < 0).reduce((total, e) => total += e, 0))*-1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items, reportIncome, reportExpense])

  return (
    <DataContext.Provider value={
      {
         income: reportIncome,
         expense: reportExpense
      }
    }>
        <div className="container">
          <h1 style={designTitle}>แอพบัญชีรายรับ - รายจ่าย</h1>
          <Router>
            <div>
              <ul className='horizontal__menu'>
                <li>
                  <Link to="/">ข้อมูลบัญชี</Link>
                </li>
                <li>
                  <Link to="/insert">บันทึกข้อมูล</Link>
                </li>
              </ul>
              <Routes>
                <Route exact path="/" element={<ReportComponent/>}></Route>
                <Route path="/insert" element={<><FormComponent onAddItem={onAddNewItem} /><Transaction item={items} /></>}></Route>
              </Routes>
            </div>
          </Router>
        </div>
    </DataContext.Provider>
  );

}

export default App;
 