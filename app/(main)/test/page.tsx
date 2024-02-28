import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// TODO: find a solution for redirecting to dynamic route after signing in with clerk so this page wouldn't be necessary
const TestPage = () => {
  const { userId } = auth();
  redirect(userId ? `/${userId}/chat-history` : "/sign-in");
};

export default TestPage;
