import { useEffect, useState } from "react";

interface Department {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

export const useColombiaLocations = (selectedDepartmentName?: string) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Cargar lista de departamentos
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const res = await fetch("https://api-colombia.com/api/v1/Department");
        const data: Department[] = await res.json();
        data.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // Cargar ciudades del departamento seleccionado
  useEffect(() => {
    if (!selectedDepartmentName) {
      setCities([]);
      return;
    }

    const deptObj = departments.find((d) => d.name === selectedDepartmentName);
    if (!deptObj) return;

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await fetch(
          `https://api-colombia.com/api/v1/Department/${deptObj.id}/cities`
        );
        const data: City[] = await res.json();
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [selectedDepartmentName, departments]);

  return { departments, cities, loadingDepartments, loadingCities };
};