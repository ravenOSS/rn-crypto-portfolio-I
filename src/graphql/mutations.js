/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAsset = /* GraphQL */ `
  mutation CreateAsset(
    $input: CreateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    createAsset(input: $input, condition: $condition) {
      id
      assetName
      assetSymbol
      initialPurchasePrice
      assignedCapital
      lastPrice
      lastRank
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAsset = /* GraphQL */ `
  mutation UpdateAsset(
    $input: UpdateAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    updateAsset(input: $input, condition: $condition) {
      id
      assetName
      assetSymbol
      initialPurchasePrice
      assignedCapital
      lastPrice
      lastRank
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAsset = /* GraphQL */ `
  mutation DeleteAsset(
    $input: DeleteAssetInput!
    $condition: ModelAssetConditionInput
  ) {
    deleteAsset(input: $input, condition: $condition) {
      id
      assetName
      assetSymbol
      initialPurchasePrice
      assignedCapital
      lastPrice
      lastRank
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
