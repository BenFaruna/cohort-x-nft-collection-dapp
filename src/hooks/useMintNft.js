import { toast } from "react-hot-toast";
import { getReadWriteNftContract } from "../utils"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { ethers } from "ethers";


const useMintNft = () => {
    const { address } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const mint = async (id) => {
        const readWriteNftContract = await getReadWriteNftContract(walletProvider)
        const toastId = toast.loading("Minting Nft...")

        try {
            const tx = await readWriteNftContract.safeMint(
                address,
                id,
                { value: ethers.parseEther("0.01") }
            )
            const receipt = await tx.wait()
            console.log(receipt)
            toast.dismiss(toastId)
            toast.success("Nft minted successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to mint Nft")
            toast.dismiss(toastId)
        }
    }

    return mint
}

export default useMintNft