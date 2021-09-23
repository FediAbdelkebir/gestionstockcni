import {Structure} from './structure'
import { Stock } from './stock';
export class Article {
    id:BigInteger;
    title:string;
    label:string;
    description:string;
    prix:number;
    Structure:Structure;
}
