import styles from "./WorldMapMarkersList.module.scss";

import React from "react";
import clsx from "clsx";

import { MarkerIcon } from "../MarkerIcon/MarkerIcon";
import type { IWorldMapMarker } from "../WorldMap/WorldMap";

/* -------------------------------------------------------------------------- */
/*                               ENTRY COMPONENT                              */
/* -------------------------------------------------------------------------- */

interface IWorldMapMarkersListEntryProps {
  marker: IWorldMapMarker;
  isSelected: boolean;
  onMarkerClick?: (marker: IWorldMapMarker) => void;
}

const WorldMapMarkersListEntry: React.VFC<IWorldMapMarkersListEntryProps> = React.memo((props) => {
  const { marker, isSelected, onMarkerClick } = props;
  const { label, color, city, continent, country, lat, lon } = marker;

  return (
    <button
      className={clsx(styles.entry, isSelected && styles.isSelected)}
      onClick={onMarkerClick ? () => onMarkerClick(marker) : undefined}
    >
      <MarkerIcon className={styles.entryIcon} size={24} color={color} />

      <div className={styles.entryContent}>
        <div className={styles.entryLabel}>{label}</div>
        <div className={styles.entryLocation}>
          {continent}, {country}, {city} ({lat}°, {lon}°)
        </div>
      </div>
    </button>
  );
});

/* -------------------------------------------------------------------------- */
/*                             CONTAINER COMPONENT                            */
/* -------------------------------------------------------------------------- */

interface IWorldMapMarkersListProps {
  className?: string;
  markers: IWorldMapMarker[];
  selectedMarker?: IWorldMapMarker;
  onMarkerClick?: (marker: IWorldMapMarker) => void;
}

export const WorldMapMarkersList: React.VFC<IWorldMapMarkersListProps> = React.memo((props) => {
  const { className, markers, selectedMarker, onMarkerClick } = props;

  return (
    <ul className={clsx(className, styles.root)}>
      {markers.map((marker) => {
        return (
          <li key={marker.key}>
            <WorldMapMarkersListEntry
              isSelected={marker === selectedMarker}
              marker={marker}
              onMarkerClick={onMarkerClick}
            />
          </li>
        );
      })}
    </ul>
  );
});
