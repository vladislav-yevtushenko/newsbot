export interface Job {

    schedule(): void;

    equals(job: Job): boolean;

    toString(): string;

}
