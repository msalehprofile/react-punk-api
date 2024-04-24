import './Pagination.scss';
import { Link } from 'react-router-dom';


const Pagination = () => {
    let pages = [];
    

  return (
    <div className="pagination">
        <Link to=""><p>1</p></Link>
        <Link to=""><p>2</p></Link>
    </div>
  )
}

export default Pagination