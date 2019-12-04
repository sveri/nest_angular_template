import * as bcrypt from 'bcryptjs';

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, nullable: true })
    username?: string;

    @Column({ length: 500, unique: true })
    email: string;

    @Column({})
    password: string;

    @BeforeInsert()
    async hashPassword?(): Promise<void> {
      this.password = await bcrypt.hash(this.password, 10);
    }
}
