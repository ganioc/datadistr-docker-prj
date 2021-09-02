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

    // eslint-disable-next-line prettier/prettier
    @OneToMany(type => RecordCopy, recordCopy => recordCopy.recordOrig)
    recordCopys: RecordCopy[];

    @ManyToMany((_type) => Group, (group) => group.recordOrigs)
    groups: Group[];
}
