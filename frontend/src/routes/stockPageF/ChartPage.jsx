import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./ChartPage.module.css";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
    getStockPrice,
    getStockChart,
    getLink,
    getDetail,
} from "~apis/stockAPI/getStockApi";
import { sellStock } from "~apis/stockAPI/sellStockApi";
import SellModal from "./SellModal";
import { showToast } from "~components/Toast";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import LoadingPage from "~components/LoadingPage";

export default function ChartPage() {
    const navigate = useNavigate();
    const [activePeriod, setActivePeriod] = useState("1W");
    const [stocksPrice, setStocksPrice] = useState({});
    const [stocksChart, setStocksChart] = useState([]);
    const location = useLocation();
    const { stockCode } = location.state || {};
    const [showSellModal, setShowSellModal] = useState(false);
    const chartRef = useRef(null);
    const [modalClosedTrigger, setModalClosedTrigger] = useState(false);
    const [activeTab, setActiveTab] = useState("chart");
    const [containerWidth, setContainerWidth] = useState(0);
    const [enterpriseDetail, setEnterpriseDetail] = useState(null);

    useEffect(() => {
        const updateContainerWidth = () => {
            if (chartRef.current) {
                setContainerWidth(chartRef.current.offsetWidth);
            }
        };

        updateContainerWidth();
        window.addEventListener("resize", updateContainerWidth);

        return () => {
            window.removeEventListener("resize", updateContainerWidth);
        };
    }, [activePeriod]);

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
    }, [modalClosedTrigger]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chart = await getStockChart(stockCode, activePeriod);
                setStocksChart(chart.stockPriceList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (activeTab === "chart") {
            fetchData();
        }
    }, [activePeriod, modalClosedTrigger, activeTab]);

    useEffect(() => {
        const fetchEnterpriseDetail = async () => {
            try {
                const detail = await getDetail(stocksPrice.stockName);
                setEnterpriseDetail(detail);
            } catch (error) {
                console.error("Error fetching enterprise detail:", error);
            }
        };

        if (activeTab === "description" && stocksPrice.stockName) {
            fetchEnterpriseDetail();
        }
    }, [activeTab, stocksPrice.stockName]);

    if (Object.keys(stocksPrice).length === 0) {
        return <LoadingPage />;
    }

    const handleGetLink = async () => {
        try {
            const link = await getLink();
            window.location.href = link.url;
        } catch (error) {
            console.error("Error getting link:", error);
            showToast("error", "오류가 발생했습니다.");
        }
    };

    const handleBack = () => {
        navigate("/stock");
    };

    const handleSellClick = () => {
        setShowSellModal(true);
    };

    const closeSellModal = () => {
        setShowSellModal(false);
    };

    const handleSell = async (quantity) => {
        try {
            await sellStock(stockCode, stocksPrice.stockName, quantity);

            setShowSellModal(false);
            setModalClosedTrigger((prev) => !prev);
            showToast("success", "판매예약이 완료되었습니다.");
        } catch (error) {
            console.error("판매 실패:", error);
            showToast("error", "판매 중 오류가 발생했.습니다");
        }
    };

    const handlePeriodChange = (period) => {
        setActivePeriod(period);
    };

    const isNegative = stocksPrice.previousPrice
        ? stocksPrice.previousPrice.startsWith("-")
        : false;

    const isZero = stocksPrice.previousPrice === "0";

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
                        isZero
                            ? styles.previousPriceZero
                            : isNegative
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

            <div className={styles.topTabs}>
                <div
                    className={`${styles.topTabButton} ${
                        activeTab === "chart" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("chart")}
                >
                    차트
                    {activeTab === "chart" && (
                        <motion.div
                            className={styles.underline}
                            layoutId="underline"
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </div>
                <div
                    className={`${styles.topTabButton} ${
                        activeTab === "description" ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab("description")}
                >
                    기업 설명
                    {activeTab === "description" && (
                        <motion.div
                            className={styles.underline}
                            layoutId="underline"
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </div>
            </div>

            {activeTab === "chart" ? (
                <div>
                    <div className={styles.chartContainer} ref={chartRef}>
                        {stocksChart.length === 0 ? (
                            <div className={styles.noDataMessage}>
                                <span>차트 데이터가 없습니다.</span>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={stocksChart.slice().reverse()}
                                    margin={{
                                        top: 70,
                                        right: 10,
                                        left: -55,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis
                                        dataKey="date"
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[
                                            "dataMin - 500",
                                            "dataMax + 500",
                                        ]}
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{
                                            stroke: "#eee",
                                            strokeWidth: 2,
                                        }}
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
                                        animationDuration={400}
                                        dot={(dotProps) => {
                                            const { index, cx, cy } = dotProps;
                                            const margin = 10;

                                            const isTextOverflowingRight =
                                                cx + 100 >
                                                containerWidth - margin;
                                            const isTextTooLeft =
                                                cx - 100 < margin;

                                            if (
                                                index ===
                                                stocksChart.length - 1
                                            ) {
                                                return (
                                                    <circle
                                                        key={`dot-${index}`}
                                                        cx={cx}
                                                        cy={cy}
                                                        r={5}
                                                        className={
                                                            styles.glowingDot
                                                        }
                                                    />
                                                );
                                            }
                                            if (
                                                index === reversedMaxPriceIndex
                                            ) {
                                                return (
                                                    <g
                                                        key={`max-price-${index}`}
                                                    >
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
                                                                    ? cx - 100
                                                                    : isTextTooLeft
                                                                    ? cx + 10
                                                                    : cx + 10
                                                            }
                                                            y={cy - 10}
                                                            fill="red"
                                                            fontSize={12}
                                                            key={`text-max-${index}`}
                                                        >
                                                            {`최고가: ${formatNumber(
                                                                maxPrice
                                                            )}원`}
                                                        </text>
                                                    </g>
                                                );
                                            }
                                            if (
                                                index === reversedMinPriceIndex
                                            ) {
                                                return (
                                                    <g
                                                        key={`min-price-${index}`}
                                                    >
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
                                                                    ? cx - 100
                                                                    : isTextTooLeft
                                                                    ? cx + 10
                                                                    : cx + 10
                                                            }
                                                            y={cy + 15}
                                                            fill="blue"
                                                            fontSize={12}
                                                            key={`text-min-${index}`}
                                                        >
                                                            {`최저가: ${formatNumber(
                                                                minPrice
                                                            )}원`}
                                                        </text>
                                                    </g>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
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
                </div>
            ) : (
                <div className={styles.descriptionContainer}>
                    {enterpriseDetail ? (
                        <>
                            <img
                                src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                    enterpriseDetail.name
                                )}.svg`}
                                alt={`${enterpriseDetail.name} 로고`}
                                className={styles.Logo}
                            />
                            <div className={styles.name}>
                                {enterpriseDetail.name}
                            </div>
                            <div className={styles.comment}>
                                {enterpriseDetail.comment}
                            </div>
                        </>
                    ) : (
                        <div>
                            기업 설명을 등록하고 싶으시면 광고를 맡겨 주세요
                        </div>
                    )}
                </div>
            )}
            <div className={styles.buttonGroup}>
                <div className={styles.myStock}>
                    <div className={styles.row}>
                        <div>보유 수량</div>
                        <div>
                            {stocksPrice.availableAmount
                                ? stocksPrice.availableAmount.toFixed(6)
                                : "0"}
                            주
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>평가 금액</div>
                        <div>
                            {stocksPrice.availableAmount &&
                            stocksPrice.stockPrice
                                ? `${formatNumber(
                                      Math.floor(
                                          stocksPrice.availableAmount *
                                              stocksPrice.stockPrice
                                      )
                                  )}원`
                                : "0원"}
                        </div>
                    </div>
                </div>
                <div className={styles.buttonButton}>
                    <button
                        className={styles.sellButton}
                        onClick={handleSellClick}
                    >
                        판매
                    </button>
                    <button
                        className={styles.buyButton}
                        onClick={handleGetLink}
                    >
                        구매
                    </button>
                </div>
            </div>

            {showSellModal && (
                <SellModal
                    onClose={closeSellModal}
                    stockName={stocksPrice.stockName}
                    availableAmount={stocksPrice.availableAmount}
                    onSell={handleSell}
                    stockCode={stocksPrice.stockCode}
                    currentPrice={stocksPrice.stockPrice}
                />
            )}
        </div>
    );
}
