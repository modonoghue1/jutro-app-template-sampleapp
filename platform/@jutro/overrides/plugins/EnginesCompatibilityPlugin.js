const path = require('path');
const semver = require('semver');

class EnginesCompatibilityPlugin {
    apply(compiler) {
        compiler.hooks.entryOption.tap(
            'EnginesCompatibilityPlugin',
            this.validateEngines.bind(this)
        );
    }

    // eslint-disable-next-line class-methods-use-this
    validateEngines(context) {
        const packageMetadata = require(path.resolve(
            context,
            './package.json'
        ));
        const incompatibilities = Object.entries(
            packageMetadata.engines || {}
        ).reduce((result, [engine, versionExpression]) => {
            const runtimeVersion = process.versions[engine];
            if (
                !runtimeVersion ||
                semver.satisfies(runtimeVersion, versionExpression)
            ) {
                return result;
            }
            return [
                ...result,
                {
                    engine,
                    runtimeVersion,
                    expectedVersion: versionExpression,
                },
            ];
        }, []);

        if (!incompatibilities.length) {
            return;
        }
        const versions = incompatibilities
            .map(
                ({ engine, runtimeVersion, expectedVersion }) =>
                    `- ${engine}: ${runtimeVersion}, expected: ${expectedVersion}`
            )
            .join('\n');
        throw new Error(
            `Incompatible engines versions detected:\n${versions}\nPlease adjust your environment to satisfy these.`
        );
    }
}

module.exports = { EnginesCompatibilityPlugin };
