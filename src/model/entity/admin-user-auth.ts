import { AdminAuth } from '~/model/master';

export type AdminUserAuth = {
  uid: string;
  mailAddress: string;
  adminAuthId: keyof typeof AdminAuth;
  firstLogin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
