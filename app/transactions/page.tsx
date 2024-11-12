import React from "react";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { Navbar } from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  // acessar as transações do DB
  const transactions = await db.transaction.findMany({
    // mostra somente as transações do user logado
    where: {
      userId,
    },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        {/* Titulo e botao */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        {/* Tabela de transações */}
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
