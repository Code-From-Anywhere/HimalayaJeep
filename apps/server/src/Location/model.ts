import { DataTypes } from "sequelize";
import { Table, Column } from "sequelize-typescript";
import { DefaultModel } from "sensible-server";
import { LocationType } from "../core/Location/types";

interface LocationCreationType extends Partial<LocationType> {}

@Table
export class Location
  extends DefaultModel<LocationType, LocationCreationType>
  implements LocationType
{
  @Column({ type: DataTypes.FLOAT })
  latitude!: number;
  @Column({ type: DataTypes.FLOAT })
  longitude!: number;
  @Column
  nearbyVillage!: string;
}

export default Location;
