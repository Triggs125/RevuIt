import { mockUser } from "../../mocks/mockUser";

const useGetUser = (userId: string) => {
  const user = mockUser;
  return { user };
}

export { useGetUser };
