import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';
import {
  CornerDotType,
  CornerSquareType,
  DotType,
  NgxQrcodeStylingComponent,
  Options,
  ShapeType,
} from 'ngx-qrcode-styling';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css'],
})
export class QrPageComponent {
  @ViewChild(NgxQrcodeStylingComponent)
  qrCodeComponent!: NgxQrcodeStylingComponent;

  public qrText: string = 'https://www.facebook.com/';
  public width: number = 300;
  public height: number = 300;
  public margin: number = 0;
  public image: string =
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

  public dotsColorType: string = '#000000';
  public singleColor: string = '#000000';
  public startColor: string = '#2BE531';
  public endColor: string = '#F31D23';
  public shape: ShapeType = 'circle';
  public selectedShape: string = 'square';

  public imageSize: number = 30; // New Image Size Option
  public imagePosition: string = 'center';

  // Corners Square Options
  public cornersSquareType: CornerSquareType = 'square';
  public cornersSquareColorType: string = 'single';
  public cornersSquareSingleColor: string = '#000000';
  public cornersSquareStartColor: string = '#FF12FF';
  public cornersSquareEndColor: string = '#E09515';

  // Rounded & Rotation
  public cornersSquareRoundedType: string = 'radial';
  public cornersSquareRotation: number = 0;

  // Corners Dots Options
  public cornersDotsType: string = 'square';
  public cornersDotsColorType: string = 'single';
  public cornersDotsSingleColor: string = '#000000';
  public cornersDotsStartColor: string = '#34C3FF';
  public cornersDotsEndColor: string = '#E02323';

  // Background Options
  public bgColorType: string = 'single';
  public bgSingleColor: string = '#ffffff';
  public bgStartColor: string = '#FFFF00';
  public bgEndColor: string = '#333333';

  public config: Options = {
    width: this.width,
    height: this.height,
    data: this.qrText,
    margin: this.margin,
    image: this.image,
    shape: this.shape,
    dotsOptions: {
      type: this.selectedShape as DotType,
      color: this.singleColor,
    },
    cornersSquareOptions: {
      type: this.cornersSquareType as CornerSquareType,
      color: this.cornersSquareSingleColor,
    },
    cornersDotOptions: {
      type: this.cornersDotsType as CornerDotType,
      color: this.cornersDotsSingleColor,
    },
    backgroundOptions: {
      color: this.bgSingleColor,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      imageSize: this.imageSize / 100,
    },
  };

  constructor(private qrcodeService: QrcodeService, private router: Router) {}

  currentUser: any;

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user_details'));
    this.currentUser = user;
    console.log(user);
    if (user) {
      this.router.navigateByUrl('/sessions/signin');
    }
  }

  activeModalIndex = 0; // Initially, first tab is active

  setModalActive(index: number) {
    this.activeModalIndex = index;
  }

  activeButton: string = 'universal';

  inputUniversalTitleName: string = '';
  inputUniversalPreferenceText: string = '';
  universalQrData: string = '';
  universalQrString: string = '';
  openUniversalQrCustomize = false;

  inputSmartTitleName: string = '';
  inputSmartPickup: string = '';
  smartQrData: string = '';

  haveUniversal = true;
  haveSmart = true;

  @ViewChild('qrCanvas') qrCanvas!: ElementRef;

  setActive(buttonType: string) {
    this.activeButton = buttonType;
  }

  // universal qr code

  generateUniversalQRCode() {
    const dataObject = {
      name: this.inputUniversalTitleName,
      type: 'text',
      text: this.inputUniversalPreferenceText,
      userId: this.currentUser._id,
    };
    this.universalQrData = JSON.stringify(dataObject);

    this.qrcodeService.generateCode(dataObject).subscribe((res) => {
      console.log(res);
      this.universalQrString = res.URL;

      setTimeout(() => {
        const qrElement = document.querySelector(
          'ngx-qrcode-styling'
        ) as HTMLElement;

        if (qrElement) {
          html2canvas(qrElement)
            .then((canvas) => {
              const qrImgBase64 = canvas.toDataURL('image/png');

              // Convert Base64 to Blob
              const qrBlob = this.base64ToBlob(qrImgBase64, 'image/png');

              // Create FormData
              const formData = new FormData();
              formData.append('qrCodeImage', qrBlob, 'qrcode.png');

              console.log('FormData:', formData);

              // Send to backend
              this.qrcodeService.SaveQrImg(res._id, formData).subscribe(
                (qrRes) => console.log('QR saved:', qrRes),
                (qrErr) => console.log('QR save error:', qrErr)
              );
            })
            .catch((err) => console.log('QR capture error:', err));
        } else {
          console.error('QR element not found!');
        }
      }, 2000);
    });
  }

  // Function to convert Base64 to Blob
  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }

  downloadUniversalQRCode() {
    setTimeout(() => {
      const canvas = document.querySelector(
        'qrcode canvas'
      ) as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      } else {
        console.error('Canvas not found.');
      }
    }, 500); // Ensure QR code is rendered before downloading
  }

  // Smart location qr code

  generateSmartQRCode() {
    const dataObject = {
      titleName: this.inputSmartTitleName,
      pickupLocation: this.inputSmartPickup,
    };
    this.smartQrData = JSON.stringify(dataObject);
  }

  downloadSmartQRCode() {
    setTimeout(() => {
      const canvas = document.querySelector(
        'qrcode canvas'
      ) as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      } else {
        console.error('Canvas not found.');
      }
    }, 500); // Ensure QR code is rendered before downloading
  }
}
