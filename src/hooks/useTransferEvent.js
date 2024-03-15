import { ethers } from "ethers";
import { useEffect } from "react";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { getNftContract } from "../constants/contracts";


const useTransferEvent = () => {
    const { address } = useWeb3ModalAccount();

    const filter = {
        address: import.meta.env.VITE_contract_address,
        topics: [
            ethers.id("Transfer(address,address,uint256)"),
            address,
        ],
    };

    const handler = (e) => {
        console.log("Event", e)
    }

    const wss_provider = new ethers.WebSocketProvider(import.meta.env.VITE_wss_rpc_url)
    const contract = getNftContract(wss_provider)

    useEffect(() => {
        (() => {
            console.log("Listening...")
            contract.on("Transfer", handler)
        })();
        return () => contract.off("Transfer", handler);
    }, [])

    return "hello"
}

export default useTransferEvent