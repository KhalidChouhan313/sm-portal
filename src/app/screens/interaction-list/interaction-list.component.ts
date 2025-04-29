import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService, BotService, BookingsService } from 'src/services';
import { InteractionFlowComponent } from '../interaction-flow/interaction-flow.component';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interaction-list',
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.css']
})
export class InteractionListComponent implements OnInit {
  currentUser: any;
  interactionList = [];
  interactionDetails: any;
  constructor(private BS: BookingsService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    this.BS.getInteractionList(this.currentUser._id).subscribe((res: any) => {
      // console.log(res);
      this.interactionList = res//.reverse();
    });
  }

  openModal(item: any) {
    this.BS.getInteractionDetails(item._id).subscribe((res: any) => {
      this.interactionDetails = res;

    });
  }

  closeInteractionFlow() {
    this.interactionDetails = null;
  }
}
