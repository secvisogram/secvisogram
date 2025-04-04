import { ValidateFunction } from 'ajv'

export type TypeOf<T> = T extends ValidateFunction<infer R> ? R : never
