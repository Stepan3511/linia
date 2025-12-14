import { WorkTimeService } from './work-time.service';
import { WorkTimeDto } from './dto/work-time.dto';
export declare class WorkTimeController {
    private readonly workTimeService;
    constructor(workTimeService: WorkTimeService);
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
