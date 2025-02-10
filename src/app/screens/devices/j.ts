import { Component, OnInit } from '@angular/core';
import { BotService, AdminService } from './../../services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
// import { MessageBoxComponent } from '../message-box/message-box.component'
import axios from "axios";
const PRODUCT_ID = '3055fd3a-661b-467e-8a25-16cd0c76b1fb'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  private serviceModal: NgbModalRef;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        gridLines: {
          color: 'transparent'
        }
      }]
    },
    legend: {
      labels: {
        boxWidth: 12
      }
    }
  };
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' }
  ];

  barChartColors: Color[] = [
    {
      borderColor: '#00b8ff',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#53b827',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'Red',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'Orange',
      backgroundColor: 'transparent',
    }
  ];

  waToday = 0;
  wa15Min = 0;
  wa30Min = 0;
  wa60Min = 0;
  wa6Hr = 0;
  wa12Hr = 0;
  wa24Hr = 0;
  smsToday = 0;
  sms15Min = 0;
  sms30Min = 0;
  sms60Min = 0;
  sms6Hr = 0;
  sms12Hr = 0;
  sms24Hr = 0;
  totalBooking = 0;
  cancelledBooking = 0;
  trackDriverTotalMsg = 0;
  trackDriverYesMsg = 0;
  arrivedDriverTotalMsg = 0;
  arrivedDriverYesMsg = 0;
  isReload = false;
  isPageLoad = true;
  showFilter = false;
  isLoad = true;
  isMsgLoad = true;
  isGraphLoad = false;
  isLogout = false;
  isEdit = false;
  selected = '';
  currentUser: any;
  currentEditDevice: any;
  currentEditIndex = -1;
  deviceList = [];
  messageList: any;
  userList = [];
  userIndex = 0;
  errMessage = "";
  deviceName = '';
  deviceNumber = '';
  currentDevice: any;
  currentIndex = 0;
  currentPageLimit = 0;
  wait = 0;
  qrSrc: any = '';
  authStatus = '';
  connection = '';
  deviceActive = false;
  deviceConnected = false;
  qrShow = false;
  page = 1;
  target_type = ''
  target = ''
  status = ''
  sent_by = ''
  f_date = ''
  t_date = ''
  fDate = '';
  tDate = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _serviceModal: NgbModal,
    private AS: AdminService,
    private BS: BotService
  ) { }

  ngOnInit(): void {
    let user_id = this.activatedRoute.params['value'].id

    this.AS.getCurrentUserFromBack().subscribe(() => {
      this.currentUser = JSON.parse(localStorage.getItem('SMS'));
      if (!this.currentUser) {
        this.router.navigateByUrl('/sessions/signin');
      }
      this.AS.getUser(user_id).subscribe(usr => {
        this.currentUser = usr;
        this.deviceList = usr.wa_api.filter(d => d.status && (d.wa_api_platform == 'chatapi' || d.wa_api_platform == 'maytapi' || d.wa_api_platform == 'greenapi'))
        if (this.deviceList.length) {
          if (this.deviceList[0].wa_api_platform == 'chatapi') {
            this.openDevice(this.deviceList[0], 0);
            setTimeout(() => { this.refreshingDevice() }, 10000)
          }
          if (this.deviceList[0].wa_api_platform == 'maytapi') {
            this.openMaytApi(this.deviceList[0], 0);
            setTimeout(() => { this.refreshingMaytApi() }, 10000)
          }
          if (this.deviceList[0].wa_api_platform == 'greenapi') {
            this.openGreenApi(this.deviceList[0], 0);
            // setTimeout(() => { this.refreshingMaytApi() }, 10000)
          }
        }
        else {
          this.isLoad = false;
        }
      })
    })
  }

  creatGraph(device, index) {
    this.waToday = 0;
    this.wa15Min = 0;
    this.wa30Min = 0;
    this.wa60Min = 0;
    this.wa6Hr = 0;
    this.wa12Hr = 0;
    this.wa24Hr = 0;
    this.smsToday = 0;
    this.sms15Min = 0;
    this.sms30Min = 0;
    this.sms60Min = 0;
    this.sms6Hr = 0;
    this.sms12Hr = 0;
    this.sms24Hr = 0;
    this.totalBooking = 0;
    this.cancelledBooking = 0;
    this.trackDriverTotalMsg = 0;
    this.trackDriverYesMsg = 0;
    this.arrivedDriverTotalMsg = 0;
    this.arrivedDriverYesMsg = 0;
    this.isGraphLoad = false;
    this.barChartData = [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'SMS' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'WhatsApp' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Not Sent' },
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' }
    ];
    let endDate = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    let t = endDate
    let fd = startDate
    let tz = t.getTimezoneOffset() / 60
    fd.setDate(fd.getDate() - 1)
    let fh = 24 + tz;
    let m = (fd.getMonth() + 1).toString()
    let d = fd.getDate().toString()
    if (parseInt(m) < 10) { m = '0' + m }
    if (parseInt(d) < 10) { d = '0' + d }
    let startDateStr = fd.getFullYear() + '-' + m + '-' + d + 'T' + fh + ':00:00.000Z';

    let th = 23 + tz;
    let em = (t.getMonth() + 1).toString()
    let dm = (t.getDate() + 1).toString()

    if (parseInt(em) < 10) { em = '0' + em }
    if (parseInt(dm) < 10) { dm = '0' + dm }

    let endDateStr = t.getFullYear() + '-' + em + '-' + dm + 'T' + th + ':59:59.999Z';

    let obj = {
      device_id: device.device_id,
      company_id: this.currentUser._id,
      startDate: startDateStr,
      endDate: endDateStr
    }

    this.AS.getMessageGraphValue(obj).subscribe(ml => {
      // console.log(ml.length);

      let tday = ml[ml.length - 1].day;
      let today = ml[ml.length - 1].day;
      let x = 0;
      while (x < 7) {
        today++;
        if (today > 6) { today = 0; }
        this.barChartLabels[x] = this.days[today];
        x++;
      }
      ml.map((gv, j) => {
        let td = new Date();
        let d = new Date(gv.createdAt);
        let t = td.getTime() - d.getTime();
        t = t / (1000 * 60)
        let i = parseInt(gv.day)
        let ind = this.barChartLabels.findIndex(bcl => bcl == this.days[i])
        if (gv.sent_by == 0) {
          let v = this.barChartData[0]['data'][ind];
          this.barChartData[0]['data'][ind] = parseInt(v.toString()) + 1;
          if (tday == gv.day) { this.smsToday++; }
          if (t <= 15) { this.sms15Min++; }
          if (t <= 30) { this.sms30Min++; }
          if (t <= 60) { this.sms60Min++; }
          if (t <= 360) { this.sms6Hr++; }
          if (t <= 720) { this.sms12Hr++; }
          if (t <= 1440) { this.sms24Hr++; }
        } else if (gv.sent_by == 1) {
          let v = this.barChartData[1]['data'][ind];
          this.barChartData[1]['data'][ind] = parseInt(v.toString()) + 1;
          if (tday == gv.day) { this.waToday++; }
          if (t <= 15) { this.wa15Min++; }
          if (t <= 30) { this.wa30Min++; }
          if (t <= 60) { this.wa60Min++; }
          if (t <= 360) { this.wa6Hr++; }
          if (t <= 720) { this.wa12Hr++; }
          if (t <= 1440) { this.wa24Hr++; }
        } else {
          let v = this.barChartData[2]['data'][ind];
          this.barChartData[2]['data'][ind] = parseInt(v.toString()) + 1;
        }
        let v = this.barChartData[3]['data'][ind];
        this.barChartData[3]['data'][ind] = parseInt(v.toString()) + 1;

        if (gv.msg_type == 'booking') { this.totalBooking++; if (gv.is_booking_cancel) { this.cancelledBooking++; } }
        if (gv.driver_id && gv.msg_type == 'track') { this.trackDriverTotalMsg++; if (gv.is_driver_msg) { this.trackDriverYesMsg++; } }
        if (gv.driver_id && gv.msg_type == 'arrived') { this.arrivedDriverTotalMsg++; if (gv.is_driver_msg) { this.arrivedDriverYesMsg++; } }

        if (j == ml.length - 1) {
          this.isGraphLoad = true;
        }
      })
    })
  }

  back() {
    this.router.navigateByUrl('/bot/messages');
  }

  movetoPage(p) {
    this.page = p;
  }

  previousPage() {
    this.isMsgLoad = true;
    --this.page;
    let obj = {
      device_id: this.currentDevice.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit - 50
    }
    if (this.fDate != '' && this.tDate != '') {
      obj['fDate'] = this.fDate;
      obj['tDate'] = this.tDate;
    }
    if (this.target != '') { obj['target'] = this.target; }
    if (this.target_type != '') { obj['target_type'] = this.target_type; }
    if (this.sent_by != '') { obj['sent_by'] = parseInt(this.sent_by); }
    if (this.status != '') { obj['status'] = this.status; }
    this.AS.getMessageList(obj).subscribe(ml => {
      this.messageList = ml
      this.currentPageLimit -= 50
      this.isMsgLoad = false;
    })
  }

  nextPage() {
    this.isMsgLoad = true;
    ++this.page;
    let obj = {
      device_id: this.currentDevice.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit + 50
    }
    if (this.fDate != '' && this.tDate != '') {
      obj['fDate'] = this.fDate;
      obj['tDate'] = this.tDate;
    }
    if (this.target != '') { obj['target'] = this.target; }
    if (this.target_type != '') { obj['target_type'] = this.target_type; }
    if (this.sent_by != '') { obj['sent_by'] = parseInt(this.sent_by); }
    if (this.status != '') { obj['status'] = this.status; }
    // console.log(obj);

    this.AS.getMessageList(obj).subscribe(ml => {
      this.messageList = ml
      this.currentPageLimit += 50
      this.isMsgLoad = false;
    })
  }

  search() {
    this.page = 0;
    this.isMsgLoad = true;
    this.currentPageLimit = 0
    let obj = {
      device_id: this.currentDevice.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit
    }

    let t = new Date()
    let fd = new Date(this.f_date)
    let tz = t.getTimezoneOffset() / 60
    if (this.f_date != '' && this.t_date != '') {
      fd.setDate(fd.getDate() - 1)
      let fh = 24 + tz;
      let m = (fd.getMonth() + 1).toString()
      let d = fd.getDate().toString()
      if (parseInt(m) < 10) { m = '0' + m }
      if (parseInt(d) < 10) { d = '0' + d }
      this.fDate = fd.getFullYear() + '-' + m + '-' + d + 'T' + fh + ':00:00.000Z';

      let th = 23 + tz;
      this.tDate = this.t_date + 'T' + th + ':59:59.999Z';

      // let qry = { createdAt: { $gte: new Date("2021-09-30T19:00:00.000Z"), $lte: new Date("2021-10-03T18:59:59.999Z") } }
      obj['fDate'] = this.fDate;
      obj['tDate'] = this.tDate;
    }
    if (this.target != '') { obj['target'] = this.target; }
    if (this.target_type != '') { obj['target_type'] = this.target_type; }
    if (this.sent_by != '') { obj['sent_by'] = parseInt(this.sent_by); }
    if (this.status != '') { obj['status'] = this.status; }
    this.AS.getMessageList(obj).subscribe(ml => {
      this.messageList = ml
      // this.currentPageLimit += 50
      this.isMsgLoad = false;
    })

  }

  clean() {
    this.target_type = ''
    this.target = ''
    this.status = ''
    this.sent_by = ''
    this.f_date = ''
    this.t_date = ''
  }

  filters() {
    this.showFilter = !this.showFilter;
  }

  logout() {
    localStorage.removeItem('SMS');
    localStorage.removeItem('SMSID');
    this.router.navigateByUrl('/sessions/signin');
  }

  // GREENAPI

  openGreenApi(device, index) {
    this.creatGraph(device, index);
    this.clean()
    this.isLoad = true;
    this.isMsgLoad = true;
    this.deviceActive = false;
    this.qrShow = false;
    this.currentDevice = device;
    this.currentIndex = index;
    this.authStatus = '';
    this.connection = '';
    this.currentPageLimit = 0;
    this.getGreenApiStatus(device, index);
    let obj = {
      device_id: device.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit
    }
    this.AS.getMessageList(obj).subscribe(ml => {
      this.messageList = ml
      this.isMsgLoad = false;
    })
  }

  getGreenApiStatus(device, index) {
    this.AS.getGreenApiStatus(device).subscribe(res => {
      this.isLoad = false;
      if (res.statusInstance == 'online') {
        this.authStatus = 'Authenticated'
        this.connection = 'Active'
      } else {
        let url = https://api.green-api.com/waInstance${device.device_id}/qr/${device.token}
        this.AS.getGreenApiQrCode(url).subscribe(qrRes => {
          console.log(qrRes);
          if (qrRes.type == 'qrCode') {
            this.qrSrc = data:image/png;base64,${qrRes['message']}
            this.authStatus = 'Scan QR code'
            this.connection = 'Inactive'
            this.qrShow = true;
          } else if (qrRes.type == 'alreadyLogged') {
            this.authStatus = 'Authenticated'
            this.connection = 'Inactive'
            setTimeout(() => { this.refreshingGreenApi() }, 10000)
          }
        })
      }
    })
  }


  refreshingGreenApi() {
    if (this.authStatus != 'Authenticated') {
      this.deviceActive = false;
      this.qrShow = false;
      let obj = this.currentDevice;
      obj['user_id'] = this.currentUser._id
      this.AS.getGreenApiStatus(obj).subscribe(res => {
        this.isLoad = false;
        if (res.statusInstance == 'online') {
          this.authStatus = 'Authenticated'
          this.connection = 'Active'
        } else {
          let url = https://api.green-api.com/waInstance${obj.device_id}/qr/${obj.token}
          this.AS.getGreenApiQrCode(url).subscribe(qrRes => {
            if (qrRes.type == 'qrCode') {
              this.qrSrc = data:image/png;base64,${qrRes['message']}
              this.authStatus = 'Scan QR code'
              this.connection = 'Inactive'
              this.qrShow = true;
            } else if (qrRes.type == 'alreadyLogged') {
              this.authStatus = 'Authenticated'
              this.connection = 'Inactive'
              setTimeout(() => { this.refreshingGreenApi() }, 10000)
            }
          })
        }
      }, err => {
        this.errMessage = 'Unfortunately a network issue has been occurred, please reboot the session'
        this.isLoad = false
      })
    }
    // setTimeout(() => { this.refreshingDevice() }, 12000)
  }

  logoutGreenApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id
    this.AS.logoutGreenApi(obj).subscribe(result => {
      this.openDevice(device, index);
    })
  }

  rebootGreenApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id
    this.AS.rebootGreenApi(obj).subscribe(result => {
      alert('Reboot successfully..')
    }, err => {
      alert(err.error.message);
    })
  }


  //MAYTAPI


  openMaytApi(device, index) {
    this.creatGraph(device, index);
    this.clean()
    this.isLoad = true;
    this.isMsgLoad = true;
    this.deviceActive = false;
    this.qrShow = false;
    this.currentDevice = device;
    this.currentIndex = index;
    this.authStatus = '';
    this.connection = '';
    this.currentPageLimit = 0;
    this.getMaytApiStatus(device, index);
    let obj = {
      device_id: device.device_id,
      company_id: this.currentUser._id,
      skip: this.currentPageLimit
    }
    this.AS.getMessageList(obj).subscribe(ml => {
      this.messageList = ml
      this.isMsgLoad = false;
    })
  }

  getMaytApiStatus(device, index) {
    this.AS.getMaytApiStatus(device).subscribe(res => {
      this.isLoad = false;
      if (res.success && res.status.state) {
        if (res.status.state.state == 'CONNECTED') {
          this.authStatus = 'Authenticated'
          this.connection = 'Active'
        } else if (res.status.state.state == 'TIMEOUT') {
          this.authStatus = 'Authenticated'
          this.connection = 'Inactive'
        } else if (res.status.state.state == 'UNPAIR') {
          this.authStatus = 'Scan QR code'
          this.connection = 'Inactive'
          let url = https://api.maytapi.com/api/${PRODUCT_ID}/${device.device_id}/qrCode
          this.AS.getQrCode(url).subscribe(qrRes => {
            // console.log(qrRes);
            this.createImageFromBlob(qrRes);
          })
        }
      } else {
        if (res.status.isQr) {
          let url = https://api.maytapi.com/api/${PRODUCT_ID}/${device.device_id}/qrCode
          this.AS.getQrCode(url).subscribe(qrRes => {
            // console.log(qrRes);
            this.createImageFromBlob(qrRes);
          })
        } else {
          setTimeout(() => { this.refreshingMaytApi() }, 10000)
        }
      }
    })
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrSrc = reader.result.toString().replace('application/json', 'image/png');
      this.authStatus = 'Scan QR code'
      this.connection = 'Inactive'
      this.qrShow = true;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  refreshingMaytApi() {
    if (this.authStatus != 'Authenticated') {
      this.deviceActive = false;
      this.qrShow = false;
      let obj = this.currentDevice;
      obj['user_id'] = this.currentUser._id
      this.AS.getMaytApiStatus(obj).subscribe(res => {
        this.isLoad = false;
        if (res.success && res.status.state) {
          if (res.status.state.state == 'CONNECTED') {
            this.authStatus = 'Authenticated'
            this.connection = 'Active'
          } else if (res.status.state.state == 'TIMEOUT') {
            this.authStatus = 'Authenticated'
            this.connection = 'Inactive'
          } else if (res.status.state.state == 'UNPAIR') {
            let url = https://api.maytapi.com/api/${PRODUCT_ID}/${this.currentDevice.device_id}/qrCode
            this.AS.getQrCode(url).subscribe(qrRes => {
              this.createImageFromBlob(qrRes);
            })
          }
        } else {
          if (res.status.isQr) {
            let url = https://api.maytapi.com/api/${PRODUCT_ID}/${this.currentDevice.device_id}/qrCode
            this.AS.getQrCode(url).subscribe(qrRes => {
              this.createImageFromBlob(qrRes);
            })
          } else {
            setTimeout(() => { this.refreshingMaytApi() }, 10000)
          }
        }
      }, err => {
        this.errMessage = 'Unfortunately a network issue has been occurred, please reboot the session'
        this.isLoad = false
      })
    }
    // setTimeout(() => { this.refreshingDevice() }, 12000)
  }

  logoutMaytApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id
    this.AS.logoutMaytApi(obj).subscribe(result => {
      this.openDevice(device, index);
    })
  }

  rebootMaytApi(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id
    this.AS.rebootMaytapi(obj).subscribe(result => {
      alert('Reboot successfully..')
    }, err => {
      alert(err.error.message);
    })
  }


  //CHATAPI


  openDevice(device, index) {
    if (device.wa_api_platform == 'chatapi') {
      this.creatGraph(device, index);
      this.clean()
      this.isLoad = true;
      this.isMsgLoad = true;
      this.deviceActive = false;
      this.qrShow = false;
      this.currentDevice = device;
      this.currentIndex = index;
      this.authStatus = '';
      this.connection = '';
      this.currentPageLimit = 0;
      this.getDeviceStatus(device, index);
      let obj = {
        device_id: device.device_id,
        company_id: this.currentUser._id,
        skip: this.currentPageLimit
      }
      this.AS.getMessageList(obj).subscribe(ml => {
        this.messageList = ml
        this.isMsgLoad = false;
      })
    } else if (device.wa_api_platform == 'maytapi') {
      this.openMaytApi(device, index)
    } else if (device.wa_api_platform == 'greenapi') {
      this.openGreenApi(device, index)
    }
  }

  public getDeviceStatus(device, index) {
    let obj = device;
    this.errMessage = ''
    obj['user_id'] = this.currentUser._id
    this.AS.getDeviceStatus(obj).subscribe(res => {
      this.isLoad = false;
      // console.log(res);
      if (res['accountStatus'] == 'authenticated') {
        if (res['statusData'].substatus == 'phone') {
          this.authStatus = 'Authenticated'
          this.connection = 'Inactive'
        } else {
          this.authStatus = 'Authenticated'
          this.connection = 'Active'
        }

      } else if (res['accountStatus'] == 'got qr code') {
        this.authStatus = 'Scan QR code'
        this.connection = 'Inactive'
        this.qrShow = true;
        this.qrSrc = res['qrCode'];
        // setTimeout(() => { this.openDevice(device, index) }, 10000)
      }
    }, err => {
      this.errMessage = 'Unfortunately a network issue has been occurred, please reboot the session'
      this.isLoad = false
    })
  }

  refreshingDevice() {
    if (this.authStatus != 'Authenticated') {
      this.deviceActive = false;
      this.qrShow = false;
      let obj = this.currentDevice;
      obj['user_id'] = this.currentUser._id
      this.AS.getDeviceStatus(obj).subscribe(res => {
        this.isLoad = false;
        if (res['accountStatus'] == 'authenticated') {
          if (res['statusData'].substatus == 'phone') {
            this.authStatus = 'Authenticated'
            this.connection = 'Inactive'
          } else {
            this.authStatus = 'Authenticated'
            this.connection = 'Active'
          }

        } else if (res['accountStatus'] == 'got qr code') {
          this.authStatus = 'Scan QR code'
          this.connection = 'Inactive'
          this.qrShow = true;
          this.qrSrc = res['qrCode'];
        }
      }, err => {
        this.errMessage = 'Unfortunately a network issue has been occurred, please reboot the session'
        this.isLoad = false
      })
    }
    // setTimeout(() => { this.refreshingDevice() }, 12000)
  }

  logoutDevice(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id
    this.AS.logoutDevice(obj).subscribe(result => {
      this.openDevice(device, index);
    })
  }

  rebootDevice(device, index) {
    let obj = device;
    obj['user_id'] = this.currentUser._id
    this.AS.rebootDevice(obj).subscribe(result => {
      alert('Reboot successfully..')
    }, err => {
      alert(err.error.message);
    })
  }
}