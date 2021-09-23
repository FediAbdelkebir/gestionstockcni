import {Role} from './role'
import { Structure } from './structure';
export class customer {
    id: BigInteger;
    email: string;
    password:string;
    name:String;
    lastname:String;
    tel:BigInteger;
    role:Role;
    Structure:Structure;
}