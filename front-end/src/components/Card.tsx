import { CreditCard } from "../models/CreditCardModel";

const Card = (props: { data: CreditCard }) => {
  return (
    <div className="flex justify-center items-center m-8">
      <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-xl transition-transform transform hover:scale-110">
        <img
          className="relative object-cover w-full h-full rounded-xl"
          src="https://i.imgur.com/Zi6v09P.png"
        />

        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light">Name</p>
              <p className="font-medium tracking-widest">
                {props.data?.name.toUpperCase()}
              </p>
            </div>
            <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
          </div>
          <div className="pt-1">
            <p className="font-light">Card Number</p>
            <p className="font-medium tracking-more-wider">
              {props.data?.number}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">
                  {props.data?.expirationDate}
                </p>
              </div>

              <div className="">
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
