import React, { useRef, useState, useEffect, useMemo } from "react";
// import type { Product } from "../types/Product";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChevronDown from "../assets/images/chevron-down.svg";
import { useParams } from "react-router-dom";
import { buildAnuncios } from "../data/dashboardMock";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
const UpdateProduct: React.FC = () => {
  const productId = useParams();

  const data = useMemo(buildAnuncios, []);

  const productFiltered = data.filter(
    (product) => Number(productId.id) == product.id
  )[0];

  const [formData, setFormData] = useState(productFiltered);

  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (file: File) => {
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("produto atualizado:", formData);
  };

  return (
    <main className="w-full  flex justify-center items-start bg-blue-0 p-4">
      <div className="flex justify-center items-center h-full w-full max-w-[750px]  flex-col p-2 gap-4 ">
        <h2 className="text-xl font-bold">Editar Produto</h2>
        <div className="flex self-start">
          <img src={ChevronDown} alt="ChevronDown" className="-rotate-90" />{" "}
          <p className="font-bold text-black-opacity-60">Voltar ao início</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-white rounded-2xl shadow p-12 w-full"
        >
          <label htmlFor="title" className="text-sm font-bold">
            Nome do produto
          </label>
          <input
            type="text"
            name="title"
            placeholder="Digite o nome do produto"
            value={formData.title}
            onChange={handleChange}
            className="border-2 pl-6 p-2 rounded-10 border-blue-5"
          />

          <label htmlFor="desc" className="text-sm font-bold">
            Descrição
          </label>
          <textarea
            name="desc"
            placeholder="Descreva seu produto..."
            value={formData.desc}
            onChange={handleChange}
            className="border-2 pl-6 p-2 rounded-10 border-blue-5"
          />

          <label htmlFor="price" className="text-sm font-bold">
            Preço
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              R$
            </span>
            <input
              type="text"
              name="price"
              placeholder="0,00"
              value="10"
              onChange={handleChange}
              className="border-2 pl-10 p-2 rounded-10 border-blue-5 w-full"
            />
          </div>

          <FormControl >
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={formData.disponibilidade}
              onChange={handleChange}
            >
              <FormControlLabel
                value="indisponivel"
                control={
                  <Radio
                    sx={{
                      color: "#3C5491",
                      "&.Mui-checked": {
                        color: "#3C5491",
                      },
                    }}
                  />
                }
                label="indisponível"
              />
              <FormControlLabel
                value="disponivel"
                control={
                  <Radio
                    sx={{
                      color: "#3C5491",
                      "&.Mui-checked": {
                        color: "#3C5491",
                      },
                    }}
                  />
                }
                label="disponível"
              />
            </RadioGroup>
          </FormControl>
          {/* 
          <label htmlFor="stock" className="text-sm font-bold mt-2">
            Estoque disponível
          </label>
          <input
            type="number"
            name="stock"
            placeholder="Quantidade em estoque"
            value={formData.disponibilidade}
            onChange={handleChange}
            className="border-2 pl-6 p-2 rounded-10 border-blue-5 w-full"
          /> */}

          <label htmlFor="category" className="text-sm font-bold">
            Categoria
          </label>
          <select
            name="category"
            value="esporte"
            onChange={handleChange}
            className="border-2 pl-6 p-2 rounded-10 border-blue-5"
          >
            <option value="">{formData.title}</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="roupas">Roupas</option>
            <option value="alimentos">Alimentos</option>
          </select>

          <div className="relative w-fit h-fit m-auto">
            <div
              className="absolute flex items-center justify-center top-4 right-[-20px] bg-blue-1 w-12 h-12 rounded-full cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <EditOutlinedIcon />
            </div>
            <img
              src={preview || formData.imageUrl}
              alt={formData.title}
              className="w-80 m-auto object-cover rounded-2xl my-8"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } hover:border-blue-5 group`}
          >
            <p className="text-[64px] text-black-opacity-60 font-extralight group-hover:text-blue-5">
              +
            </p>
            <p className="font-semibold text-black-opacity-60 group-hover:text-blue-5">
              Clique para adicionar fotos
            </p>
            <p className="font-medium text-sm text-black-opacity-40 group-hover:text-blue-5">
              PNG, JPG até 10MB cada
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div> */}

          {/* {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg shadow mx-auto"
            />
          )} */}
          <div className="w-full flex justify-center items-center gap-4 max-ss:flex-col flex-row ">
            <button className=" w-full max-h-[50px] bg-white hover:bg-blue-2 flex justify-center items-center hover:text-white rounded-10 text-base text-blue-3 border-2 border-blue-3 font-bold p-4">
              Cancelar
            </button>
            <button className=" w-full max-h-[50px] bg-blue-3 hover:bg-blue-2 flex justify-center items-center rounded-10 text-base text-white font-bold p-4">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateProduct;
