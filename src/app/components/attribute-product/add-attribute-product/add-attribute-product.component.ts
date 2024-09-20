import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttributeService } from '../../../services/attribute.service';
import { AttributeProductComponent } from '../attribute-product.component';

@Component({
  selector: 'app-add-attribute-product',
  templateUrl: './add-attribute-product.component.html',
  styleUrl: './add-attribute-product.component.css'
})
export class AddAttributeProductComponent {
  addAttributeForm: FormGroup;
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder, 
    private attributeService: AttributeService, 
    private router: Router,
    private attributeProductComponent: AttributeProductComponent // Thay CategoryComponent thành AttributeProductComponent
  ) {
    this.addAttributeForm = this.fb.group({
      attributeCode: ['', [Validators.required]], // Sử dụng attributeCode
      attributeName: ['', [Validators.required]], // Sử dụng attributeName
    });
  }
  
  onSubmit(): void {
    if (this.addAttributeForm.valid) {
      const attributeName = this.addAttributeForm.get('attributeName')?.value;
      const attributeCode = this.addAttributeForm.get('attributeCode')?.value;
  
            this.isSubmitting = true;
            const attribute = this.addAttributeForm.value;
  
            this.attributeService.addAttribute(attribute).subscribe(
              response => {
                console.log('Attribute added:', response);
                this.isSubmitting = false;
                this.addAttributeForm.reset();
                this.router.navigate(['/admin/attribute']).then(() => {
                  this.attributeProductComponent.loadAttributes();
                });
              },
              error => {
                alert("attribute name hoặc code đã có")
                console.error('Error adding attribute:', error);
                this.isSubmitting = false;
              }
            );
          }
        }
}
