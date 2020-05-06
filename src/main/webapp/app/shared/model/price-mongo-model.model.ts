export interface IPriceMongoModel {
  id?: number;
  amountToBePaid?: number;
  isPaid?: boolean;
}

export const defaultValue: Readonly<IPriceMongoModel> = {
  isPaid: false
};
