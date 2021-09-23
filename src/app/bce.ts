import { Structure } from './structure';
import {SousStructure} from './sous-structure';

export class BCE {
    id:BigInteger;
    code_BCE:String;
    etat:String;
    date:String;
    Structure:Structure;
    sousstructure:SousStructure;
}
