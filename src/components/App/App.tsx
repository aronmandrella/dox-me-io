import styles from "./App.module.scss";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { WorldMapMarkersList, IWorldMapMarker } from "@ui";

import { useMapUrlMarkers } from "./useMapUrlMarkers";
import { UrlCheckBar } from "./UrlCheckBar/UrlCheckBar";

/*
  Leaflet package modifies window object during import instead of during initialization.
  Because of it, it can't be imported/used during SSR (conditional rendering wouldn't help).
*/
const WorldMapWithoutSSR = dynamic(
  async () => {
    const jsModule = await import("@ui/WorldMap/WorldMap");
    return jsModule.WorldMap;
  },
  {
    ssr: false,
  }
);

/* -------------------------------------------------------------------------- */
/*                       HELPER <AppSection/> COMPONENT                       */
/* -------------------------------------------------------------------------- */

interface IAppSectionProps {
  className?: string;
  header: string;
  children: React.ReactNode;
}

const AppSection: React.VFC<IAppSectionProps> = (props) => {
  const { className, header, children } = props;

  return (
    <section className={clsx(className, styles.appSection)}>
      <h2 className={styles.appSectionHeader}>{header}</h2>
      {children}
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export const App: React.VFC = React.memo(() => {
  /* ---------------------------------- STATE --------------------------------- */

  /*
    In a complex app maybe this could be provided via context/state manager.
  */
  const {
    isFakingUrlChecks,
    isCheckingUrl,
    mapUrlMarkers,
    latestUrlCheckError,
    clearLatestUrlCheckError,
    checkUrlAndCreateMapUrlMarker,
    setIsFakingUrlChecks,
  } = useMapUrlMarkers();

  const [selectedMapUrlMarker, setSelectedMapUrlMarker] = useState<IWorldMapMarker | undefined>();

  const mapCenter = useMemo(() => {
    if (selectedMapUrlMarker) {
      return { lat: selectedMapUrlMarker.lat, lon: selectedMapUrlMarker.lon };
    } else {
      return { lat: 0, lon: 0 };
    }
  }, [selectedMapUrlMarker]);

  /* --------------------------------- EFFECTS -------------------------------- */

  const mostRecentlyCreatedMapUrlMarker = mapUrlMarkers[mapUrlMarkers.length - 1];

  // Will select newly created markers
  useEffect(() => {
    if (mostRecentlyCreatedMapUrlMarker) {
      setSelectedMapUrlMarker(mostRecentlyCreatedMapUrlMarker);
    }
  }, [mostRecentlyCreatedMapUrlMarker]);

  /* ----------------------------------- JSX ---------------------------------- */

  return (
    <div className={styles.app}>
      <header className={styles.appBar}>
        <h1 className={styles.appBarLogo}>
          DoxMe.io {isFakingUrlChecks ? "(fake requests mode)" : null}
        </h1>
        <p className={styles.appBarHeader}>Doxing people with 🤍 since 2022</p>
      </header>

      <main className={styles.appContent}>
        <AppSection className={styles.searchBarSection} header="Who would you like to dox next?">
          <UrlCheckBar
            placeholder="Enter ip or url..."
            confirmMessage="Dox 'em!"
            isCheckingUrl={isCheckingUrl}
            checkUrlAndCreateMapUrlMarker={checkUrlAndCreateMapUrlMarker}
            clearLatestUrlCheckError={clearLatestUrlCheckError}
            latestUrlCheckError={latestUrlCheckError}
            setIsFakingUrlChecks={setIsFakingUrlChecks}
          />
        </AppSection>

        <AppSection className={styles.logsSection} header="Doxs logs">
          <WorldMapMarkersList
            className={styles.listSectionContent}
            markers={mapUrlMarkers}
            selectedMarker={selectedMapUrlMarker}
            onMarkerClick={setSelectedMapUrlMarker}
          />
        </AppSection>

        <AppSection className={styles.mapSection} header="Doxs map">
          <WorldMapWithoutSSR
            className={styles.mapSectionContent}
            lat={mapCenter.lat}
            lon={mapCenter.lon}
            markers={mapUrlMarkers}
            selectedMarker={selectedMapUrlMarker}
            onMarkerClick={setSelectedMapUrlMarker}
          />
        </AppSection>
      </main>
    </div>
  );
});
