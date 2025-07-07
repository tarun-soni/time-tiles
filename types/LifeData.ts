import { TCategories } from './Categories';
import { TUser } from './User';
import { TWeek } from './Week';

export type TLifeData = {
  user: TUser;
  weeks: TWeek[];
  categories: TCategories;
};
