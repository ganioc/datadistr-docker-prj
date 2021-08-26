import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class InTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column('boolean', { default: true })
    finished: boolean = false;

    @Index()
    @Column('number', { default: true })
    block: number = 0;

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