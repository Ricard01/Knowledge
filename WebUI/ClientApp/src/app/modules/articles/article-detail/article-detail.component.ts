import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArticleDto } from 'src/app/models';
import { ArticleService } from '../articles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  articleId: number;
  article: ArticleDto;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private sanitizer: DomSanitizer) {

    this.route.params.subscribe(params => {
      this.articleId = params['id'];
    });

  }

  ngOnInit(): void {
    this.getArticle();
  }


  getArticle() {
    this.articleService.getArticle(this.articleId).subscribe((resp: ArticleDto) => {      
      this.article = resp;
    })
  }


  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }


}
