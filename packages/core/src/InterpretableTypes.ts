/**
 * Interpretable types are all types that metadata is going to built from (if that lib takes export * from syntax
 * We don't put generic types here as they are not supported.
 **/

export * from "./User/endpoints";
export * from "./User/types";
export * from "./Comment/endpoints";
export * from "./Comment/types";
export * from "./Connection/endpoints";
export * from "./Connection/types";
export * from "./DataPoint/endpoints";
export * from "./DataPoint/types";
export * from "./DataPointCondition/types";
export * from "./DataPointCondition/endpoints";
export * from "./DataPointEntry/endpoints";
export * from "./DataPointEntry/types";
export * from "./Error/endpoints";
export * from "./Error/types";
export * from "./Log/types";
export * from "./Message/endpoints";
export * from "./Message/types";
export * from "./Log/types";
export * from "./Log/endpoints";
export * from "./MessagePreset/endpoints";
export * from "./MessagePreset/types";
export * from "./Person/endpoints";
export * from "./Person/types";
export * from "./Post/endpoints";
export * from "./Post/types";
export * from "./Task/endpoints";
export * from "./Task/types";
export * from "./Team/endpoints";
export * from "./Team/types";
export * from "./TeamMember/endpoints";
export * from "./TeamMember/types";
export * from "./WeeklyStats/endpoints";
export * from "./WeeklyStats/types";

import { UserEndpoints } from "./User/endpoints";
import { DataPointEndpoints } from "./DataPoint/endpoints";
import { CommentEndpoints } from "./Comment/endpoints";
import { ConnectionEndpoints } from "./Connection/endpoints";
import { DataPointConditionEndpoints } from "./DataPointCondition/endpoints";
import { DataPointEntryEndpoints } from "./DataPointEntry/endpoints";
import { MessageEndpoints } from "./Message/endpoints";
import { LogEndpoints } from "./Log/endpoints";
import { MessagePresetEndpoints } from "./MessagePreset/endpoints";
import { PersonEndpoints } from "./Person/endpoints";
import { PostEndpoints } from "./Post/endpoints";
import { ErrorEndpoints } from "./Error/endpoints";
import { TaskEndpoints } from "./Task/endpoints";
import { TeamEndpoints } from "./Team/endpoints";
import { TeamMemberEndpoints } from "./TeamMember/endpoints";
import { WeeklyStatsEndpoints } from "./WeeklyStats/endpoints";

export type AllEndpoints = DataPointEndpoints &
  UserEndpoints &
  CommentEndpoints &
  ConnectionEndpoints &
  DataPointConditionEndpoints &
  DataPointEntryEndpoints &
  MessageEndpoints &
  LogEndpoints &
  MessagePresetEndpoints &
  PersonEndpoints &
  PostEndpoints &
  TaskEndpoints &
  TeamEndpoints &
  TeamMemberEndpoints &
  WeeklyStatsEndpoints &
  ErrorEndpoints;
