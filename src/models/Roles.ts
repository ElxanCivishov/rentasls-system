const DEFAULT_ROLES: TRoleContent[] = [
    {
        name: "ADMIN",
        description: "Bütün ələmiyyatları icra edə bilən",
    },
    {
        name: "USER",
        description: "Sistemə daxil ola və ona aid olan binalara baxa bilən",
    },
    {
        name: "ALL",
        description: "Aid olduğu bina üzrə bütün ələmiyyatları icra edə bilən",
    },
    {
        name: "READ",
        description: "Aid olduğu bina üzrə sadəcə məlumatları görə bilən",
    },
] as const;

export type TRolesKeyword = "ADMIN" | "USER" | "ALL" | "READ";

type TRoleContent = {
    name: TRolesKeyword;
    description: string;
};

export const DEFAULT_ALL_ROLES = DEFAULT_ROLES.map((role) => role.name);

export const ROLE_KEYWORDS = Object.fromEntries(DEFAULT_ALL_ROLES.map((key) => [key.toUpperCase(), key])) as Record<TRolesKeyword, TRolesKeyword>;
