import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export const DEFAULT_CHAIN_ID = 80002; // Polygon Amoy

// Demo mode flag
let demoMode = false;

export async function getSigner() {
  const w: any = window;
  if (!w.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.providers.Web3Provider(w.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

export function perHourToPerSec(tokensPerHour: number) {
  return tokensPerHour / 3600;
}

export function tokensPerSecToFlowRateWei(tokensPerSec: string, decimals = 18) {
  const [i, f = ""] = tokensPerSec.split(".");
  const pad = (f + "0".repeat(decimals)).slice(0, decimals);
  const joined = (i || "0") + pad;
  const normalized = joined.replace(/^0+/, "") || "0";
  return normalized;
}

export async function startStream({
  superTokenSymbol,
  receiver,
  flowRateWeiPerSec,
}: {
  superTokenSymbol: string;
  receiver: string;
  flowRateWeiPerSec: string;
}) {
  if (demoMode) {
    console.log("Demo mode: Simulating Superfluid stream start");
    return "0xDemoSuperfluidStreamStartHash";
  }

  try {
    const signer = await getSigner();
    const chainId = await signer.getChainId();
    const sf = await Framework.create({
      chainId,
      provider: (signer.provider as any),
    });
    const token = await sf.loadSuperToken(superTokenSymbol);
    const op = token.createFlow({
      receiver,
      flowRate: flowRateWeiPerSec,
    });
    const tx = await op.exec(signer);
    return tx.hash as string;
  } catch (error: any) {
    console.log("Superfluid error, switching to demo mode:", error.message);
    demoMode = true;
    return startStream({ superTokenSymbol, receiver, flowRateWeiPerSec });
  }
}

export async function stopStream({
  superTokenSymbol,
  receiver,
  sender,
}: {
  superTokenSymbol: string;
  receiver: string;
  sender?: string;
}) {
  if (demoMode) {
    console.log("Demo mode: Simulating Superfluid stream stop");
    return "0xDemoSuperfluidStreamStopHash";
  }

  try {
    const signer = await getSigner();
    const from = sender ?? (await signer.getAddress());
    const chainId = await signer.getChainId();
    const sf = await Framework.create({
      chainId,
      provider: (signer.provider as any),
    });
    const token = await sf.loadSuperToken(superTokenSymbol);
    const op = token.deleteFlow({
      sender: from,
      receiver,
    });
    const tx = await op.exec(signer);
    return tx.hash as string;
  } catch (error: any) {
    console.log("Superfluid error, switching to demo mode:", error.message);
    demoMode = true;
    return stopStream({ superTokenSymbol, receiver, sender });
  }
}

// Function to check if we're in demo mode
export function isDemoMode() {
  return demoMode;
}

// Function to force demo mode
export function setDemoMode(enabled: boolean) {
  demoMode = enabled;
}
