import { List } from '../../../types/listTypes';

export interface ListCardProps {
  list: List;
  onPress?: (list?: List) => void;
  disabledTouch?: boolean;
}
