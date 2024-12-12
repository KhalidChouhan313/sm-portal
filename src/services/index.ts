import { BotService } from './bot/bot.service';
import { AdminService } from './admin/admin.service';
import { BookingsService } from './bookings/bookings.service';

export const Services: any[] = [
    BotService,
    AdminService,
    BookingsService
];

export {
    BotService,
    AdminService,
    BookingsService
}