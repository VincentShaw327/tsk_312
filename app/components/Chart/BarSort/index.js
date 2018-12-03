import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';

@autoHeight()
export class BarSort extends React.Component {
  render() {
    const { data = {}, height = 400 } = this.props;
    const ds = new DataSet();
    const dv = ds.createView().source( data );
    dv.source( data ).transform( {
      type: 'sort',
      callback( a, b ) {
        // 排序依据，和原生js的排序callback一致
        return a.value - b.value > 0;
      },
    } );
    return (
      <div>
        <Chart height={height} data={dv} forceFit>
          <Coord transpose />
          <Axis
            name="key"
            label={{
              offset: 12,
            }}
          />
          <Axis name="value" />
          <Tooltip />
          <Geom type="interval" position="key*value" />
        </Chart>
      </div>
    );
  }
}

export default BarSort;
