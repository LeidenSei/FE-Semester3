import { Component } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../../services/post.service';
import { AuthUserService } from '../../../services/auth.user.service';
import { Router } from '@angular/router';
import { SearchPostParams } from '../../../services/search-post-params';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {
  posts: Post[] = [];
  totalRecords = 0;
  pageSize = 3;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';
  sortBy = '';
  sortDir = '';
  Math = Math;

  constructor(
    private postService: PostService,
    private authUserService: AuthUserService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.loadPost();
  }


 loadPost() {
    const searchParams: SearchPostParams = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      keyword: this.searchKeyword,
      status: this.statusFilter,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      postCategoryId:'',
      isPublish:'PUBLISHED'
    };
  
    this.postService.searchPosts(searchParams).subscribe(response => {
      this.posts = response.data.map((post: Post) => {
        return {
          ...post,
          imageUrl: `https://localhost:7038/images/${post.image}`
        };
      });
      console.log(response)
      this.totalRecords = response.totalRecords;
    }, error => {
      console.error('Error loading products', error);
    });
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalRecords / this.pageSize)) {
      this.currentPage = page;
      this.loadPost();
    }
  }

}
