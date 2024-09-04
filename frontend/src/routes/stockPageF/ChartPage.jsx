import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./ChartPage.module.css";
import { useNavigate } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function ChartPage() {
    const navigate = useNavigate();
    const [activePeriod, setActivePeriod] = useState("1w");

    const data = {
        stockName: "SK하이닉스",
        stockCode: "000660",
        stockPrice: 170800,
        availableAmount: 0.25,
        previousPrice: "-2900",
        previousRate: "-1.67",
        stockPriceList: [
            {
                date: "2024-09-03",
                price: 170100,
            },
            {
                date: "2024-09-03",
                price: 170800,
            },
            {
                date: "2024-09-03",
                price: 170600,
            },
            {
                date: "2024-09-03",
                price: 170300,
            },
            {
                date: "2024-09-03",
                price: 170200,
            },
            {
                date: "2024-09-02",
                price: 170800,
            },
            {
                date: "2024-08-30",
                price: 173700,
            },
            {
                date: "2024-08-29",
                price: 169700,
            },
            {
                date: "2024-09-03",
                price: 170100,
            },
            {
                date: "2024-09-03",
                price: 170800,
            },
            {
                date: "2024-09-03",
                price: 170600,
            },
            {
                date: "2024-09-03",
                price: 170300,
            },
            {
                date: "2024-09-03",
                price: 170200,
            },
            {
                date: "2024-09-02",
                price: 170800,
            },
            {
                date: "2024-08-30",
                price: 173700,
            },
            {
                date: "2024-08-29",
                price: 169700,
            },
            {
                date: "2024-09-03",
                price: 170100,
            },
            {
                date: "2024-09-03",
                price: 170800,
            },
            {
                date: "2024-09-03",
                price: 170600,
            },
            {
                date: "2024-09-03",
                price: 170300,
            },
            {
                date: "2024-09-03",
                price: 170200,
            },
            {
                date: "2024-09-02",
                price: 170800,
            },
            {
                date: "2024-08-30",
                price: 173700,
            },
            {
                date: "2024-08-29",
                price: 169700,
            },
            {
                date: "2024-09-03",
                price: 170100,
            },
            {
                date: "2024-09-03",
                price: 170800,
            },
            {
                date: "2024-09-03",
                price: 170600,
            },
            {
                date: "2024-09-03",
                price: 170300,
            },
            {
                date: "2024-09-03",
                price: 170200,
            },
            {
                date: "2024-09-02",
                price: 170800,
            },
            {
                date: "2024-08-30",
                price: 173700,
            },
            {
                date: "2024-08-29",
                price: 169700,
            },
            {
                date: "2024-09-03",
                price: 170100,
            },
            {
                date: "2024-09-03",
                price: 170800,
            },
            {
                date: "2024-09-03",
                price: 170600,
            },
            {
                date: "2024-09-03",
                price: 170300,
            },
            {
                date: "2024-09-03",
                price: 170200,
            },
            {
                date: "2024-09-02",
                price: 170800,
            },
            {
                date: "2024-08-30",
                price: 173700,
            },
            {
                date: "2024-08-29",
                price: 169700,
            },
            {
                date: "2024-09-03",
                price: 170100,
            },
            {
                date: "2024-09-03",
                price: 170800,
            },
            {
                date: "2024-09-03",
                price: 170600,
            },
            {
                date: "2024-09-03",
                price: 170300,
            },
            {
                date: "2024-09-03",
                price: 170200,
            },
            {
                date: "2024-09-02",
                price: 170800,
            },
            {
                date: "2024-08-30",
                price: 173700,
            },
            {
                date: "2024-08-29",
                price: 169700,
            },
        ],
    };

    const handleBack = () => {
        navigate("/stock");
    };

    const handlePeriodChange = (period) => {
        console.log(period);
        setActivePeriod(period);
    };

    const isNegative = data.previousPrice.startsWith("-");

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const prices = data.stockPriceList.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const maxPriceIndex = data.stockPriceList.findIndex(
        (item) => item.price === maxPrice
    );

    const minPriceIndex = data.stockPriceList.findIndex(
        (item) => item.price === minPrice
    );

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.arrow} onClick={handleBack}>
                    <IoIosArrowBack />
                </div>
                <div>내 보유 주식</div>
            </div>

            <div className={styles.info}>
                <div className={styles.stockNameGroup}>
                    <div className={styles.stockName}>{data.stockName}</div>
                    <div className={styles.stockCode}>{data.stockCode}</div>
                </div>
                <div className={styles.stockPrice}>
                    {formatNumber(data.stockPrice)}
                </div>
                <div
                    className={
                        isNegative
                            ? styles.previousPriceNegative
                            : styles.previousPricePositive
                    }
                >
                    <div className={styles.previousDay}>전날보다</div>
                    <div className={styles.previousPrice}>
                        {formatNumber(data.previousPrice)}원
                    </div>
                    <div className={styles.previousRate}>
                        ({data.previousRate}%)
                    </div>
                </div>
            </div>

            <div className={styles.chartContainer}>
                <ResponsiveContainer>
                    <LineChart
                        data={data.stockPriceList}
                        margin={{ top: 70, right: 10, left: -55, bottom: 0 }}
                    >
                        <XAxis dataKey="date" tick={false} axisLine={false} />{" "}
                        <YAxis
                            domain={["dataMin - 500", "dataMax + 500"]}
                            tick={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ stroke: "#eee", strokeWidth: 2 }}
                            formatter={(value, name, props) => [
                                `${formatNumber(value)}원`,
                            ]}
                            position={{ y: 10 }}
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                fontSize: "14px",
                                width: "100px",
                            }}
                            itemStyle={{
                                color: "#333",
                                fontWeight: "bold",
                                fontSize: "12px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#3B7FEE"
                            strokeWidth={3}
                            dot={(dotProps) => {
                                const { index, cx, cy } = dotProps;
                                if (index === data.stockPriceList.length - 1) {
                                    return (
                                        <circle
                                            key={`dot-${index}`}
                                            cx={cx}
                                            cy={cy}
                                            r={5}
                                            className={styles.glowingDot}
                                        />
                                    );
                                }
                                if (index === maxPriceIndex) {
                                    return (
                                        <>
                                            <circle
                                                key={`dot-${index}`}
                                                cx={cx}
                                                cy={cy}
                                                r={3}
                                                fill="blue"
                                            />
                                            <text
                                                x={cx + 10}
                                                y={cy - 10}
                                                fill="blue"
                                                fontSize={12}
                                            >
                                                {`최고가: ${formatNumber(
                                                    maxPrice
                                                )}원`}
                                            </text>
                                        </>
                                    );
                                }
                                if (index === minPriceIndex) {
                                    return (
                                        <>
                                            <circle
                                                key={`dot-${index}`}
                                                cx={cx}
                                                cy={cy}
                                                r={3}
                                                fill="red"
                                            />
                                            <text
                                                x={cx + 10}
                                                y={cy + 15}
                                                fill="red"
                                                fontSize={12}
                                            >
                                                {`최저가: ${formatNumber(
                                                    minPrice
                                                )}원`}
                                            </text>
                                        </>
                                    );
                                }
                                return null;
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "1w" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("1w")}
                >
                    1주
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "1m" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("1m")}
                >
                    1달
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "3m" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("3m")}
                >
                    3달
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "1y" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("1y")}
                >
                    1년
                </div>
            </div>
            
            <div>내 주식</div>
            
            
            <div>
                {data.availableAmount > 0 ? (
                    <div className={styles.buttonGroup}>
                        <button className={styles.sellButton}>판매</button>
                        <button className={styles.buyButton}>구매</button>
                    </div>
                ) : (
                    <div className={styles.buttonGroup}>
                        <button className={styles.buyButton}>구매</button>
                    </div>
                )}
            </div>
        </div>
    );
}
