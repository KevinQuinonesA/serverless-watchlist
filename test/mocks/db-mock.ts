export const mockClient = {
  query: async () => {},
  release: () => {}
};

export const mockConnectToDatabase = async () => {
  return mockClient;
};