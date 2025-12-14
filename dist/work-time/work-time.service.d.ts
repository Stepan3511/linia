import { PrismaService } from 'src/prisma.service';
import { WorkTimeDto } from './dto/work-time.dto';
export declare class WorkTimeService {
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
    create(dto: WorkTimeDto): Promise<{
        id: string;
        from: string | null;
        to: string | null;
        message: string | null;
    }>;
    update(id: string, dto: WorkTimeDto): Promise<{
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
