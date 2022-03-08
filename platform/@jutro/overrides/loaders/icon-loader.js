const importAll = requirement => {
    requirement.keys().forEach(requirement);
};

// eslint-disable-next-line no-undef
if (__CUSTOMER_ICONS_PATH__) {
    importAll(
        // eslint-disable-next-line no-undef
        require.context(__CUSTOMER_ICONS_PATH__, true, /.*(gw|cust)-.*\.svg$/)
    );
}

importAll(
    require.context(
        // eslint-disable-next-line no-undef
        __JUTRO_ICONS_PATH__,
        true,
        /.*(gw|cust)-.*\.svg$/
    )
);
