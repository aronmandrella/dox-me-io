import styles from "./UrlCheckBar.module.scss";

import React, { useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import { isIpOrUrl } from "@helpers";
import { Input, Button, ErrorBox } from "@ui";

import { useMapUrlMarkers } from "../useMapUrlMarkers";

interface IUrlCheckBar
  extends Pick<
    ReturnType<typeof useMapUrlMarkers>,
    | "isCheckingUrl"
    | "clearLatestUrlCheckError"
    | "latestUrlCheckError"
    | "checkUrlAndCreateMapUrlMarker"
    | "setIsFakingUrlChecks"
  > {
  className?: string;
  placeholder: string;
  confirmMessage: string;
}

export const UrlCheckBar: React.VFC<IUrlCheckBar> = React.memo((props) => {
  /* ---------------------------------- STATE --------------------------------- */

  const {
    className,
    placeholder,
    confirmMessage,
    isCheckingUrl,
    checkUrlAndCreateMapUrlMarker,
    clearLatestUrlCheckError,
    latestUrlCheckError,
    setIsFakingUrlChecks,
  } = props;

  const [url, setUrl] = useState("");

  const urlRef = useRef(url);
  urlRef.current = url;

  /* ----------------------------- EVENT HANDLERS ----------------------------- */

  const isUrlValid = useMemo(() => isIpOrUrl(url), [url]);

  const handleButtonClick = useCallback(() => {
    checkUrlAndCreateMapUrlMarker(urlRef.current);
    setUrl("");
  }, [checkUrlAndCreateMapUrlMarker]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      clearLatestUrlCheckError();
      setUrl(e.target.value);
    },
    [clearLatestUrlCheckError]
  );

  /* ----------------------------------- JSX ---------------------------------- */

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.inputAndButton}>
        <Input
          className={styles.input}
          placeholder={placeholder}
          value={url}
          onChange={handleInputChange}
        />
        <Button
          className={styles.button}
          onClick={handleButtonClick}
          disabled={isCheckingUrl || !isUrlValid}
        >
          {isCheckingUrl ? "Loading..." : confirmMessage}
        </Button>
      </div>

      {url.length > 0 && !isUrlValid && (
        <div className={styles.hint}>⚠️ Enter correct url or ip to continue...</div>
      )}

      {latestUrlCheckError && (
        <>
          <ErrorBox
            className={styles.error}
            title={latestUrlCheckError.title}
            message={latestUrlCheckError.message}
          >
            <div>If message says that api limits probably were used click this:</div>
            <Button className={styles.errorButton} onClick={() => setIsFakingUrlChecks(true)}>
              {`Enable "fake requests mode"`}
            </Button>
          </ErrorBox>
        </>
      )}
    </div>
  );
});
