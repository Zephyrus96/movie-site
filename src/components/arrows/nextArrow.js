import React from "react";
import Next from "../../resources/right-arrow.svg";

const NextArrow = props => {
  return (
    <div className="slick-next" onClick={props.onClick}>
      <img src={Next} alt="Next" />
    </div>
  );
};

export default NextArrow;
