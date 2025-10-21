import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BroadcastService } from 'src/services/broad-casts/broadcast.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, FormsModule, ModalComponent, LoaderComponent],
})
export class ContactComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  contactList: any[] = [];
  groupList: any[] = [];
  selectedContact: any = null;
  selectedGroup: any = null;
  isGroup = false;
  isDetailsContact = false;
  isDetailsGroup = false;
  isAddContact = false;
  isImportContact = false;
  isvisiable = false;
  isAddGroup = false;
  isAddcontactinGroup = false;
  isAddingContactMode = false;
  loading = false;
  previewImage: string | ArrayBuffer | null = null;
  addedfilteredContacts: any[] = [];
  isRemove = false;
  selectedFile: File | null = null;
  form = {
    name: '',
    lastName: '',
    contact: '',
    email: '',
    group: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  };

  groupForm = {
    groupName: '',
  };
  constructor(private bdService: BroadcastService) {}
  ngOnInit(): void {
    this.fetchContacts();
    this.fetchGroup();
  }
  openGroup() {
    this.isGroup = true;
  }

  closeGroup() {
    this.isGroup = false;
  }
  RemoveContactFromGroup() {
    this.isRemove = !this.isRemove;
  }
  DetailsContact(contactId: string) {
    const found = this.contactList.find((c) => c._id === contactId);
    if (found) {
      this.selectedContact = found;
      this.isDetailsContact = true;
    }
  }
  DetailsGroup(groupId: string) {
    const found = this.groupList.find((c) => c._id === groupId);
    if (found) {
      this.selectedGroup = found;
      this.isDetailsGroup = true;
    }
    this.updateFilteredContacts();
  }
  AddcontactinGroup() {
    this.isAddcontactinGroup = !this.isAddcontactinGroup;
  }
  AddContact() {
    this.isAddContact = !this.isAddContact;
  }
  ModalOpen() {
    this.isvisiable = !this.isvisiable;
  }
  openGrouptModal() {
    this.isAddGroup = !this.isAddGroup;
  }
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // 👈 file ko store karo
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
  fetchGroup() {
    const companyId = environment.COMPANY_ID;
    this.loading = true;
    this.bdService.getallGroup(companyId).subscribe({
      next: (response) => {
        console.log('Response:', response.data);

        this.groupList = response.data;
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
  SaveGroup() {
    const companyId = environment.COMPANY_ID;
    const body = {
      groupName: this.groupForm.groupName,
    };

    this.bdService.createGroup(companyId, body).subscribe({
      next: (response) => {
        console.log('✅ Group created successfully:', response);
        alert('Group created successfully!');
        this.groupForm = { groupName: '' };
        this.isAddGroup = false;
      },
      error: (err) => {
        console.error('❌ Error creating group:', err);
        alert('Failed to create group');
      },
    });
  }
  CancelGroup() {
    this.isAddGroup = false;
  }

  AddContactNumber() {
    const companyId = environment.COMPANY_ID;

    const body = {
      contact: [this.form.contact],
      name: this.form.name,
    };

    if (!this.form.contact || !this.form.name) {
      alert('Please fill all required fields!');
      return;
    }

    this.bdService.CreateNumber(companyId, body).subscribe({
      next: (response) => {
        console.log('✅ Number added successfully:', response);
        alert('Number added successfully!');
        this.form.name = '';
        this.form.contact = '';
      },
      error: (err) => {
        console.error('❌ Error adding number:', err);
        alert('Failed to add number');
      },
    });
  }
  sendByBulk() {
    const companyId = environment.COMPANY_ID;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.bdService.CreateNumber(companyId, formData).subscribe({
        next: (response) => {
          console.log('✅ Bulk contacts uploaded successfully:', response);
          alert('Bulk contacts uploaded successfully!');
          this.selectedFile = null;
          this.previewImage = null;
          this.fileInput.nativeElement.value = '';
        },
        error: (err) => {
          console.error('❌ Error uploading CSV file:', err);
          alert('Failed to upload CSV file');
        },
      });
      return;
    }
  }
  AddInGroup() {
    const companyId = environment.COMPANY_ID;

    const selectedContacts = this.contactList
      .filter((c) => c.selected)
      .map((c) => c._id);

    if (!selectedContacts.length) {
      alert('Please select at least one contact!');
      return;
    }
    const body = {
      groupName: this.selectedGroup?.groupName || 'group1',
      contacts: selectedContacts,
      action: 'add',
    };

    this.bdService.AddNumber(companyId, body).subscribe({
      next: (response) => {
        console.log('✅ Contacts added successfully:', response);
        alert('Contacts added successfully!');
        this.contactList.forEach((c) => (c.selected = false));
      },
      error: (err) => {
        console.error('❌ Error adding contacts:', err);
        alert('Failed to add contacts');
      },
    });
  }

  selectAllContacts() {
    const allSelected = this.contactList.every((c) => c.selected);
    this.contactList.forEach((c) => (c.selected = !allSelected));
  }
  get selectedCount() {
    return this.contactList.filter((c) => c.selected).length;
  }
  toggleAddMode() {
    this.isAddingContactMode = !this.isAddingContactMode;
    this.updateFilteredContacts();
  }
  updateFilteredContacts() {
    if (
      this.selectedGroup?.contacts?.length === 0 ||
      this.isAddingContactMode
    ) {
      this.addedfilteredContacts = this.contactList;
    } else {
      this.addedfilteredContacts = this.selectedGroup?.contacts;
    }
  }
  removeGroup() {
    const companyId = environment.COMPANY_ID;

    const selectedContacts = this.contactList
      .filter((c) => c.selected)
      .map((c) => c._id);

    if (!selectedContacts.length) {
      alert('Please select at least one contact!');
      return;
    }
    const body = {
      groupName: this.selectedGroup?.groupName || 'group1',
      contacts: selectedContacts,
      action: 'remove',
    };

    this.bdService.AddNumber(companyId, body).subscribe({
      next: (response) => {
        alert('removed successfully!');
        this.contactList.forEach((c) => (c.selected = false));
        this.fetchGroup();
      },
      error: (err) => {
        console.error('❌ Error remove contacts:', err);
        alert('Failed to remove contacts');
      },
    });
  }
  deleteGroup(groupId: string) {
    const companyId = environment.COMPANY_ID;

    this.bdService.DeleteGroup(companyId, groupId).subscribe({
      next: (response) => {
        alert('Group deleted successfully!');
        this.fetchGroup();
      },
      error: (err) => {
        console.error('❌ Error deleting group:', err);
        alert('Failed to delete group');
      },
    });
  }
}
