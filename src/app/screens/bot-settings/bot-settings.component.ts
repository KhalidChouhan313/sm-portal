import { Component, OnInit } from '@angular/core';
import { BookingsService, AdminService } from "src/services";
import { Router } from "@angular/router";

@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.css']
})
export class BotSettingsComponent {
  // codes = [
  //   "ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZA", "BCD",
  //   "EFG", "HIJ", "KLM", "NOP", "QRS", "TUV", "WXY", "ZAB", "CDE", "FGH",
  //   "IJK", "LMN", "OPQ", "RST", "UVW", "XYZ", "ABD", "CEG", "FHI", "GJL",
  //   "MKP", "NOR", "PQS", "RTU", "SVA", "XBC", "YDE", "ZFG", "HLJ", "IKM",
  //   "LNP", "MOQ", "QRT", "TSA", "VWB", "XCY", "ZFA", "BGE", "CHF", "DKJ"
  // ]


  zipcodeList = [];
  queryList = [];
  codeIndex = 0;
  queryIndex = 0;
  adminDetails: any;
  siteId = 0;
  userQuery = [];
  userQueryString = ""
  botQuery = "";
  outcode = "";
  sector = "";
  unit = "";
  additionalPrice = 0;
  pickupRadius = "";
  pickupLatitude = "";
  pickupLongitude = "";
  destinationLatitude = "";
  destinationLongitude = "";
  destinationRadius = "";
  isAirport = false;
  isEditCode = false;
  isEditQuery = false;
  isLoad = true;

  constructor(
    private BS: BookingsService,
    private AS: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    if (!currentUser) {
      this.router.navigateByUrl('/sessions/signin');
    }
    this.AS.getUser(currentUser._id).subscribe(user => {
      this.BS.getCompanyBots(currentUser._id).subscribe(admin => {
        this.adminDetails = admin.data[0];
        console.log(admin);

        this.zipcodeList = this.adminDetails.zip_codes;
        this.queryList = this.adminDetails.query;
        this.pickupLatitude = this.adminDetails.pickup_point_latitude;
        this.pickupLongitude = this.adminDetails.pickup_point_longitude;
        this.pickupRadius = this.adminDetails.pickup_radius;
        this.destinationLatitude = this.adminDetails.destination_point_latitude;
        this.destinationLongitude = this.adminDetails.destination_point_longitude;
        this.destinationRadius = this.adminDetails.destination_radius;
        if (this.adminDetails.additional_price) { this.additionalPrice = this.adminDetails.additional_price }
        if (this.adminDetails.site_id) { this.siteId = this.adminDetails.site_id }
        this.isLoad = false;
      });
    });
  }

  selectCode(index) {
    this.isEditCode = true;
    this.outcode = this.zipcodeList[index].outcode;
    this.sector = this.zipcodeList[index].sector;
    this.unit = this.zipcodeList[index].unit;
    this.codeIndex = index;
  }

  updateZipcode() {
    let obj = {
      outcode: this.outcode,
      sector: this.sector,
      unit: this.unit,
    };
    this.zipcodeList[this.codeIndex].outcode = obj.outcode;
    this.zipcodeList[this.codeIndex].sector = obj.sector;
    this.zipcodeList[this.codeIndex].unit = obj.unit;
    let editObj = {
      _id: this.adminDetails._id,
      zip_codes: this.zipcodeList,
    };
    this.AS.updateBotAdmin(editObj).subscribe((res) => {
      this.isEditCode = false;
      this.outcode = "";
      this.sector = "";
      this.unit = "";
    });
  }

  addZipcode() {
    let obj = {
      outcode: this.outcode,
      sector: this.sector,
      unit: this.unit,
    };
    this.zipcodeList.push(obj);
    let editObj = {
      _id: this.adminDetails._id,
      zip_codes: this.zipcodeList,
    };
    this.AS.updateBotAdmin(editObj).subscribe((res) => {
      this.outcode = "";
      this.sector = "";
      this.unit = "";
    });
  }

  deleteCode(index) {
    this.zipcodeList.splice(index, 1);
    let editObj = {
      _id: this.adminDetails._id,
      zip_codes: this.zipcodeList,
    };
    this.AS.updateBotAdmin(editObj).subscribe((res) => {
      this.outcode = "";
      this.sector = "";
      this.unit = "";
    });
  }

  selectAirport(index) {
    this.isEditQuery = true;
    this.userQuery = this.queryList[index].user_query;
    this.botQuery = this.queryList[index].bot_query;
    this.queryIndex = index;
  }

  updateAirport() {
    // Update the selected query object
  let updatedObj = {
    user_query: this.userQuery.map((uq) => uq.toLowerCase()),
    bot_query: this.botQuery.toLowerCase(),
    isAirport: this.isAirport,
  };

  // Update the specific index in the query list
  this.queryList[this.queryIndex] = updatedObj;

  // Prepare the object to send to the backend
  let editObj = {
    _id: this.adminDetails._id,
    query: this.queryList,
  };

  // Call the update method on your service
  this.AS.updateBotAdmin(editObj).subscribe(
    (res) => {
      this.isEditQuery = false; // Exit edit mode
      this.userQuery = []; // Reset userQuery
      this.botQuery = ''; // Reset botQuery
      this.isAirport = false; // Reset isAirport checkbox
    },
    (error) => {
      console.error('Error updating bot query:', error);
    }
  );
  }

  addAirport() {
    let obj = {
      user_query: this.userQuery.map(uq => uq.toLowerCase()),
      bot_query: this.botQuery.toLowerCase(),
      isAirport: this.isAirport
    };

    this.queryList.push(obj);
    console.log(this.queryList)
    let editObj = {
      _id: this.adminDetails._id,
      query: this.queryList,
    };
    this.AS.updateBotAdmin(editObj).subscribe((res) => {
      this.isEditQuery = false;
      this.userQueryString = ""
      this.userQuery = [];
      this.botQuery = "";
      this.isAirport = false;
    });
  }

  deleteAirport(index) {
    this.queryList.splice(index, 1);
    let editObj = {
      _id: this.adminDetails._id,
      query: this.queryList,
    };
    this.AS.updateBotAdmin(editObj).subscribe((res) => {
      this.isEditQuery = false;
      this.userQuery = [];
      this.botQuery = "";
    });
  }

  cancelEdit() {
    this.isEditQuery = false;
    this.userQuery = [];
    this.botQuery = '';
    this.isAirport = false;
  }

  clearText() {
    this.userQueryString = '';
  }

  removeTag(index) {
    this.userQuery.splice(index, 1);
  }

  addToQuery() {
    if (this.userQueryString.trim()) {
      this.userQuery.push(this.userQueryString.trim());
      console.log(this.userQuery)
      this.userQueryString = ''; 
    }
  }

  updateCenterPoint() {
    this.isLoad = true;
    let obj = {
      _id: this.adminDetails._id,
      pickup_point_latitude: this.pickupLatitude,
      pickup_point_longitude: this.pickupLongitude,
      pickup_radius: this.pickupRadius,
      destination_point_latitude: this.destinationLatitude,
      destination_point_longitude: this.destinationLongitude,
      destination_radius: this.destinationRadius
    }

    console.log(obj);

    this.AS.updateBotAdmin(obj).subscribe(res => {
      this.isLoad = false;
      // console.log(res);
    })

  }

  updateAdditionalPrice() {
    this.isLoad = true;
    let obj = {
      _id: this.adminDetails._id,
      additional_price: this.additionalPrice
    }

    // console.log(obj);

    this.AS.updateBotAdmin(obj).subscribe(res => {
      this.isLoad = false;
      // console.log(res);
    })
  }

  updateSiteID() {
    this.isLoad = true;
    let obj = {
      _id: this.adminDetails._id,
      site_id: this.siteId
    }

    // console.log(obj);

    this.BS.updateBotAdmin(obj).subscribe(res => {
      this.isLoad = false;
      // console.log(res);
    })
  }

  // removeCode = (code) => this.codes = this.codes.filter(item => item !== code)

}
