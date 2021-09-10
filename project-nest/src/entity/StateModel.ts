import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('state')
export class StateModel {
    @ObjectIdColumn()
    id: number;

    @Column()
    index: number;

    @Column()
    latestBlock: number;

    @Column()
    latestTxIndex: number;

    @Column()
    option: string;

    @Column()
    date: Date;
}
