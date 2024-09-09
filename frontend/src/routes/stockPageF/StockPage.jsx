import React, { useState, useEffect, useRef } from "react";
import styles from "./StockPage.module.css";
import { motion } from "framer-motion";
import stockData from "./stocks.json";
import { IoMdSearch } from "react-icons/io";
import { getStock, getSearchStock } from "~apis/stockAPI/getStockApi";
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaCaretUp} from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
export default function StockPage() {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionRefs = useRef([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStock();
                setStocks(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            const filteredSuggestions = stockData.filter(
                (stock) =>
                    stock.stock_name
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    stock.stock_id.includes(value)
            );
            setSuggestions(filteredSuggestions);
            setSelectedIndex(-1);
            setIsSuggestionsVisible(true);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        setSearchTerm(suggestion.stock_name);
        setSuggestions([]);
        setSelectedIndex(-1);
        setIsSuggestionsVisible(false);

        try {
            const searchResults = await getSearchStock(suggestion.stock_name);
            setStocks(searchResults);
        } catch (error) {
            console.error("Error fetching stock details:", error);
        }
    };

    const handleSearch = async (searchTerm) => {
        if (searchTerm) {
            try {
                const searchResults = await getSearchStock(searchTerm);
                setStocks(searchResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                Math.min(prevIndex + 1, suggestions.length - 1)
            );
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);
            } else {
                await handleSearch(searchTerm);
            }
        }
    };

    const handleBlur = () => {
        setIsSuggestionsVisible(false);
    };

    const handleFocus = () => {
        if (searchTerm && suggestions.length > 0) {
            setIsSuggestionsVisible(true);
            setTimeout(() => {
                if (
                    selectedIndex >= 0 &&
                    suggestionRefs.current[selectedIndex]
                ) {
                    suggestionRefs.current[selectedIndex].scrollIntoView({
                        block: "start",
                        inline: "nearest",
                    });
                }
            }, 0);
        }
    };

    useEffect(() => {
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            setSearchTerm(suggestions[selectedIndex].stock_name);
            suggestionRefs.current[selectedIndex]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [selectedIndex, suggestions]);

    return (
        <motion.div
            key="stock-page"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div>종목 검색</div>
                </div>
                <div className={styles.searchsearch}>
                    <div className={styles.searchContainer}>
                        <div className={styles.search} onBlur={handleBlur}>
                            <IoMdSearch
                                className={styles.searchIcon}
                                onClick={() => handleSearch(searchTerm)}
                            />
                            <input
                                type="text"
                                placeholder="종목 검색"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                className={styles.searchInput}
                            />
                            {suggestions.length > 0 && isSuggestionsVisible && (
                                <div className={styles.suggestions}>
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            ref={(el) =>
                                                (suggestionRefs.current[index] =
                                                    el)
                                            }
                                            className={`${
                                                styles.suggestionItem
                                            } ${
                                                index === selectedIndex
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onMouseDown={() =>
                                                handleSuggestionClick(
                                                    suggestion
                                                )
                                            }
                                        >
                                            {suggestion.stock_name} (
                                            {suggestion.stock_id})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.list}>
                    <div className={styles.header}>추천 종목 목록</div>
                    <div className={styles.totalCard}>
                        {stocks.length > 0 &&
                            stocks.slice(0, 5).map((stock, index) => (
                                <div
                                    key={index}
                                    className={styles.stockCard}
                                    onClick={() =>
                                        navigate("/stock/chart", {
                                            state: {
                                                stockCode: stock.stockCode,
                                            },
                                        })
                                    }
                                >
                                    <div className={styles.stockInfo}>
                                        <div className={styles.stockName}>
                                            {stock.stockName}
                                        </div>
                                        <div className={styles.stockCode}>
                                            {stock.stockCode}
                                        </div>
                                    </div>
                                    <div className={styles.stockDetails}>
                                        <div
                                            className={
                                                stock.previousPrice === "0"
                                                    ? styles.stockChangeNeutral
                                                    : stock.previousPrice.startsWith(
                                                          "-"
                                                      )
                                                    ? styles.stockChangeNegative
                                                    : styles.stockChangePositive
                                            }
                                        >
                                            {stock.previousPrice === "0" ? (
                                                <>
                                                    <TiMinus />
                                                    {stock.previousPrice}{" "}
                                                </>
                                            ) : stock.previousPrice.startsWith(
                                                  "-"
                                              ) ? (
                                                <>
                                                    <FaCaretDown />
                                                    {stock.previousPrice.slice(
                                                        1
                                                    )}{" "}
                                                </>
                                            ) : (
                                                <>
                                                    <FaCaretUp />
                                                    {stock.previousPrice}{" "}
                                                </>
                                            )}
                                        </div>
                                        <div className={styles.stockPrice}>
                                            {stock.stockPrice}원
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
