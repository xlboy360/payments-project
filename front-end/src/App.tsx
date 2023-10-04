import { useState } from "react";
import axios from "axios";
import "./App.css";
import { CreditCard } from "./models/CreditCardModel";
import Button from "./components/Button";
import Card from "./components/Card";
import SweetAlert2 from "react-sweetalert2";

function App() {
  const URL = "http://localhost:8080/api/v1";
  const [swalProps, setSwalProps] = useState({});
  const [formData, setFormData] = useState<CreditCard>({
    name: "",
    number: "",
    expirationDate: "",
    cvv: "",
    isAmericanExpress: false,
    isValidCardNumber: false,
  });

  function sendCard() {
    axios
      .post(`${URL}/payment`, formData)
      .then((response) => {
        setSwalProps({
          show: true,
          title: `Alert!`,
          text: `${response.data.message}`,
        });
      })
      .catch((error) => {
        setSwalProps({
          show: true,
          title: `Alert!`,
          text: `${error}`,
        });
      });
  }

  function validateCreditCardNumber(cardNumber: string) {
    if (cardNumber.length > 0 && cardNumber.length <= 19) {
      axios
        .post(`${URL}/validateCard`, cardNumber, {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then((response) => {
          if (response.data) {
            setFormData({ ...formData, isValidCardNumber: true });
          }
        });
    }
  }

  function isValidData(): boolean {
    return (
      formData.name.length > 0 &&
      formData.number.length > 0 &&
      formData.expirationDate.length > 0 &&
      formData.cvv.length > 0 &&
      formData.isValidCardNumber
    );
  }

  function handleCardNumberChange(cardNumber: string) {
    if (/^\d+$/.test(cardNumber) || cardNumber === "") {
      if (cardNumber.slice(0, 2) === "34" || cardNumber.slice(0, 2) === "37") {
        setFormData({
          ...formData,
          isAmericanExpress: true,
          number: cardNumber,
        });
      } else {
        setFormData({ ...formData, number: cardNumber });
      }
    }
  }

  function handleDateChange(date: string) {
    const serviceDate =
      date +
      `-${new Date().getDay() + 1 < 10 ? "0" : ""}${
        new Date().getDay() + 1
      }:23`;
    axios
      .post(`${URL}/validateExpirationDate`, serviceDate, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((response) => {
        if (response.data) {
          setFormData({ ...formData, expirationDate: date });
        }
      });
  }

  return (
    <div className="flex items-center justify-center bg-gray-800 h-screen">
      <div className="flex items-center w-3/4 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r">
        <div className=" p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              Please insert your payment information
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 invalid:border-red-500 invalid:border"
            />
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.number}
              placeholder="Card Number "
              onChange={(e) => handleCardNumberChange(e.target.value)}
              onBlur={() => validateCreditCardNumber(formData.number)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 my-4 invalid:border-red-500 invalid:border"
              maxLength={19}
            />
            <div className="flex justify-evenly">
              <div className="flex flex-col">
                <input
                  type="month"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate.toString()}
                  placeholder="Expiration Date"
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 invalid:border-red-500 invalid:border"
                />
              </div>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                placeholder="CVV"
                required
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 invalid:border-red-500 invalid:border"
                maxLength={formData.isAmericanExpress ? 4 : 3}
                minLength={formData.isAmericanExpress ? 4 : 3}
              />
            </div>
          </div>
        </div>
        {formData.name !== "" || formData.number !== "" ? (
          <div className="flex flex-col items-center pb-2">
            <Card data={formData} />
            {isValidData() && <Button actionHandler={sendCard} text="Pay" />}
          </div>
        ) : (
          <></>
        )}
      </div>
      <SweetAlert2
        {...swalProps}
        didClose={() => {
          setSwalProps({ show: false });
        }}
      />
    </div>
  );
}

export default App;
