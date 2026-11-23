import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({message: 'Title is required'})
    title: string;

    @IsString()
    @IsOptional()
    description? : string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
    @IsOptional()
    dueDate?: string;
}
