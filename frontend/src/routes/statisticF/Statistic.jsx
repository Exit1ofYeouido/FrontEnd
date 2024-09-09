import React, { useState } from "react";
import styles from "./Statistic.module.css";
import {
    getStatisticMember,
    getStatisticMemberStock,
    getStatisticStock,
} from "~apis/statisticAPI/getStatisticApi";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

export default function Statistic() {
    const [selectedOption, setSelectedOption] = useState("memberSearch");
    const [chartType, setChartType] = useState("bar");
    const [memberId, setMemberId] = useState("");
    const [enterpriseName, setEnterpriseName] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [searchHistory, setSearchHistory] = useState([]);

    const handleFetchSearchHistory = async () => {
        try {
            let data;
            if (selectedOption === "memberSearch") {
                data = await getStatisticMember(memberId, year, month);
                setSearchHistory(data);
            } else if (selectedOption === "memberAndEnterpriseSearch") {
                data = await getStatisticMemberStock(
                    memberId,
                    enterpriseName,
                    year,
                    month
                );
                setSearchHistory(data.countResult);
            } else if (selectedOption === "enterpriseSearch") {
                data = await getStatisticStock(enterpriseName, year, month);
            }
        } catch (error) {
            console.error("Error fetching search history:", error);
        }
    };

    // const CustomTooltip = ({ active, payload }) => {
    //     if (active && payload && payload.length) {
    //         const { enterpriseName, totalCount, holding } = payload[0].payload;
    //         return (
    //             <div className={styles.customTooltip}>
    //                 <p>{`기업명: ${enterpriseName}`}</p>
    //                 <p>{`검색 횟수: ${totalCount}`}</p>
    //                 <p>{`보유 여부: ${holding ? "보유 중" : "미보유"}`}</p>
    //             </div>
    //         );
    //     }
    //     return null;
    // };

    const renderBarChart = () => (
        <BarChart
            data={searchHistory}
            width={Math.max(480, searchHistory.length * 60)}
            height={400}
            margin={{ top: 20, right: 30, left: -10, bottom: 50 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey={
                    selectedOption === "memberAndEnterpriseSearch"
                        ? "date"
                        : "enterpriseName"
                }
                interval={0}
                angle={-45}
                textAnchor="end"
                dy={10}
                tick={{ fontSize: 14 }}
                tickFormatter={(name) =>
                    name.length > 5 ? `${name.slice(0, 5)}...` : name
                }
            />
            <YAxis />
            <Tooltip/>
            <Bar dataKey="totalCount" fill="#8884d8">
                <LabelList dataKey="totalCount" position="top" />
            </Bar>
        </BarChart>
    );

    const renderLineChart = () => (
        <LineChart
            data={searchHistory}
            width={Math.max(480, searchHistory.length * 60)}
            height={400}
            margin={{ top: 20, right: 30, left: -10, bottom: 50 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey={
                    selectedOption === "memberAndEnterpriseSearch"
                        ? "date"
                        : "enterpriseName"
                }
                interval={0}
                angle={-45}
                textAnchor="end"
                dy={10}
                tick={{ fontSize: 14 }}
                tickFormatter={(name) =>
                    name.length > 5 ? `${name.slice(0, 5)}...` : name
                }
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

    const renderPieChart = () => (
        <PieChart width={400} height={400}>
            <Pie
                data={searchHistory}
                dataKey="totalCount"
                nameKey="enterpriseName"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={(entry) => entry.enterpriseName}
            >
                {searchHistory.map((_, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                    />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );

    const renderChart = () => {
        if (chartType === "bar") {
            return renderBarChart();
        } else if (chartType === "line") {
            return renderLineChart();
        } else if (chartType === "pie") {
            return renderPieChart();
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <h1>검색 기록 통계</h1>

            <div className={styles.toggleGroup}>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="memberSearch"
                        checked={selectedOption === "memberSearch"}
                        onChange={() => setSelectedOption("memberSearch")}
                    />
                    회원 검색량 조회
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="memberAndEnterpriseSearch"
                        checked={selectedOption === "memberAndEnterpriseSearch"}
                        onChange={() =>
                            setSelectedOption("memberAndEnterpriseSearch")
                        }
                    />
                    회원&기업 검색량 조회
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="enterpriseSearch"
                        checked={selectedOption === "enterpriseSearch"}
                        onChange={() => setSelectedOption("enterpriseSearch")}
                    />
                    기업 검색량 조회
                </label>
            </div>

            <div className={styles.inputGroup}>
                <label>연도:</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    {Array.from(
                        { length: new Date().getFullYear() - 1999 },
                        (_, i) => {
                            const yearOption = new Date().getFullYear() - i;
                            return (
                                <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                </option>
                            );
                        }
                    )}
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>월:</label>
                <select
                    value={month}
                    onChange={(e) =>
                        setMonth(e.target.value === "" ? "0" : e.target.value)
                    }
                >
                    <option value="">전체</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}월
                        </option>
                    ))}
                </select>
            </div>

            {selectedOption === "memberAndEnterpriseSearch" && (
                <>
                    <div className={styles.inputGroup}>
                        <label>회원 ID:</label>
                        <input
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            placeholder="회원 ID를 입력하세요"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>기업 이름:</label>
                        <input
                            value={enterpriseName}
                            onChange={(e) => setEnterpriseName(e.target.value)}
                            placeholder="기업 이름을 입력하세요"
                        />
                    </div>
                </>
            )}

            {selectedOption === "enterpriseSearch" && (
                <div className={styles.inputGroup}>
                    <label>기업 이름:</label>
                    <input
                        value={enterpriseName}
                        onChange={(e) => setEnterpriseName(e.target.value)}
                        placeholder="기업 이름을 입력하세요"
                    />
                </div>
            )}

            {selectedOption === "memberSearch" && (
                <div className={styles.inputGroup}>
                    <label>회원 ID:</label>
                    <input
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        placeholder="회원 ID를 입력하세요"
                    />
                </div>
            )}

            <div className={styles.inputGroup}>
                <button onClick={handleFetchSearchHistory}>조회</button>
            </div>

            <div className={styles.chartTypeSelector}>
                <button onClick={() => setChartType("bar")}>막대 차트</button>
                <button onClick={() => setChartType("line")}>라인 차트</button>
                <button onClick={() => setChartType("pie")}>파이 차트</button>
            </div>

            <div className={styles.chartWrapper}>
                <div className={styles.scrollContainer}>{renderChart()}</div>
            </div>
        </div>
    );
}
