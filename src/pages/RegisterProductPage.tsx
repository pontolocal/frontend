import React, { useState } from "react";
import ChevronDown from "../assets/images/chevron-down.svg";
import { useGlobal } from "../hooks/useGlobal";
import { useCategories } from "../hooks/useCategories";
import { useRegisterProduct } from "../hooks/useRegisterProduct";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { CreatedProductModal } from "../components/modal/createdProductModal";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";

const RegisterProduct: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    price: null,
    type: true,
  });

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const { userId } = useGlobal();
  const { fetchRegisterProducts, isLoading } = useRegisterProduct();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { categories } = useCategories("/categories");

  const { themeMode } = useGlobal();

  // const [preview, setPreview] = useState<string | null>(null);
  // const [dragActive, setDragActive] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "price"
          ? Number(value)
          : name === "type"
          ? value === "disponivel"
            ? true
            : false
          : value,
    }));

    console.log("value", value);

    if (name === "category") {
      setSelectedCategoryId(value);
    }
  };

  // const handleFile = (file: File) => {
  //   setFormData((prev: any) => ({ ...prev, image: file }));
  //   setPreview(URL.createObjectURL(file));
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     handleFile(e.target.files[0]);
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setDragActive(true);
  // };

  // const handleDragLeave = () => setDragActive(false);

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setDragActive(false);

  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
  //     handleFile(e.dataTransfer.files[0]);
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     if (preview) URL.revokeObjectURL(preview);
  //   };
  // }, [preview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegisterProducts(
      `/products/${userId}/${selectedCategoryId}`,
      formData
    );
    setReviewModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div
          className={`w-full  flex justify-center items-star flex-1 p-4 ${
            themeMode === "light" ? "bg-blue-0" : "bg-blue-8"
          }`}
        >
          <CreatedProductModal
            isOpen={reviewModalOpen}
            onClose={() => setReviewModalOpen(false)}
            title="Produto criado com sucesso"
            message="Obrigado por usar o Ponto Local. Boas vendas!"
            blueButtonText="Criar outro produto"
            ghostButtonText="ir para dashboard"
          />

          <div className="flex justify-center items-center h-full w-full max-w-[750px]  flex-col p-2 gap-4">
            <h2 className="text-xl font-bold">Cadastrar Produto</h2>
            <div className="flex self-start">
              <img src={ChevronDown} alt="ChevronDown" className="-rotate-90" />{" "}
              <Link to="/home">
                <p className="font-bold opacity-60 cursor-pointer">
                  Voltar a home
                </p>
              </Link>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`flex flex-col gap-2 bg-white rounded-2xl shadow p-12 w-full ${
                themeMode === "light" ? "bg-white!" : "bg-blue-4!"
              }`}
            >
              <label htmlFor="name" className="text-sm font-bold">
                Nome do produto
              </label>
              <input
                type="text"
                name="name"
                placeholder="Digite o nome do produto"
                value={formData.name}
                onChange={handleChange}
                className="border-2 pl-6 p-2 rounded-10 border-blue-5"
              />

              <label htmlFor="description" className="text-sm font-bold">
                Descrição
              </label>
              <textarea
                name="description"
                placeholder="Descreva seu produto..."
                value={formData.description}
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
                  type="number"
                  name="price"
                  placeholder="0,00"
                  value={formData.price}
                  onChange={handleChange}
                  className="border-2 pl-10 p-2 rounded-10 border-blue-5 w-full"
                />
              </div>

              <label htmlFor="type" className="text-sm font-bold mt-2">
                Estoque
              </label>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="type"
                  value={formData?.type ? "disponivel" : "indisponivel"}
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
              {/* <input
                type="number"
                name="type"
                placeholder="Quantidade em estoque"
                value={formData.type ? "disponivel" : "indisponivel"}
                onChange={handleChange}
                className="border-2 pl-6 p-2 rounded-10 border-blue-5 w-full"
              /> */}

              <label htmlFor="category" className="text-sm font-bold">
                Categoria
              </label>
              <select
                name="category"
                value={selectedCategoryId}
                onChange={handleChange}
                className="border-2 pl-6 p-2 rounded-10 border-blue-5"
              >
                <option value="select">Selecione uma categoria</option>
                {categories?.map((category) => (
                  <option value={category.id?.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>

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

              <button
                type="submit"
                className="bg-blue-3 text-white rounded p-2 hover:bg-blue-5 cursor-pointer"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterProduct;
