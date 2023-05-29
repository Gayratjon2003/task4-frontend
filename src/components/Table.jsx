import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { modalStart, setModalFunc } from "../store/modalSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CHECKLOGGED, REGISTER_URL } from "../constant";
import { snackbarStart } from "../store/SnackbarSlice";
import { done, start } from "../store/loaderSlice";
import { useNavigate } from "react-router-dom";

export default function DataTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const deleteUsers = () => {
    dispatch(start());
    const deleteUser = async (id) => {
      try {
        await axios({
          method: "delete",
          url: `${REGISTER_URL}/${id}`,
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
          data: {},
        });
        dispatch(done());
        dispatch(
          snackbarStart({
            text: "The selected users have been deleted",
            severity: "success",
          })
        );
        getRequest();
        checkLogged();
      } catch (err) {
        dispatch(done());
        dispatch(
          snackbarStart({
            text: "Something went wrong!",
            severity: "error",
          })
        );
        console.log(err);
      }
    };
    selectedIds?.map((el) => {
      deleteUser(el);
    });
    dispatch(done());
    setSelectedIds([]);
  };
  const blockUsers = () => {
    dispatch(start());
    const blockUser = async (id) => {
      const selectedRowsData = selectedIds.map((id) =>
        data.find((row) => row.id === id)
      );

      try {
        await axios({
          method: "put",
          url: `${REGISTER_URL}/${id}`,
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
          data: {
            name: selectedRowsData[0]?.name,
            email: selectedRowsData[0]?.email,
            isAdmin: "true",
            status: "Blocked",
          },
        });
        dispatch(done());
        dispatch(
          snackbarStart({
            text: "The selected users have been blocked",
            severity: "success",
          })
        );
        getRequest();
        checkLogged();
      } catch (err) {
        dispatch(done());
        dispatch(
          snackbarStart({
            text: "Something went wrong!",
            severity: "error",
          })
        );
        console.log(err);
      }
    };
    selectedIds?.map((el) => {
      blockUser(el);
    });
    setSelectedIds([]);
  };
  const unBlockUsers = () => {
    dispatch(start());
    const unBlockUser = async (id) => {
      const selectedRowsData = selectedIds.map((id) =>
        data.find((row) => row.id === id)
      );

      try {
        axios({
          method: "put",
          url: `${REGISTER_URL}/${id}`,
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
          data: {
            name: selectedRowsData[0]?.name,
            email: selectedRowsData[0]?.email,
            isAdmin: "true",
            status: "Active",
          },
        });
        dispatch(done());
        dispatch(
          snackbarStart({
            text: "The selected users have been unblocked",
            severity: "success",
          })
        );
        getRequest();
        setSelectedIds([]);
      } catch (err) {
        dispatch(done());
        dispatch(
          snackbarStart({
            text: "Something went wrong!",
            severity: "error",
          })
        );
        console.log(err);
        setSelectedIds([]);
      }
    };
    selectedIds?.map((el) => {
      unBlockUser(el);
    });
  };
  const openModal = (text) => {
    dispatch(modalStart({ text }));
  };
  const Controls = () => (
    <div className="flex items-center justify-between gap-x-4 control-buttons">
      <BlockIcon
        onClick={() => {
          if (selectedIds.length !== 0) {
            openModal("Are you sure block ?");
            dispatch(setModalFunc(blockUsers));
          }
        }}
        className="cursor-pointer"
      />
      <LockOpenIcon
        onClick={() => {
          if (selectedIds.length !== 0) {
            openModal("Are you sure unblock ?");
            dispatch(setModalFunc(unBlockUsers));
          }
        }}
        className="cursor-pointer"
      />
      <DeleteIcon
        onClick={() => {
          if (selectedIds.length !== 0) {
            openModal("Are you sure delete ?");
            dispatch(setModalFunc(deleteUsers));
          }
        }}
        className="cursor-pointer"
      />
    </div>
  );
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "E-mail", width: 220 },
    { field: "lastLoginTime", headerName: "Last login time", width: 150 },
    { field: "registerTime", headerName: "Registration time", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "controlss",
      renderHeader: () => <Controls />,
      width: 120,
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  const onRowsSelectionHandler = (ids) => {
    setSelectedIds(ids);
  };
  function convertTimestamp(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year} ${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;

    return formattedDate;
  }
  const checkLogged = async () => {
    dispatch(start());
    const _id = localStorage.getItem("id");
    try {
      const { status } = await axios({
        method: "delete",
        url: `${CHECKLOGGED}/${_id}`,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
        data: {},
      });
      dispatch(done());
      dispatch(
        snackbarStart({
          text: "The selected users have been deleted",
          severity: "success",
        })
      );
      if (status !== 200) {
        navigate("/login");
      }
    } catch (err) {
      dispatch(done());
      dispatch(
        snackbarStart({
          text: "You are not logged in!",
          severity: "error",
        })
      );
      navigate("/login");
      dispatch(done());
      console.log(err);
    }
  };
  const getRequest = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: REGISTER_URL,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
        data: {},
      });
      let arr = data.map((el) => {
        return {
          id: el._id,
          name: el.name,
          email: el.email,
          lastLoginTime: convertTimestamp(el.lastLoginTime),
          registerTime: convertTimestamp(el.registerTime),
          status: el.status,
        };
      });
      setData(arr);
      dispatch(done());
    } catch (err) {
      console.log(err);
      dispatch(done());
    }
  };
  useEffect(() => {
    dispatch(start());
    getRequest();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
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
        rowSelectionModel={selectedIds}
      />
    </div>
  );
}
