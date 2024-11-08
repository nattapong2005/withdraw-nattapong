import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [money, setMoney] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [history, setHistory] = useState([]);

  const withdraw = () => {
    const amount = parseInt(withdrawAmount);

    if (withdrawAmount > money) {
      toast.error("ยอดเงินไม่เพียงพอ");
      return;
    } else if (withdrawAmount < 0) {
      toast.error("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    } else if (money - amount < 1) {
      toast.warn("ต้องมีเงินในบัญชีอย่างน้อย 1 บาท");
      return;
    } else if (withdrawAmount == 0) {
      toast.warn("กรุณากรอกจำนวนเงิน");
      return;
    }

    let result = money - amount;
    setMoney(result);
    setHistory([...history, { amount: amount, result: result }]);
    toast.success("ถอนเงินจำนวน " + amount);
    setWithdrawAmount(0);
  };

  const button = (amount) => {
    setWithdrawAmount(amount + withdrawAmount);
  };



  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-wrap gap-10 justify-center">
          <div className="shadow-2xl bg-white p-5 ">
            <h1 className="font-bold text-2xl">ระบบถอนเงิน</h1>
            <h3>
              ยอดเงินคงเหลือ: <span className="font-bold">{money}</span> บาท
            </h3>
            <div className="flex">
              <button
                onClick={() => button(100)}
                className="py-1.5 text-sm px-1 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white me-2"
              >
                100 บาท
              </button>
              <button
                onClick={() => button(500)}
                className="py-1.5 text-sm px-1 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white me-2"
              >
                500 บาท
              </button>
              <button
                onClick={() => button(1000)}
                className="py-1.5 text-sm px-1 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white me-2"
              >
                1000 บาท
              </button>
              <button
                onClick={() => button(5000)}
                className="py-1.5 text-sm px-1 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white me-2"
              >
                5000 บาท
              </button>
            </div>
            <p className="text-xs mt-2">กรอกจำนวนเงิน</p>
            <input
              type="number"
              value={withdrawAmount}
              min={0}
              onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
              placeholder="กรอกจำนวนเงินที่ต้องการถอน"
              className="border rounded-md border-gray-300 p-1.5 w-full block mt-2 text-sm "
            />
            <button
              onClick={withdraw}
              className="block w-full mt-2 bg-violet-900 p-1 rounded-lg shadow-lg text-white"
            >
              ถอนเงิน
            </button>
            <ToastContainer autoClose={1000} />
          </div>
          <div className="shadow-2xl bg-white p-5">
            <h1 className="font-bold text-2xl">ประวัติการถอนเงิน</h1>
            <ul>
              {history.map((record, index) => (
                <li key={index}>
                  {`ถอนเงิน ${record.amount} บาท  คงเหลือ ${record.result} บาท`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
