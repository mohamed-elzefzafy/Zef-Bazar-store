import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
@IsNotEmpty({message : "title can't be empty"})
@IsString()
      title:string;
  
      @IsNotEmpty({message : "description can't be empty"})
      @IsString()
      description:string;
    
      @IsNotEmpty({message : "price can't be empty"})
      @IsNumber({maxDecimalPlaces : 2} , {message : "price should be a number"})
      @IsPositive({message : "price should be a positive number"})
      price:number;
 
      @IsNotEmpty({message : "stock can't be empty"})
      @IsNumber({} , {message : "stock should be a number"})
      @Min(0 , {message : "stock can't be negative"} )
      stock:number;
   
      @IsNotEmpty({message : "images can't be empty"})
      @IsArray({message : "images should be an array"})
      images:string[];

      @IsNotEmpty({message : "category can't be empty"})
      @IsNumber({} , {message : "category should be a number"})
      categoryId :number;
    
}
