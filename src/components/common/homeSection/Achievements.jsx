import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Divider, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  const acheivements = [
    { title: "عملاء", number: "150" },
    { title: "تطبيق", number: "8" },
    { title: "صفحات", number: "100" },
    { title: "شركاء النجاح", number: "5" },
    { title: "مبيعات", number: "70" },
  ];
  const itemRef = React.useRef(null);
  const [itemHeight, setItemHeight] = React.useState(0);
  

  React.useEffect(() => {
    setItemHeight(itemRef.current.offsetHeight);
    const windowResize = window.addEventListener("resize", () => {
      setItemHeight(itemRef.current?.offsetHeight);
    });
  }, [itemRef]);


  return (
    <Container
      sx={{
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "50px",
          fontWeight: 600,
          textAlign: "center",
          marginTop: "30px",
          color: "#3D2D66",
          fontFamily: "Cairo",
          my: "30px",
        }}
      >
        انجازاتنا
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "start",
        }}
      >
        {acheivements.map((el, index) => {
          return (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: acheivements - 1 == index || index == 0 ? "none" : "inherit",
                  height: itemHeight + "px",
                  width: "2px",
                  background: "#C4C4C4",
                }}
              />
              <Box
                ref={itemRef}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  maxWidth: "calc(100% / 5 - 8px)",
                }}
              >
                <Typography fontWeight="bolder" sx={{ fontSize: "clamp(3vw, 48px, 5vw)" }}>
                  {el.number >= 10 ? "+" + el.number : el.number}
                </Typography>
                <Typography color={"#505050"} sx={{ fontSize: "clamp(2.5vw, 25px, 4vw)",fontFamily:'Cairo' }}>
                  {el.title}
                </Typography>
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Container>
  );
}
