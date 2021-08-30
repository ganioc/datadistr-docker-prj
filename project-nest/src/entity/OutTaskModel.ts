/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('outtask')
export class OutTaskModel {
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
    @Column('number', { default: true })
    status: number = -1;

    @Column()
    encryptSecret: string;

    @Index()
    @Column()
    oldHashId: string;

    @Column()
    newHashId: string;
}
