import { Box } from "@mui/material";
import React from "react";

export default function TextView({ text, color, size, weight }) {
  return (
    <Box
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
        <p style={{color: {color}, fontSize: {size}, fontWeight: {weight}}}>{text}</p>
    </Box>
  );
}

function fitText() {
  const container = document.getElementById("textContainer");
  const text = container.firstChild;

  while (text.scrollWidth > container.clientWidth) {
    text.style.fontSize = parseInt(text.style.fontSize) - 1 + "px";
  }
}

fitText();

// #textContainer {
//     width: 300px;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
