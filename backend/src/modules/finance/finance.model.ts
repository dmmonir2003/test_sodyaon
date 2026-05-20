import { Schema, model, Document } from 'mongoose';

export interface IFinanceLedgerDocument extends Document {
  marketingCost: number;
  operationalCost: number;
  inventoryCost: number;
  revenue: number;
  monthYear: string; // "YYYY-MM" to query monthly logs
}

const FinanceLedgerSchema = new Schema<IFinanceLedgerDocument>(
  {
    marketingCost: { type: Number, required: true, default: 0, min: 0 },
    operationalCost: { type: Number, required: true, default: 0, min: 0 },
    inventoryCost: { type: Number, required: true, default: 0, min: 0 },
    revenue: { type: Number, required: true, default: 0, min: 0 },
    monthYear: { type: String, required: true, unique: true, index: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const FinanceLedger = model<IFinanceLedgerDocument>('FinanceLedger', FinanceLedgerSchema);
export default FinanceLedger;
