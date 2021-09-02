import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RecordCopy } from './RecordCopy';

@Entity('record')
export class Record {
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
    date: number;

    @OneToMany(type => RecordCopy, recordCopy => recordCopy.record)
    recordCopys: RecordCopy[];
}
