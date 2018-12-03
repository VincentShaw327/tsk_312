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
class Areanull extends React.Component {
  render() {
    const data = [
      {
        year: '00:00',
        ACME: 23422,
        Compitor: 123,
      },
      {
        year: '02:00',
        ACME: 21453,
        Compitor: 42,
      },
      {
        year: '04:00',
        ACME: 16745,
        Compitor: 42,
      },
      {
        year: '06:00',
        ACME: 19543,
        Compitor: 42,
      },
      {
        year: '08:00',
        ACME: 24532,
        Compitor: 42,
      },
      /* {
        year: '07:00',
        ACME: 134,
        Compitor: 54,
      },
      {
        year: '08:00',
        ACME: 116,
        Compitor: 26,
      }, */
      {
        year: '10:00',
        ACME: 28664,
        Compitor: 32,
      },
     /*
      {
        year: '11:00',
        ACME: 144,
        Compitor: 54,
      }, */
      {
        year: '12:00',
        ACME: 125,
        Compitor: 35,
      },

      {
        year: '14:00',
        ACME: 11234,
      },
      {
        year: '16:00',
        ACME: 14325,
      },
      {
        year: '18:00',
        ACME: 167,
        Compitor: 47,
      },
      {
        year: '20:00',
        ACME: 28534,
        Compitor: 23,
      },
      {
        year: '22:00',
        ACME: 18654,
        Compitor: 23,
      },
    ];
    const dv = new DataSet.View().source( data );
    dv.transform( {
      type: 'fold',
      fields: ['ACME', 'Compitor'],
      key: 'type',
      value: 'value',
    } );
    const scale = {
      value: {
        alias: 'The Share Price in Dollars',
        formatter: function ( val ) {
          return `$${val}`;
        },
      },
      year: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
            <h3>今日产量趋势</h3>
        </div>
        <div style={{ padding: '20px 15px 20px 15px' }}>
            <Chart
            //   height={window.innerHeight}
              height={400}
              data={dv}
              padding="auto"
              scale={scale}
              forceFit
            >
            <Tooltip crosshairs />
            <Axis />
            <Legend />
            <Geom type="area" position="year*value" color="type" shape="smooth" />
            <Geom
              type="line"
              position="year*value"
              color="type"
              shape="smooth"
              size={2}
            />
            </Chart>
        </div>
      </div>
    );
  }
}

export default Areanull;
