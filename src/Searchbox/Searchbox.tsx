import "./Searchbox.scss";
import { FormEventHandler } from "react";

type SearchBoxProps = {
    searchTerm: string;
    handleSearchTerm: FormEventHandler<HTMLInputElement>
}
const Searchbox = ({searchTerm, handleSearchTerm}: SearchBoxProps) => {
  return (
    <div className="navigation__searchbox">
        <input type="text"
        onInput={handleSearchTerm}
        value={searchTerm} />
    </div>
  )
}

export default Searchbox