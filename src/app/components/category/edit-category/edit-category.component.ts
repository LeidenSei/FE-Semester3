import { CategoryComponent } from './../category.component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../interfaces/category';
import { log } from 'console';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  editCategoryForm: FormGroup;
  categoryId: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryComponent:CategoryComponent
  ) {
    this.editCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      active: ['1', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        console.log('Category ID:', this.categoryId);
        this.loadCategory();
      }
    });
  }

  loadCategory(): void {
    if (this.categoryId) {
      this.categoryService.getCategoryById(this.categoryId).subscribe(
        (category: Category) => {
          console.log('Loaded Category:', category);
          if (category) {
            this.editCategoryForm.patchValue({
              categoryName: category.categoryName,
              active: +category.active
            });
          } else {
            console.error('No category data found');
          }
          console.log('Form Values after patch:', this.editCategoryForm.value);
        },
        error => {
          console.error('Error loading category', error);
        }
      );
    }
  }
  
  onSubmit(): void {
    if (this.editCategoryForm.valid) {
      const updatedCategory: Category = this.editCategoryForm.value;
  
      if (this.categoryId) {
        this.categoryService.getCategoryById(this.categoryId).subscribe(
          existingCategory => {
            const isNameChanged = existingCategory.categoryName !== updatedCategory.categoryName;
  
            if (isNameChanged) {
              this.categoryService.checkNameExists(updatedCategory.categoryName).subscribe(
                exists => {
                  if (exists) {
                    alert('Category name already exists. Please choose a different name.');
                  } else {
                    this.updateCategory();
                  }
                },
                error => {
                  console.error('Error checking category name', error);
                }
              );
            } else {
              this.updateCategory();
            }
          },
          error => {
            console.error('Error fetching category', error);
          }
        );
      }
    }
  }
  
  private updateCategory(): void {
    this.categoryService.updateCategory(this.editCategoryForm.value, this.categoryId).subscribe(
      response => {
        console.log('Category updated:', response);
        this.router.navigate(['/admin/category']).then(() => {
          this.categoryComponent.loadCategories();
        });
      },
      error => {
        console.error('Error updating category', error);
      }
    );
  }
}  