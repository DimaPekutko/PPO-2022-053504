import React, { useContext, useState } from "react";

import { SettingsContext, SettingsProvider } from "./src/context/SettingsProvider";
import MainContainer from "./src/context/components/MainContainer";


const App = () => {
  const settingsCtx = React.useContext(SettingsContext)
  const isDarkTheme = settingsCtx.isDarkTheme

  return (
    <SettingsProvider>
      <MainContainer />
    </SettingsProvider>
  )
}

export default App;