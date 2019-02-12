import { WidgetItem } from './widget-item';

export interface Widget {
  id?: number;
  name: string;
  values: WidgetItem[];
}
