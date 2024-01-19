import React, { useContext } from "react";
import { Pagination, ConfigProvider } from "antd";
import { AppContext } from "../Context/AppContext";

export default function Ipagination({ totalPage }) {
  const { setNewPage } = useContext(AppContext);
  function handlePagination(current) {
    setNewPage(current);
  }
  return (
    <Pagination
      className={"i-pagi-custom"}
      onChange={handlePagination}
      pageSize={20}
      defaultCurrent={1}
      total={totalPage}
    ></Pagination>
  );
}
