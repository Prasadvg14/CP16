import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const initialMoneyList = {
  key: uuidv4(),
  balance: 0,
  income: 0,
  expenses: 0,
}

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    moneyDetailsList: initialMoneyList,
    transactionList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      type: 'Income',
    }))

    if (type === 'Income') {
      this.setState(prevState => ({
        moneyDetailsList: {
          ...prevState.moneyDetailsList,
          income: prevState.moneyDetailsList.income + amount,
          balance: prevState.moneyDetailsList.balance + amount,
        },
      }))
    } else {
      this.setState(prevState => ({
        moneyDetailsList: {
          ...prevState.moneyDetailsList,
          expenses: prevState.moneyDetailsList.expenses + amount,
          balance: prevState.moneyDetailsList.balance - amount,
        },
      }))
    }
  }

  getMoneyDetails = () => {
    const {moneyDetailsList} = this.state
    const {balance, income, expenses} = moneyDetailsList
    const moneyDetails = [
      {
        testid: 'balanceAmount',
        id: uuidv4(),
        bal: balance,
        img:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        displayText: 'Balance',
        alt: 'balance',
      },
      {
        testid: 'incomeAmount',
        id: uuidv4(),
        bal: income,
        img:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        displayText: 'Income',
        alt: 'income',
      },
      {
        testid: 'expensesAmount',
        id: uuidv4(),
        bal: expenses,
        img:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        displayText: 'Expenses',
        alt: 'expenses',
      },
    ]

    return moneyDetails
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const {amount, type} = transactionList.filter(each => {
      if (each.id !== id) {
        return null
      }
      return each
    })[0]

    if (type === 'Income') {
      this.setState(prevState => ({
        moneyDetailsList: {
          ...prevState.moneyDetailsList,
          income: prevState.moneyDetailsList.income - parseInt(amount),
          balance: prevState.moneyDetailsList.balance - parseInt(amount),
        },
        transactionList: [
          ...prevState.transactionList.filter(each => {
            if (each.id === id) {
              return null
            }
            return each
          }),
        ],
      }))
    } else {
      this.setState(prevState => ({
        moneyDetailsList: {
          ...prevState.moneyDetailsList,
          expenses: prevState.moneyDetailsList.expenses - amount,
          balance: prevState.moneyDetailsList.balance + amount,
        },
      }))
    }
  }

  render() {
    const moneyDetails = this.getMoneyDetails()
    const {title, amount, type, transactionList} = this.state
    return (
      <div className="bg-container">
        <div className="header">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul className="ul">
          {moneyDetails.map(each => (
            <MoneyDetails key={each.id} details={each} />
          ))}
        </ul>
        <div className="bottom">
          <div className="left">
            <h2>Add Transaction</h2>
            <form onSubmit={this.onSubmitForm}>
              <label htmlFor="title">TITLE</label>
              <input onChange={this.onChangeTitle} value={title} id="title" />
              <label htmlFor="amount">AMOUNT</label>
              <input
                onChange={this.onChangeAmount}
                value={amount}
                id="amount"
              />
              <label htmlFor="type">TYPE</label>
              <select onChange={this.onChangeType} value={type} id="type">
                {transactionTypeOptions.map(each => (
                  <option id={each.optionId}>{each.displayText}</option>
                ))}
              </select>
              <button className="addBtn" type="submit">
                Add
              </button>
            </form>
          </div>

          <div className="right">
            <h2>History</h2>

            <ul>
              <li className="titles">
                <p className="t">Title</p>
                <p className="t">Amount</p>
                <p className="t">Type</p>
              </li>

              {transactionList.map(each => (
                <TransactionItem
                  deleteTransaction={this.deleteTransaction}
                  key={each.id}
                  eachTrans={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
