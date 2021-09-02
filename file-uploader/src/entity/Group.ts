import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RecordOrig } from './RecordOrig';
import { User } from './User';

/**
 * group:
 * 0 - default group
 * 
 */

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
    date: Date;

    @ManyToMany((type) => User, (user) => user.groups)
    @JoinTable()
    users: User[];

    @ManyToMany((type) => RecordOrig, (recordOrig) => recordOrig.groups)
    @JoinTable()
    recordOrigs: RecordOrig[];
}
