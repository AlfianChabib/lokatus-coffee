export type Variables = {
  passkey: string;
};
export type Bindings = {
  DATABASE_URL: string;
  PASSKEY_URL: string;
};

export interface Passkey {
  createdAt: Date;
  id: number;
  key: string;
  updatedAt: Date;
}
