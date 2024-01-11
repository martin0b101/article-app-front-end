import { CommentAdd } from './../Interfaces/CommentAdd';
import { Comment } from './../Interfaces/CommentDTO';
import { Injectable } from '@angular/core';
import { Article } from '../Interfaces/ArticleDTO';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleAdd } from '../Interfaces/ArticleAddDTO';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleUrl = 'http://localhost:5002/articles/all';
  private articleUrlBasic = 'http://localhost:5002/articles';
  private commentUrl = 'http://localhost:5002/articles'
  private articleAddUrl = "http://localhost:5002/articles"


  constructor(private httpClient: HttpClient) { }

  // get this from my api 
  getArticles(): Observable<Article[]> {
    return this.httpClient.get<any>(this.articleUrl).pipe(
      map((response: any) => response.articles as Article[])
    );
  }


  // get this from my restful api
  getComments(articleId: number): Observable<Comment[]> {
    // const comments = of(Comments);
    // return comments;
    return this.httpClient.get<any>(`${this.commentUrl}/${articleId}/comments/all`).pipe(
      map((response) => response.comments as Comment[])
    );
  }

  addArticle(article: ArticleAdd): Observable<Article> {
    return this.httpClient.post<Article>(this.articleAddUrl, article);
  }

  addComment(articleId: number, comment: CommentAdd): Observable<Comment>{
    return this.httpClient.post<Comment>(`${this.commentUrl}/${articleId}/comments`, comment);
  }

  deleteArticle(articleId: number): Observable<any> {
    console.log("delete service");
    const success = this.httpClient.delete(`${this.articleUrlBasic}/${articleId}`)
    console.log("deleted: ", success);
    return success;
  }
}
