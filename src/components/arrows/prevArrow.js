import React from "react";
import Prev from "../../resources/left-arrow.svg";

const PrevArrow = props => {
  return (
    <div className="slick-prev" onClick={props.onClick}>
      <img src={Prev} alt="Prev" />
    </div>
  );
};

export default PrevArrow;
