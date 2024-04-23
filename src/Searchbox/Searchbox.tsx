import "./Searchbox.scss";
import { FormEventHandler } from "react";

type SearchBoxProps = {
    searchTerm: string;
    handleSearchTerm: FormEventHandler<HTMLInputElement>
}
const Searchbox = ({searchTerm, handleSearchTerm}: SearchBoxProps) => {
  return (
    <div className="navigation__search">
        <input type="text"
        onInput={handleSearchTerm}
        value={searchTerm} 
        placeholder="Seach by name" className="search__searchbox"/>
    </div>
  )
}

export default Searchbox