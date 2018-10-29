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

class Basic extends React.Component {
  render() {
    const data = [
      {
        year: "2018.01",
        value: 3
      },
      {
        year: "2018.02",
        value: 4
      },
      {
        year: "2018.03",
        value: 3.5
      },
      {
        year: "2018.04",
        value: 5
      },
      {
        year: "2018.05",
        value: 4.9
      },
      {
        year: "2018.06",
        value: 6
      },
      {
        year: "2018.07",
        value: 7
      },
      {
        year: "2018.08",
        value: 9
      },
      {
        year: "2018.09",
        value: 13
      }
    ];
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={250} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Basic;
