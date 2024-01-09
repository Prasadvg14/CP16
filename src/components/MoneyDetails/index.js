// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {details} = props
  const {img, displayText, alt, bal, testid} = details

  const className = displayText

  return (
    <li className={className}>
      <img src={img} alt={alt} />
      <div>
        <p>Your {displayText}</p>
        <p data-testid={testid} className="amt">
          Rs {bal}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
