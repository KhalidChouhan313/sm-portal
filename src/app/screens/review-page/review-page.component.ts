import { Component, OnInit } from '@angular/core';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent implements OnInit {
  title: string = '';
  description: string = '';
  currentUser: any = null;
  previewTitle: string = '';
  previewDescription: string = '';
  profileImg: any;
  coverImg: any;
  profilePreview: string = '';
  coverPreview: string = '';

  constructor(private qrSer: QrcodeService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user_details');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      console.log(this.currentUser); // full object
      // console.log(this.currentUser.name); // access specific properties
    }
  }

  updateDetails() {
    console.log('working');
    const formData = new FormData();

    if (this.profileImg && typeof this.profileImg !== 'string') {
      formData.append('profile_img', this.profileImg);
    }

    if (this.coverImg && typeof this.coverImg !== 'string') {
      formData.append('cover_img', this.coverImg);
    }

    this.previewDescription = this.description;
    this.previewTitle = this.title;
    this.qrSer
      .updateReviewPage(
        this.currentUser._id,
        formData,
        this.title,
        this.description
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  onProfileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileImg = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result as string; // correct assignment
      };
      reader.readAsDataURL(file);
    }
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.coverImg = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.coverPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
