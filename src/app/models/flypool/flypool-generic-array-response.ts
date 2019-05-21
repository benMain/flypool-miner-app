export class FlypoolGenericArrayResponse<T> {
    status: 'OK' | string;
    data: T[];
}