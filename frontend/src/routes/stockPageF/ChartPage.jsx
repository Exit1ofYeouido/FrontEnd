import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./ChartPage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getStockPrice, getStockChart } from "~apis/stockAPI/getStockApi";
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
    const [activePeriod, setActivePeriod] = useState("1W");
    const [stocksPrice, setStocksPrice] = useState({});
    const [stocksChart, setStocksChart] = useState([]);
    const location = useLocation();
    const { stockCode } = location.state || {};
    const chartRef = useRef(null); // 차트 컨테이너 참조 생성

    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        // 차트 컨테이너의 너비를 설정
        const updateContainerWidth = () => {
            if (chartRef.current) {
                setContainerWidth(chartRef.current.offsetWidth); // 컨테이너의 너비 가져오기
            }
        };

        updateContainerWidth(); // 초기 설정
        window.addEventListener("resize", updateContainerWidth); // 리사이즈 시 업데이트

        return () => {
            window.removeEventListener("resize", updateContainerWidth); // 리스너 제거
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const price = await getStockPrice(stockCode);
                setStocksPrice(price);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chart = await getStockChart(stockCode, activePeriod);
                setStocksChart(chart.stockPriceList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [activePeriod]);

    const handleBack = () => {
        navigate("/stock");
    };

    const handlePeriodChange = (period) => {
        setActivePeriod(period);
    };

    const isNegative = stocksPrice.previousPrice
        ? stocksPrice.previousPrice.startsWith("-")
        : false;

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const prices = stocksChart.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const maxPriceIndex = stocksChart.findIndex(
        (item) => item.price === maxPrice
    );
    const minPriceIndex = stocksChart.findIndex(
        (item) => item.price === minPrice
    );

    const reversedMaxPriceIndex = stocksChart.length - 1 - maxPriceIndex;
    const reversedMinPriceIndex = stocksChart.length - 1 - minPriceIndex;

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
                    <div className={styles.stockName}>
                        {stocksPrice.stockName}
                    </div>
                    <div className={styles.stockCode}>
                        {stocksPrice.stockCode}
                    </div>
                </div>
                <div className={styles.stockPrice}>
                    {formatNumber(stocksPrice.stockPrice)}
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
                        {formatNumber(stocksPrice.previousPrice)}원
                    </div>
                    <div className={styles.previousRate}>
                        ({stocksPrice.previousRate}%)
                    </div>
                </div>
            </div>

            <div className={styles.chartContainer} ref={chartRef}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={stocksChart.slice().reverse()}
                        margin={{ top: 0, right: 10, left: -55, bottom: 0 }}
                        clipPath={false}
                    >
                        <XAxis dataKey="date" tick={false} axisLine={false} />
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
                                const margin = 10;

                                // 텍스트가 화면 밖으로 나가지 않도록 조정
                                const isTextOverflowingRight =
                                    cx + 100 > containerWidth - margin;
                                const isTextTooLeft = cx - 100 < margin;

                                if (index === stocksChart.length - 1) {
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
                                if (index === reversedMaxPriceIndex) {
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
                                                x={
                                                    isTextOverflowingRight
                                                        ? cx - 100 // 오른쪽 경계를 넘으면 왼쪽으로 이동
                                                        : isTextTooLeft
                                                        ? cx + 10 // 왼쪽 경계를 넘으면 오른쪽으로 이동
                                                        : cx + 10
                                                }
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
                                if (index === reversedMinPriceIndex) {
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
                                                x={
                                                    isTextOverflowingRight
                                                        ? cx - 100 // 오른쪽 경계를 넘으면 왼쪽으로 이동
                                                        : isTextTooLeft
                                                        ? cx + 10 // 왼쪽 경계를 넘으면 오른쪽으로 이동
                                                        : cx + 10
                                                }
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
                        activePeriod === "1W" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("1W")}
                >
                    1주
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "1M" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("1M")}
                >
                    1달
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "3M" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("3M")}
                >
                    3달
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activePeriod === "1Y" ? styles.activeTab : ""
                    }`}
                    onClick={() => handlePeriodChange("1Y")}
                >
                    1년
                </div>
            </div>

            <div>내 주식</div>

            <div>
                {stocksPrice.availableAmount > 0 ? (
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
