import React from "react";

const Image = ({imgsrc,className,onClick}) => {
  return <img onClick={onClick} className={className} src={imgsrc}/>;
};

export default Image;
