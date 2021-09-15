import {
    Column,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './Group';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ unique: true })
    address: string;

    @Index()
    @Column()
    name: string;

    @Index()
    @Column()
    organization: string;

    @Index()
    @Column()
    date: Date;

    @ManyToMany((type) => Group, (group) => group.users)
    groups: Group[];
}
