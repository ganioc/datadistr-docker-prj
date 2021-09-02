import {
    Column,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RecordOrig } from './RecordOrig';

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
    date: Date;

    @Column()
    groupId: number;

    @ManyToOne((type) => RecordOrig, (recordOrig) => recordOrig.recordCopys)
    recordOrig: RecordOrig;
}
