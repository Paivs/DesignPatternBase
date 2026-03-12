import { useEffect, useState, useCallback } from 'react';

/**
 * Padrão aplicado:
 * - Representar o estado da requisição remota de forma explícita
 *   (loading, error, data), muitas vezes chamado de "Request/Remote Data Pattern".
 * - Encapsular essa lógica em um Custom Hook.
 */

const API_BASE_URL = 'http://localhost:8080';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar receitas (status ${response.status})`);
      }

      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return {
    recipes,
    loading,
    error,
    refetch: fetchRecipes,
  };
}

