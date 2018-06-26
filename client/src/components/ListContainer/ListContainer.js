import React from "react";

export const ListContainer = ({ children }) => {
  return (
    <div className="list-overflow-container">
     	<ul>
        {children}
      	</ul>
    </div>
  );
};

export default ListContainer;