export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  USER_PROFILE: "/user-profile",
  VOTE: "/vote",
  ADMIN_PANEL: "/admin",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_ELECTORAL_GEOGRAPHIES: "/admin/electoral-geographies",
  ADMIN_ELECTORAL_CONSTITUENCIES: "/admin/electoral-constituencies",
  ADMIN_ELECTORAL_CONSTITUENCIES_ADD: "/admin/electoral-constituencies/add",
  ADMIN_ELECTORAL_CONSTITUENCIES_EDIT:
    "/admin/electoral-constituencies/$constituencyId",
  ADMIN_POLITICAL_PARTIES: "/admin/political-parties",
  ADMIN_POLITICAL_PARTIES_ADD: "/admin/political-parties/add",
  ADMIN_POLITICAL_PARTIES_EDIT: "/admin/political-parties/$partyId",

  ADMIN_CANDIDATE_SYMBOLS: "/admin/candidate-symbols",

  ADMIN_CANDIDATES: "/admin/candidates",
  ADMIN_CANDIDATES_ADD: "/admin/candidates/add",
  ADMIN_CANDIDATES_EDIT: "/admin/candidates/$candidateId",
} as const;
