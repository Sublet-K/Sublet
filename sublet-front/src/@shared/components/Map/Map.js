import React, { useEffect, useRef, useState } from 'react';
import { SubletPostStore } from '../../../store/SubletPostStore';
import styled from 'styled-components';

function markerHTML(price) {
  return `<div class="marker" 
  style="
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 30px;
    padding: 0 35px;
    border : 1px solid #afafaf;
    border-radius: 15px;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #ceffc8;
      span {
        color: white;
      }
    }
  "><span 
    style="
      color: black;
      font-size: 1rem;
      font-weight: 700;
      pointer-events: none;
    ">&#8361;${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></div>`;
}

function searchAddressToCoordinate(address, map) {
  const infoWindow = new window.naver.maps.InfoWindow({
    anchorSkew: true,
  });

  let coordinate_item = undefined;

  window.naver.maps.Service.geocode(
    {
      query: address,
    },
    function (status, response) {
      if (status === window.naver.maps.Service.Status.ERROR) {
        console.log('status ERROR');
        return undefined;
      }
      // console.log(response.v2);
      if (response.v2.meta.totalCount === 0) {
        console.log('검색정보 없음');
        return undefined;
      }

      const htmlAddresses = [];
      const item = response.v2.addresses[0];
      const point = new window.naver.maps.Point(item.x, item.y);

      coordinate_item = item;
      // console.log(coordinate_item);

      // if (item.roadAddress) {
      //   htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
      // }

      // if (item.jibunAddress) {
      //   htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
      // }

      // if (item.englishAddress) {
      //   htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
      // }

      // infoWindow.setContent([
      //   '<div style="padding:10px;width:300px;line-height:150%;">',
      //   '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
      //   htmlAddresses[0],
      //   '</div>'
      // ].join('\n'));

      // map.setCenter(point);
      // infoWindow.open(map, point);
    },
  );

  // 검색정보 있으면 좌표 반환
  return coordinate_item;
}

export default function Map(props) {
  const { posts, postExist, postAll } = SubletPostStore(state => ({
    post: state.post,
    postExist: state.postExist,
    postAll: state.postAll,
  }));
  const setPostMarker = SubletPostStore(state => state.setPostMarker);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [markerAll, setMarkerAll] = useState(false);

  useEffect(() => {
    createMap();
    props.type == 'searchByMarker' && searchingByDragAdd();
    createMarker();
  }, [markerAll]);

  function createMap() {
    mapRef.current = new window.naver.maps.Map(document.getElementById('map'), {
      zoom: 13,
    });
    mapRef.current.setCursor('pointer');
  }

  function createMarker() {
    postAll?.map(post => {
      let coordinate = searchAddressToCoordinate(post.position, mapRef.current);
      if (coordinate === undefined) {
        coordinate = searchAddressToCoordinate(
          props.city +
            ' ' +
            props.gu +
            ' ' +
            props.dong +
            ' ' +
            props.street +
            ' ' +
            props.street_number,
          mapRef.current,
        );
        if (coordinate === undefined) {
          coordinate = { x: post.x_coordinate, y: post.y_coordinate };
        }
      }

      markerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(coordinate.y, coordinate.x),
        map: mapRef.current,
        icon: {
          content: markerHTML(post.price),
          // size: new window.naver.maps.Size(22, 35),
          anchor: new window.naver.maps.Point(10, 15),
        },
      });

      markerClickEvent(markerRef.current, post);
      post.marker = markerRef.current;
    });
    setPostMarker(true);
    setMarkerAll(true);
  }

  function markerClickEvent(marker, post) {
    window.naver.maps.Event.addListener(marker, 'click', e => {
      const mapLatLng = new window.naver.maps.LatLng(
        Number(post?.y_coordinate),
        Number(post?.x_coordinate),
      );
      // 부드럽게 이동하기
      mapRef.current.panTo(mapLatLng, e?.coord);
    });
  }

  const searchingByDragAdd = () => {
    window.naver.maps.Event.addListener(
      mapRef.current,
      'dragend',
      dragendEvent,
    );
    const mapLatLng = new window.naver.maps.LatLng(
      Number(props?.currentPos[0]),
      Number(props?.currentPos[1]),
    );
    mapRef.current.panTo(mapLatLng, {
      x: props.currentPos[0],
      y: props.currentPos[1],
    });
  };

  const dragendEvent = () => {
    const center = mapRef.current.getCenter();
    props.setPos([center.y, center.x]);
  };

  return props.type == 'searchByMarker' ? (
    <div
      id="map"
      className="h-screen w-full rounded-lg"
      style={{ display: 'flex', height: 'calc(50vh)' }}
    />
  ) : (
    <div
      id="map"
      className="h-screen w-full rounded-lg"
      style={{ height: 'calc(100vh - 250px)' }}
    />
  );
}
