import React from "react";
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
  Util
} from "bizcharts";

class Basiccolumn extends React.Component {
  render() {
    const data = [
      {
        year: "P20181023_2345",
        sales: 38
      },
      {
        year: "P20181023_2346",
        sales: 52
      },
      {
        year: "P20181023_2347",
        sales: 61
      },
      {
        year: "P20181023_2348",
        sales: 89
      },
      {
        year: "P20181023_2349",
        sales: 48
      },
      {
        year: "P20181023_2350",
        sales: 38
      },
      {
        year: "P20181023_2351",
        sales: 38
      },
      {
        year: "P20181023_2352",
        sales: 38
      }
    ];
    const cols = {
      sales: {
        tickInterval: 20
      }
    };
    return (
      <div>
        <Chart height={250} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="sales" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="year*sales" />
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;
