import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';
import {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  NgxQrcodeStylingComponent,
  Options,
  ShapeType,
  TypeNumber,
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
  allQrCodes: any = null;
  activeQrDetails: any = null;
  showUniversalQrGenerator = false;

  isQrListTitleEditable = true;
  isQrListDescriptionEditable = true;
  qrListTitle: string = '';
  qrListDescription: string = '';

  isDeleteModalOpen = false;
  deleteIndex: any;
  isChecked = false;

  isNotCustomizable = true;

  currentQrId = '';

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user_details'));
    this.currentUser = user;
    console.log(user);
    if (user) {
      this.router.navigateByUrl('/sessions/signin');
    }

    this.qrcodeService.getAllQrCodes(this.currentUser._id).subscribe((res) => {
      this.allQrCodes = res;
      if (res.length == 0) {
        this.showUniversalQrGenerator = true;
      }
    });
  }

  showLoader: boolean = true;

  activeModalIndex = 0; // Initially, first tab is active

  setModalActive(index: number) {
    this.activeModalIndex = index;
  }

  activeButton: string = 'universal';

  inputUniversalTitleName: string = '';
  inputUniversalPreferenceText: string = '';
  universalQrData: string = '';
  universalQrString: any = '';
  openUniversalQrCustomize = false;
  openUniversalQrCustomizeFromDetails = false;

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
    this.isNotCustomizable = true;
    const dataObject = {
      name: this.inputUniversalTitleName,
      type: 'text',
      text: this.inputUniversalPreferenceText,
      userId: this.currentUser._id,
    };
    this.universalQrData = JSON.stringify(dataObject);

    this.qrcodeService.generateCode(dataObject).subscribe((res) => {
      console.log(res);
      this.universalQrString = `${res.URL}`;
      this.currentQrId = res._id;

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
                (qrRes) => {
                  let user = JSON.parse(localStorage.getItem('user_details'));
                  this.currentUser = user;
                  console.log(qrRes);

                  this.qrcodeService
                    .getAllQrCodes(this.currentUser._id)
                    .subscribe((res) => {
                      this.allQrCodes = res;
                    });
                },
                (qrErr) => console.log('QR save error:', qrErr)
              );
            })
            .catch((err) => console.log('QR capture error:', err));
        } else {
          console.error('QR element not found!');
        }
        this.showLoader = false;
        this.isNotCustomizable = false;
      }, 4000);
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

  selectedItemIndex: number | null = null;
  currentQr = null;
  activeQrId = null;

  toggleDetails(index: number): void {
    this.currentQr = '';
    console.log(this.allQrCodes);

    if (this.selectedItemIndex !== index) {
      let qrCodeId = this.allQrCodes[index]._id;
      this.qrListTitle = this.allQrCodes[index].name;
      this.qrListDescription = this.allQrCodes[index].text;
      this.currentQr = this.allQrCodes[index].url;
      this.activeQrId = this.allQrCodes[index]._id;

      this.qrcodeService.getQrCodeDetails(qrCodeId).subscribe((res) => {
        this.activeQrDetails = res;

        console.log(this.currentQr);

        // After content loads, scroll to bottom if it's the last item
        if (index === this.allQrCodes.length - 1) {
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }, 200); // Delay ensures content is rendered
        }
      });
    }

    this.selectedItemIndex = this.selectedItemIndex === index ? null : index;
    this.isQrListTitleEditable = true;
    this.isQrListDescriptionEditable = true;
  }

  deleteQr(index: number = this.deleteIndex) {
    let qrCodeId = this.allQrCodes[index]._id;
    this.qrcodeService.deleteQrCode(qrCodeId).subscribe((res) => {
      console.log(res);
      this.allQrCodes.splice(index, 1); // Remove the deleted QR code from the list
      this.toggleDetails(index);
      if (this.allQrCodes.length == 0) {
        this.showUniversalQrGenerator = true;
      }
    });
  }

  updateQrTitle(index) {
    let qrCodeId = this.activeQrDetails._id;

    const dataObject = {
      name: this.qrListTitle,
      text: this.activeQrDetails.text,
    };
    this.qrcodeService.updateQrCode(qrCodeId, dataObject).subscribe((res) => {
      console.log(res);
      this.allQrCodes[index].name = this.qrListTitle;
      this.allQrCodes[index].text = this.qrListDescription;

      this.isQrListTitleEditable = true;
    });
  }

  cancelQrTitle(index) {
    this.qrListTitle = this.activeQrDetails.name;
    this.isQrListTitleEditable = true;
  }

  updateQrText(index) {
    let qrCodeId = this.activeQrDetails._id;

    const dataObject = {
      name: this.activeQrDetails.name,
      text: this.qrListDescription,
    };
    this.qrcodeService.updateQrCode(qrCodeId, dataObject).subscribe((res) => {
      console.log(res);
      this.allQrCodes[index].name = this.qrListTitle;
      this.allQrCodes[index].text = this.qrListDescription;

      this.isQrListDescriptionEditable = true;
    });
  }

  cancelQrText(index) {
    this.qrListDescription = this.activeQrDetails.text;
    this.isQrListDescriptionEditable = true;
  }

  updateQrStatus(index: number, status: string) {
    let qrCodeId = this.allQrCodes[index]._id;
    const dataObject = {
      status: status,
    };
    this.qrcodeService
      .updateQrCodeStatus(qrCodeId, dataObject)
      .subscribe((res) => {
        console.log(res);
        this.allQrCodes[index].status = status;
      });
  }

  downloadQrCode(url: string, filename: string = 'image.jpg') {
    // Fetch the image as a blob to avoid CORS issues
    fetch(url, { mode: 'cors' })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl); // Clean up
      })
      .catch((error) => console.error('Download failed:', error));
  }

  downloadGenQrCode() {
    fetch(this.allQrCodes[this.allQrCodes.length - 1].qrCodeImage, {
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'image.jpg';
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl); // Clean up
      })
      .catch((error) => console.error('Download failed:', error));
  }

  directToQrStats(index: number) {
    this.router.navigate(['chatbot/QR-code/QR-stats'], {
      queryParams: {
        qrId: this.allQrCodes[index]._id,
        title: this.allQrCodes[index].name,
      },
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.activeQrDetails.url).then(() => {
      alert('URL copied to clipboard!');
    });
  }

  copyQrLink() {
    navigator.clipboard
      .writeText(this.allQrCodes[this.allQrCodes.length - 1].qrCodeImage)
      .then(() => {
        alert('URL copied to clipboard!');
      });
  }

  toggleDeleteModal(i) {
    if (!this.isDeleteModalOpen) {
      this.isDeleteModalOpen = true;
      this.deleteIndex = i;
    } else {
      this.isDeleteModalOpen = false;
      this.deleteIndex = null;
    }
  }

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  qrShouldRender = true;
  cShowQrLoader = false;

  dotStyle: DotType = 'rounded';
  selectedDotStyle: DotType = 'rounded';

  dotColor = 'black';
  selectedDotColor = 'black';

  dotGradient1 = '';
  dotGradient2 = '';

  eyeExternal: CornerSquareType = 'square';
  selectedEyeExternal: CornerSquareType = 'square';
  eyeInternal: CornerDotType = 'square';
  selectedEyeInternal: CornerDotType = 'square';

  eyeColor = 'black';

  eyeGradient1 = '';
  eyeGradient2 = '';

  bgColor = 'white';

  bgGradient1 = '';
  bgGradient2 = '';

  typeNum: TypeNumber = 0;

  errorCorrection: ErrorCorrectionLevel = 'H';

  logoDataUrl = '';

  isGradient: boolean = false;

  regenQr() {
    this.qrShouldRender = false;
    // this.cShowQrLoader = true;

    setTimeout(() => {
      // this.cShowQrLoader = false;
      this.qrShouldRender = true;
    }, 0); // 1.5 seconds
  }

  resetQr() {
    this.dotStyle = 'rounded';
    this.selectedDotStyle = 'rounded';

    this.dotColor = 'black';
    this.selectedDotColor = 'black';

    this.dotGradient1 = '';
    this.dotGradient2 = '';

    this.eyeExternal = 'square';
    this.selectedEyeExternal = 'square';
    this.eyeInternal = 'square';
    this.selectedEyeInternal = 'square';

    this.eyeColor = 'black';

    this.eyeGradient1 = '';
    this.eyeGradient2 = '';

    this.bgColor = 'white';

    this.bgGradient1 = '';
    this.bgGradient2 = '';

    this.errorCorrection = 'H';

    this.logoDataUrl = '';

    this.isGradient = false;

    // this.universalQrData = '';
    // this.universalQrString = '';
    this.showUniversalQrGenerator = false;
  }

  // qrCombo to cover all possible combinations for dot and corner styles
  qrCombo:
    | 'dotSolid_cornerSolid_solidBg'
    | 'dotSolid_cornerSolid_gradientBg'
    | 'dotSolid_cornerGradient_solidBg'
    | 'dotSolid_cornerGradient_gradientBg'
    | 'dotGradient_cornerSolid_solidBg'
    | 'dotGradient_cornerSolid_gradientBg'
    | 'dotGradient_cornerGradient_solidBg'
    | 'dotGradient_cornerGradient_gradientBg' = 'dotSolid_cornerSolid_solidBg';

  // Function to set QR style based on dot and corner styles
  setQRStyle(
    dotGradient: boolean,
    cornerGradient: boolean,
    bgGradient: boolean
  ) {
    if (dotGradient && cornerGradient && bgGradient) {
      this.qrCombo = 'dotGradient_cornerGradient_gradientBg';
    } else if (dotGradient && cornerGradient && !bgGradient) {
      this.qrCombo = 'dotGradient_cornerGradient_solidBg';
    } else if (dotGradient && !cornerGradient && bgGradient) {
      this.qrCombo = 'dotGradient_cornerSolid_gradientBg';
    } else if (dotGradient && !cornerGradient && !bgGradient) {
      this.qrCombo = 'dotGradient_cornerSolid_solidBg';
    } else if (!dotGradient && cornerGradient && bgGradient) {
      this.qrCombo = 'dotSolid_cornerGradient_gradientBg';
    } else if (!dotGradient && cornerGradient && !bgGradient) {
      this.qrCombo = 'dotSolid_cornerGradient_solidBg';
    } else if (!dotGradient && !cornerGradient && bgGradient) {
      this.qrCombo = 'dotSolid_cornerSolid_gradientBg';
    } else {
      this.qrCombo = 'dotSolid_cornerSolid_solidBg';
    }
    this.regenQr();
  }

  cErrorCorrection(c: ErrorCorrectionLevel) {
    this.errorCorrection = c;
    this.regenQr();
  }

  // Function for selecting dot style
  cDotStyle(s: DotType) {
    this.dotStyle = s;
    this.selectedDotStyle = s;
    this.regenQr();
  }

  // Function for selecting dot color (solid)
  cDotColor(color: string) {
    this.dotColor = color;
    this.selectedDotColor = color;

    const cornerGradient = this.qrCombo.includes('cornerGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(false, cornerGradient, bgGradient);
    this.regenQr();
  }

  // Function for selecting dot gradient
  cDotGradient(c1: string, c2: string) {
    this.dotGradient1 = c1;
    this.dotGradient2 = c2;

    const cornerGradient = this.qrCombo.includes('cornerGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(true, cornerGradient, bgGradient);
    this.regenQr();
  }

  pDotGradient() {
    const cornerGradient = this.qrCombo.includes('cornerGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(true, cornerGradient, bgGradient);
    this.regenQr();
  }

  // Function for selecting eye (corner) color (solid)
  cEyeColor(color: string) {
    this.eyeColor = color;

    const dotGradient = this.qrCombo.includes('dotGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(dotGradient, false, bgGradient);
    this.regenQr();
  }

  // Function for selecting eye (corner) gradient
  cEyeGradient(c1: string, c2: string) {
    // this.eyeColor = '';
    this.eyeGradient1 = c1;
    this.eyeGradient2 = c2;

    const dotGradient = this.qrCombo.includes('dotGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(dotGradient, true, bgGradient);
    this.regenQr();
  }

  pEyeGradient() {
    const dotGradient = this.qrCombo.includes('dotGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(dotGradient, true, bgGradient);
    this.regenQr();
    console.log(this.eyeGradient1, this.eyeGradient2);
  }

  // Function for selecting internal eye shape
  cEyeInternal(s: CornerDotType) {
    this.eyeInternal = s;
    this.selectedEyeInternal = s;
    this.regenQr();
  }

  // Function for selecting external eye shape
  cEyeExternal(s: CornerSquareType) {
    this.eyeExternal = s;
    this.selectedEyeExternal = s;
    this.regenQr();
  }

  // Function for selecting background color (solid)
  cBgColor(color: string) {
    this.bgColor = color;
    this.setQRStyle(
      this.qrCombo.includes('dotGradient'),
      this.qrCombo.includes('cornerGradient'),
      false
    );
    this.regenQr();
  }

  // Function for selecting background gradient
  cBgGradient(c1: string, c2: string) {
    console.log(c1, c2);
    this.bgGradient1 = c1;
    this.bgGradient2 = c2;
    this.setQRStyle(
      this.qrCombo.includes('dotGradient'),
      this.qrCombo.includes('cornerGradient'),
      true
    );
    this.regenQr();
  }

  pBgGradient() {
    this.setQRStyle(
      this.qrCombo.includes('dotGradient'),
      this.qrCombo.includes('cornerGradient'),
      true
    );
    this.regenQr();
  }

  // Function for uploading a logo
  cImg(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File | null = target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoDataUrl = reader.result as string;
        this.regenQr(); // ✅ Now it runs AFTER logoDataUrl is set
      };
      reader.readAsDataURL(file);
    } else {
      this.regenQr(); // Fallback if no file selected
    }
  }

  saveBtnText = 'Save Changes';

  cSaveQr() {
    this.saveBtnText = 'Saving...';
    const qrElement = document.querySelector(
      'ngx-qrcode-styling'
    ) as HTMLElement;

    setTimeout(() => {
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
            this.qrcodeService
              .updateQrImg(this.currentQrId, formData)
              .subscribe(
                (qrRes) => {
                  let user = JSON.parse(localStorage.getItem('user_details'));
                  this.currentUser = user;
                  console.log(qrRes);

                  this.openUniversalQrCustomize = false;
                  this.saveBtnText = 'Save Changes';
                  this.qrcodeService
                    .getAllQrCodes(this.currentUser._id)
                    .subscribe((res) => {
                      this.allQrCodes = res;
                    });
                },
                (qrErr) => console.log('QR save error:', qrErr)
              );
          })
          .catch((err) => console.log('QR capture error:', err));
      } else {
        console.error('QR element not found!');
      }
    }, 4000);
    this.resetQr();
  }

  cSaveQrFromDetails() {
    this.saveBtnText = 'Saving...';
    const qrElement = document.querySelector(
      'ngx-qrcode-styling'
    ) as HTMLElement;

    setTimeout(() => {
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
            this.qrcodeService.updateQrImg(this.activeQrId, formData).subscribe(
              (qrRes) => {
                let user = JSON.parse(localStorage.getItem('user_details'));
                this.currentUser = user;
                console.log(qrRes);

                this.openUniversalQrCustomizeFromDetails = false;
                this.saveBtnText = 'Save Changes';
                this.qrcodeService
                  .getAllQrCodes(this.currentUser._id)
                  .subscribe((res) => {
                    this.allQrCodes = res;
                  });
              },
              (qrErr) => console.log('QR save error:', qrErr)
            );
          })
          .catch((err) => console.log('QR capture error:', err));
      } else {
        console.error('QR element not found!');
      }
    }, 4000);
    this.resetQr();
  }

  cDownloadQr() {
    const qrElement = document.querySelector(
      'ngx-qrcode-styling'
    ) as HTMLElement;

    const canvas = qrElement.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      link.click();
    } else {
      console.error('Canvas not found in QR element.');
    }
  }

  qrDetailImgLoader = false;
  qrDetailImgLoad() {
    this.qrDetailImgLoader = true;
    setTimeout(() => {
      this.qrDetailImgLoader = false;
    }, 1000);
  }
}
