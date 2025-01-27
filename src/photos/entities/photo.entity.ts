import { User } from "src/users/entities/user.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
 
    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @ManyToOne(() => User, (user) => user.photos)
    user:User;

    @ManyToMany(() => Category, (category) => category.photos)
    @JoinTable({
        name: 'photo_categories_category',
        joinColumn: {name: 'photo_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'category_id', referencedColumnName: 'id'}
    })
    categories: Category[];
}