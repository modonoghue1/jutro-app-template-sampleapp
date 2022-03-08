export function withClassName(Component: any, ...classNames: any[]): {
    (props: any): JSX.Element;
    displayName: any;
};
