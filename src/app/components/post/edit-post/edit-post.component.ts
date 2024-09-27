import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostCategoryService } from '../../../services/post-category.service';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{
  postForm: any;
  post: any;
  postCategories: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private fb: FormBuilder,
    private postCategoryService: PostCategoryService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router:Router
  ) { }
  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    console.log(postId)
    this.initForm();
    this.loadPost(postId);
    this.loadPostCategories(); // Assuming categories are fetched here
  }
  initForm() {
    this.postForm = this.fb.group({
      Title: [''],
      Description: [''],
      PostCategoryId: [''],
      Content: [''],
      Status: [''],
    });
  }
  loadPost(id: string | null) {
    if (id) {
      this.postService.getPostById(id).subscribe((post) => {
        this.post = post?.post;
        console.log(post)
        this.postForm.patchValue({
          Title: this.post.title,
          Description: this.post.description,
          PostCategoryId: this.post.postCategoryId,
          Content: this.post.content,
          Status: this.post.status,
        });
      });
    }
  }
  selectedImage: File | null = null;
  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }
  loadPostCategories() {
    this.postCategoryService.searchPostCategories({ PageNumber: 1, PageSize: 100 }).subscribe(response => {
      this.postCategories = response.data;
    }, error => {
      console.error('Error loading post categories', error);
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('Title', this.postForm.get('Title')?.value);
      formData.append('Description', this.postForm.get('Description')?.value);
      formData.append('PostCategoryId', this.postForm.get('PostCategoryId')?.value);
      formData.append('Content', this.postForm.get('Content')?.value);
      formData.append('Status', this.postForm.get('Status')?.value);
      if (this.selectedImage) {
        formData.append('Image', this.selectedImage);
      }
      console.log(formData);
      this.postService.savePost(formData, this.post.id).subscribe(response => {
        alert("Update post successfully")
        this.router.navigate(['/admin/post'])
      }, error => {
        console.error('Error saving post', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
