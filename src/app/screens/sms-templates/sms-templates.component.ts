import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { environment } from 'src/environments/environment';
import { BroadcastService } from 'src/services/broad-casts/broadcast.service';
import { AiPromptOfficialModule } from "../ai-prompt-official/ai-prompt-official.module";
@Component({
  selector: 'app-sms-templates',
  standalone: true,
  templateUrl: './sms-templates.component.html',
  styleUrls: ['./sms-templates.component.css'],
  imports: [CommonModule, LoaderComponent, ModalComponent, AiPromptOfficialModule],
  
})
export class SmsTemplatesComponent {
  smstemplates: any[] = [];
  isVisible = false;
  loading = false;
  constructor(private bdService: BroadcastService) {}

  ngOnInit(): void {
    this.fetchBroadcasts();
    console.log(this.smstemplates);
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  fetchBroadcasts() {
    const companyId = environment.COMPANY_ID;
    this.loading = true;
    this.bdService.getallTemplates(companyId).subscribe({
      next: (response) => {
        console.log('Response:', response);

        if (Array.isArray(response)) {
          this.smstemplates = response;
        } else {
          this.smstemplates = response.templates;
        }
      },
      error: (err) => {
        console.error('Error fetching smstemplates:', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteTemplate(templateId: string, templateName: string) {
    this.bdService
      .deleteTemplates(environment.COMPANY_ID, templateId, templateName)
      .subscribe({
        next: (response) => {
          console.log('Template deleted successfully:', response);
          this.fetchBroadcasts();
        },
        error: (err) => {
          console.error('Error deleting template:', err);
        },
      });
  }
}
