import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { UsersModule } from 'src/users/users.module';
import {
  ProductReview,
  ProductReviewSchema,
} from './schemas/product-review.schema';
import {
  SellerReview,
  SellerReviewSchema,
} from './schemas/seller-review.schema';
// import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
        discriminators: [
          { name: ProductReview.name, schema: ProductReviewSchema },
          { name: SellerReview.name, schema: SellerReviewSchema },
        ],
      },
    ]),
    UsersModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
