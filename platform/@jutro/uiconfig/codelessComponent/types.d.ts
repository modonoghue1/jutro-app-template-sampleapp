export declare type MetadataObject = {
    readonly type?: string;
};
export declare type CodelessComponentDefinition = MetadataObject & {
    readonly type: 'component';
    readonly name: string;
};
export declare type Metadata = CodelessComponentDefinition | {
    [key: string]: MetadataObject;
};
