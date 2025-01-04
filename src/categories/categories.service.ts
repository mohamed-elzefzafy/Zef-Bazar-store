import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepositry : Repository<CategoryEntity>
  ){}
  create(createCategoryDto: CreateCategoryDto , currentUser) : Promise<CategoryEntity> {
    const category = this.categoryRepositry.create(createCategoryDto);
    category.addedBy = currentUser;
    return this.categoryRepositry.save(category);
  }

  findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepositry.find();
  }

  public async findOne(id: number): Promise<CategoryEntity> {
  const category = await this.categoryRepositry.findOne({
    where : {id},
    relations : {addedBy : true},
    select : {addedBy : {id : true , name : true , email : true} },
  });
  if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  public async update(id: number, updateCategoryDto: Partial<UpdateCategoryDto>): Promise<CategoryEntity> {
    const category = await this.findOne(id);
      Object.assign(category, updateCategoryDto);
      await this.categoryRepositry.save(category);
      return category;
  }

  public async remove(id: number) {
    const category = await this.findOne(id);

      await this.categoryRepositry.remove(category);
      return {message : "Removed category succefully"};
  }
}
