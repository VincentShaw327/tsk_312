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
        year: "产品1",
        sales: 38
      },
      {
        year: "产品2",
        sales: 52
      },
      {
        year: "产品3",
        sales: 61
      },
      {
        year: "产品4",
        sales: 55
      },
      {
        year: "产品5",
        sales: 48
      },
      {
        year: "产品6",
        sales: 38
      },
      {
        year: "产品7",
        sales: 38
      },
      {
        year: "产品8",
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
