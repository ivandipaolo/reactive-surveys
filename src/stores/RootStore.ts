import { types } from "mobx-state-tree";
import { MetaMaskStore } from "./MetaMaskStore";

export const RootStore = types.model({
  metaMaskStore: MetaMaskStore,
});

export type IRootStore = typeof RootStore.Type;

export function createRootStore() {
  const metaMaskStore = MetaMaskStore.create({});
  return RootStore.create({
    metaMaskStore,
  });
}
