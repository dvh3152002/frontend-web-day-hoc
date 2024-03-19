import React, { memo } from "react";

function SearchItem(props) {
  const { name } = props;
  return (
    <div className="p-4 border border-gray-800 flex justify-between items-center">
      <span>{name}</span>
    </div>
  );
}

export default memo(SearchItem);
