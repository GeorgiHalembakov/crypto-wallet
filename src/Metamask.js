import React, { useState, useEffect } from "react";
import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";
import { StyledButton, Footer, Header } from "./components";
import {
  ColapsibleContainer,
  Container,
  RowContainer,
  Card,
  WarningMessage,
  ClickableArea,
  CopyMsg,
  StyledText,
  TextContainer,
  TokenCard,
  Loader,
} from "./components/styles";

import { useWeb3React } from "@web3-react/core";
import warningIcon from "./icons/warning.png";
import { connectors } from "./connectors";
import axios from "axios";

const hexToDecimal = (number) => Number(number).toString(16);

const Metamask = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userNetworkId, setUserNetworkId] = useState(null);
  const [tokenBalances, setTokenBalance] = useState([]);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { activate, account } = useWeb3React();

  const MMSDK = new MetaMaskSDK();
  const ethereum = MMSDK.getProvider();

  useEffect(() => {
    if (account) {
      setDefaultAccount(account);
      getBalance(account);
    }
  }, [account]);

  const changeAccount = (accountName) => {
    setIsExpanded(true);
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

  const connectWallet = async () => {
    if (ethereum) {
      try {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            changeAccount(result[0]);
          });

        ethereum.request({ method: "eth_chainId" }).then((result) => {
          setUserNetworkId(hexToDecimal(result));
        });
      } catch (error) {
        console.error(error);
      }
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
    setIsExpanded(false);
    setErrorMsg(null);
    setDefaultAccount(null);
  };

  ethereum.on("accountsChanged", changeAccount);
  ethereum.on("chainChanged", (chainId) =>
    setUserNetworkId(hexToDecimal(chainId))
  );

  const handleAddressClick = () => {
    navigator.clipboard.writeText(defaultAccount);
    setShowCopyMsg(true);
    setTimeout(() => {
      setShowCopyMsg(false);
    }, 2000);
  };

  const getWalletBalance = async () => {
    //  addressWithFewTokens on eth chain
    // const address = "0x5AE5041a09711AB926734734Dc8aF07Fe31A3BB5";
    setIsLoading(true);
    try {
      await axios
        .get("http://localhost:4000/balances", {
          params: { address: defaultAccount },
        })
        .then((res) => {
          setUserBalance(
            (res.data.nativeBalance.balance / 10 ** 18).toFixed(2)
          );
          setTokenBalance(
            res.data.tokenBalances.map((token) => ({
              icon: token.thumbnail,
              name: token.name,
              symbol: token.symbol,
              amount: (token.balance / 10 ** token.decimals).toFixed(2),
            }))
          );
          setIsLoading(false);
        });
    } catch (error) {
      setErrorMsg(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ColapsibleContainer isExpanded={isExpanded}>
          <Card>
            {showCopyMsg && <CopyMsg>Copied to Clipboard!</CopyMsg>}
            <ClickableArea onClick={handleAddressClick}>
              <StyledText>Address: {defaultAccount}</StyledText>
            </ClickableArea>
            <TextContainer>
              <StyledText primary>Balance: ETH {userBalance}</StyledText>
              <StyledText primary> Network Id: {userNetworkId}</StyledText>
            </TextContainer>
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
            <RowContainer>
              <StyledButton
                onClick={() => {
                  activate(connectors.coinbasewallet);
                }}
              >
                Connect Coinbase Wallet
              </StyledButton>
              <StyledButton
                onClick={() => {
                  activate(connectors.walletconnect);
                }}
              >
                WalletConnect
              </StyledButton>
              <StyledButton onClick={getWalletBalance}>GetBalance</StyledButton>
            </RowContainer>
          </Card>
          {errorMsg && <StyledText>{errorMsg}</StyledText>}
          {isLoading ? (
            <Loader isLoading />
          ) : (
            <RowContainer>
              {tokenBalances.length > 0 &&
                tokenBalances.map((token) => (
                  <TokenCard key={token.name}>
                    <img src={token.icon} />
                    <StyledText token>{token.symbol}</StyledText>
                    <StyledText token>{token.amount}</StyledText>
                  </TokenCard>
                ))}
            </RowContainer>
          )}
        </ColapsibleContainer>
        <StyledButton
          primary={!!defaultAccount}
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
