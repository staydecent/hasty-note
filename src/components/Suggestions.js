import h from 'virtual-dom/h'

export default Suggestion

function Suggestion({suggestions, pos}) {
  const Item = (title, index) => {
    return <li className={index === pos && 'active'}>{title}</li>
  }

  return <ul id="suggestions">
    {suggestions.map(Item)}
  </ul>
}
