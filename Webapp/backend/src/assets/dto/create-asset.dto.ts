import { IsString, IsOptional, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { AssetType } from '../asset.entity';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AssetType)
  @IsOptional()
  type?: AssetType;

  @IsString()
  @IsOptional()
  content?: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
