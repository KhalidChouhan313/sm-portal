import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminService, BotService, BookingsService } from 'src/services';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  constructor(
    private router: Router,
    private AS: AdminService,
    private BKS: BookingsService,
    private QR: QrcodeService
  ) {}

  currentUser: any;
  wabaDeviceDetails: any;
  deviceList = [];
  haveWabaDevice = false;
  selectedDevice: any;
  showDeviceList = false;
  chatList: any = [];

  isIncoming = false;
  isOutgoing = false;
  contactList: any = [];
  contactDetailList: any = [];
  contactLastMsgList: any = [];
  textMessage: string = '';

  ngOnInit(): void {
    // this.AS.getCurrentUserFromBack().subscribe(() => {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    console.log(this.currentUser);

    if (!this.currentUser) {
      this.router.navigateByUrl('/sessions/signin');
    }
    this.AS.getUser(this.currentUser._id).subscribe((usr) => {
      this.BKS.getCompanyBots(this.currentUser._id).subscribe((admin) => {
        console.log('admin', admin.data[0]);
        this.wabaDeviceDetails = admin.data[0];
        if (admin.data[0].wa_phone_id.length) {
          this.haveWabaDevice = true;
          // this.deviceList.push({
          //   device_id: admin.data[0].wa_phone_id,
          //   device_name: 'Official WhatsApp Account',
          // });
        }
      });
      this.currentUser = usr;
      this.deviceList = usr.wa_api.filter(
        (d) =>
          d.status &&
          (d.wa_api_platform == 'chatapi' ||
            d.wa_api_platform == 'maytapi' ||
            d.wa_api_platform == 'greenapi')
      );
      console.log(this.deviceList);
      this.selectedDevice = this.deviceList[0] || null;
      this.contactId = this.deviceList[0]?.device_id;
      this.contactToken = this.deviceList[0]?.token;
      this.fetchContact();
    });
  }

  selectDevice(i) {
    this.selectedDevice = this.deviceList[i];
    this.showDeviceList = false;
    this.contactId = this.deviceList[i]?.device_id;
    this.contactToken = this.deviceList[i]?.token;

    this.fetchContact();
  }

  selectedContactIndex: any = 0;

  selectContact(i) {
    const obj = {
      chatId: this.contactList[i]?.chatId || '',
      count: 100000,
    };
    this.selectedContactIndex = i;
    this.QR.getChats(this.contactId, this.contactToken, obj).subscribe(
      (res) => {
        this.chatList = res;
        console.log(res);
      }
    );
  }

  fetchChat() {
    const obj = {
      chatId: this.contactList[0]?.chatId || '',
      count: 100000,
    };
    this.QR.getChats(this.contactId, this.contactToken, obj).subscribe(
      (res) => {
        this.chatList = res;
        console.log(res);
      }
    );
  }

  contactId: any;
  contactToken: any;

  fetchContact(limit: number = 180, runCount: number = 1) {
    this.isIncoming = false;
    this.isOutgoing = false;

    forkJoin({
      incoming: this.QR.getUpcoming(limit, this.contactId, this.contactToken),
      outgoing: this.QR.getOutGoing(limit, this.contactId, this.contactToken),
    }).subscribe(({ incoming, outgoing }) => {
      this.isIncoming = true;
      this.isOutgoing = true;

      const merged = [...incoming, ...outgoing];

      const latestByChatId = new Map<string, any>();

      for (const item of merged) {
        if (item.chatId.split('@')[0].length > 13) continue; // Skip chatIds longer than 13

        const existing = latestByChatId.get(item.chatId);
        if (!existing || item.timestamp > existing.timestamp) {
          latestByChatId.set(item.chatId, item);
        }
      }

      this.contactList = Array.from(latestByChatId.values());

      console.log(
        `Run #${runCount} | Limit: ${limit} | Contacts:`,
        this.contactList.length
      );

      if (this.contactList.length >= 15 || runCount >= 4) {
        runCount = 0;
        console.log('Stopping recursion', this.contactList);
        // this.fetchContactDetails();
        // this.fetchContactLastMsg();
        this.fetchContactDataForAll();
        this.fetchChat();
        return;
      }

      setTimeout(() => {
        this.fetchContact(limit + 180, runCount + 1);
      }, 1000);
    });
  }

  // fetchContactDetails() {
  //   const maxRetries = 3;

  //   const delay = (ms: number) =>
  //     new Promise((resolve) => setTimeout(resolve, ms));

  //   const getDetailsWithRetry = async (
  //     item: any,
  //     index: number,
  //     retries = 0
  //   ) => {
  //     const obj = { chatId: item.chatId };

  //     this.QR.getContactDetails(
  //       obj,
  //       this.contactId,
  //       this.contactToken
  //     ).subscribe(
  //       (res) => {
  //         this.contactDetailList[index] = res;
  //         console.log(`Success [${index}]`, res);
  //       },
  //       async (err) => {
  //         console.error(`Failed [${index}] attempt ${retries + 1}`, err);
  //         if (retries < maxRetries) {
  //           await delay(1000); // Retry after 1 second
  //           getDetailsWithRetry(item, index, retries + 1);
  //         } else {
  //           console.warn(
  //             `Giving up on [${index}] after ${maxRetries} attempts.`
  //           );
  //         }
  //       }
  //     );
  //   };

  //   this.contactList.forEach((item, index) => {
  //     setTimeout(() => {
  //       getDetailsWithRetry(item, index);
  //     }, index * 300); // Send one request every second
  //   });
  // }

  // fetchContactLastMsg() {
  //   const maxRetries = 3;

  //   const delay = (ms: number) =>
  //     new Promise((resolve) => setTimeout(resolve, ms));

  //   const getDetailsWithRetry = async (
  //     item: any,
  //     index: number,
  //     retries = 0
  //   ) => {
  //     const obj = {
  //       chatId: item.chatId || '',
  //       count: 1,
  //     };

  //     this.QR.getChats(this.contactId, this.contactToken, obj).subscribe(
  //       (res) => {
  //         this.contactLastMsgList[index] = res;
  //         console.log(`Success [${index}]`, res);
  //       },
  //       async (err) => {
  //         console.error(`Failed [${index}] attempt ${retries + 1}`, err);
  //         if (retries < maxRetries) {
  //           await delay(1000); // Retry after 1 second
  //           getDetailsWithRetry(item, index, retries + 1);
  //         } else {
  //           console.warn(
  //             `Giving up on [${index}] after ${maxRetries} attempts.`
  //           );
  //         }
  //       }
  //     );
  //   };

  //   this.contactList.forEach((item, index) => {
  //     setTimeout(() => {
  //       getDetailsWithRetry(item, index);
  //     }, index * 300); // Send one request every second
  //   });
  // }

  fetchContactDataForAll() {
    const maxRetries = 3;

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const fetchWithRetry = async (
      fn: () => Promise<any>,
      index: number,
      type: string,
      retries = 0
    ): Promise<any> => {
      try {
        const result = await fn();
        console.log(`Success [${index}] - ${type}`, result);
        return result;
      } catch (err) {
        console.error(
          `Failed [${index}] - ${type}, attempt ${retries + 1}`,
          err
        );
        if (retries < maxRetries) {
          await delay(10); // wait 1 sec then retry
          return fetchWithRetry(fn, index, type, retries + 1);
        } else {
          console.warn(
            `Giving up on [${index}] - ${type} after ${maxRetries} attempts.`
          );
          return null;
        }
      }
    };

    const processContact = async (item: any, index: number) => {
      const chatId = item.chatId;

      const contactDetailFn = () =>
        new Promise((resolve, reject) => {
          this.QR.getContactDetails(
            { chatId },
            this.contactId,
            this.contactToken
          ).subscribe(resolve, reject);
        });

      const lastMsgFn = () =>
        new Promise((resolve, reject) => {
          this.QR.getChats(this.contactId, this.contactToken, {
            chatId,
            count: 1,
          }).subscribe(resolve, reject);
        });

      const detail = await fetchWithRetry(
        contactDetailFn,
        index,
        'ContactDetails'
      );
      if (detail) this.contactDetailList[index] = detail;

      // Delay before making the second request
      await delay(1); // half second pause between the two API calls

      const lastMsg = await fetchWithRetry(lastMsgFn, index, 'LastMessage');
      if (lastMsg) this.contactLastMsgList[index] = lastMsg;
    };

    const runSequentially = async () => {
      for (let index = 0; index < this.contactList.length; index++) {
        await processContact(this.contactList[index], index);
        await delay(10); // 1 second between each full contact's processing
      }
    };

    runSequentially();
  }

  loadCount: number = 0;
  isLoading: boolean = false;

  handleScrollAndLoad(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 100;
    const position = target.scrollTop + target.clientHeight;
    const height = target.scrollHeight;

    if (height - position > threshold || this.isLoading) return;

    this.isLoading = true;

    const baseMinutes = 1080; // 24 hours
    const extraMinutes = this.loadCount * 360; // +6 hours per call
    const totalMinutes = baseMinutes + extraMinutes;

    forkJoin({
      incoming: this.QR.getUpcoming(
        totalMinutes,
        this.contactId,
        this.contactToken
      ),
      outgoing: this.QR.getOutGoing(
        totalMinutes,
        this.contactId,
        this.contactToken
      ),
    }).subscribe(
      ({ incoming, outgoing }) => {
        const merged = [...incoming, ...outgoing];
        const newChatMap = new Map<string, any>();

        for (const item of merged) {
          const chatId = item.chatId;
          const numberPart = chatId.split('@')[0];
          if (numberPart.length > 13) continue;

          const exists = this.contactList.some((c) => c.chatId === chatId);
          if (!exists) {
            const current = newChatMap.get(chatId);
            if (!current || item.timestamp > current.timestamp) {
              newChatMap.set(chatId, item);
            }
          }
        }

        const newContacts = Array.from(newChatMap.values());
        this.contactList = [...this.contactList, ...newContacts];

        const maxRetries = 3;
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

        const fetchWithRetry = async (
          fn: () => Promise<any>,
          type: string,
          index: number,
          retries = 0
        ): Promise<any> => {
          try {
            const res = await fn();
            console.log(`Success [${index}] - ${type}`, res);
            return res;
          } catch (err) {
            console.error(
              `Failed [${index}] - ${type}, attempt ${retries + 1}`,
              err
            );
            if (retries < maxRetries) {
              await delay(1000);
              return fetchWithRetry(fn, type, index, retries + 1);
            } else {
              console.warn(
                `Giving up on [${index}] - ${type} after ${maxRetries} attempts.`
              );
              return null;
            }
          }
        };

        const fetchContactData = async (item: any, index: number) => {
          const chatId = item.chatId;

          const contactDetailFn = () =>
            new Promise((resolve, reject) => {
              this.QR.getContactDetails(
                { chatId },
                this.contactId,
                this.contactToken
              ).subscribe(resolve, reject);
            });

          const lastMsgFn = () =>
            new Promise((resolve, reject) => {
              this.QR.getChats(this.contactId, this.contactToken, {
                chatId,
                count: 1,
              }).subscribe(resolve, reject);
            });

          const detail = await fetchWithRetry(
            contactDetailFn,
            'ContactDetails',
            index
          );
          if (detail) this.contactDetailList[index] = detail;

          await delay(500); // small gap between two requests per contact

          const lastMsg = await fetchWithRetry(lastMsgFn, 'LastMessage', index);
          if (lastMsg) this.contactLastMsgList[index] = lastMsg;
        };

        const startIndex = this.contactList.length - newContacts.length;

        // Sequential async processing with delay between each contact
        const processContacts = async () => {
          for (let i = 0; i < newContacts.length; i++) {
            await fetchContactData(newContacts[i], startIndex + i);
            await delay(1000); // Wait 1s between each contact
          }
          this.isLoading = false;
        };

        processContacts();
        this.loadCount++;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getTimeFromTimestamp(ts: number): string {
    const date = new Date(ts * 1000); // Convert to ms

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Jun"
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  sendTextMessage() {
    const obj = {
      chatId: this.contactList[this.selectedContactIndex]?.chatId || '',
      message: this.textMessage,
      customPreview: {},
    };

    this.QR.sendMessage(obj, this.contactId, this.contactToken).subscribe(
      (res) => {
        console.log('Message sent:', res);
        this.textMessage = '';
        this.fetchChat();
        // Optionally
      }
    );
  }
}
