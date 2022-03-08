export class Pseudolizer {
    pseudoType: Readonly<{
        EXPANSION: string;
        SHERLOCK: string;
        BOTH: string;
    }>;
    selectedType: string;
    outputFileName: string;
    filePathPatterns: any[];
    loadByConfig(configFilePath: any): void;
    pseudolizeFiles(): void;
    pseudolizeKeySource(key: any, source: any): string;
    setPseudoType(pseudoType: any): void;
    setOutputFileName(outputFileName: any): void;
    setFilePathPatterns(filePathPatterns: any): void;
    reset(resetFilePatterns: any): void;
    isValidPseudoType(type: any): boolean;
    pseudolizeKeySourceInternal(key: any, source: any, type: any): string;
    convertToPseudoSherlock(jsonObj: any, type: any): any;
    pseudolizeSpecificFiles(files: any, pseudoType: any, outputFileName: any): void;
}
