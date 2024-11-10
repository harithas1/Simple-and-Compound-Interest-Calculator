import { useState } from "react";

const InterestCalculator = ({
  title,
  isCompound,
  index,
  yearWiseResult,
  setYearWiseResult,
}) => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [compound, setCompound] = useState("");
  const [result, setResult] = useState(null);

  const calculateSimpleInterest = () => {
    if (
      !principal ||
      !rate ||
      !years ||
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(years)
    ) {
      return null;
    }
    const total = parseFloat(principal) + (principal * rate * years) / 100;
    return {
      total,
      interest: total - principal,
    };
  };

  const calculateCompoundInterest = () => {
    if (
      !principal ||
      !rate ||
      !years ||
      !compound ||
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(years) ||
      isNaN(compound)
    ) {
      return null;
    }
    let yearWise = [];
    let initialPrincipal = principal;
    for (let i = 0; i < years; i++) {
      const totalAmount =
        initialPrincipal *
        Math.pow(1 + rate / 100 / compound, compound * (i + 1));
      yearWise.push({
        year: i + 1,
        amount: totalAmount,
        interest: totalAmount - initialPrincipal,
      });
      // initialPrincipal = totalAmount;
    }
    setYearWiseResult((prev) => {
      const newResults = [...prev];
      newResults[index] = yearWise;
      console.log(newResults);

      return newResults;
    });
    return yearWise;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (isCompound) {
      const yearWiseData = calculateCompoundInterest();
      setResult(yearWiseData);
    } else {
      const simpleResult = calculateSimpleInterest();
      setResult(simpleResult);
    }
  };

  return (
    <form
      onSubmit={handleCalculate}
      className="w-80 p-4 flex flex-col gap-2 border-2 items-center"
    >
      <h1 className="font-bold text-xl mb-4 text-red-700">{title}</h1>
      <label>Principal Amount (₹): </label>
      <input
        className="p-1 border-2 focus:outline-none focus:border-blue-500"
        type="number"
        placeholder="Enter Principal Amount"
        min={0}
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <label>Annual Interest Rate (%): </label>
      <input
        className="p-1 border-2 focus:outline-none focus:border-blue-500"
        type="number"
        placeholder="Enter Interest Rate"
        min={0}
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <label>Number of Years: </label>
      <input
        className="p-1 border-2 focus:outline-none focus:border-blue-500"
        type="number"
        placeholder="Enter number of years"
        min={0}
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />
      {isCompound && (
        <>
          <label>Compounding Periods (monthly): </label>
          <input
            className="p-1 border-2 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Enter Compounding Periods"
            min={0}
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
          />
        </>
      )}
      <button
        type="submit"
        className="mt-8 font-bold text-xl p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
      >
        Calculate
      </button>
      {result && !isCompound && (
        <div className="text-green-600 mt-4">
          <p>Total Amount: ₹{result.total.toFixed(2)}</p>
          <p>Interest Earned: ₹{result.interest.toFixed(2)}</p>
        </div>
      )}
      {isCompound && yearWiseResult[index] && (
        <div className="text-green-600 mt-4">
          {yearWiseResult[index].map((year, idx) => (
            <p key={idx}>
              Amount at the end of year {year.year}: ₹{year.amount.toFixed(2)}{" "}
              (Interest earned: ₹{year.interest.toFixed(2)})
            </p>
          ))}
        </div>
      )}
    </form>
  );
};

function SimpleCompound() {
  const [yearWiseResult, setYearWiseResult] = useState([[], []]);

  return (
    <section className="absolute mt-10 left-1/2 -translate-x-1/2 flex sm:flex-col lg:flex-row gap-10">
      <InterestCalculator
        title="Simple Interest Calculator"
        isCompound={false}
        index={0}
        yearWiseResult={yearWiseResult}
        setYearWiseResult={setYearWiseResult}
      />
      <InterestCalculator
        title="Compound Interest Calculator"
        isCompound={true}
        index={1}
        yearWiseResult={yearWiseResult}
        setYearWiseResult={setYearWiseResult}
      />
    </section>
  );
}

function App() {
  return (
    <>
      <SimpleCompound />
    </>
  );
}

export default App;

// [
// import { useState } from "react";

// // const calculateSimpleInterest = ((principal,rate,years)||())=>{

// // }

// function SimpleCompound() {
//   const [principal, setPrincipal] = useState("");
//   const [rate, setRate] = useState("");
//   const [years, setYears] = useState("");
//   const [cprincipal, setCprincipal] = useState("");
//   const [crate, setCrate] = useState("");
//   const [cyears, setCyears] = useState("");
//   const [compound, setCompound] = useState("");
//   const [yearWiseResult, setYearWiseResult] = useState([]);

//   const result =
//     !principal ||
//     !rate ||
//     !years ||
//     isNaN(principal) ||
//     isNaN(rate) ||
//     isNaN(years)
//       ? false
//       : true;
//   const total = parseFloat(principal) + (principal * rate * years) / 100;

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   const handleCompoundCalculation = (e)=>{
//     e.preventDefault()
//     if (
//       !cprincipal ||
//       !crate ||
//       !cyears ||
//       !compound ||
//       isNaN(cprincipal) ||
//       isNaN(crate) ||
//       isNaN(cyears) ||
//       isNaN(compound)
//     ) {
//       setYearWiseResult([]);
//       return
//     } else {
//       let yearWise = [];
//       let updatedPrincipal = cprincipal;
//       for (let i = 0; i < cyears; i++) {
//         const totalAmount =
//           cprincipal * Math.pow(1 + crate / 100 / compound, compound * (i + 1));

//         yearWise.push({
//           year: i + 1,
//           amount: formatAmount(totalAmount),
//           interest: formatAmount(totalAmount - updatedPrincipal),
//         });

//         updatedPrincipal = totalAmount;
//       }
//       setYearWiseResult(yearWise);
//     }
//   }

//   return (
//     <>
//       <section className="absolute mt-10 left-1/2 -translate-x-1/2 flex lg:flex-row sm:flex-col gap-10 ">
//         <form action="">
//           <section className="w-80 p-4 flex flex-col gap-2 border-2 items-center">
//             <h1 className="font-bold text-xl mb-4 text-red-700">
//               Simple Interest Calculator
//             </h1>
//             <label>Principal Amount(₹): </label>
//             <input
//               className="p-1 border-2 focus:outline-none focus:border-blue-500"
//               autoFocus
//               type="number"
//               placeholder="Enter Principal Amount"
//               min={0}
//               value={principal}
//               onChange={(e) => setPrincipal(e.target.value)}
//             />
//             <label>Annual Interest Rate(%): </label>
//             <input
//               className="p-1 border-2 focus:outline-none focus:border-blue-500"
//               type="number"
//               placeholder="Enter Interest Rate"
//               min={0}
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//             />

//             <label>Number of Years: </label>
//             <input
//               className="p-1 border-2 focus:outline-none focus:border-blue-500"
//               type="number"
//               placeholder="Enter number of years"
//               min={0}
//               value={years}
//               onChange={(e) => setYears(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="mt-8 font-bold text-xl p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
//             >
//               Calculate
//             </button>
//             {result == true ? (
//               <p className="text-xl text-center text-green-500">
//                 For a principal amount of ₹{parseFloat(principal).toFixed(2)},
//                 at an interest rate of {rate}% over {years} years, the total
//                 amount will be ₹
//                 {total}. This
//                 includes ₹
//                 {parseFloat(
//                   total -
//                     principal
//                 ).toFixed(2)}{" "}
//                 as simple interest.
//               </p>
//             ) : (
//               <p className="text-xl text-center text-red-500">
//                 Please enter valid positive numbers for all fields.
//               </p>
//             )}
//           </section>
//         </form>

//         <form action="" onSubmit={handleCompoundCalculation}>
//           <section className="w-80 p-4 flex flex-col gap-2 border-2 items-center">
//             <h1 className="text-2xl font-bold text-red-800 text-center">
//               Compound Interest Calculator
//             </h1>

//             <label htmlFor="principal">Principal Amount (P): </label>
//             <input
//               className="border-2 p-1 text-black"
//               type="number"
//               id="principal"
//               name="principal"
//               min="0"
//               value={cprincipal}
//               onChange={(e) => setCprincipal(e.target.value)}
//             />

//             <label htmlFor="rate">Annual Interest Rate (%): </label>
//             <input
//               className="border-2 p-1 text-black"
//               type="number"
//               id="rate"
//               name="rate"
//               min="0"
//               value={crate}
//               onChange={(e) => setCrate(e.target.value)}
//             />

//             <label htmlFor="timePeriod">Time Period (Years): </label>
//             <input
//               className="border-2 p-1 text-black"
//               type="number"
//               id="timePeriod"
//               name="timePeriod"
//               min="0"
//               value={cyears}
//               onChange={(e) => setCyears(e.target.value)}
//             ></input>

//             <label htmlFor="compoundInterval">
//               Compounding Periods (monthly):
//             </label>
//             <input
//               className="border-2 p-1 text-black"
//               type="number"
//               id="compoundInterval"
//               name="compoundInterval"
//               min="0"
//               value={compound}
//               onChange={(e) => setCompound(e.target.value)}
//             ></input>
//             <button
//               className="border-2 p-3 bg-black text-white w-full rounded-lg m-2"
//               type="submit"
//             >
//               Calculate
//             </button>
//             {yearWiseResult ? (
//               yearWiseResult.map((year, index) => (
//                 <div className="text-green-600" key={index}>
//                   <p>
//                     Amount at the end of year {year.year}: {year.amount}
//                   </p>
//                   <p>
//                     Interest earned in year {year.year}: {year.interest}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <span className="text-red-500">
//                 Please fill in all the fields with valid numbers.
//               </span>
//             )}
//           </section>
//         </form>
//       </section>
//     </>
//   );
// }

// function App() {
//   return (
//     <>
//       <SimpleCompound />
//     </>
//   );
// }

// export default App;

// // const cresult =
//   //   !cprincipal ||
//   //   !crate ||
//   //   !cyears ||
//   //   isNaN(cprincipal) ||
//   //   isNaN(crate) ||
//   //   isNaN(cyears)
//   //     ? false
//   //     : true;
// ]
