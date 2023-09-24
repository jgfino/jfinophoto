import { useState, useEffect } from "react";
import Photos from "./pages/Photos";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Galleries from "./pages/Galleries";
import Gallery from "./pages/Gallery";
import ErrorPage from "./components/ErrorPage";
import { getFestivals, getLivePortfolio, getPortraits } from "./apiClient";

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

  document.body.style.backgroundColor = theme.colors.background;

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={<Photos key="portfolio" fetchImages={getLivePortfolio} />}
        />
        <Route
          path="/live"
          element={<Photos key="portfolio" fetchImages={getLivePortfolio} />}
        />
        <Route
          path="/portrait"
          element={
            <Photos
              key="portrait"
              activePath="portrait"
              fetchImages={getPortraits}
            />
          }
        />
        {/* <Route
          path="/festival"
          element={
            <Photos
              landscape
              key="festival"
              activePath="festival"
              fetchImages={getFestivals}
            />
          }
        /> */}
        <Route
          path="/galleries/concerts"
          element={<Galleries type="concerts" />}
        />
        <Route
          path="/galleries/festivals"
          element={<Galleries type="festivals" />}
        />
        <Route
          path="/galleries/concerts/:concertId/:artistId"
          element={<Gallery type="concerts" />}
        />
        <Route
          path="/galleries/festivals/:festivalId/:artistId"
          element={<Gallery type="festivals" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
