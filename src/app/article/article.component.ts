import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service';
import {Article} from '../article'
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article:Article;
  constructor(private AS:ArticleService) {
    this.article=new Article();
   }

  ngOnInit() {
  }
  save() {
    this.AS.createarticle(this.article)
      .subscribe(data => console.log(data), error => console.log(error));
    this.article = new Article();
    alert('Registration Successful !');
   
  }
}
