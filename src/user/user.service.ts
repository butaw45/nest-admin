import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { PaginatedResult } from '../common/paginated-result.interface';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    // async all(): Promise<User[]>{
    //     return this.userRepository.find();
    // }

    async paginate(page = 1, relations = []): Promise<PaginatedResult>{
        const {data, meta} = await super.paginate(page,relations);

        // const take = 15;

        // const [users, total] = await this.userRepository.findAndCount({
        //     take,
        //     skip: (page - 1) * take
        // });

        return{
            data: data.map(user => {
                // ? paginate dengan tidak return password
                const {password, ...data} = user;

                return data;
            }),
            meta
            // meta:
            // {
                // total,
                // page,
                // last_page: Math.ceil(total / take)
            // }

        }
    }

    // async create(data): Promise<User>{
    //     return this.userRepository.save(data);

    // }

    // async findOne(condition): Promise<User>{
    //     return this.userRepository.findOne(condition);
    // } 

    // async update(id: number, data): Promise<any>{
    //     return this.userRepository.update(id, data);
    //     }

    // async delete(id: number): Promise<any>{
    //     return this.userRepository.delete(id);
    // }
}
