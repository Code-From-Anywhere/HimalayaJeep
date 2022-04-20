import { Table, Column, Index, HasMany } from "sequelize-typescript";
import { DefaultModel } from "sensible-server";
import { JeepType } from "../core/Jeep/types";
import { LocationType } from "../core/Location/types";
import Location from "../Location/model";

interface JeepCreationType extends Partial<JeepType> {}

@Table
export class Jeep
  extends DefaultModel<JeepType, JeepCreationType>
  implements JeepType
{
  @Index({ unique: true })
  @Column
  public loginToken!: string;

  @Column
  public numberPlate!: string;

  @Column
  public name!: string;

  @Column
  public phone!: string;

  @Column
  public luggageUnitsLeft!: number;

  @Column
  public email!: string;

  @Column
  public citizenshipId!: string;

  @Column
  public lisenceId!: string;

  @Column
  public note!: string;

  @Column
  public seatsLeft!: number;

  @Column
  public verified!: boolean;
  //associations

  @HasMany(() => Location)
  public locations!: LocationType[];
}

export default Jeep;
