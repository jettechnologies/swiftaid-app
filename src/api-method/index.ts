import { Flag } from "lucide-react";
import { PaginatedCountries, Country } from "../types";

// const BASE_URL = import.meta.env.VITE_COUNTRY_BASE_URL;
const BASE_URL = "https://restcountries.com/v3.1";

export const fetchPaginatedCountries = async (
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedCountries> => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();
  const allCountries: Country[] = data.map((country: any) => ({
    name: { common: country.name.common },
    cca2: country.cca2,
    flag: country.flags.png,
  }));

  const startIndex = (page - 1) * pageSize;
  const paginatedCountries = allCountries.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    currentPage: page,
    totalPages: Math.ceil(allCountries.length / pageSize),
    countries: paginatedCountries,
  };
};

export const fetchCountryByName = async (
  name: string
): Promise<Country[] | null> => {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}?fullText=true`);
    if (!response.ok) {
      if (response.status === 404) {
        console.error("Country not found");
        return null;
      }
      throw new Error("Failed to fetch country");
    }

    const data = await response.json();
    return data.map((country: any) => ({
      name: { common: country.name.common },
      cca2: country.cca2,
      flag: country.flags.png,
    }));
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
