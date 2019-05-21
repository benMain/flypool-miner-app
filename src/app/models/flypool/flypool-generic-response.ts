export class FlypoolGenericResponse<T> {
    status: 'OK' | string;
    data: T;
}
