import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function LineChartComponent({ data, selectedOption, month }) {
    console.log(data.month);
    return (
        <LineChart
            data={data}
            width={Math.max(480, data.length * 60)}
            height={400}
            margin={{ top: 20, right: 30, left: -10, bottom: 50 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey={
                    selectedOption === "memberAndEnterpriseSearch" ||
                    selectedOption === "enterpriseSearch"
                        ? month === "0"
                            ? "month"
                            : "date"
                        : "enterpriseName"
                }
                interval={0}
                angle={-45}
                textAnchor="end"
                dy={10}
                tick={{ fontSize: 14 }}
            />
            <YAxis />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="totalCount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
        </LineChart>
    );
}
