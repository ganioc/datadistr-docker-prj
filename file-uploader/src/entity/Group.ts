import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('group')
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    // name of the group
    @Index()
    @Column({ unique: true })
    groupId: number;

    @Index()
    @Column()
    alias: string;

    @Index()
    @Column()
    level: number;

    @Index()
    @Column()
    date: number;

    @ManyToMany(type => User, user => user.groups)
    @JoinTable()
    users: User[];
}
