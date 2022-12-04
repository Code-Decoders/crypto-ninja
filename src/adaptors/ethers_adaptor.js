import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

const tokenABI = [
  "function mint(address account, uint256 amount)",
  "function approve(address spender, uint256 amount)",
  "function balanceOf(address account) view returns (uint256)",
];

const contractABI = [
  "function finishGame(address _winner, uint232 destinationDomain)",
];

const contractAddress = "0xF695f464540930636d1FA50346479c18b88321D8";

export async function getProvider() {
  const provider = await detectEthereumProvider();
  if (provider) {
    return new ethers.providers.Web3Provider(provider);
  }
}

export async function getSigner() {
  const provider = await getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return signer;
}

export async function getBalance() {
  const signer = await getSigner();
  const balance = await signer.getBalance();
  return balance;
}

export async function getContract(address, abi) {
  const signer = await getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
}

export async function getTESTBalance() {
  const signer = await getSigner();
  const provider = await getProvider();
  const chainId = (await provider.getNetwork()).chainId;
  const token = connextData[chainId].token;
  console.log(connextData[chainId], chainId);
  const contract = await getContract(token, tokenABI);
  const balance = await contract.balanceOf(await signer.getAddress());
  return balance;
}

const getChainId = async () => {
  const provider = await getProvider();
  const chainId = (await provider.getNetwork()).chainId;
  return chainId;
};

export async function startGame() {
  const signer = await getSigner();
  const signerAddress = await signer.getAddress();
  const chainId = await getChainId();
  const rawResponse = await fetch('http://localhost:2000/game', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({signerAddress: signerAddress, origin: connextData[chainId].destinationDomain, contract: contractAddress})
  });
  console.log(await rawResponse.json());
}
export async function finishGame() {
  const targetprovider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  );
  const admin = new ethers.Wallet(
    "5764bccf39a0b4c2bdaa0cd2887bf19b29d506fac7049404fa9288cdd6150ca8",
    targetprovider
  );
  const signer = await getSigner();
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, contractABI, admin);
  const chainId = await getChainId();
  let unsignedTx = await contract.populateTransaction.finishGame(
    signerAddress,
    connextData[chainId].destinationDomain
  );
  unsignedTx.gasLimit = 2000000;
  let txResponse = await admin.sendTransaction(unsignedTx);
  return await txResponse.wait();
}

const connextData = {
  5: {
    token: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
    connext: "0xb35937ce4fFB5f72E90eAD83c10D33097a4F18D2",
    destinationDomain: 1735353714,
  },
  80001: {
    token: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
    connext: "0xa2F2ed226d4569C8eC09c175DDEeF4d41Bab4627",
    destinationDomain: 9991,
  },
  420: {
    token: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
    connext: "0x0C70d6E9760DEE639aC761f3564a190220DF5E44",
    destinationDomain: 1735356532,
  },
};
