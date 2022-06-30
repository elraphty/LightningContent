export type AuthFormValues = {
  username: string;
  password: string;
};

export type SettingsFormValues = {
  apiKey?: string;
  defaultCurrency: string;
  satsRatio: string;
};

export type ProfileFormValues = {
  user?: string;
  firstName: string;
  lastName: string;
  url: string;
  image?: string;
  bio: string;
};

export type SetSubmitting<T> = (values: T, actions: { setSubmitting: (isSubmitting: boolean) => void }) => void;
export interface TransactionLogs {
  id?: number;
  amount: number;
  txid: string;
  status: number;
  network: string;
  type: string;
  userid?: number;
}