import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url('https://source.unsplash.com/1600x900/?technology,dashboard')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url('https://source.unsplash.com/1600x900/?dark,technology')`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));


export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/013/455/143/non_2x/perfume-promo-background-with-glass-bottle-free-vector.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: 0, // Ensure no margins
        padding: 0, // Ensure no padding
        [theme.breakpoints.down("sm")]: {
          backgroundSize: "contain", // Ensures the image scales down for smaller screens
      
        },
      })}
    >
      <Container
        sx={{
          backgroundColor: "#f5f5f5",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // pt: { xs: 14, sm: 20 },
          // pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          // sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          {/* Content can go here */}
        </Stack>
      </Container>
    </Box>
  );
}
