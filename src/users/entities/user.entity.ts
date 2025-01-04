import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { Roles } from "src/utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column({unique: true})
    email : string;

    @Column({select: false})
    password : string;

    @Column({type : "enum" , enum : Roles , array : true ,default :[ Roles.User]})
    roles : Roles[];

    @CreateDateColumn()
    createAt : Timestamp

    @UpdateDateColumn()
    updateAt : Timestamp;

    @OneToMany(() => CategoryEntity , (categoryEntity) => categoryEntity.addedBy)
    categories : CategoryEntity[];

    @OneToMany(() => ProductEntity ,product => product.addedBy)
    products : ProductEntity[];

    @OneToMany(() => ReviewEntity , review => review.user)
    reviews : ReviewEntity[];
}


