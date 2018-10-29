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

class Quality extends React.Component {
  render() {
    const data = [
      {
        year: "2018/01月",
        value: 91
      },
      {
        year: "2018/02月",
        value: 93.2
      },
      {
        year: "2018/03月",
        value: 90.2
      },
      {
        year: "2018/04月",
        value: 89.8
      },
      {
        year: "2018/05月",
        value: 88.3
      },
      {
        year: "2018/06月",
        value: 89.7
      },
      {
        year: "2018/07月",
        value: 90.1
      },
      {
        year: "2018/08月",
        value: 86.3
      },
      {
        year: "2018/09月",
        value: 85.5
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
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis
              name="value"
              label={{
                  formatter: val => `${val}%`
              }}
           />
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

export default Quality;
