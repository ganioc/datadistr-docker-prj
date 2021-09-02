import {
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Record } from './Record';

@Entity('recordcopy')
export class RecordCopy {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    newFileName: string;

    @Column()
    newHashId: string;

    @Column()
    secret: string;

    @Column()
    date: number;

    @Column()
    groupId: number;

    @ManyToOne(type => Record, record => record.recordCopys)
    record: Record;
}
