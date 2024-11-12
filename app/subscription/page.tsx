import { Navbar } from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return <Navbar />;
};

export default SubscriptionPage;
