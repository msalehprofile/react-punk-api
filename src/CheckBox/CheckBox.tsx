import "./CheckBox.scss";
import { ChangeEventHandler } from "react";

type checkBoxOptions = {
    label: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}


const CheckBox = ({label, handleChange}: checkBoxOptions) => {
  return (
    <div>
        <form action="select" className="checkbox__option" >
            <input onChange={handleChange} type="checkbox" className="checkbox__option--box"/>
            <label htmlFor="" className="checkbox__option--label">{label}</label>
        </form>
    </div>
  )
}

export default CheckBox