import { Button, Segmented } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllBuildingsChart from "./AllBuildingsChart";
import BuildingsCharts from "./BuildingsCharts";
import "./Statistics.scss";
import TotalStatisticsChart from "./TotalStatisticsChart";

const tabOptions = ["Ümumi", "Binalar"];

const Statistics = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string | number>(tabOptions[0]);

    return (
        <div className='flex-column gap-1 w-full'>
            <div className='flex gap-1 justify-between'>
                <Button className='default-btn' onClick={() => navigate(-1)}>
                    Geri
                </Button>

                <Segmented options={tabOptions} type='number' value={selectedTab} onChange={setSelectedTab} />
            </div>

            {selectedTab === tabOptions[1] ? (
                <BuildingsCharts />
            ) : (
                <>
                    <TotalStatisticsChart />
                    <AllBuildingsChart />
                </>
            )}
        </div>
    );
};

export default Statistics;
