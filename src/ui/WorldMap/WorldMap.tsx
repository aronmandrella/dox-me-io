import styles from "./WorldMap.module.scss";

import React from "react";
import clsx from "clsx";

import { MarkerIcon } from "../MarkerIcon/MarkerIcon";
import { ControlledMapContainer, JsxMarker, TileLayer } from "./ImprovedLeafletComponents";

export interface IWorldMapMarker {
  key: string;
  label: string;
  color: string;
  continent: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
}

/* -------------------------------------------------------------------------- */
/*                              MARKER COMPONENT                              */
/* -------------------------------------------------------------------------- */

interface IWorldMapMarkerProps {
  marker: IWorldMapMarker;
  isSelected: boolean;
  onMarkerClick?: (marker: IWorldMapMarker) => void;
}

const WorldMapMarker: React.VFC<IWorldMapMarkerProps> = React.memo((props) => {
  const { marker, isSelected, onMarkerClick } = props;
  const { lat, lon, label, color } = marker;

  return (
    <JsxMarker
      className={clsx(styles.marker, isSelected && styles.isSelected)}
      lat={lat}
      lon={lon}
      width={32}
      height={32}
      onClick={onMarkerClick ? () => onMarkerClick(marker) : undefined}
    >
      <div className={styles.markerLabel}>{label}</div>
      <MarkerIcon className={styles.markerIcon} size={32} color={color} />
    </JsxMarker>
  );
});

/* -------------------------------------------------------------------------- */
/*                                MAP COMPONENT                               */
/* -------------------------------------------------------------------------- */

interface IWorldMapProps {
  className?: string;
  lat: number;
  lon: number;
  zoom?: number;
  markers?: IWorldMapMarker[];
  selectedMarker?: IWorldMapMarker;
  onMarkerClick?: (marker: IWorldMapMarker) => void;
}

export const WorldMap: React.VFC<IWorldMapProps> = React.memo((props) => {
  const { className, lat, lon, zoom = 13, markers = [], selectedMarker, onMarkerClick } = props;

  return (
    <ControlledMapContainer
      className={clsx(className, styles.root)}
      lat={lat}
      lon={lon}
      zoom={zoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => {
        return (
          <WorldMapMarker
            key={marker.key}
            marker={marker}
            isSelected={selectedMarker === marker}
            onMarkerClick={onMarkerClick}
          />
        );
      })}
    </ControlledMapContainer>
  );
});
