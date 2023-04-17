import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Asset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly uniqueID?: string | null;
  readonly assetName?: string | null;
  readonly assetSymbol?: string | null;
  readonly initialPurchasePrice?: number | null;
  readonly assignedCapital?: number | null;
  readonly lastPrice?: number | null;
  readonly lastRank?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Asset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly uniqueID?: string | null;
  readonly assetName?: string | null;
  readonly assetSymbol?: string | null;
  readonly initialPurchasePrice?: number | null;
  readonly assignedCapital?: number | null;
  readonly lastPrice?: number | null;
  readonly lastRank?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Asset = LazyLoading extends LazyLoadingDisabled ? EagerAsset : LazyAsset

export declare const Asset: (new (init: ModelInit<Asset>) => Asset) & {
  copyOf(source: Asset, mutator: (draft: MutableModel<Asset>) => MutableModel<Asset> | void): Asset;
}