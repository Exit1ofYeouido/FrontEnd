import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "./PieChartComponent.module.css";

const PieChartComponent = ({ data = [], selectedOption, month }) => {
    if (!data || data.length === 0) {
        return <p>데이터가 없습니다</p>;
    }

    let pieData = [];
    let holdingPieData = [];
    let top5HoldingStocks = [];
    let top5NotHoldingStocks = [];
    let top5Dates = [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const formattedLabel = `${label}월`;
            const formattedValue = `${value}건`;
            return (
                <div className={styles.customTooltip}>
                    <p
                        className={styles.label}
                    >{`${formattedLabel}: ${formattedValue}`}</p>
                </div>
            );
        }
        return null;
    };

    if (selectedOption === "memberSearch") {
        pieData = data
            .sort((a, b) => b.totalCount - a.totalCount)
            .slice(0, 10)
            .map((entry) => ({
                name: entry.enterpriseName,
                value: entry.totalCount,
            }));

        const totalHoldingCount = data
            .filter((entry) => entry.holding)
            .reduce((sum, entry) => sum + entry.totalCount, 0);
        const totalNotHoldingCount = data
            .filter((entry) => !entry.holding)
            .reduce((sum, entry) => sum + entry.totalCount, 0);

        holdingPieData = [
            { name: "보유 중", value: totalHoldingCount },
            { name: "미보유", value: totalNotHoldingCount },
        ];

        top5HoldingStocks = data
            .filter((entry) => entry.holding)
            .sort((a, b) => b.totalCount - a.totalCount)
            .slice(0, 5)
            .map((entry) => ({
                name: entry.enterpriseName,
                value: entry.totalCount,
            }));

        top5NotHoldingStocks = data
            .filter((entry) => !entry.holding)
            .sort((a, b) => b.totalCount - a.totalCount)
            .slice(0, 5)
            .map((entry) => ({
                name: entry.enterpriseName,
                value: entry.totalCount,
            }));
    } else if (selectedOption === "memberAndEnterpriseSearch") {
        pieData = data.map((entry) => ({
            name: entry.date,
            value: entry.totalCount,
        }));
    } else if (selectedOption === "enterpriseSearch") {
        const totalHoldingCount = data.reduce(
            (sum, entry) => sum + entry.holdingCount,
            0
        );
        const totalNotHoldingCount = data.reduce(
            (sum, entry) => sum + entry.notHoldingCount,
            0
        );

        pieData = [
            { name: "보유 중", value: totalHoldingCount },
            { name: "미보유", value: totalNotHoldingCount },
        ];

        top5Dates = data
            .sort((a, b) => b.totalCount - a.totalCount)
            .slice(0, 5)
            .map((entry) => ({
                name: month === "0" ? entry.month : entry.date,
                value: entry.totalCount,
            }));

        holdingPieData = data.map((entry) => ({
            name: month === "0" ? entry.month : entry.date,
            보유자: entry.holdingCount,
            비보유자: entry.notHoldingCount,
        }));
    }

    if (pieData.length === 0) {
        return <p>차트를 표시할 데이터가 없습니다</p>;
    }

    const COLORS = [
        "#0088FE",
        "#FF8042",
        "#00C49F",
        "#FFBB28",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
    ];

    return (
        <div className={styles.container}>
            {selectedOption === "memberSearch" && (
                <div className={styles.chartWrapper}>
                    <div>
                        <h3>검색량 Top 10</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div>
                        <h3>보유량에 따른 검색량</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={holdingPieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {holdingPieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-holding-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div>
                        <h3>보유한 주식 중 검색량 상위 5개</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={top5HoldingStocks}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {top5HoldingStocks.map((entry, index) => (
                                    <Cell
                                        key={`cell-top-holding-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div>
                        <h3>보유하지 않은 주식 중 검색량 상위 5개</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={top5NotHoldingStocks}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {top5NotHoldingStocks.map((entry, index) => (
                                    <Cell
                                        key={`cell-top-not-holding-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            )}

            {selectedOption === "memberAndEnterpriseSearch" && (
                <div className={styles.chartWrapper}>
                    <div>
                        <h3>검색량이 많은 날짜</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    {/* <div>
                        <h3>보유량에 따른 검색량</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={holdingPieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {holdingPieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-holding-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div>
                        <h3>보유한 주식 중 검색량 상위 5개</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={top5HoldingStocks}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {top5HoldingStocks.map((entry, index) => (
                                    <Cell
                                        key={`cell-top-holding-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div>
                        <h3>보유하지 않은 주식 중 검색량 상위 5개</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={top5NotHoldingStocks}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {top5NotHoldingStocks.map((entry, index) => (
                                    <Cell
                                        key={`cell-top-not-holding-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div> */}
                </div>
            )}
            {selectedOption === "enterpriseSearch" && (
                <div className={styles.chartWrapper}>
                    <div>
                        <h3>보유자와 비보유자의 검색량 차이</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    <div>
                        <h3>검색량 상위 5개 날짜</h3>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={top5Dates}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {top5Dates.map((entry, index) => (
                                    <Cell
                                        key={`cell-top-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PieChartComponent;
