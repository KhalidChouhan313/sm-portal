import { Component, ElementRef, ViewChild } from '@angular/core';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';
@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css'],
})
export class QrPageComponent {
  constructor(private qrcodeService: QrcodeService) {}

  activeButton: string = 'universal';

  inputUniversalTitleName: string = '';
  inputUniversalPreferenceText: string = '';
  universalQrData: string = '';

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
    };
    this.universalQrData = JSON.stringify(dataObject);

    this.qrcodeService.generateCode(dataObject).subscribe(
      (res) => {
        console.log(res);
        this.qrcodeService.getCode(res.id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
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
