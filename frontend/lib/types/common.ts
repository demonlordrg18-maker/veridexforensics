/**
 * Common Types
 * Shared across the application
 */

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, any>;
  error?: {
    code: string;
    message: string;
  };
}

export interface ListResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  action: string;
  target: string;
  targetId: string;
  details?: Record<string, any>;
  timestamp: Date;
  
  // Joined data
  user?: {
    name?: string;
    email: string;
    image?: string;
  };
}

export interface DashboardStats {
  casesCreated: number;
  evidenceUploaded: number;
  analysisCompleted: number;
  reportsGenerated: number;
  creditsUsed: number;
  creditsRemaining: number;
  storageUsed: BigInt;
  this_month?: {
    casesCreated: number;
    evidenceUploaded: number;
    analysisCompleted: number;
    reportsGenerated: number;
  };
}

export interface TabConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface SortOption {
  value: string;
  label: string;
  direction?: "asc" | "desc";
}

export interface NotificationItem {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  action?: {
    label: string;
    href: string;
  };
  read: boolean;
  timestamp: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file?: File;
  preview?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  divider?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  count?: number;
  subLinks?: SidebarLink[];
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  state: LoadingState;
  data?: T;
  error?: Error;
}
