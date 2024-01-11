import { CommentAdd } from './../../Interfaces/CommentAdd';
import { ArticleService } from 'src/app/Services/article.service';
import { Article } from './../../Interfaces/ArticleDTO';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/Interfaces/CommentDTO';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

  @Input() Article!: Article
 
  @Input() Comment!: string;

  Comments: Comment[] = [] 
  
  newComment: string = '';
  email:string = "user-test@angular.com";

  constructor(private articleService: ArticleService){}

  ngOnInit(): void {
    this.showComments();
  }
  
  showComments(){
    this.articleService
    .getComments(this.Article.id)
    .subscribe(comments => this.Comments = comments);
  }


  addComment(){
    console.log("Dodaj Comment cliked!");
    if(this.newComment == ''){
      alert("Dodaj komentar");
      return;
    }

    
    const commentNewDb : CommentAdd = {
      email: this.email,
      title: this.Article.title,
      content: this.newComment,
      published: true
    }

    this.articleService.addComment(this.Article.id, commentNewDb).subscribe(comment => this.Comments.push(comment));
    this.newComment = '';
  }

  deleteItem(){
    console.log("Button clicked delete");
    this.articleService.deleteArticle(this.Article.id);
  }
}
