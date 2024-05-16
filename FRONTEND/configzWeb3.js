import { createPublicClient } from "viem"
import { base ,sepolia} from "viem/chains"
import { http } from "viem"
export const publicClient = createPublicClient({ 
    chain: sepolia,
    transport: http("https://sepolia.gateway.tenderly.co")//'https://rpc.ankr.com/bsc')
})
//export const hydraAddress = "0x8F5f1a3Eed24af366998e5844185E6Da171A4060"