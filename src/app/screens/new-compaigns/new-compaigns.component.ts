import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BroadcastService } from 'src/services/broad-casts/broadcast.service';

@Component({
  selector: 'app-new-compaigns',
  templateUrl: './new-compaigns.component.html',
  styleUrls: ['./new-compaigns.component.css'],
})
export class NewCompaignsComponent {
  @Input() newBroadcastDesc = '';
  smstemplates: any[] = [];
  loading = false;
  campaignName: string = '';
  selectedTemplate: string = '';
  sendTo: string = '';
  scheduledTime: string = '';
  skipSchedule: boolean = false;
  contactList: any[] = [];
  constructor(private bdService: BroadcastService) {}
  ngOnInit(): void {
    this.fetchBroadcasts();
    this.fetchContacts();
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
  fetchContacts() {
    const companyId = environment.COMPANY_ID;
    this.loading = true;
    this.bdService.getallContacts(companyId).subscribe({
      next: (response) => {
        this.contactList = response.data;
      },
      error: (err) => {
        console.error('Error fetching contactList:', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  createCampaign() {
    const companyId = environment.COMPANY_ID;

    const selectedTemplateData = this.smstemplates.find(
      (t) => t.name === this.selectedTemplate
    );

    if (!selectedTemplateData) {
      console.error('No template selected or found');
      return;
    }

    const recipients =
      this.sendTo === 'All Contacts'
        ? this.contactList.map((c) => c.contact)
        : [this.sendTo];

    const scheduleTimeValue = this.skipSchedule
      ? ''
      : this.scheduledTime
      ? new Date(this.scheduledTime).toISOString()
      : new Date().toISOString();

    const body = {
      messaging_product: 'whatsapp',
      to: recipients,
      type: 'template',
      template: {
        category: selectedTemplateData.category || 'MARKETING',
        name: selectedTemplateData.name,
        language: { code: selectedTemplateData.language || 'en_US' },
        components: selectedTemplateData.components || [],
      },
      schedule_time: this.skipSchedule ? '' : scheduleTimeValue,
      is_immediate: this.skipSchedule,
    };

    console.log('Final campaign payload:', body);

    this.bdService.SendTemplate(companyId, body).subscribe({
      next: (response) => {
        console.log('Campaign created successfully:', response);
      },
      error: (err) => {
        console.error('Error creating campaign:', err);
      },
    });
  }
}
