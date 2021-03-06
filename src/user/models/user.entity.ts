import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../../role/role.entity';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column({unique:true})
    email:string;

    @Column()
    //? @Exclude() supaya password tersave tanpa di tampilkan pada response API dengan bantuan UseInterceptors(ClassSerializerInterceptor) 
    @Exclude()
    password:string;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role:Role;    
}