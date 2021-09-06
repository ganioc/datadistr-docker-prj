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
    hashId: string;

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
}
