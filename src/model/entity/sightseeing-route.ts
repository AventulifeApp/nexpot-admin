import { TargetUser, ActiveLevel } from '~/model/master';

export type SightseeingRoute = {
  id: string;
  uid: string;
  rentalCyclePlaceId: string;
  name: string;
  description: string;
  targetUser: keyof typeof TargetUser;
  spot1To2Time: number;
  spot2To3Time: number;
  totalTime: number;
  activeLevelId: keyof typeof ActiveLevel;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
