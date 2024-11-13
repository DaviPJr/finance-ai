import { ReactNode } from "react";

interface PercentageItemProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export const PercentageItem = ({ title, value, icon }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/*Ícone*/}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white bg-opacity-[3%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/*Valor*/}
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercentageItem;
