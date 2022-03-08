export function createMoreButton({ routes, moreButtonListMenuOnLeft }: {
    routes: any;
    moreButtonListMenuOnLeft: any;
}): {
    nestedRoutesComponent: ({ focused, id }: {
        focused: any;
        id: any;
    }) => JSX.Element;
    routes: {
        path: string;
    }[];
};
