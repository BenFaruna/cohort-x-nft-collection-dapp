import { Button, Dialog, DialogClose, Flex, Text, TextField } from "@radix-ui/themes"
import useTransferNft from "../hooks/useTransferNft"
import { useState } from "react"

const TransferModal = ({ id }) => {
    const [receiverAddress, setReceiverAddress] = useState("")
    const transfer = useTransferNft()

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="solid" radius="large" className="bg-blue-500">Transfer Nft</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Transfer Nft</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Address
                        </Text>
                        <TextField.Input
                            value={receiverAddress}
                            onChange={(e) => setReceiverAddress(e.target.value)}
                            placeholder="Enter receiver address"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            variant="soft"
                            className="bg-blue-500 text-white"
                            onClick={async (e) => {
                                // e.preventDefault()
                                await transfer(id, receiverAddress)
                                setReceiverAddress("")
                            }}
                        >Transfer</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default TransferModal