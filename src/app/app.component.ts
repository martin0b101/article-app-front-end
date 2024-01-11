import { Component, OnInit } from '@angular/core';
import { Article } from './Interfaces/ArticleDTO';
import { ArticleService } from './Services/article.service';
import { ArticleAdd } from './Interfaces/ArticleAddDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  AllArticles: Article[] = [];

  content: string = '';
  title: string = '';
  published: boolean = true;

  constructor(private articleService: ArticleService){}
  
  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    
    this.articleService.getArticles().subscribe(artcle => this.AllArticles = artcle);
  
  }
  
  addNewArticle(){
    console.log("button add clicked");

    if(this.content == '' || this.title == ''){
      alert("Add text to form");
      return;
    }
    
    const newArticle : ArticleAdd = {
      title : this.title, 
      content : this.content,
      published : this.published
    };

    this.articleService.addArticle(newArticle).subscribe(article => this.AllArticles.push(article));
    
  }

}
