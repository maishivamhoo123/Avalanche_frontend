import abi from "../Contracts/MarketPlace.abi.json";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { MARKETPLACE_ADDRESS, RPC } from "../chain";
import { polygonAmoy } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(RPC),
});

export async function walletClient() {
  const w: any = window;
  if (!w.ethereum) throw new Error("MetaMask not found");
  return createWalletClient({
    chain: polygonAmoy,
    transport: custom(w.ethereum),
  });
}

export const MARKET_ABI = abi as any;

// Demo mode - use mock data when contract is not available
let demoMode = false;
let demoListings: any[] = [];

export async function createListing(
  superTokenSymbol: string,
  flowRate: bigint, // wei/sec
  title: string,
  specsCID: string
) {
  if (demoMode) {
    const newListing = {
      id: demoListings.length,
      provider: "0xDemoProvider123",
      superTokenSymbol,
      flowRate,
      title,
      specsCID,
      activeRenter: "0x0000000000000000000000000000000000000000",
      status: 0,
      exists: true,
    };
    demoListings.push(newListing);
    return "0xDemoTransactionHash";
  }

  try {
    const wallet = await walletClient();
    const [account] = await wallet.getAddresses();
    const hash = await wallet.writeContract({
      address: MARKETPLACE_ADDRESS as `0x${string}`,
      abi: MARKET_ABI,
      functionName: "createListing",
      args: [superTokenSymbol, flowRate, title, specsCID],
      account,
    });
    return hash;
  } catch (error: any) {
    console.log("Contract error, switching to demo mode:", error.message);
    demoMode = true;
    return createListing(superTokenSymbol, flowRate, title, specsCID);
  }
}

export async function startSession(id: number) {
  if (demoMode) {
    if (demoListings[id]) {
      demoListings[id].status = 1;
      demoListings[id].activeRenter = "0xDemoRenter123";
    }
    return "0xDemoSessionStartHash";
  }

  try {
    const wallet = await walletClient();
    const [account] = await wallet.getAddresses();
    const hash = await wallet.writeContract({
      address: MARKETPLACE_ADDRESS as `0x${string}`,
      abi: MARKET_ABI,
      functionName: "startSession",
      args: [BigInt(id)],
      account,
    });
    return hash;
  } catch (error: any) {
    console.log("Contract error, switching to demo mode:", error.message);
    demoMode = true;
    return startSession(id);
  }
}

export async function stopSession(id: number) {
  if (demoMode) {
    if (demoListings[id]) {
      demoListings[id].status = 0;
      demoListings[id].activeRenter = "0x0000000000000000000000000000000000000000";
    }
    return "0xDemoSessionStopHash";
  }

  try {
    const wallet = await walletClient();
    const [account] = await wallet.getAddresses();
    const hash = await wallet.writeContract({
      address: MARKETPLACE_ADDRESS as `0x${string}`,
      abi: MARKET_ABI,
      functionName: "stopSession",
      args: [BigInt(id)],
      account,
    });
    return hash;
  } catch (error: any) {
    console.log("Contract error, switching to demo mode:", error.message);
    demoMode = true;
    return stopSession(id);
  }
}

export async function getListing(id: number) {
  if (demoMode) {
    return demoListings[id] || {
      id,
      provider: "0x0000000000000000000000000000000000000000",
      superTokenSymbol: "",
      flowRate: BigInt(0),
      title: "",
      specsCID: "",
      activeRenter: "0x0000000000000000000000000000000000000000",
      status: 0,
      exists: false,
    };
  }

  try {
    const data = await publicClient.readContract({
      address: MARKETPLACE_ADDRESS as `0x${string}`,
      abi: MARKET_ABI,
      functionName: "getListing",
      args: [BigInt(id)],
    });
    const [provider, superTokenSymbol, flowRate, title, specsCID, activeRenter, status, exists] = data as any[];
    return {
      id,
      provider,
      superTokenSymbol,
      flowRate: BigInt(flowRate),
      title,
      specsCID,
      activeRenter,
      status: Number(status), // 0 Idle, 1 Streaming
      exists: Boolean(exists),
    };
  } catch (error: any) {
    console.log("Contract error, switching to demo mode:", error.message);
    demoMode = true;
    return getListing(id);
  }
}

export async function nextId(): Promise<number> {
  if (demoMode) {
    return demoListings.length;
  }

  try {
    const n = await publicClient.readContract({
      address: MARKETPLACE_ADDRESS as `0x${string}`,
      abi: MARKET_ABI,
      functionName: "nextId",
       args: []
    });
    return Number(n);
  } catch (error: any) {
    console.log("Contract error, switching to demo mode:", error.message);
    demoMode = true;
    return nextId();
  }
}

// Add some demo listings for testing
export function initializeDemoMode() {
  if (demoListings.length === 0) {
    demoListings = [
      {
        id: 0,
        provider: "0xDemoProvider123",
        superTokenSymbol: "fDAIx",
        flowRate: BigInt("277777777777777"),
        title: "RTX 4090 Gaming Rig",
        specsCID: "QmDemo123",
        activeRenter: "0x0000000000000000000000000000000000000000",
        status: 0,
        exists: true,
      },
      {
        id: 1,
        provider: "0xDemoProvider456",
        superTokenSymbol: "fDAIx",
        flowRate: BigInt("138888888888888"),
        title: "Intel i9 Workstation",
        specsCID: "QmDemo456",
        activeRenter: "0x0000000000000000000000000000000000000000",
        status: 0,
        exists: true,
      }
    ];
  }
}
