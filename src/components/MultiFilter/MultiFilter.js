import React, { useCallback, useState } from 'react';
import { Button } from '@jutro/components';
import cx from 'classnames';
import styles from './MultiFilter.module.css';

export const MultiFilter = ({ id, filters, onFilterChange, className }) => {
    const [selectedFilter, setSelectedFilter] = useState(0);

    const handleClick = useCallback(
        evt => {
            const indexText = evt.currentTarget?.dataset?.index;
            const index = indexText ? parseInt(indexText) : undefined;
            setSelectedFilter(prevIndex => {
                if (index !== prevIndex) {
                    const newFilter = filters[index]?.filter;
                    onFilterChange && onFilterChange(newFilter);
                    return index;
                }
            });
        },
        [filters, onFilterChange]
    );

    const links = filters?.map((filter, index) => {
        const buttonClassnames = cx(
            styles.button,
            {
                [styles.selected]: selectedFilter === index,
            },
            className
        );
        return (
            <React.Fragment key={filter.name}>
                {index > 0 && <span>{' • '}</span>}
                <Button
                    type="text"
                    id={id}
                    key={id}
                    className={buttonClassnames}
                    data-index={index}
                    onClick={handleClick}
                >
                    {filter.name}
                </Button>
            </React.Fragment>
        );
    });

    return <div>{links}</div>;
};
