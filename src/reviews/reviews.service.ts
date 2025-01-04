import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) {}
  public async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productService.findOne(
      createReviewDto.productId,
    );
    let review = await this.findOneByUserAndProduct(currentUser, product);
    if (review) {
      Object.assign(review, createReviewDto);
    } else {
      review = this.reviewRepository.create(createReviewDto);
      review.user = currentUser;
      review.product = product;
    }

    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  public async findAllByProduct(productId: number) {
    const product = await this.productService.findOne(productId);
    // if (!product) {
    //   throw new NotFoundException(`Product with id ${productId} not found`);
    // }

    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: { user: true, product: { category: true } },
    });
    return reviews;
  }

  public async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { user: true, product: { category: true } },
    });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  public async remove(id: number) {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
    return { message: 'Removed review successfully'};
  }

  private async findOneByUserAndProduct(
    user: UserEntity,
    product: ProductEntity,
  ) {
    return this.reviewRepository.findOne({
      where: { user: { id: user.id }, product: { id: product.id } },
      relations: { user: true, product: { category: true } },
    });
  }
}
