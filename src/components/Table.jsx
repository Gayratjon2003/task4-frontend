import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function DataTable() {
  const Controls = () => (
    <div className="flex items-center justify-between gap-x-4 control-buttons">
      <BlockIcon onClick={() => console.log("BlockIcon")} className="cursor-pointer" />
      <LockOpenIcon onClick={() => console.log("LockOpenIcon")} className="cursor-pointer" />
      <DeleteIcon onClick={() => console.log("DeleteIcon")} className="cursor-pointer" />
    </div>
  );
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "lastLoginTime", headerName: "Last login time", width: 130 },
    { field: "registerTime", headerName: "Registration time", width: 130 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "controlss",
      renderHeader: () => <Controls />,
      width: 120,
      sortable: false,
      disableColumnMenu: true
    },
  ];
  
  const rows = [
    {
      id: 1,
      name: "Jon",
      email: "example@gmail.com",
      lastLoginTime: "25.05.2023",
      registerTime: "20.05.2023",
      status: "Active",
    },
    {
      id: 2,
      name: "Cersei",
      email: "example@gmail.com",
      lastLoginTime: "25.05.2023",
      registerTime: "20.05.2023",
      status: "Active",
    },
    {
      id: 3,
      name: "Jaime",
      email: "example@gmail.com",
      lastLoginTime: "25.05.2023",
      registerTime: "20.05.2023",
      status: "Active",
    },
    {
      id: 4,
      name: "Arya",
      email: "example@gmail.com",
      lastLoginTime: "25.05.2023",
      registerTime: "20.05.2023",
      status: "Active",
    },
  ];
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    // console.log(selectedRowsData);
    console.log("ids: ", ids);
  };
 
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
             outline: "none !important",
          },
       }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}
