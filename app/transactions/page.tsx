import React from "react";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

export const TransactionsPage = async () => {
  // acessar as transações do DB
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      {/* Titulo e botao */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      {/* Tabela de transações */}
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
