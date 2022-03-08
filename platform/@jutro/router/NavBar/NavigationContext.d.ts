export const NavigationContext: import("react").Context<{
    activeRoute: string;
    setActiveRoute: () => void;
    isCollapsed: boolean;
    expand: () => void;
    collapse: () => void;
}>;
