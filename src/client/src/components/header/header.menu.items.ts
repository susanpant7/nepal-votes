import { ShieldCheck, User2, Home, VoteIcon, ShieldUser } from "lucide-react";
import type { User } from "@/stores/useAuthStore.ts";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export type NavItem = {
  label: string;
  href: string;
  icon: any;
};

export const headerMenuItems = (user: User | null): NavItem[] => {
  const publicItems: NavItem[] = [
    { label: "Home", href: ROUTES.HOME, icon: Home },
    { label: "Candidate", href: ROUTES.CANDIDATE, icon: ShieldUser },
  ];

  const privateItems: NavItem[] = [
    { label: "Profile", href: ROUTES.USER_PROFILE, icon: User2 },
    { label: "Vote", href: ROUTES.VOTE, icon: VoteIcon },
  ];

  const adminItems: NavItem[] = [
    { label: "Admin Panel", href: ROUTES.ADMIN_PANEL, icon: ShieldCheck },
  ];
  if (user?.isAdmin) return [...publicItems, ...privateItems, ...adminItems];
  if (user) return [...publicItems, ...privateItems];
  return [...publicItems];
};
