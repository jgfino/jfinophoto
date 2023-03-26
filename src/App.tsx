import { useState, useEffect } from "react";
import Photos from "./pages/Photos";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Concerts from "./pages/Concerts";
import Concert from "./pages/Concert";
import ErrorPage from "./components/ErrorPage";
import { getPortfolio, getPortfolioPortraits } from "./apiClient";

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

  const theme = mode === "light" ? lightTheme : lightTheme;

  document.body.style.backgroundColor = theme.colors.background;

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={<Photos key="portfolio" fetchImages={getPortfolio} />}
        />
        <Route
          path="/live"
          element={<Photos key="portfolio" fetchImages={getPortfolio} />}
        />
        <Route
          path="/portraits"
          element={
            <Photos
              key="portraits"
              activePath="portraits"
              fetchImages={getPortfolioPortraits}
            />
          }
        />
        <Route path="/galleries" element={<Concerts />} />
        <Route path="/galleries/:id" element={<Concert />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
