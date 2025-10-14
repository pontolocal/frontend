import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";

import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import cities from "../../data/cities.json";
import categories from "../../data/categories.json";
import { Button } from "../../components/ui/Button";

const FilterComponent = () => {
  const [address, setAddress] = React.useState("Endereço cadastrado");
  const [area, setArea] = React.useState("Raio de distância");
  const [city, setCity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [radius, setRadius] = React.useState(50);

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((event.target as HTMLInputElement).value);
  };

  const handleChangeArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArea((event.target as HTMLInputElement).value);
  };

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleSliderChange = (_event: Event, newValue: number) => {
    setRadius(newValue);
  };

  return (
    <div className="relative bg-white max-w-[1069px] m-auto px-12 py-8 rounded">
      <h2 className="font-bold text-xl pb-4">Filtros</h2>
      <Button
        styles="absolute top-4 right-4 text-xs text-blue-3 border-1 border-blue-3 max-w-24 h-8! hover:bg-blue-3 hover:text-white"
        text="Limpar"
      />
      <div className="flex justify-between gap-4 max-md:flex-col">
        <div className="flex flex-col flex-1">
          <h3 className="font-bold opacity-60">Onde será sua busca?</h3>
          <div className="flex flex-col gap-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={address}
                onChange={handleChangeAddress}
              >
                <FormControlLabel
                  value="Endereço cadastrado"
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
                  label="Endereço cadastrado"
                />
                <FormControlLabel
                  value="localização atual"
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
                  label="localização atual"
                />
                <FormControlLabel
                  value="Buscar por CEP"
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
                  label="Buscar por CEP"
                />
              </RadioGroup>
            </FormControl>

            {address === "Buscar por CEP" && (
              <div>
                <TextField
                  id="outlined-basic"
                  label="CEP"
                  variant="outlined"
                  type="number"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-bold opacity-60">Qual área de busca?</h3>
          <div className="flex flex-col gap-4">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={area}
                onChange={handleChangeArea}
              >
                <FormControlLabel
                  value="Raio de distância"
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
                  label="Raio de distância"
                />
                <FormControlLabel
                  value="Cidade"
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
                  label="Cidade"
                />
              </RadioGroup>
            </FormControl>

            {area === "Cidade" ? (
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="Cidade"
                    onChange={handleChangeCity}
                    sx={{
                      borderRadius: 1,
                      "& fieldset": { borderRadius: 1 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 1,
                          maxHeight: 300,
                          overflowY: "auto",
                        },
                      },
                      MenuListProps: {
                        sx: {
                          py: 0,
                        },
                      },
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem value={city}>{city}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box>
                <label className="font-medium text-xs">{radius} km</label>
                <Slider
                  valueLabelDisplay="auto"
                  aria-label="Small"
                  value={radius}
                  onChange={handleSliderChange}
                  min={5}
                  max={100}
                />
              </Box>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Cidade"
                  onChange={handleChangeCategory}
                  sx={{
                    borderRadius: 1,
                    "& fieldset": { borderRadius: 1 },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: 1,
                        maxHeight: 300,
                        overflowY: "auto",
                      },
                    },
                    MenuListProps: {
                      sx: {
                        py: 0,
                      },
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-bold opacity-60">Faixa de preço</h3>
            <div className="flex gap-2 w-full">
              <TextField
                id="outlined-basic"
                label="min"
                variant="outlined"
                type="number"
                sx={{"width":"100%"}}
              />
              <TextField
                id="outlined-basic"
                label="max"
                variant="outlined"
                type="number"
                sx={{"width":"100%"}}

              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Cidade"
                onChange={handleChangeCity}
                sx={{
                  borderRadius: 1,
                  "& fieldset": { borderRadius: 1 },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: 1,
                      maxHeight: 200,
                      overflowY: "auto",
                    },
                  },
                  MenuListProps: {
                    sx: {
                      py: 0,
                    },
                  },
                }}
              >
                <MenuItem value="relevant">Relevância</MenuItem>
                <MenuItem value="recent">Recente</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button styles="bg-blue-3 text-white" text="Aplicar" />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
