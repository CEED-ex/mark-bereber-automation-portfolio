import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    industry: string;
}
export type Time = bigint;
export interface backendInterface {
    addSubmission(name: string, email: string, industry: string, message: string): Promise<ContactSubmission>;
    getPageViews(): Promise<bigint>;
    getSubmissions(): Promise<Array<ContactSubmission>>;
    incrementCounter(): Promise<bigint>;
}
