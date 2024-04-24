import "./Pagination.scss";
import { Link } from "react-router-dom";

type pageProps = {
  pages: number[];
};

const Pagination = ({ pages }: pageProps) => {
  const handlePageNumber = () => {
    console.log("hi");
  };



  return (
    <div className="pagination">
      {pages.map((page) => (
        <Link to="" className={String(page)} onClick={handlePageNumber}>
          <p>{page}</p>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
