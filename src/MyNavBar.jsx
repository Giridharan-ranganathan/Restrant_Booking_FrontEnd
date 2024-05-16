import {
  AppBar,
  Grid,
  Autocomplete,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import RegistrationModal from "./RegistrationModal";
import { useState } from "react";

import { locationNames } from "./Constants";

import { useNavigate } from "react-router-dom";

export default function MyNavBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  return (
    <AppBar color="transparent" position="static">
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={"10px"}
        spacing={2}
      >
        <Grid item>
          <img src="https://www.guvi.in/web-build/images/guvi-logo.8eeef9e2027d374479531095b012a87e.svg" />
        </Grid>
        <Grid item>
          <Autocomplete
            disablePortal
            id="location-name"
            options={locationNames}
            sx={{ width: 300 }}
            onSelect={(e) => {
              const location = e.target.value;
              location && navigate(`/${location}`);
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </Grid>
        <Grid item>
          <FormControl variant="outlined">
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <Button variant="contained">Search</Button>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        {!username?.length ? (
          <>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("register");
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("login");
                }}
              >
                Login
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Button variant="contained" onClick={() => {}}>
                Your Booking
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.removeItem("username");
                  window.location.reload();
                }}
              >
                Log out
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      <div style={{ border: "1px solid rgb(199 199 199 / 40%)" }}></div>

      <HeaderBottom />

      <RegistrationModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
        modalType={modalType}
      />
    </AppBar>
  );
}

const HeaderBottom = () => {
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        <Grid item>
          <Button variant="text">Home</Button>
        </Grid>
        <Grid item>
          <Button variant="text">Blog</Button>
        </Grid>
        <Grid item>
          <Button variant="text">Book a Table</Button>
        </Grid>
      </Grid>
    </div>
  );
};
