import {VESSEL_INIT, VESSEL_ZOOM_UPDATE, VESSEL_TILE_LOADED, SHOW_LOADING, RESET_CACHE, ADD_LAYER} from '../constants';
import calculateBounds from '../lib/calculateBounds';
import PelagosClient from '../lib/pelagosClient';
var url = "https://storage.googleapis.com/skytruth-pelagos-production/pelagos/data/tiles/benthos-pipeline/gfw-vessel-scoring-602-tileset-2014-2016_2016-05-17/cluster_tiles/2015-01-01T00:00:00.000Z,2016-01-01T00:00:00.000Z;";


export function init() {
  return {
    type: VESSEL_INIT,
    payload: {
      visible: true,
      load: true
    }
  };
};

export function showLoading(show) {
  return {
    type: SHOW_LOADING,
    payload: show
  };
};

/*
** CartoDB layers:
** MPA
** EEZ
** High Seas Pockets
** RFMOs
*/
export function addLayer(url) {
  return {
    type: ADD_LAYER,
    payload: [
    'http://cartodb.skytruth.org/user/dev/api/v2/viz/d7c9313c-97b8-11e5-87b3-0242ac110002/viz.json',
    'http://cartodb.skytruth.org/user/dev/api/v2/viz/2e169268-bde4-11e5-87b3-0242ac110002/viz.json',
    'http://cartodb.skytruth.org/user/wmerten/api/v2/viz/bb870984-033f-11e6-bfbe-0242ac110006/viz.json',
    'http://cartodb.skytruth.org/user/dev/api/v2/viz/90467e80-97ba-11e5-87b3-0242ac110002/viz.json',
    'http://cartodb.skytruth.org/user/dev/api/v2/viz/3e755a02-97cb-11e5-87b3-0242ac110002/viz.json']
  };
};

export function resetCache() {
  return {
    type: RESET_CACHE
  };
};

export function loadZoom(map) {
  return function (dispatch) {
    dispatch({
      type: VESSEL_ZOOM_UPDATE
    });
    let bounds = calculateBounds(map);
    var obtainTile = function (key) {
      new PelagosClient().obtainTile(url + key).then(function (data) {
        let obj = {};
        obj[key] = data;
        dispatch({
          type: VESSEL_TILE_LOADED,
          payload: {
            data: obj
          }
        });
      });
    }
    for (var i = 0, length = bounds.length; i < length; i++) {
      obtainTile(bounds[i].toString());
    }

  }
}

export function move(map) {
  return function (dispatch, getState) {
    let state = getState();
    let bounds = calculateBounds(map);
    let vData = state.vessel.data;
    var obtainTile = function (key) {
      new PelagosClient().obtainTile(url + key).then(function (data) {
        let obj = {};
        obj[key] = data;
        dispatch({
          type: VESSEL_TILE_LOADED,
          payload: {
            data: obj
          }
        });
        dispatch({
          type: SHOW_LOADING,
          payload: false
        })
      });
    }

    for (var i = 0, length = bounds.length; i < length; i++) {
      if (!vData || !vData[bounds[i].toString()]) {
        obtainTile(bounds[i].toString());
      }
    }

  }

}