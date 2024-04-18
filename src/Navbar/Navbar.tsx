import { FormEventHandler, ChangeEventHandler } from "react";
import Searchbox from "../Searchbox/Searchbox";
import "./Navbar.scss";
import { Beer } from "../Data/beertypes";
import CheckBox from "../CheckBox/CheckBox";

type TotalBeerArray = {
  beers: Beer[];
  handleSearchTerm: FormEventHandler<HTMLInputElement>;
  searchTerm: string;
  handleRangeBox: ChangeEventHandler<HTMLInputElement>;
  handleAbvBox: ChangeEventHandler<HTMLInputElement>;
  handleacidityBox: ChangeEventHandler<HTMLInputElement>
};

const Navbar = ({ searchTerm, handleacidityBox, handleRangeBox, handleSearchTerm, handleAbvBox }: TotalBeerArray) => {
  return (
    <div className="navigation">
      <Searchbox searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <div className="checkbox-options">
        <CheckBox label="High ABV (>6.0%)" handleChange={handleAbvBox} />
        <CheckBox label="Classic Range" handleChange={handleRangeBox}/>
        <CheckBox label="Acidic (pH < 4)" handleChange={handleacidityBox}/>
      </div>
    </div>
  );
};

export default Navbar;
