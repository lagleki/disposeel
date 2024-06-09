import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  url: string;
  
  @Column({ unique: true })
  short: string;
}
