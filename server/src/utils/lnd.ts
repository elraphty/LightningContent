import { AddInvoiceResponse, FeeReportResponse, Invoice, Payment, PayReq,  Readable } from '@radar/lnrpc';
import lndClient, { routerClient } from '../config/lnd';
import { TransactionLogs, UserBalance } from '../interfaces/Db';
import { emitSocketEvent } from '../config/socket';

export const createInvoice = async (
    amount: number = 0
): Promise<AddInvoiceResponse> => {
    const rpc = await lndClient;

    const invoice = await rpc.addInvoice({
        value: amount.toString(),

    });

    return invoice;
};

export const decodeInvoice = async (invoice: string): Promise<PayReq> => {
    const rpc = await lndClient;

    const decodedInvoice: PayReq = await rpc.decodePayReq({ payReq: invoice });
    return decodedInvoice;
}

export const invoiceLookup = async (invoice: string): Promise<Invoice> => {
    const rpc = await lndClient;

    const decodedInvoice: PayReq = await decodeInvoice(invoice);

    const lookup = await rpc.lookupInvoice({ rHashStr: decodedInvoice.paymentHash });

    return lookup;
}

export const getFeeReport = async (): Promise<FeeReportResponse> => {
    const rpc = await lndClient;

    return await rpc.feeReport();
}

export const payInvoice = async (invoice: string): Promise<Readable<Payment>> => {
    const rpc = await routerClient;

    const invoicePay = await rpc.sendPaymentV2({ paymentRequest: invoice, timeoutSeconds: 360 });

    return invoicePay;
}