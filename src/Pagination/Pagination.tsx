import "./Pagination.scss";
import { Link } from "react-router-dom";


type pageProps = {
  pages: number[];
  setCurrentPage: any;
};

const Pagination = ({ pages, setCurrentPage }: pageProps) => {
  
  return (
    <div className="pagination">
      {pages.map((page) => (
        <Link to="" className="pagination__numbers" onClick={()=> (setCurrentPage(page))}>
          <p>{page}</p>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
