"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

export const POLYGON_AMOY_CHAIN_ID = 80002;
export const POLYGON_AMOY_HEX_CHAIN_ID = "0x13882";
export const POLYGON_AMOY_RPC = "https://rpc-amoy.polygon.technology";
export const POLYGON_AMOY_EXPLORER = "https://amoy.polygonscan.com";

export interface WalletContextType {
  account: string | null;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
  isModalOpen: boolean;
  walletType: "injected" | "custom" | null;
  isCorrectNetwork: boolean;
  connectInjected: () => Promise<boolean>;
  connectCustomAddress: (address: string) => Promise<boolean>;
  switchToAmoy: () => Promise<boolean>;
  disconnect: () => void;
  openModal: () => void;
  closeModal: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_ADDR = "circularchain_wallet_addr";
const LOCAL_STORAGE_KEY_TYPE = "circularchain_wallet_type";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletType, setWalletType] = useState<"injected" | "custom" | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  // Fetch balance from Amoy RPC or Injected provider
  const fetchBalance = useCallback(async (address: string) => {
    try {
      if (!ethers.isAddress(address)) return;

      let balWei: bigint;
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          const provider = new ethers.BrowserProvider((window as any).ethereum);
          balWei = await provider.getBalance(address);
        } catch {
          const rpcProvider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC);
          balWei = await rpcProvider.getBalance(address);
        }
      } else {
        const rpcProvider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC);
        balWei = await rpcProvider.getBalance(address);
      }

      const balEth = ethers.formatEther(balWei);
      const formatted = parseFloat(balEth).toFixed(4);
      setBalance(formatted);
    } catch {
      setBalance("0.0000");
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (account) {
      await fetchBalance(account);
    }
  }, [account, fetchBalance]);

  // Switch or Add Polygon Amoy Testnet
  const switchToAmoy = async (): Promise<boolean> => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("No Web3 wallet extension found in this browser.");
      return false;
    }

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: POLYGON_AMOY_HEX_CHAIN_ID }],
      });
      setChainId(POLYGON_AMOY_CHAIN_ID);
      setError(null);
      return true;
    } catch (switchError: any) {
      // Error 4902 means the chain has not been added to MetaMask
      if (switchError.code === 4902 || switchError.data?.originalError?.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: POLYGON_AMOY_HEX_CHAIN_ID,
                chainName: "Polygon Amoy Testnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: [POLYGON_AMOY_RPC, "https://polygon-amoy.drpc.org"],
                blockExplorerUrls: [POLYGON_AMOY_EXPLORER],
              },
            ],
          });
          setChainId(POLYGON_AMOY_CHAIN_ID);
          setError(null);
          return true;
        } catch (addError: any) {
          setError(addError.message || "Failed to add Polygon Amoy network");
          return false;
        }
      }
      setError(switchError.message || "Failed to switch network to Polygon Amoy");
      return false;
    }
  };

  // Connect via Injected Provider (MetaMask, Trust, OKX, etc.)
  const connectInjected = async (): Promise<boolean> => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("No Web3 wallet extension detected. You can paste your real address below or open in MetaMask app.");
      setIsModalOpen(true);
      return false;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const eth = (window as any).ethereum;
      const accounts = await eth.request({ method: "eth_requestAccounts" });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts selected in wallet.");
      }

      const rawAddr = accounts[0];
      const checksumAddr = ethers.getAddress(rawAddr);
      
      setAccount(checksumAddr);
      setWalletType("injected");
      localStorage.setItem(LOCAL_STORAGE_KEY_ADDR, checksumAddr);
      localStorage.setItem(LOCAL_STORAGE_KEY_TYPE, "injected");

      // Check chain
      const currentChainHex = await eth.request({ method: "eth_chainId" });
      const currentChainId = parseInt(currentChainHex, 16);
      setChainId(currentChainId);

      if (currentChainId !== POLYGON_AMOY_CHAIN_ID) {
        // Offer or try to switch
        try {
          await switchToAmoy();
        } catch {}
      }

      await fetchBalance(checksumAddr);
      setIsModalOpen(false);
      return true;
    } catch (err: any) {
      console.warn("Wallet connect failed:", err);
      setError(err.message || "User rejected connection request");
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect via Custom Verified EVM Address
  const connectCustomAddress = async (addressInput: string): Promise<boolean> => {
    const clean = addressInput.trim();
    if (!clean) {
      setError("Please enter a valid EVM wallet address.");
      return false;
    }

    if (!ethers.isAddress(clean)) {
      setError("Invalid EVM wallet address. Must be a valid 42-character hex address (0x...).");
      return false;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const checksumAddr = ethers.getAddress(clean);
      setAccount(checksumAddr);
      setWalletType("custom");
      setChainId(POLYGON_AMOY_CHAIN_ID);
      localStorage.setItem(LOCAL_STORAGE_KEY_ADDR, checksumAddr);
      localStorage.setItem(LOCAL_STORAGE_KEY_TYPE, "custom");

      await fetchBalance(checksumAddr);
      setIsModalOpen(false);
      return true;
    } catch (err: any) {
      setError("Error validating wallet address.");
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect
  const disconnect = () => {
    setAccount(null);
    setBalance(null);
    setChainId(null);
    setWalletType(null);
    setError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ADDR);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TYPE);
    }
  };

  // Auto-restore on mount / page refresh
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedAddr = localStorage.getItem(LOCAL_STORAGE_KEY_ADDR);
    const savedType = localStorage.getItem(LOCAL_STORAGE_KEY_TYPE) as "injected" | "custom" | null;

    if (savedAddr && ethers.isAddress(savedAddr)) {
      const checksumAddr = ethers.getAddress(savedAddr);
      setAccount(checksumAddr);
      setWalletType(savedType || "injected");
      fetchBalance(checksumAddr);

      if ((window as any).ethereum) {
        const eth = (window as any).ethereum;
        eth
          .request({ method: "eth_chainId" })
          .then((hex: string) => setChainId(parseInt(hex, 16)))
          .catch(() => {});

        eth
          .request({ method: "eth_accounts" })
          .then((accs: string[]) => {
            if (accs.length > 0) {
              const active = ethers.getAddress(accs[0]);
              setAccount(active);
              localStorage.setItem(LOCAL_STORAGE_KEY_ADDR, active);
              fetchBalance(active);
            }
          })
          .catch(() => {});
      }
    }

    // Set up Ethereum event listeners
    if ((window as any).ethereum) {
      const eth = (window as any).ethereum;

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          const newAddr = ethers.getAddress(accounts[0]);
          setAccount(newAddr);
          setWalletType("injected");
          localStorage.setItem(LOCAL_STORAGE_KEY_ADDR, newAddr);
          localStorage.setItem(LOCAL_STORAGE_KEY_TYPE, "injected");
          fetchBalance(newAddr);
        } else {
          disconnect();
        }
      };

      const handleChainChanged = (chainHex: string) => {
        const newChainId = parseInt(chainHex, 16);
        setChainId(newChainId);
        if (account) {
          fetchBalance(account);
        }
      };

      eth.on("accountsChanged", handleAccountsChanged);
      eth.on("chainChanged", handleChainChanged);

      return () => {
        if (eth.removeListener) {
          eth.removeListener("accountsChanged", handleAccountsChanged);
          eth.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [fetchBalance]);

  const isCorrectNetwork = chainId === POLYGON_AMOY_CHAIN_ID || walletType === "custom";

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        balance,
        isConnecting,
        error,
        isModalOpen,
        walletType,
        isCorrectNetwork,
        connectInjected,
        connectCustomAddress,
        switchToAmoy,
        disconnect,
        openModal,
        closeModal,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
