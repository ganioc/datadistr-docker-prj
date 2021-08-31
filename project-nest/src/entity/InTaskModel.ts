import {
    Column,
    Entity,
    Index,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import 'reflect-metadata';

@Entity('intask')
export class InTaskModel {
    // @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id: number;

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Index()
    @Column('boolean', { default: true })
    finished: boolean = false;

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Index()
    @Column('number', { default: true })
    block: number = 0;

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Index()
    @Column('number', { default: true })
    txIndex: number = 0;

    @Index()
    @Column()
    address: string;

    @Index()
    @Column()
    pubKey: string;

    @Index()
    @Column()
    hashId: string;
}
