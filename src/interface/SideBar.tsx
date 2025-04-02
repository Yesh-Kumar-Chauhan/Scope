export interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ stroke?: string }>;
}