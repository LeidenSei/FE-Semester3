import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { PostCategoryService } from '../../../services/post-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  public Editor: any;
  public isBrowser: boolean | undefined;
  postForm: FormGroup;
  postCategories: any[] = [];
  selectedImage: File | null = null;
  imagePreview: any;
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private postCategoryService: PostCategoryService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      Title: ['', Validators.required],
      Description: [''],
      PostCategoryId: ['', Validators.required],
      Content: [''],
      Status: ['', Validators.required],
      Image: [null],
    });
  }
  ngOnInit(): void {
    this.loadPostCategories();
  }
  ngAfterViewInit(): void {
    const descriptionElement = document.getElementById('description');
    if (descriptionElement && typeof (window as any)['CKEDITOR'] !== 'undefined') {
      const editor = (window as any)['CKEDITOR'].replace(descriptionElement);
      editor.on('change', () => {
        const data = editor.getData();
        this.postForm.controls['Description'].setValue(data);
      });
    } else {
      console.error('CKEditor chưa được tải đúng cách hoặc không tìm thấy phần tử.');
    }
  }
  onImageSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      };
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
  async onSubmit() {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('Title', this.postForm.get('Title')?.value);
      formData.append('Description', this.postForm.get('Description')?.value);
      formData.append('PostCategoryId', this.postForm.get('PostCategoryId')?.value.toString());
      formData.append('Content', this.postForm.get('Content')?.value);
      formData.append('Status', this.postForm.get('Status')?.value);
      // Kiểm tra và thêm file ảnh vào FormData
      // Lấy file hình ảnh từ input
      if (this.selectedImage) {
        formData.append('Image', this.selectedImage);
      }
      try {
        const response = await this.postService.savePost(formData).toPromise();
        alert('Post added successfully');
        this.router.navigate(['/admin/post'])
      } catch (error) {
        alert('Error adding post');
        console.error('Error adding post', error);
      }
    }else {
      this.postForm.markAllAsTouched();
    }
  }
}
