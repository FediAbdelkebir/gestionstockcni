import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http'; 
import {Article} from './article';
import { map } from 'rxjs/operators';
let httpOptions = { responseType: 'text' };
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleUrl:String;
  constructor(private http:HttpClient) {
    this.articleUrl="http://127.0.0.1:8081/";
   }
  public createarticle(article:Article){
    console.log(article);
    return this.http.post<Article>(this.articleUrl+"dashboard/ajouterarticle",article)
  }
  public findAll(): Observable<any> {
    var CodeStruct;
    CodeStruct=sessionStorage.getItem('StructureUser')
    return this.http.get(this.articleUrl+"dashboard/findallarticles/"+CodeStruct,httpOptions)
  }
  Delete(id){
      
    return this.http.post('http://localhost:8081/article/delete/'+id,httpOptions).pipe(
      map(
        userData => {
          /*this.auth.logOut();*/
          
        }
      )
  
    );
    
  }
  update(ida,titlea,labela,descriptiona,prixa){
    return this.http.post('http://localhost:8081/dashboard/article/'+ida+'/'+titlea+'/'+labela+'/'+descriptiona+'/'+prixa,httpOptions).pipe(
       map(
         userData => {

         }
       )
 
     );
 }
}
