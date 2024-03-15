import { toast } from "react-hot-toast";
import { getReadWriteNftContract } from "../utils"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"


const useTransferNft = () => {
    const { address } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const transfer = async (id, receiverAddress) => {
        const readWriteNftContract = await getReadWriteNftContract(walletProvider)
        const toastId = toast.loading("Transferring Nft...")
        try {
            const tx = await readWriteNftContract.transferFrom(
                address,
                receiverAddress,
                id
            )
            const receipt = await tx.wait()
            console.log(receipt)
            toast.dismiss(toastId)
            toast.success("Nft transferred successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to transfer Nft")
            toast.dismiss(toastId)
        }
    }

    return transfer
}

export default useTransferNft