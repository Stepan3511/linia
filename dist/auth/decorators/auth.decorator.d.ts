import { TypeRole } from '../auth.interface';
export declare function Auth(role?: TypeRole): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
