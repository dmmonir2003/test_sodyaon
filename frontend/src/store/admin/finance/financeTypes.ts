export interface FinanceLedger {
  id: string;
  marketingCost: number;
  operationalCost: number;
  inventoryCost: number;
  revenue: number;
}

export interface FinanceState {
  ledger: FinanceLedger | null;
  isLoading: boolean;
}
