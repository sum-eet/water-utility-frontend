// // import React, { useState, useEffect } from "react";
// // import Papa from "papaparse";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   useNavigate,
// //   useParams,
// // } from "react-router-dom";
// // import UtilityPage from "./UtilityPage";
// // import "./App.css";

// // function App() {
// //   const [csvData, setCsvData] = useState([]);
// //   const [groupedData, setGroupedData] = useState([]);

// //   // Load and parse CSV file
// //   useEffect(() => {
// //     fetch("/Scraped Data - Sheet3.csv")
// //       .then((response) => response.text())
// //       .then((csv) => {
// //         Papa.parse(csv, {
// //           header: true,
// //           skipEmptyLines: true,
// //           complete: (result) => {
// //             const grouped = groupUtilities(result.data);
// //             setCsvData(result.data);
// //             setGroupedData(grouped);
// //           },
// //         });
// //       });
// //   }, []);

// //   // Group utilities by System Code
// //   const groupUtilities = (data) => {
// //     const utilitiesMap = {};
// //     data.forEach((row) => {
// //       const systemCode = row["System Code"];
// //       if (!utilitiesMap[systemCode]) {
// //         utilitiesMap[systemCode] = {
// //           systemCode,
// //           utilityName: row["Utility Name"],
// //           town: row.Town,
// //           state: row.State,
// //         };
// //       }
// //     });
// //     return Object.values(utilitiesMap);
// //   };

// //   return (
// //     <Router>
// //       <div className="app">
// //         <Routes>
// //           <Route path="/" element={<HomePage groupedData={groupedData} />} />
// //           <Route
// //             path="/utility/:systemCode"
// //             element={<UtilityPageWrapper data={csvData} />}
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // function HomePage({ groupedData }) {
// //   const navigate = useNavigate();

// //   // Top 2 utilities for Recently Tested
// //   const recentlyTested = groupedData.slice(0, 2);

// //   // Next 10 utilities for Trending
// //   const trending = groupedData.slice(2, 12);

// //   const handleCardClick = (systemCode) => {
// //     if (systemCode) {
// //       navigate(`/utility/${systemCode}`);
// //     }
// //   };

// //   return (
// //     <div className="home-page">
// //       <header className="home-header">
// //         <img src="/Logo.avif" alt="Dr. Water Logo" className="header-logo" />
// //         <div className="zip-code">94017</div>
// //       </header>

// //       <h2 className="section-title" style={{ paddingLeft: "20px" }}>
// //         Recently Tested
// //       </h2>
// //       <div className="recently-tested" style={{ paddingLeft: "20px" }}>
// //         {recentlyTested.map((item, index) => (
// //           <div
// //             key={item.systemCode || index}
// //             className="test-card"
// //             onClick={() => handleCardClick(item.systemCode)}
// //           >
// //             <img src="/image.png" alt="Map" />
// //             <p>{`${item.town}, ${item.state}`}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <h2 className="section-title" style={{ paddingLeft: "20px" }}>
// //         Trending
// //       </h2>
// //       <div className="trending-list" style={{ paddingLeft: "20px" }}>
// //         {trending.map((item, index) => (
// //           <div
// //             key={item.systemCode || index}
// //             className="trending-item"
// //             onClick={() => handleCardClick(item.systemCode)}
// //           >
// //             <p>{`${item.town}`}</p>
// //             <span>{`99/100`}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // function UtilityPageWrapper({ data }) {
// //   const { systemCode } = useParams();
// //   const utilityData = data.filter((item) => item["System Code"] === systemCode);
// //   return <UtilityPage data={utilityData} />;
// // }

// // export default App;

// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import axios from "axios";
// import UtilityPage from "./UtilityPage";
// import "./App.css";

// function App() {
//   const [data, setData] = useState([]);
//   const [groupedData, setGroupedData] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Load and fetch data from the API
//   useEffect(() => {
//     axios
//       .get("https://water-utility-backend.onrender.com/api/aggregated-records")
//       .then((response) => {
//         setData(response.data);
//         setGroupedData(response.data);
//         setSearchResults(response.data);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Handle search
//   const handleSearch = () => {
//     if (!searchQuery.trim()) {
//       setSearchResults(groupedData);
//       return;
//     }

//     const results = groupedData.filter(
//       (item) =>
//         item["System Code"].toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.ZipCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.State.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.Town.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item["Utility Name"].toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <HomePage
//                 groupedData={searchResults}
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//                 handleSearch={handleSearch}
//               />
//             }
//           />
//           <Route path="/utility/:systemCode" element={<UtilityPageWrapper />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function HomePage({ groupedData, searchQuery, setSearchQuery, handleSearch }) {
//   const navigate = useNavigate();

//   // Top 2 utilities for Recently Tested
//   const recentlyTested = groupedData.slice(0, 2);

//   // Next 10 utilities for Trending
//   const trending = groupedData.slice(2, 12);

//   const handleCardClick = (systemCode) => {
//     if (systemCode) {
//       navigate(`/utility/${systemCode}`);
//     }
//   };

//   return (
//     <div className="home-page">
//       <header className="home-header">
//         <img src="/Logo.avif" alt="Dr. Water Logo" className="header-logo" />
//         <div className="zip-code">94017</div>
//       </header>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by utility code, ZIP, state, or town"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       <h2 className="section-title" style={{ paddingLeft: "20px" }}>
//         Recently Tested
//       </h2>
//       <div className="recently-tested" style={{ paddingLeft: "20px" }}>
//         {recentlyTested.map((item, index) => (
//           <div
//             key={item["System Code"] || index}
//             className="test-card"
//             onClick={() => handleCardClick(item["System Code"])}
//           >
//             <img src="/image.png" alt="Map" />
//             <p>{`${item.Town}, ${item.State}`}</p>
//           </div>
//         ))}
//       </div>

//       <h2 className="section-title" style={{ paddingLeft: "20px" }}>
//         Trending
//       </h2>
//       <div className="trending-list" style={{ paddingLeft: "20px" }}>
//         {trending.map((item, index) => (
//           <div
//             key={item["System Code"] || index}
//             className="trending-item"
//             onClick={() => handleCardClick(item["System Code"])}
//           >
//             <p>{`${item.Town}`}</p>
//             <span>{`99/100`}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function UtilityPageWrapper() {
//   const { systemCode } = useParams();
//   const [utilityData, setUtilityData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`https://water-utility-backend.onrender.com/api/aggregated-records/${systemCode}`)
//       .then((response) => {
//         setUtilityData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching utility data:", error);
//         setLoading(false);
//       });
//   }, [systemCode]);

//   if (loading) return <p>Loading...</p>;
//   if (!utilityData)
//     return <p>No data available for this utility. Please try again.</p>;

//   return <UtilityPage data={utilityData} />;
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import UtilityPage from "./UtilityPage";
import ScoreExplanation from "./ScoreExplanation"; // Import new component

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load and fetch data from the API
  useEffect(() => {
    axios
      .get("https://water-utility-backend.onrender.com/api/aggregated-records")
      .then((response) => {
        setData(response.data);
        setGroupedData(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(groupedData);
      return;
    }

    const results = groupedData.filter(
      (item) =>
        item["System Code"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ZipCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.State.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Town.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item["Utility Name"].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                groupedData={searchResults}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />
            }
          />
          <Route path="/utility/:systemCode" element={<UtilityPageWrapper />} />
          <Route path="/score-explanation" element={<ScoreExplanation />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage({ groupedData, searchQuery, setSearchQuery, handleSearch }) {
  const navigate = useNavigate();

  // Hardcoded System Codes
  const hardcodedSystemCodes = [
    "CA0310012",
    "CA0410004",
    "CA0410005",
    "CA0410006",
    "CA0410007",
    "CA0410008",
    "CA0410011",
    "CA0510001",
    "CA0510002",
    "CA0510003",
    "CA0510006",
    "CA0510009",
    "CA0510016",
    "CA0510017",
    "CA0610002",
    "CA0610004",
    "CA0710002",
  ];

  // Filter utilities based on hardcoded System Codes
  const hardcodedUtilities = groupedData.filter((item) =>
    hardcodedSystemCodes.includes(item["System Code"])
  );

  // Top 2 utilities for Recently Tested
  const recentlyTested = hardcodedUtilities.slice(0, 2);

  // Next 10 utilities for Trending
  const trending = hardcodedUtilities.slice(2, 12);

  const handleCardClick = (systemCode) => {
    if (systemCode) {
      navigate(`/utility/${systemCode}`);
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <img src="/Logo.avif" alt="Dr. Water Logo" className="header-logo" />
        <div className="zip-code">94017</div>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by utility code, ZIP, state, or town"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2 className="section-title" style={{ paddingLeft: "20px" }}>
        Recently Tested
      </h2>
      <div className="recently-tested" style={{ paddingLeft: "20px" }}>
        {recentlyTested.map((item, index) => (
          <div
            key={item["System Code"] || index}
            className="test-card"
            onClick={() => handleCardClick(item["System Code"])}
          >
            <img
              src={index === 0 ? "/suttercreek.jpg" : "/gridley1.jpeg"}
              alt={`Recently Tested - ${item.Town}`}
            />
            <p>{`${item.Town}, ${item.State}`}</p>
          </div>
        ))}
      </div>

      {/* <h2 className="section-title" style={{ paddingLeft: "20px" }}>
        Trending
      </h2> */}
      <h2
        className="section-title"
        style={{
          paddingLeft: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Trending
        <a
          href="/score-explanation"
          className="score-link"
          // style={{ paddingRight: "20px" }}
        >
          <u>What is this score?</u>
        </a>
      </h2>

      <div className="trending-list" style={{ paddingLeft: "20px" }}>
        {trending.map((item, index) => (
          <div
            key={item["System Code"] || index}
            className="trending-item"
            onClick={() => handleCardClick(item["System Code"])}
          >
            <p>{`${item.Town}`}</p>
            <span>{`${item.Score ? item.Score.toFixed(2) : "N/A"}/100`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UtilityPageWrapper() {
  const { systemCode } = useParams();
  const [utilityData, setUtilityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://water-utility-backend.onrender.com/api/aggregated-records/${systemCode}`
      )
      .then((response) => {
        setUtilityData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching utility data:", error);
        setLoading(false);
      });
  }, [systemCode]);

  if (loading) return <p>Loading...</p>;
  if (!utilityData)
    return <p>No data available for this utility. Please try again.</p>;

  return <UtilityPage data={utilityData} />;
}

export default App;
