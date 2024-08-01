import { Model } from 'mongoose';

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  isDeleted?: boolean;
};

export interface CarModel extends Model<TCar> {
  isCarNameExit(name: string): Promise<boolean>;
  isCarExist(id: unknown): Promise<TCar | null>;
}
