import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/auth.user.service';
import { PostCategoryService } from '../../../services/post-category.service';
import { PostCategory } from '../../../interfaces/post-category';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrl: './blogs-detail.component.css'
})
export class BlogsDetailComponent implements OnInit{
  comments: any[] = [];
  postCategoryName: any;
  postCategories: PostCategory[] = [];
  post:any;
  totalRecords = 0;
  pageSize = 4;
  currentPage = 1;
  searchKeyword = '';
  commentForm: FormGroup;


  ngOnInit(): void {
    this.loadPost();
    this.loadPostCategories();
  }

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authUser: AuthUserService,
    private router: ActivatedRoute,
    private navigate: Router,
    private postCategoryService: PostCategoryService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]]
    });
  }

  loadPost() {
    this.router.paramMap.subscribe(params => {
      const postId = params.get('id');
      this.postService.getPostById(postId).subscribe(response => {
        const postResult = response?.post;
        const modifiedObject = { ...postResult, imageUrl: `http://localhost:7038/images/${postResult?.image}` };
        this.post = modifiedObject;
        this.postCategoryName = response.postCategoryName;
        this.comments = response?.comments.map((item:any) => {
          return { ...item, imageUrl: ( item?.account?.avatar!=null && item?.account?.avatar!='')? `http://localhost:7038/images/${item?.account?.avatar}`:''}
        });
      }, error => {
        console.error('Error loading posts', error);
      });
    });
  }

  loadPostCategories() {
    const searchParams = {
      PageNumber: this.currentPage,
      PageSize: this.pageSize,
      Keyword: this.searchKeyword,
      Status: '',
      SortBy: '',
      SortDir: ''
    };
  
    this.postCategoryService.searchPostCategories(searchParams).subscribe(
      response => {
        console.log(response)
        this.postCategories = response.data; 
        this.totalRecords = response.totalRecords; 
      },
      error => {
        console.error('Error loading post categories', error);
      }
    );
  }

  onSubmit() {
    if(!this.authUser.isLoggedIn()){
      alert('You are not loging!!')
      this.navigate.navigate(['/sign-in'])
     }

    if(this.commentForm.valid){
      const accountId = this.authUser.getUserIdFromToken();
      this.router.paramMap.subscribe(params => {
      const postId = params.get('id');
      const content = this.commentForm.value.content;
      const request = {
        content: content,
        postId: postId,
        accountId: accountId
      }
      this.postService.commentPost(request).subscribe(
        (response) => {
          this.commentForm.get('content')?.setValue('');
          alert('Comment successfully');
        },
        (error:any) => {
          alert('Comment failed');
        }
      );
      });
     
    }else {
      this.commentForm.markAllAsTouched();
    }
  }
}
