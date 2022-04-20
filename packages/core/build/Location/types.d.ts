import { DefaultModelType } from "sensible-core";
export interface LocationType extends DefaultModelType {
    latitude: number;
    longitude: number;
    /**
     * calculate the most nearby village based on the hardcoded village location data we have for all villages in nepal.
     *
     */
    nearbyVillage: string;
}
//# sourceMappingURL=types.d.ts.map