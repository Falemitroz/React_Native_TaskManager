import { type ListCardProps } from './types';
import { FlipCard } from '../FlipCard/FlipCard';
import { BackListCard } from './BackListCard';
import { FrontListCard } from './FrontListCard';

export const FlipListCard: React.FC<ListCardProps> = ({ list, onPress }) => (
  <FlipCard
    Front={FrontListCard}
    Back={BackListCard}
    frontProps={{ list: list, disabledTouch: true }}
    backProps={{
      list: list,
      onPress: onPress,
    }}
  />
);
