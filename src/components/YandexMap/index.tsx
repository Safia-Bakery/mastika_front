import { useState, FC, useRef, useEffect } from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
  YMapsApi,
} from "react-yandex-maps";
import styles from "./index.module.scss";
import Typography, { TextSize } from "../Typography";
import "./index.scss";

const YandexMap = () => {
  const ymaps = useRef<any>();
  const map = useRef<any>();
  const [markerCoords, setMarkerCoords] = useState<number[]>([
    41.30524669891599, 69.24100608330389,
  ]);

  const addSearchControlEvents = () => {
    const searchControl = new ymaps.current.control.SearchControl({
      options: {
        float: "left",
        floatIndex: 300,
        provider: "yandex#search",
        geoObjectStandardPreset: "islands#blueDotIcon",
        placeholderContent: "Поиск мест и адресов",
        maxWidth: 320,
        size: "large",
      },
    });
    map.current?.controls.add(searchControl);

    searchControl.events.add("resultselect", function (e: Error) {
      const searchCoords =
        searchControl.getResponseMetaData().SearchResponse.Point.coordinates;
      const display: string =
        searchControl.getResponseMetaData().SearchResponse.display;

      if (display && display === "multiple") {
        map.current.setCenter([searchCoords[1], searchCoords[0]], 11);
      }
    });
  };

  const handleMapClick = (e: any) => {
    const coordinates = e.get("coords");
    setMarkerCoords(coordinates);
  };

  const handleButtonClick = () => {
    console.log(navigator, "navigator");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setMarkerCoords(coordinates);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <YMaps
      query={{
        lang: "en_RU",
        apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
      }}
    >
      <div className={styles.mapBlock}>
        <Map
          defaultState={{
            center: [41.30524669891599, 69.24100608330389],
            zoom: 12,
          }}
          width={"100%"}
          className="h-80"
          height={"100%"}
          onClick={handleMapClick}
          modules={["control.SearchControl"]}
          onLoad={(ymapsInstance: YMapsApi) => {
            console.log(ymapsInstance, "ymapsInstance");
            ymaps.current = ymapsInstance;
            addSearchControlEvents();
          }}
        >
          <Placemark
            geometry={markerCoords}
            properties={{ draggable: true }}
            options={{ preset: "islands#icon", iconColor: "red" }}
          />

          <GeolocationControl
            onLoad={(e) => console.log(e, "GeolocationControl")}
            options={{ float: "left" }}
          />
          <SearchControl
            options={{
              float: "left",
              position: {
                top: 30,
                left: 20,
              },
            }}
          />
        </Map>
        {/* <button className={styles.currentBtn} onClick={handleButtonClick}>
          Get Current Position
        </button> */}
      </div>
    </YMaps>
  );
};

export default YandexMap;
