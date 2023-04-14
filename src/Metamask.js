import React, { useState, useEffect } from "react";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";
import {
  StyledButton,
  Container,
  Footer,
  Header,
  Text,
  Card,
} from "./components";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import warningIcon from "./icons/warning.png";
import { connectors } from "./connectors";

const hexToDecimal = (number) => Number(number).toString(16);

const Metamask = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userNetworkId, setUserNetworkId] = useState(null);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const { activate, deactivate, account } = useWeb3React();

  const MMSDK = new MetaMaskSDK();
  const ethereum = MMSDK.getProvider();

  const changeAccount = (accountName) => {
    setDefaultAccount(accountName);
    getBalance(accountName);
    setErrorMsg(null);
  };

  const getBalance = (accAddress) => {
    ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  // useEffect(() => {
  //   setDefaultAccount(account);
  //   getBalance(account);
  // },[account]);

  const connectWallet = () => {
    if (ethereum) {
      ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
        changeAccount([result[0]]);
      });
      ethereum.request({ method: "eth_chainId" }).then((result) => {
        setUserNetworkId(hexToDecimal(result));
      });
    } else {
      setErrorMsg("Install Metamask please");
    }
  };

  const switchToMainnet = () => {
    ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      })
      .then(() => {
        setUserNetworkId("1");
      });
  };

  const disconnectWallet = () => {
    setErrorMsg(null);
    setDefaultAccount(null);
  };

  ethereum.on("accountsChanged", changeAccount);
  ethereum.on("chainChanged", (chainId) =>
    setUserNetworkId(hexToDecimal(chainId))
  );
  ethereum.on("disconnect", disconnectWallet);

  const ColapsibleSection = styled.div`
    max-height: ${!!defaultAccount ? "fit-content" : 0};
    opacity: ${!!defaultAccount ? 1 : 0};
    transition: all 1s linear;
    padding: 0.5em;
  `;

  const WarningMessage = styled.div`
    width: 100%;
    margin: 0.5rem;
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    justify-content: space-around;
    color: #4c2c92;
  `;

  const ClickableArea = styled.div`
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  `;

  const CopyMsg = styled.span`
  margin: -1em 1em;
  font-family: Arial;
  padding: 0;
  position: absolute;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

  const handleAddressClick = () => {
    navigator.clipboard.writeText(defaultAccount);
    setShowCopyMsg(true);
    setTimeout(() => {
      setShowCopyMsg(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <Container>
        <ColapsibleSection>
          <Card>
            <Text>Balance: ETH {userBalance}</Text>
            <ClickableArea onClick={handleAddressClick}>
              <Text secondary>Address: {defaultAccount}</Text>
              {showCopyMsg && <CopyMsg>Copied to Clipboard!</CopyMsg>}
            </ClickableArea>
            <Text secondary>Network Id: {userNetworkId}</Text>
            {userNetworkId !== "1" && (
              <>
                <WarningMessage>
                  <img src={warningIcon} alt="warinng" />
                  Mainnet is not selected, please switch your network.
                </WarningMessage>
                <StyledButton onClick={switchToMainnet}>
                  Switch to Mainnet
                </StyledButton>
              </>
            )}
            {/* <StyledButton
              onClick={() => {
                activate(connectors.coinbasewallet);
              }}
            >
              Connect Coinbase Wallet
            </StyledButton> */}
          </Card>
          {errorMsg && <Text>{errorMsg}</Text>}
        </ColapsibleSection>

        <StyledButton
          secondary={!!defaultAccount}
          onClick={!!defaultAccount ? disconnectWallet : connectWallet}
        >
          {!!defaultAccount ? "Disconnect" : "Connect Wallet"}
        </StyledButton>
      </Container>
      <Footer />
    </>
  );
};

export default Metamask;
