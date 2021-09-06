import { group } from 'console';
import {
    Column,
    Entity,
    Index,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './Group';
import { RecordCopy } from './RecordCopy';

@Entity('record')
export class RecordOrig {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    fileName: string;

    @Index()
    @Column()
    hashId: string;

    @Index()
    @Column()
    type: string;

    @Index()
    @Column()
    date: Date;

    @ManyToMany((_type) => Group, (group) => group.recordOrigs)
    groups: Group[];
}
