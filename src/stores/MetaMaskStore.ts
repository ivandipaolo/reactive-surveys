import { types, flow } from "mobx-state-tree";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";

export const MetaMaskStore = types
  .model({
    isActive: false,
    account: "",
    isLoading: true,
  })
  .actions(self => ({
    setIsActive(active: boolean) {
      self.isActive = active;
    },
    setAccount(account: string) {
      self.account = account;
    },
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    connect: flow(function* () {
      console.log("Connecting to MetaMask Wallet");
      try {
        const { activate } = useWeb3React();
        yield activate(injected);
      } catch (error) {
        console.error("Error on connecting: ", error);
      }
    }),
    disconnect: flow(function* () {
      console.log("Deactivating...");
      try {
        const { deactivate } = useWeb3React();
        yield new Promise(() => {
          deactivate();
        });
      } catch (error) {
        console.error("Error on disconnecting: ", error);
        throw error;
      }
    }),
    
  }))
  .views(self => ({
    get web3() {
      const { library } = useWeb3React();
      return library;
    },
  }));

export type IMetaMaskStore = typeof MetaMaskStore.Type;

export const createMetaMaskStore = (): IMetaMaskStore => {
  return MetaMaskStore.create({
    isActive: false,
    account: "",
    isLoading: true,
  });
};
