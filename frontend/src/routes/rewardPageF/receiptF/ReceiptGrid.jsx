import React, { useState, useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";
import { useTransition, animated as a } from "@react-spring/web";
import shuffle from "lodash.shuffle";
import styles from "./ReceiptGrid.module.css";
import { enterpriseList } from "~apis/rewardAPI/receiptApi";

function useMedia(queries, values, defaultValue) {
    const match = () =>
        values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
    const [value, setValue] = useState(match);

    useEffect(() => {
        const handler = () => setValue(match);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return value;
}

export default function ReceiptGrid() {
    const columns = useMedia(
        ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
        [3, 3, 3],
        3
    );

    const [ref, { width: measuredWidth }] = useMeasure();
    const width = measuredWidth > 0 ? Math.min(measuredWidth, 480) : 480;

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchEnterpriseData = async () => {
            try {
                const response = await enterpriseList();
                const formattedData = response.enterprises.map((enterprise) => ({
                    css: `https://stock-craft.s3.ap-northeast-2.amazonaws.com/receiptlogos/${encodeURIComponent(
                        enterprise
                    )}.svg`,
                    height: 150,
                }));
                setItems(formattedData);
            } catch (error) {
                console.error("Error fetching enterprise data:", error);
            }
        };

        fetchEnterpriseData();
    }, []);

    useEffect(() => {
        const t = setInterval(() => setItems((prevItems) => shuffle([...prevItems])), 3000);
        return () => clearInterval(t);
    }, []);

    const [heights, gridItems] = useMemo(() => {
        let heights = new Array(columns).fill(0);
        let gridItems = items.map((child, i) => {
            const column = heights.indexOf(Math.min(...heights));
            const x = (width / columns) * column;
            const y = (heights[column] += child.height / 2) - child.height / 2;
            return {
                ...child,
                x,
                y,
                width: width / columns,
                height: child.height / 2,
            };
        });
        return [heights, gridItems];
    }, [columns, items, width]);

    const transitions = useTransition(gridItems, {
        key: (item) => item.css,
        from: ({ x, y, width, height }) => ({
            x,
            y,
            width,
            height,
            opacity: 0,
        }),
        enter: ({ x, y, width, height }) => ({
            x,
            y,
            width,
            height,
            opacity: 1,
        }),
        update: ({ x, y, width, height }) => ({ x, y, width, height }),
        leave: { height: 0, opacity: 0 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 25,
    });

    return (
        <div
            ref={ref}
            className={styles.list}
            style={{ width: "100%", maxWidth: "480px", height: Math.max(...heights) }}
        >
            {transitions((style, item) => (
                <a.div style={style}>
                    <div
                        style={{
                            backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </a.div>
            ))}
        </div>
    );
}