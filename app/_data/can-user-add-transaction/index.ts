import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month";

// função booleana que retorna true ou false dependendo se o usuário for premium
// ou se já tiver feito 10 transações no mês

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized!");
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();

  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
};
