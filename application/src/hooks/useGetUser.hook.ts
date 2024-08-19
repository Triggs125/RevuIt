import { mockUser } from "../../mocks/mockUser";

const useGetUser = (userDocPath: string) => {
  const user = mockUser;
  return { user };
}

export { useGetUser };
