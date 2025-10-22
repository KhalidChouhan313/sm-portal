import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BroadcastService } from 'src/services/broad-casts/broadcast.service';
import { AiPromptOfficialModule } from "../ai-prompt-official/ai-prompt-official.module";
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
  imports: [CommonModule, FormsModule, ModalComponent, AiPromptOfficialModule,LoaderComponent],
})
export class CampaignsComponent implements OnInit {
  broadcasts: any[] = [];
  isVisible = false;
  loading = false;
  constructor(private bdcast: BroadcastService) {}

  ngOnInit(): void {
    this.fetchBroadcasts();
    console.log(this.broadcasts);
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  fetchBroadcasts() {
    const Job_Id = '9';

    this.loading = true;
    this.bdcast.getBroadcast(Job_Id).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if (Array.isArray(response)) {
          this.broadcasts = response;
        } else {
          this.broadcasts = [response];
        }
      },
      error: (err) => {
        console.error('Error fetching broadcasts:', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
