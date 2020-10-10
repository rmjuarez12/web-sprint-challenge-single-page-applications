import React from 'react'

export default function FormField(props) {
  switch (props.type) {
    case "checkbox":
      return (
        <label htmlFor={props.name} className={`${props.error !== "" ? "terms invalid" : "terms valid"}`}>
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            checked={props.value}
            data-cy={props.name}
          />
          {props.label}

          {props.error !== "" && <span className="error-mssg">{props.error}</span>}
        </label>
      );
    
    case "select":
      return (
        <label htmlFor={props.name} className={`${props.error !== "" ? "terms invalid" : "terms valid"}`}>
          {props.label}
          
          <select name={props.name} value={props.value} onChange={props.handleChange} data-cy={props.name}>
            <option value="0">Select Size</option>

            {props.selections.map((selection, index) => {
              return (<option value={selection} key={index}>{selection}</option>)
            })}
          </select>

          {props.error !== "" && <span className="error-mssg">{props.error}</span>}
        </label>
      );
    
    case "textarea":
      return (
        <label htmlFor={props.name} className={`${props.error !== "" ? "invalid" : "valid"}`}>
          {props.label}
          <textarea
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            value={props.value}
            data-cy={props.name}
          >
          </textarea>

          {props.error !== "" && <span className="error-mssg">{props.error}</span>}
        </label>
      );

    default:
      return (
        <label htmlFor={props.name} className={`${(props.error !== "" && props.error != undefined) ? "invalid" : "valid"}`}>
          {props.label}
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            onChange={props.handleChange}
            value={props.value}
            data-cy={props.name}
          />

          {props.error !== "" && <span className="error-mssg">{props.error}</span>}
        </label>
      );
  }
}
