import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { modalDone } from "../store/modalSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const dispatch = useDispatch();
  const { status, text, modalFunc } = useSelector((state) => state.modal);
  const closeModal = () => {
    dispatch(modalDone());
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={status}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={status}>
          <Box sx={style}>
            <Typography
              id="transition-modal-description"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {text}
            </Typography>
            <Box className="flex items-center justify-between">
              <Button
                onClick={() => {
                  modalFunc();
                  closeModal();
                }}
              >
                Ok
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
