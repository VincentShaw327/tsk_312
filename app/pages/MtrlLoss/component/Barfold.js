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
import DataSet from "@antv/data-set";

class Groupedcolumn extends React.Component {
  render() {
    const data = [
      {
        name: "理论利用率",
        "P20181023_2345": 18.9,
        "P20181023_2346": 28.8,
        "P20181023_2347": 39.3,
        "P20181023_2348": 81.4,
        "P20181023_2349": 47,
        "P20181023_2350": 20.3,
        "P20181023_2351": 24,
        "P20181023_2352": 35.6,
        "P20181023_2353": 47.6,
        "P20181023_2354": 66.1
      },
      {
        name: "实际利用率",
        "P20181023_2345": 12.4,
        "P20181023_2346": 23.2,
        "P20181023_2347": 34.5,
        "P20181023_2348": 99.7,
        "P20181023_2349": 52.6,
        "P20181023_2350": 35.5,
        "P20181023_2351": 37.4,
        "P20181023_2352": 42.4,
        "P20181023_2353": 51.4,
        "P20181023_2354": 56.4
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: [
        "P20181023_2345",
        "P20181023_2346",
        "P20181023_2347",
        "P20181023_2348",
        "P20181023_2349",
        "P20181023_2350",
        "P20181023_2351",
        "P20181023_2352",
        "P20181023_2353",
        // "P20181023_2354"
      ],
      // 展开字段集
      key: "月份",
      // key字段
      value: "月均降雨量" // value字段
    });
    return (
      <div>
        <Chart height={250} data={dv} forceFit>
          <Axis name="月份" />
          <Axis name="月均降雨量" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="月份*月均降雨量"
            color={"name"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default Groupedcolumn;
