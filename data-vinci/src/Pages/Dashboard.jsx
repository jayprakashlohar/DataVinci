import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
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
  const [data, setData] = useState([]);

  let URL = `https://blackcoffer-server-production.up.railway.app`;

  useEffect(() => {
    axios
      .get(`${URL}/data?page=1&limit=15`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

        <Box mt="50px">
          <table>
            <thead>
              <tr
                style={{
                  border: "1px solid black",
                  background: "black",
                  color: "#fff",
                }}
              >
                <th >Added</th>
                <th>Country</th>
                <th>Insight</th>
                <th>Pestle</th>
                <th>Published</th>
                <th>Topic</th>
              </tr>
            </thead>
            <tbody>
              {data.data &&
                data.data.map((item) => {
                  return (
                    <tr key={item.id} >
                      <td className="td">{item.added}</td>
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
        </Box>
      </Box>
    </>
  );
};

export { Dashboard };
