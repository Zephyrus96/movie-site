import React, { useState, createContext } from "react";
export const SidebarContext = createContext();

export const SidebarProvider = props => {

  const [showSidebar , setShowSidebar] = useState(false);

  const contextValue = {
    showSidebar,
    setShowSidebar
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {props.children}
    </SidebarContext.Provider>
  );
};
