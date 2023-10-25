import { useState, useRef, useEffect } from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
  YMapsApi,
} from "react-yandex-maps";
import styles from "./index.module.scss";
import "./index.scss";
import { useNavigateParams } from "src/hooks/useCustomNavigate";

interface GeocodeResult {
  name: string;
}

const YandexMap = () => {
  const ymaps = useRef<any>();
  const map = useRef<any>();
  const navigate = useNavigateParams();
  const [markerCoords, setMarkerCoords] = useState<number[]>([
    41.30524669891599, 69.24100608330389,
  ]);

  const apiKey = "51697f82-c9b3-463e-8305-c7ed2bfe3ad3";

  useEffect(() => {
    fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${markerCoords
        .reverse()
        .join(",")}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const geocodeResult: GeocodeResult =
          data.response.GeoObjectCollection.featureMember[0].GeoObject;
        navigate({
          address_name: geocodeResult.name,
          lat: markerCoords[0],
          long: markerCoords[1],
        });
      });
  }, [markerCoords]);

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

  return (
    <YMaps>
      <div className={styles.mapBlock}>
        <Map
          defaultState={{
            center: [41.30524669891599, 69.24100608330389],
            zoom: 12,
          }}
          width={"100%"}
          className="h-[480px]"
          height={"100%"}
          onClick={handleMapClick}
          modules={["control.SearchControl"]}
          onLoad={(ymapsInstance: YMapsApi) => {
            ymaps.current = ymapsInstance;
            addSearchControlEvents();
          }}
        >
          <Placemark
            geometry={markerCoords}
            properties={{ draggable: true }}
            options={{ preset: "islands#icon", iconColor: "red" }}
          />

          <GeolocationControl options={{ float: "left" }} />
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
