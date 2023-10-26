import { Input, Table } from "antd";
import { useState } from "react";

export const TableUser = ({ bills }) => {
  const [q, setQ] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  };

  const searchUsers = (rows) => {
    const escapedQ = escapeRegExp(q.trim());
    const searchRegex = new RegExp(escapedQ, "i");

    return rows?.filter(
      (row) =>
        searchRegex.test(row.idFactura.toString()) ||
        searchRegex.test(row.cliente) ||
        searchRegex.test(row.userName) ||
        searchRegex.test(row.total.toString()) ||
        searchRegex.test(row.fecha)
    );
  };

  const columns = [
    {
      title: "idFactura",
      dataIndex: "idFactura",
      key: "idFactura",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => b.total - a.total,
      sortOrder: sortOrder,
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
  ];

  return (
    <>
      <Input
        style={{ margin: "40px", maxWidth: "200px" }}
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar"
      />
      <Table
        columns={columns}
        dataSource={searchUsers(bills)}
        rowKey="idFactura"
        pagination={{
          pageSize: 5,
          size: "small",
        }}
        onChange={(pagination, filters, sorter) => {
          if (sorter.columnKey === "total") {
            handleSortChange(sorter.order);
          }
        }}
      />
    </>
  );
};
