import { Request, Response, NextFunction } from 'express';
import { FinanceLedger } from './finance.model';
import { Order } from '../order/order.model';
import { catchAsync } from '../../utils/catchAsync';

// Default budget values for fallback if no records are found
const DEFAULT_LEDGER = {
  marketingCost: 25000,
  operationalCost: 45000,
  inventoryCost: 85000,
  revenue: 210000,
};

// Retrieve Ledger details merging static expenses with dynamic order totals
export const getFinanceLedger = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const currentMonthYear = new Date().toISOString().slice(0, 7); // e.g. "2026-05"

  // 1. Calculate live dynamic revenue from successful transactions
  const salesAggregate = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } },
  ]);
  const dynamicSalesTotal = salesAggregate.length > 0 ? salesAggregate[0].totalSales : 0;

  // 2. Fetch monthly budget expenses
  let ledger = await FinanceLedger.findOne({ monthYear: currentMonthYear });

  if (!ledger) {
    // If no ledger exists, create one using default parameters and dynamic sales
    ledger = await FinanceLedger.create({
      monthYear: currentMonthYear,
      marketingCost: DEFAULT_LEDGER.marketingCost,
      operationalCost: DEFAULT_LEDGER.operationalCost,
      inventoryCost: DEFAULT_LEDGER.inventoryCost,
      revenue: dynamicSalesTotal || DEFAULT_LEDGER.revenue,
    });
  } else {
    // Keep ledger revenue synchronized with actual aggregated sales
    if (dynamicSalesTotal > 0 && ledger.revenue !== dynamicSalesTotal) {
      ledger.revenue = dynamicSalesTotal;
      await ledger.save();
    }
  }

  // To support drop-in replacement, we return the ledger object directly (matching FinanceLedger interface)
  res.status(200).json(ledger);
});

// Update Ledger expenses (restrict to roles with canEditFinances)
export const updateFinanceLedger = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const currentMonthYear = new Date().toISOString().slice(0, 7);

  const ledger = await FinanceLedger.findOneAndUpdate(
    { monthYear: currentMonthYear },
    req.body,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json(ledger);
});
