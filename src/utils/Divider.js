import React from "react";

export default function Divider({ w, C }) {
  return (
    <div
      style={{
        height: 1,
        width: w ? w : "100%",
        backgroundColor: C ? C : "blueviolet",
        borderRadius: 15,
      }}
    />
  );
}
