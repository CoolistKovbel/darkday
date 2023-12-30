import * as zksync from "zksync-ethers";
import * as ethers from "ethers";
import dotenv from "dotenv"

dotenv.config()


export const InitalIze =  () => {

    const provider = new zksync.Provider("https://sepolia.era.zksync.dev");
    // Private key of the account to connect
    const wallet = new zksync.Wallet(process.env.PRIVKEY).connect(provider);
    
    // const ethProvider = ethers.getDefaultProvider("sepolia");
    // const provider = new zksync.Web3Provider(window.ethereum);

    console.log(wallet)
}    


const amount = ethers.utils.parseEther("1.0");

// const zkSyncWallet = new zksync.Wallet(process.env.PRIVKEY, zkSyncProvider, ethProvider);