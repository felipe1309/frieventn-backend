import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class GetEventFromListId {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  listIdEvents: string[];
}
