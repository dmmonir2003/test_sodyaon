export interface MenuItemConfig {
  label: string;
  href: string;
  color?: "slate" | "primary" | "secondary";
  isHighlighted?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: MenuItemConfig[];
}