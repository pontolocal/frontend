import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
export const ReviewPage = () => {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Feedback enviado:", feedback);
    };
return(
<main className="w-full min-h-screen flex items-start justify-center bg-blue-100 p-4">
      <div className="w-full lg:max-w-[740px] h-auto  bg-white rounded-41  p-8 flex flex-col gap-8 items-center justify-start">
        <div className="flex gap-10 flex-col items-center text-center">
          <p className="sm:text-3xl font-bold">
            Deu tudo certo com sua compra?
          </p>
          <p className="sm:text-lg font-medium">
            Confirme que recebeu sua compra dando uma avaliação.
          </p>
          <div className="justify-between flex flex-col sm:flex-row w-full gap-4">
            <button className="sm:max-w-[150px] w-full max-h-[50px] bg-white hover:bg-blue-2 flex justify-center items-center hover:text-white rounded-10 text-sm text-blue-3 border-2 border-blue-3 font-semibold p-2 cursor-pointer">
              Não comprei ainda
            </button>
            <button className="sm:max-w-[150px] w-full max-h-[50px] bg-blue-3 hover:bg-blue-2 flex justify-center items-center rounded-10 text-sm text-white font-semibold p-2 cursor-pointer">
              Comprar
            </button>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="font-semibold sm:text-2xl">
              Avalie sua compra para confirmar seu pedido.
            </p>
            <p className="font-regular sm:text-xl">
              Quantas estrelas sua compra merece?
            </p>
            <div className="flex justify-center">
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  sx={{
                    "& .MuiRating-icon": {
                      fontSize: { xs: "34px", sm: "52px" },
                    },
                  }}
                />
              </Stack>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <label
                htmlFor="feedback"
                className="font-medium sm:text-lg text-gray-700"
              >
                Deixe um feedback da sua compra
              </label>

              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Escreva aqui seu feedback..."
                rows={4}
                className="w-full border border-blue-7 rounded-10 p-4 focus:outline-none focus:ring-2 focus:ring-blue-2 text-gray-700 text-base resize-none"
              />

              <button
                type="submit"
                className=" w-full max-h-[50px] bg-blue-3 hover:bg-blue-2 flex justify-center items-center rounded-10 text-sm text-white font-semibold cursor-pointer p-2"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
);
}
