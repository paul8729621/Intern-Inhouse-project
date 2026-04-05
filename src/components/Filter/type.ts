export interface FilterItem {
  key: string;
  label: string;
  count: number;
}

export interface FilterProps {
  items: FilterItem[];
  activeKey: string;
  onChange: (key: string) => void;
}
