import { Beer } from "../Data/beertypes";
import "./Pagination.scss";
import { Link } from "react-router-dom";

type pageProps = {
  setCurrentPage: any;
  beers: Beer[];
  postPerPage: number;
};

const Pagination = ({ setCurrentPage, beers, postPerPage }: pageProps) => {
  const totalPages = Math.ceil(beers.length / postPerPage);

  let pagesArr: number[] = [1];
  for (let i = 1; i < totalPages; i++) {
    pagesArr.push(i + 1);
  }

  return (
    <div className="pagination">
      {pagesArr.map((page) => (
        <Link
          to=""
          className="pagination__numbers"
          onClick={() => setCurrentPage(page)}
        >
          <p>{page}</p>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
