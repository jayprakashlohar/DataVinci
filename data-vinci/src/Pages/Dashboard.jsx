import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Heading, Text, Select } from "@chakra-ui/react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  Legend,
} from "chart.js";

import LineGraph from "../Components/Graph/LineGraph";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Dashboard = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedPestle, setSelectedPestle] = useState("");
  const [selectedAdded, setSelectedAdded] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  let URL = `https://blackcoffer-server-production.up.railway.app`;

  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
      topic: selectedTopic,
      pestle: selectedPestle,
      added: selectedAdded,
    };
    axios
      .get(`${URL}/data?`, { params })
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [page, selectedTopic, selectedPestle, selectedAdded]);
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handlePestleChange = (event) => {
    setSelectedPestle(event.target.value);
  };

  const handleAddedChange = (event) => {
    setSelectedAdded(event.target.value);
  };

  useEffect(() => {
    // Apply filters when the data or filter options change
    const filteredResults = (data.data ?? []).filter((el) => {
      // Apply selectedTopic filter
      if (selectedTopic && el.topic !== selectedTopic) {
        return false;
      }
      // Apply selectedPestle filter
      if (selectedPestle && el.pestle !== selectedPestle) {
        return false;
      }
      // Apply selectedAdded filter
      if (selectedAdded && el.added !== selectedAdded) {
        return false;
      }
      return true; // Include the data in the filtered results
    });
    setFilteredData(filteredResults);
  }, [data, selectedTopic, selectedPestle, selectedAdded]);

  return (
    <>
      <Box>
        <Box>
          <Heading
            m="40px"
            fontSize="25px"
            fontFamily="cursive"
            textAlign="center"
          >
            Relation b/w Intensity and Likelihood{" "}
          </Heading>
          <LineGraph data={data} />
        </Box>

        <Box w="95%" m="auto" mt="50px">
          <Box mb="10px" display="flex" justifyContent="flex-start">
            <Select
              placeholder="Select Topic"
              value={selectedTopic}
              onChange={handleTopicChange}
              mr="10px"
            >
              {data.data &&
                data.data
                  .filter(
                    (el) => el.topic === selectedTopic || selectedTopic === ""
                  )
                  .map((el) => <option key={el._id}>{el.topic}</option>)}
            </Select>
            <Select
              placeholder="Select Pestle"
              value={selectedPestle}
              onChange={handlePestleChange}
              mr="10px"
            >
              {data.data &&
                data.data
                  .filter(
                    (el) =>
                      el.pestle === selectedPestle || selectedPestle === ""
                  )
                  .map((el) => <option key={el._id}>{el.pestle}</option>)}
            </Select>
            <Select
              placeholder="Select Added"
              value={selectedAdded}
              onChange={handleAddedChange}
            >
              {data.data &&
                data.data
                  .filter(
                    (el) => el.added === selectedAdded || selectedAdded === ""
                  )
                  .map((el) => <option key={el._id}>{el.added}</option>)}
            </Select>
          </Box>
          <table>
            <thead>
              <tr className="tr">
                <th>Added</th>
                <th>Country</th>
                <th>Insight</th>
                <th>Pestle</th>
                <th> Published</th>
                <th>Topic</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.added}</td>
                      <td>{item.country}</td>
                      <td>{item.insight}</td>
                      <td>{item.pestle}</td>
                      <td>{item.published}</td>
                      <td>{item.topic}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Box
            display="flex"
            border="1px solid gray"
            justifyContent="center"
            alignItems="center"
            padding="10px"
            gap="5px"
          >
            <button
              className="prev"
              onClick={() => setPage(page - 1)}
              disabled={page == 1}
            >
              Prev
            </button>
            <Text fontWeight="bold">{page}</Text>
            <button className="prev" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Dashboard };
