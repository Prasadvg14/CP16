// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachTrans, deleteTransaction} = props
  const {id, title, amount, type} = eachTrans

  const onClickBtn = () => {
    deleteTransaction(id)
  }
  return (
    <li className="transaction">
      <p className="p">{title}</p>
      <p className="p">{amount}</p>
      <p className="p">{type}</p>
      <button data-testid="delete" onClick={onClickBtn} type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
