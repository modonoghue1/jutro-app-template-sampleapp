import React, { useMemo } from 'react';

function expand(item, match, replace) {
    const Tag = replace;
    let parts = typeof item === 'string' ? item.split(match) : [item];
    if (parts.length > 1) {
        parts = parts
            .map((part, index) => {
                return index % 2 === 1 ? (
                    <Tag key={`${replace}${index}`}>{part}</Tag>
                ) : (
                    part
                );
            })
            .filter(a => a);
        return parts;
    }
    return parts[0];
}

export const ErrorMessage = ({ error, title }) => {
    const content = useMemo(() => {
        const text = error;
        if (typeof text === 'string') {
            let lines = text.split('\n');
            lines = lines.map(line => {
                let boldParts = expand(line, '**', 'b');

                if (Array.isArray(boldParts)) {
                    boldParts = boldParts.map(subline =>
                        expand(subline, '*', 'i')
                    );
                } else {
                    boldParts = expand(boldParts, '*', 'i');
                }

                if (boldParts.length > 1) {
                    return boldParts;
                }
                return boldParts[0];
            });

            if (lines.length > 1) {
                return lines.map((line, index) => <p key={index}>{line}</p>);
            }
        }
        return text;
    }, [error]);

    return (
        <div>
            {title && <h3>{title}</h3>}
            <div>{content}</div>
        </div>
    );
};
