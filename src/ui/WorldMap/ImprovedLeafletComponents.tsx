// Global leaflet styles required to render map correctly.
import "leaflet/dist/leaflet.css";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngExpression, Map as LeafletMap, divIcon } from "leaflet";
import { Root as Portal } from "@radix-ui/react-portal";

/* -------------------------------------------------------------------------- */
/*                    IMPROVED <ReactLeaflet.MapContainer/>                   */
/* -------------------------------------------------------------------------- */

/*
  Adds controlled mode for map view to <ReactLeaflet.MapContainer/>.
*/

interface IControlledMapContainerProps {
  className?: string;
  lat: number;
  lon: number;
  zoom: number;
  children: React.ReactNode;
}

export const ControlledMapContainer: React.VFC<IControlledMapContainerProps> = React.memo(
  (props) => {
    const { className, lat, lon, zoom, children } = props;

    const [initialCenter] = useState<LatLngExpression>([lat, lon]);
    const [initialZoom] = useState<number>(zoom);
    const [mapInstance, setMapInstance] = useState<null | LeafletMap>(null);

    useEffect(() => {
      if (!mapInstance) return;

      const nextCenter: LatLngExpression = [lat, lon];
      const nextZoom = zoom;

      mapInstance.setView(nextCenter, nextZoom);
    }, [mapInstance, lat, lon, zoom]);

    return (
      <MapContainer
        className={className}
        center={initialCenter}
        zoom={initialZoom}
        whenCreated={setMapInstance}
      >
        {children}
      </MapContainer>
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                       IMPROVED <ReactLeaflet.Marker/>                      */
/* -------------------------------------------------------------------------- */

/*
  Adds support for custom content provided via JSX.
*/

interface IJsxMarkerProps {
  // Visual props
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
  children: React.ReactNode;

  onClick?: React.MouseEventHandler<HTMLDivElement>;

  // Marker placement
  lat: number;
  lon: number;
}

export const JsxMarker: React.VFC<IJsxMarkerProps> = React.memo((props) => {
  const { className, style, height, width, children, lat, lon, onClick } = props;

  const contentContainerRef = useRef(document.createElement("div"));

  const markerProps = useMemo(() => {
    const position: LatLngExpression = [lat, lon];

    const icon = divIcon({
      className: "", // Clears initial styles
      iconSize: [width, height],
      iconAnchor: [width / 2, height], // Marker will be bottom-center aligned
      html: contentContainerRef.current,
    });

    return { position, icon };
  }, [lat, lon, width, height]);

  return (
    <>
      <Portal containerRef={contentContainerRef}>
        <div className={className} style={{ ...style, width, height }} onClick={onClick}>
          {children}
        </div>
      </Portal>

      <Marker {...markerProps} />
    </>
  );
});

/* -------------------------------------------------------------------------- */
/*            EXPORTS OTHER COMPONENTS THAT DON'T NEED IMPROVEMENTS           */
/* -------------------------------------------------------------------------- */

export { TileLayer };
