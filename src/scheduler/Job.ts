export interface Job {

    type: string;

    id: string;

    schedule(): void;

    equals(job: Job): boolean;

    print(): string;

    valid(): boolean;

    toPlainObject(): any;

    cancel(): void;
}
