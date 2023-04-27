const Moralis = require("moralis").default;
const express = require("express");
const cors = require("cors");
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/balances", async (req, res) => {
  let address = req.query.address;

  try {
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address,
      }),
    ]);
    res.status(200).json({
      address,
      tokenBalances,
      nativeBalance: nativeBalance.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

startServer();
