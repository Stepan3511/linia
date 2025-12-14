import { PrismaService } from 'src/prisma.service';
import { HolidayTimeDto } from './dto/holiday-time.dto';
export declare class HolidayTimeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<{
        id: string;
        from: string | null;
        to: string | null;
        message: string | null;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        from: string | null;
        to: string | null;
        message: string | null;
    }>;
    create(dto: HolidayTimeDto): Promise<{
        id: string;
        from: string | null;
        to: string | null;
        message: string | null;
    }>;
    update(id: string, dto: HolidayTimeDto): Promise<{
        id: string;
        from: string | null;
        to: string | null;
        message: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        from: string | null;
        to: string | null;
        message: string | null;
    }>;
}
