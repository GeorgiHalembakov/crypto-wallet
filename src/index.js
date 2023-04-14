import React from "react";
import ReactDOM from "react-dom/client";
import Metamask from "./Metamask";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";

const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Metamask />
    </Web3ReactProvider>
  </React.StrictMode>
);
