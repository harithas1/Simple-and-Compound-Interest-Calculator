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

