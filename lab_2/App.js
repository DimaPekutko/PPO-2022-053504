import React, { useContext, useState } from "react";
import { SettingsContext, SettingsProvider } from "./src/context/SettingsProvider";
import { DatabaseProvider, DatabaseContext } from "./src/context/DatabaseProvider"

import MainContainer from "./src/components/MainContainer";

const App = () => {
  const settingsCtx = React.useContext(SettingsContext)

  return (
    <DatabaseProvider>
      <SettingsProvider>
        <MainContainer />
      </SettingsProvider>
    </DatabaseProvider>
  )
}

export default App;