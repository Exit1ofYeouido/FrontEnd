import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
} from "recharts";

export default function BarChartComponent({ data, selectedOption, month }) {
    return (
        <BarChart
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
                tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalCount" fill="#8884d8">
                <LabelList dataKey="totalCount" position="top" />
            </Bar>
        </BarChart>
    );
}
