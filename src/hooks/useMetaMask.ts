import { createContext, useContext } from 'react';
import { flow, makeAutoObservable } from 'mobx';
import { MetaMaskInjections } from '@/components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';
import { RootStore } from './RootStore';

export const MetaMaskContext = createContext<MetaMaskStore | null>(null);

export class MetaMaskStore {
  rootStore: RootStore;
  account: string | null = null;
  active = false;
  isLoading = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async connect() {
    console.log('Connecting to MetaMask Wallet');
    try {
      await this.rootStore.web3React.activate(MetaMaskInjections.injected);
    } catch (error) {
      console.log('Error on connecting: ', error);
    }
  }

  async disconnect() {
    console.log('Deactivating...');
    try {
      await this.rootStore.web3React.deactivate();
    } catch (error) {
      console.log('Error on disconnecting: ', error);
    }
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setActive(value: boolean) {
    this.active = value;
  }

  setAccount(value: string | null) {
    this.account = value;
  }

  initialize() {
    flow(function* () {
      yield this.connect();
      this.setLoading(false);
    }).bind(this)();
  }
}

export const MetaMaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { account, library, connector, active } = useWeb3React();
  const rootStore = useContext(RootStoreContext);

  const metaMaskStore = new MetaMaskStore(rootStore);

  metaMaskStore.setAccount(account);
  metaMaskStore.setActive(active);

  metaMaskStore.initialize();

  return <MetaMaskContext.Provider value={metaMaskStore}>{children}</MetaMaskContext.Provider>;
};

export const useMetaMask = (): MetaMaskStore => {
  const metaMaskStore = useContext(MetaMaskContext);
  if (!metaMaskStore) {
    throw new Error('useMetaMask hook must be used with a MetaMaskProvider component');
  }
  return metaMaskStore;
};
