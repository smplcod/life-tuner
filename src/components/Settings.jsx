import React, { useState } from "react";

function Settings({ isIntervalsEnabled, onToggleIntervals }) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={isIntervalsEnabled}
          onChange={onToggleIntervals}
        />{" "}
        Интервалы
      </label>
    </div>
  );
}

export default Settings;
