import React, { useState, useEffect } from "react";
import Photos from "./pages/Photos";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Concerts from "./pages/Concerts";
import Concert from "./pages/Concert";

function App() {
  const [mode, setMode] = useState<"light" | "dark" | undefined>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const modeMe = (e: any) => {
      setMode(e.matches ? "dark" : "light");
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", modeMe);
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", modeMe);
  }, []);

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/portfolio" element={<Photos />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concerts/:id" element={<Concert />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
