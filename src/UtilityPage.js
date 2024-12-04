// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./UtilityPage.css";

// function UtilityPage({ data }) {
//   const navigate = useNavigate();

//   if (!data || data.length === 0) {
//     return (
//       <div className="no-data">
//         <p>
//           No data available for this utility. Please try another system code.
//         </p>
//       </div>
//     );
//   }

//   const {
//     Town,
//     State,
//     ZipCode,
//     "System Code": systemCode,
//     "Utility Name": utilityName,
//   } = data[0];

//   // Calculations
//   const totalContaminants = data.length;
//   const aboveGuidelines = data.filter(
//     (item) => item["Times Above Guideline"] !== "Unknown"
//   ).length;

//   const solutions = [
//     { name: "Activated Carbon", link: "Links", icon: "🧴" },
//     { name: "Reverse Osmosis", link: "Links", icon: "💧" },
//   ];

//   const nextSteps = [
//     {
//       step: "Reverse Years of Contaminant Damage with Hydrogen-Enriched Water",
//       benefits: [
//         { label: "Oxidative Stress Reduction", value: 90 },
//         { label: "pH Balance Improvement", value: 88 },
//         { label: "Inflammation Reduction", value: 73 },
//       ],
//       product: {
//         name: "DrWater HydroKettle - removes chlorine and chloramines",
//         image: "/image.png",
//       },
//     },
//     {
//       step: "Install a certified water filter for PFAS removal",
//       benefits: [
//         { label: "Oxidative Stress Reduction", value: 45 },
//         { label: "pH Balance Improvement", value: 32 },
//         { label: "Inflammation Reduction", value: 12 },
//       ],
//     },
//   ];

//   // Extract all benefit values
//   const allValues = nextSteps.flatMap((step) =>
//     step.benefits.map((b) => b.value)
//   );

//   // Calculate min and max values
//   const minValue = Math.min(...allValues);
//   const maxValue = Math.max(...allValues);

//   // Function to compute color based on value
//   const getColorForValue = (value) => {
//     const ratio = (value - minValue) / (maxValue - minValue); // Normalize value to a 0-1 range
//     const red = Math.round(255 - ratio * 255); // Red decreases as ratio increases
//     const green = Math.round(ratio * 255); // Green increases as ratio increases
//     return `rgb(${red}, ${green}, 0)`; // Return color in RGB format
//   };
//   return (
//     <div className="utility-page">
//       {/* Header Section */}
//       <header className="utility-header">
//         <button onClick={() => navigate("/")} className="back-button">
//           &#8592; Back
//         </button>
//         <img src="/Logo.avif" alt="Dr. Water Logo" className="header-logo" />
//         <div className="zip-code">
//           {/* <span>Your zip code</span> */}
//           <strong>{ZipCode.slice(0, 5)}</strong>
//         </div>
//       </header>

//       {/* Summary Section */}
//       <div className="utility-summary">
//         <h1>{`${Town}, ${State}`}</h1>
//         <p>
//           {utilityName} <span>({systemCode})</span>
//         </p>
//         <div className="grade">
//           <h2>D</h2>
//           <span>(alarming)</span>
//         </div>
//         <ul className="summary-list">
//           <li>
//             <span>Above guidelines</span>{" "}
//             <strong>{`${aboveGuidelines}/${totalContaminants}`}</strong>
//           </li>
//           <li>
//             <span>Total Contaminants</span> <strong>{totalContaminants}</strong>
//           </li>
//           <li>
//             <span>PFAS</span> <strong>25%</strong>
//           </li>
//           <li>
//             <span>Source</span> <strong>Purchased surface water</strong>
//           </li>
//         </ul>
//       </div>

//       {/* Contaminants Section */}
//       <section className="contaminants-section">
//         <h2>Above Guideline Contaminants</h2>
//         <div className="contaminants-list">
//           {data.map((item, index) => (
//             <div
//               key={`${item["Contaminant Name"]}-${index}`}
//               className="contaminant-card"
//             >
//               <div className="top-row">
//                 <h3>{item["Contaminant Name"]}</h3>
//                 {item["Times Above Guideline"] !== "Unknown" && (
//                   <span className="times-above-guideline">
//                     {item["Times Above Guideline"]}
//                   </span>
//                 )}
//               </div>
//               <p className="utility-level">
//                 Utility Level: {item["Utility Level"] || "N/A"}
//               </p>
//               <p className="effect">{item["Potential Effect"] || "N/A"}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Solutions Section */}
//       <section className="solutions-section">
//         <h2>Solution</h2>
//         <div className="solutions-list">
//           {solutions.map((solution, index) => (
//             <div key={index} className="solution-card">
//               <span className="icon">{solution.icon}</span>
//               <div className="content">
//                 <h3>{solution.name}</h3>
//                 <p>{solution.link}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Next Steps Section */}
//       <section className="next-steps-section">
//         <h2>Next Steps</h2>
//         <div className="steps-list">
//           {nextSteps.map((step, index) => (
//             <div key={index} className="step-card">
//               <h3 className="garamond-heading">{step.step}</h3>
//               <div className="benefits-table">
//                 {step.benefits.map((benefit, i) => (
//                   <div key={i} className="benefit-row">
//                     <span>{benefit.label}</span>
//                     <span
//                       className="benefit-value"
//                       style={{
//                         backgroundColor: getColorForValue(benefit.value),
//                       }}
//                     >
//                       {`${benefit.value}%`}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               {step.product && (
//                 <div className="product">
//                   <img src={step.product.image} alt={step.product.name} />
//                   <p>{step.product.name}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default UtilityPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UtilityPage.css";

function UtilityPage() {
  const { systemCode } = useParams(); // Get the system code from the URL
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Use null initially to differentiate from empty data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Fetching data for systemCode: ${systemCode}`);
    axios
      .get(
        `https://water-utility-backend.onrender.com/api/aggregated-records/${systemCode}`
      )
      .then((response) => {
        console.log("API Response:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [systemCode]);

  if (loading) return <p>Loading...</p>;

  if (!data) {
    return (
      <div className="no-data">
        <p>
          No data available for this utility. Please try another system code.
        </p>
      </div>
    );
  }

  const {
    Town,
    State,
    ZipCode,
    "System Code": systemCodeFromData,
    "Utility Name": utilityName,
    Contaminants,
    Score,
  } = data;

  // Calculations
  const totalContaminants = Contaminants.length;
  const aboveGuidelines = Contaminants.filter(
    (item) => item["Times Above Guideline"] !== "Unknown"
  ).length;

  const solutions = [
    { name: "Activated Carbon", link: "Links", icon: "🧴" },
    { name: "Reverse Osmosis", link: "Links", icon: "💧" },
  ];

  const nextSteps = [
    {
      step: "Reverse Years of Contaminant Damage with Hydrogen-Enriched Water",
      benefits: [
        { label: "Oxidative Stress Reduction", value: 90 },
        { label: "pH Balance Improvement", value: 88 },
        { label: "Inflammation Reduction", value: 73 },
      ],
      product: {
        name: "DrWater HydroKettle - removes chlorine and chloramines ➚",
        image: "/image.png",
      },
    },
    {
      step: "Install a certified water filter for PFAS removal",
      benefits: [
        { label: "Oxidative Stress Reduction", value: 45 },
        { label: "pH Balance Improvement", value: 32 },
        { label: "Inflammation Reduction", value: 12 },
      ],
    },
  ];

  // Extract all benefit values
  const allValues = nextSteps.flatMap((step) =>
    step.benefits.map((b) => b.value)
  );

  // Calculate min and max values
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Function to compute color based on value
  const getColorForValue = (value) => {
    const ratio = (value - minValue) / (maxValue - minValue); // Normalize value to a 0-1 range
    const red = Math.round(255 - ratio * 255); // Red decreases as ratio increases
    const green = Math.round(ratio * 255); // Green increases as ratio increases
    return `rgb(${red}, ${green}, 0)`; // Return color in RGB format
  };

  return (
    <div className="utility-page">
      {/* Header Section */}
      <header className="utility-header">
        <button onClick={() => navigate("/")} className="back-button">
          &#8592; Back
        </button>
        <img src="/Logo.avif" alt="Dr. Water Logo" className="header-logo" />
        <div className="zip-code">
          <strong>{ZipCode?.slice(0, 5)}</strong>
        </div>
      </header>
      <div className="utility-summary">
        <h1>{`${Town || "Unknown"}, ${State || "Unknown"}`}</h1>
        <p>
          {utilityName || "Unknown"} <span>({systemCodeFromData})</span>
        </p>
        <div className="grade">
          <h2>D</h2>
          <span>(alarming)</span>
        </div>
        <ul className="summary-list">
          <li>
            <span>Above guidelines</span>{" "}
            <strong>{`${aboveGuidelines}/${totalContaminants}`}</strong>
          </li>
          <li>
            <span>Total Contaminants</span>{" "}
            <strong>{`${totalContaminants}`}</strong>
          </li>
          <li>
            <span>Score</span> <strong>{Score.toFixed(2)}/100</strong>
          </li>
          <li>
            <span>PFAS</span> <strong>25%</strong>
          </li>
          <li>
            <span>Source</span> <strong>Purchased surface water</strong>
          </li>
        </ul>
      </div>
      {/* Contaminants Section */}
      <section className="contaminants-section">
        <h2>Above Guideline Contaminants</h2>
        <div className="contaminants-list">
          {Contaminants.map((item, index) => (
            <div
              key={`${item["Contaminant Name"]}-${index}`}
              className="contaminant-card"
            >
              <div className="top-row">
                <h3>{item["Contaminant Name"] || "Unknown"}</h3>
                {item["Times Above Guideline"] !== "Unknown" && (
                  <span className="times-above-guideline">
                    {item["Times Above Guideline"]}
                  </span>
                )}
              </div>
              <p className="utility-level">
                Utility Level: {item["Utility Level"] || "N/A"}
              </p>
              <p className="effect">{item["Potential Effect"] || "N/A"}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Solutions Section */}
      {/* <section className="solutions-section">
        <h2>Solution</h2>
        <div className="solutions-list">
          {solutions.map((solution, index) => (
            <div key={index} className="solution-card">
              <span className="icon">{solution.icon}</span>
              <div className="content">
                <h3>{solution.name}</h3>
                <p>{solution.link}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      {/* Solutions Section */}

      {/* Solutions Section */}
      <section className="solutions-section">
        <h2>Solution</h2>
        <div className="solutions-list">
          {/* Tap Water */}
          <div className="solution-card">
            <h3 className="solution-title">Tap Water</h3>
            <p className="solution-pain">"Your current pain"</p>
            <div className="solution-details">
              <div className="solution-row">
                <span>Risk of chronic diseases:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Mineral Content:</span>
                <span className="solution-value">NO</span>
              </div>
              <div className="solution-row">
                <span>Contaminants:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Microplastics:</span>
                <span className="solution-value">DEPENDS</span>
              </div>
              <div className="solution-row">
                <span>Price:</span>
                <span className="solution-value">$</span>
              </div>
            </div>
          </div>

          {/* Water Filters */}
          <div className="solution-card">
            <h3 className="solution-title">Water Filters</h3>
            <p className="solution-pain">
              "Make your water safer, but at what cost?"
            </p>
            <div className="solution-details">
              <div className="solution-row">
                <span>Risk of chronic diseases:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Mineral Content:</span>
                <span className="solution-value">NO</span>
              </div>
              <div className="solution-row">
                <span>Contaminants:</span>
                <span className="solution-value">LOW</span>
              </div>
              <div className="solution-row">
                <span>Microplastics:</span>
                <span className="solution-value">DEPENDS</span>
              </div>
              <div className="solution-row">
                <span>Price:</span>
                <span className="solution-value">$$</span>
              </div>
            </div>
          </div>

          {/* Hydrogen Water Bottle */}
          <div className="solution-card">
            <h3 className="solution-title">Hydrogen Water Bottle</h3>
            <p className="solution-pain">
              "Reverse years of contaminant damage with hydrogen-enriched water"
            </p>
            <div className="solution-details">
              <div className="solution-row">
                <span>Risk of chronic diseases:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Mineral Content:</span>
                <span className="solution-value">NO</span>
              </div>
              <div className="solution-row">
                <span>Contaminants:</span>
                <span className="solution-value">LOW</span>
              </div>
              <div className="solution-row">
                <span>Microplastics:</span>
                <span className="solution-value">DEPENDS</span>
              </div>
              <div className="solution-row">
                <span>Price:</span>
                <span className="solution-value">$$$</span>
              </div>
            </div>
          </div>

          {/* Glass Water Bottle */}
          <div className="solution-card">
            <h3 className="solution-title">Glass Water Bottle</h3>
            <p className="solution-pain">"How long are you gonna buy those?"</p>
            <div className="solution-details">
              <div className="solution-row">
                <span>Risk of chronic diseases:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Mineral Content:</span>
                <span className="solution-value">NO</span>
              </div>
              <div className="solution-row">
                <span>Contaminants:</span>
                <span className="solution-value">LOW</span>
              </div>
              <div className="solution-row">
                <span>Microplastics:</span>
                <span className="solution-value">DEPENDS</span>
              </div>
              <div className="solution-row">
                <span>Price:</span>
                <span className="solution-value">$$$$</span>
              </div>
            </div>
          </div>

          {/* Plastic Water Bottle */}
          <div className="solution-card">
            <h3 className="solution-title">Plastic Water Bottle</h3>
            <p className="solution-pain">
              "How long are you gonna buy those too?"
            </p>
            <div className="solution-details">
              <div className="solution-row">
                <span>Risk of chronic diseases:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Mineral Content:</span>
                <span className="solution-value">NO</span>
              </div>
              <div className="solution-row">
                <span>Contaminants:</span>
                <span className="solution-value">LOW</span>
              </div>
              <div className="solution-row">
                <span>Microplastics:</span>
                <span className="solution-value">DEPENDS</span>
              </div>
              <div className="solution-row">
                <span>Price:</span>
                <span className="solution-value">$$</span>
              </div>
            </div>
          </div>

          {/* Electrolytes */}
          <div className="solution-card">
            <h3 className="solution-title">Electrolytes (Gatorade)</h3>
            <p className="solution-pain">"Burning your pockets!"</p>
            <div className="solution-details">
              <div className="solution-row">
                <span>Risk of chronic diseases:</span>
                <span className="solution-value">HIGH</span>
              </div>
              <div className="solution-row">
                <span>Mineral Content:</span>
                <span className="solution-value">NO</span>
              </div>
              <div className="solution-row">
                <span>Contaminants:</span>
                <span className="solution-value">LOW</span>
              </div>
              <div className="solution-row">
                <span>Microplastics:</span>
                <span className="solution-value">DEPENDS</span>
              </div>
              <div className="solution-row">
                <span>Price:</span>
                <span className="solution-value">$$$$$</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      {/* Next Steps Section */}
      <section className="next-steps-section">
        <h2>Next Steps</h2>
        <div className="steps-list">
          {nextSteps.map((step, index) => (
            <div key={index} className="step-card">
              <h3 className="garamond-heading">{step.step}</h3>
              <div className="benefits-table">
                {step.benefits.map((benefit, i) => (
                  <div key={i} className="benefit-row">
                    <span>{benefit.label}</span>
                    <span
                      className="benefit-value"
                      style={{
                        backgroundColor: getColorForValue(benefit.value),
                      }}
                    >
                      {`${benefit.value}%`}
                    </span>
                  </div>
                ))}
              </div>
              {step.product && (
                <div className="product">
                  {/* Updated Image and Linked Text */}
                  <img src="/DRWATERJUG.png" alt={step.product.name} />
                  <a
                    href="https://drwater.store/products/hydrogen-water-pitcher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-link"
                  >
                    <u>{step.product.name}</u>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default UtilityPage;
