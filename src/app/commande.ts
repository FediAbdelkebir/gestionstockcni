import { Structure } from './structure';
import {SousStructure} from './sous-structure';
export class Commande {
    id:BigInteger;
    code_BCI:String;
    etat:String;
    date:String;
    Structure:Structure;
    sousstructure:SousStructure;
}
