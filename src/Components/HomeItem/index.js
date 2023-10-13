import {Link} from 'react-router-dom'
import './index.css'

const HomeItem = props => {
  const {item} = props
  const {id, logoUrl, name} = item
  return (
    <list key={id}>
      <Link to={`/courses/${id}`}>
        <li>
          <img src={logoUrl} alt={name} />
          <image>{name}</image>
        </li>
      </Link>
    </list>
  )
}
export default HomeItem
