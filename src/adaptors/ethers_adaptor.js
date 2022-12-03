import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider'



export async function getProvider() {

    const provider = await detectEthereumProvider()
    if (provider) {
        return new ethers.providers.Web3Provider(provider)
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