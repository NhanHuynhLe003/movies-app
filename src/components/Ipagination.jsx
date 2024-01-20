import { Pagination } from "antd";
import React, { memo, useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Ipagination({ totalPage = 1, pageName }) {
  const { setNewPage } = useContext(AppContext);
  function handlePagination(current) {
    setNewPage((prev) => {
      return { ...prev, [pageName]: current };
    });
  }
  return (
    <Pagination
      hideOnSinglePage
      className={"i-pagi-custom"}
      onChange={handlePagination}
      pageSize={20}
      defaultCurrent={1}
      total={totalPage}
    ></Pagination>
  );
}
export default memo(Ipagination);
