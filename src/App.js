import { Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { snackbarDone } from "./store/SnackbarSlice";
function App() {
  const { status, text, severity } = useSelector(
    (state) => state.snackBar
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </div>
      <div>
        <Snackbar
          open={status}
          autoHideDuration={6000}
          onClose={() => dispatch(snackbarDone())}
        >
          <Alert
            onClose={() => dispatch(snackbarDone())}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {text}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default App;
