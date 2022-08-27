import {
  Container,
  TextField,
  Stack,
  Button,
  Paper,
  Divider,
  Backdrop,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function MailForm() {
  const [message, setMessage] = useState({
    email: "",
    subject: "",
    text: "",
  });
  const [open, setOpen] = useState(false);
  const [apiRes, setApiRes] = useState();
  //send mail
  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    try {
      const { data } = await axios.post("/api/sendMail", { ...message });
      setApiRes(data);
    } catch (error) {
      setApiRes(error.message);
    }
    setOpen(false);
  };

  return (
    <Container>
      <Paper
        variant="outlined"
        sx={{
          width: "50%",
          margin: "auto",
          padding: "50px",
          marginTop: "50px",
        }}
      >
        <Stack spacing={2} component="form" onSubmit={submitHandler}>
          <Divider
            variant="bold"
            component="h2"
            sx={{ color: "gray", mb: "10px" }}
          >
            Send mail
          </Divider>
          <Typography
            align="center"
            sx={{
              color:
                apiRes == "Message has been sent successfully"
                  ? "green"
                  : "red",
            }}
          >
            {apiRes ? apiRes : null}
          </Typography>
          <TextField
            className="customMuiTextStyle"
            type="email"
            variant="standard"
            placeholder="Type email adress"
            required
            InputProps={{ disableUnderline: true }}
            onChange={(e) => setMessage({ ...message, email: e.target.value })}
          />

          <TextField
            className="customMuiTextStyle"
            type="text"
            variant="standard"
            placeholder="Type subject"
            required
            InputProps={{ disableUnderline: true }}
            onChange={(e) =>
              setMessage({ ...message, subject: e.target.value })
            }
          />
          <TextField
            className="customMuiTextStyle"
            type="text"
            variant="standard"
            placeholder="Type your message"
            required
            multiline
            rows={6}
            InputProps={{ disableUnderline: true }}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
          />
          <div style={{ width: "50%", margin: "auto", marginTop: "20px" }}>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Send
            </Button>
          </div>
        </Stack>
      </Paper>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
