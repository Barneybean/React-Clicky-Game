import React from "react";
import "./Characters.css";

const Characters = props => (
  <div className="card">
    <div className="img-container shuffle" onClick={() => props.shuffle(props.arr, props.id)}>
      <img alt={props.name} src={props.image} />
    </div>
 
  </div>
);

export default Characters;
