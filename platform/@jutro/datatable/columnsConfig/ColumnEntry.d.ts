/**
 * ColumnEntry
 * @param {object} param0
 */
export function ColumnEntry({ id, header, enabled, onToggle }: object): false | JSX.Element;
export namespace ColumnEntry {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const header: PropTypes.Requireable<string>;
        const enabled: PropTypes.Requireable<boolean>;
        const onToggle: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
