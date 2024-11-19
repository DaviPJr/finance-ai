import { Navbar } from "../_components/navbar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButoon from "./_components/acquire-plan-button";
import { Badge } from "@/app/_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month";

export const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransaction = await getCurrentMonthTransactions();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  return (
    <>
      <Navbar />;
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary"></CheckIcon>
                <p>Apenas 10 transações por mês {currentMonthTransaction}</p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary"></CheckIcon>
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary"></CheckIcon>
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButoon />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
