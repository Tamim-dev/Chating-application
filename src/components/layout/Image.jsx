import React from "react";

const Image = ({imgsrc,className,onClick,width}) => {
  return <img onClick={onClick} width={width} className={className} src={imgsrc}/>;
};

export default Image;
