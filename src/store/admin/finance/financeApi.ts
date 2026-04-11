import { baseApi } from '../../baseApi';
import { FinanceLedger } from './financeTypes';

export const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceLedger: builder.query<FinanceLedger, void>({
      query: () => ({ url: '/admin/finance' }),
      providesTags: ['Finance'],
    }),
    updateFinanceLedger: builder.mutation<FinanceLedger, Partial<FinanceLedger>>({
      queryFn: async (patch) => {
        // Mocking an async finance update
        console.log("Updating ledger...", patch);
        await new Promise(r => setTimeout(r, 600));
        return { data: patch as FinanceLedger };
      },
      invalidatesTags: ['Finance']
    })
  })
});

export const { useGetFinanceLedgerQuery, useUpdateFinanceLedgerMutation } = financeApi;
