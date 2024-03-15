import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";


const useTransferEvent = () => {
    const { address } = useWeb3ModalAccount();

    const [tokenId, setTokenId] = useState("");

    const filter = {
        address: import.meta.env.VITE_contract_address,
        topics: [
            ethers.id("Transfer(address,address,uint256)"),
            [address],
            [address]
        ],
    };

    const eventListener = (e) => {
        console.log("Event", e)
        setTokenId(e.topics[3]);
    }

    const wss_provider = new ethers.WebSocketProvider(import.meta.env.VITE_wss_rpc_url)

    useEffect(() => {
        (() => {
            console.log("Listening...")
            wss_provider.on(filter, (e) => {
                console.log("Event", e)
                setTokenId(e.topics[3]);
            })
        })();
        return () => wss_provider.off(filter, eventListener);
    }, []);
    return tokenId;
}

export default useTransferEvent