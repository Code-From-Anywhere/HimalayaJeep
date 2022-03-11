import { DataTypes } from "sequelize";
import { Table, Column, Index, HasMany } from "sequelize-typescript";
import {
  SignupSource,
  UserRole,
  userRoles,
  UserType,
} from "core";
import DataPointEntry from "../DataPointEntry/model";
import { DefaultModel } from "sensible-server";

import TeamMember from "../TeamMember/model";
import WeeklyStats from "../WeeklyStats/model";

interface UserCreationType extends Partial<UserType> {}

@Table
export class User
  extends DefaultModel<UserType, UserCreationType>
  implements UserType
{
  @Index({ unique: true })
  @Column
  public loginToken!: string;

  @Column({ type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 })
  public onlineAt!: number;

  @Column
  public username!: string;

  @Column
  public password!: string;

  @Column
  public name!: string;

  @Index({ unique: true })
  @Column
  public email!: string;

  @Column
  public phone!: string;

  @Column
  public code!: string;

  @Column
  public image!: string;

  @Column
  public subscribedToNewsletter!: boolean;

  @Column({ type: DataTypes.STRING(1024) })
  public base64!: string;

  @Column({
    type: DataTypes.ENUM(...userRoles),
    defaultValue: userRoles[0],
  })
  public role!: UserRole;

  @Column({
    type: DataTypes.ENUM("landing", "plugin", "app"),
  })
  public source!: SignupSource;

  @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
  public verified!: boolean;

  @Column
  public resetPasswordHash!: string;

  //assocations

  @HasMany(() => DataPointEntry)
  public dataPoints!: DataPointEntry[];

  @HasMany(() => TeamMember)
  public teams!: TeamMember[];

  @HasMany(() => WeeklyStats)
  public weeklyStats!: WeeklyStats[];
}

export default User;
