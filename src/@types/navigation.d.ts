declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined;
      pools: undefined;
      create: undefined;
      find: undefined;
      details: {
        id: string;
      }
    }
  }
}