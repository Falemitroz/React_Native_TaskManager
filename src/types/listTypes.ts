import { icons, bgColors } from '../utils/constants';

export interface List {
  id: number;
  title: string;
  icon: (typeof icons)[number];
  iconBgColor: (typeof bgColors)[number];
}

export type Icon = {
  icon: (typeof icons)[number];
};
