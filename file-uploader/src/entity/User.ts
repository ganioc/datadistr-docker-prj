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
    @Column()
    address: string;

    @Index()
    @Column()
    name: string;

    @Index()
    @Column()
    orgization: string;

    @Index()
    @Column()
    date: number;

    @ManyToMany(type => Group, group => group.users)
    groups: Group[];
}
